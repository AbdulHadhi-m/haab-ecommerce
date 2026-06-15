"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/shared/components/elements/page-container";
import { CheckoutSteps, ShippingForm, PaymentMethod, ReviewOrder, OrderSummary } from "@/features/checkout/components";
import { useCheckoutStore } from "@/features/checkout/store";
import { useCreateOrder } from "@/features/checkout/hooks";
import { useCartStore } from "@/features/cart/store";
import { EmptyCart } from "@/features/cart/components/empty-cart";
import { CouponInput } from "@/features/coupons/components/coupon-input";
import { usePaymentIntent, useVerifyPayment } from "@/features/payments/hooks";
import { loadRazorpayScript } from "@/features/payments/utils/load-razorpay";
import { toast } from "sonner";
import type { PaymentMethod as PaymentMethodType } from "@/features/checkout/types";
import type { ShippingFormData } from "@/features/checkout/schemas";

export function CheckoutPageContent() {
  const router = useRouter();
  const { currentStep, nextStep, prevStep, reset } = useCheckoutStore();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const createOrder = useCreateOrder();
  const createIntent = usePaymentIntent();
  const verifyPayment = useVerifyPayment();

  const [shippingData, setShippingData] = useState<ShippingFormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("cod");
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState<string | undefined>(undefined);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentStep, setPaymentStep] = useState<"idle" | "intent" | "processing" | "verifying">("idle");
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const subtotal = items.reduce(
    (sum, item) => sum + (item.discountPrice ?? item.price) * item.quantity,
    0,
  );
  const shippingFee = subtotal >= 100 ? 0 : 9.99;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const orderTotal = Math.round((subtotal + shippingFee + tax - discount) * 100) / 100;

  if (items.length === 0 && currentStep === 0) {
    return (
      <PageContainer as="main" className="py-8 sm:py-12">
        <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">Checkout</h1>
        <EmptyCart />
      </PageContainer>
    );
  }

  function handleShippingNext(data: ShippingFormData) {
    setShippingData(data);
    nextStep();
  }

  function handlePaymentNext(method: PaymentMethodType) {
    setPaymentMethod(method);
    nextStep();
  }

  const handleApplyDiscount = useCallback((amount: number, code: string) => {
    setDiscount(amount);
    setCouponCode(code);
  }, []);

  const handleRemoveDiscount = useCallback(() => {
    setDiscount(0);
    setCouponCode(undefined);
  }, []);

  const handleOrderSuccess = useCallback(() => {
    clearCart();
    reset();
    toast.success("Payment successful!", {
      description: "Your order has been placed successfully.",
    });
    router.push(`/order-success/${orderId}`);
  }, [clearCart, reset, router, orderId]);

  const handlePaymentError = useCallback((error: string) => {
    setPaymentStep("idle");
    setPaymentError(error);
    toast.error("Payment failed", { description: error });
  }, []);

  async function handlePlaceOrder() {
    setPaymentError(null);
    try {
      const response = await createOrder.mutateAsync({
        items: items.map((item) => ({
          productId: item.productId,
          name: item.name,
          image: item.image,
          price: item.discountPrice ?? item.price,
          quantity: item.quantity,
        })),
        shippingAddress: shippingData,
        paymentMethod,
        couponCode,
        discount: discount > 0 ? discount : undefined,
      });

      const newOrderId = response.data._id;
      setOrderId(newOrderId);

      if (paymentMethod === "cod") {
        clearCart();
        reset();
        toast.success("Order placed!", {
          description: "Your order has been placed successfully.",
        });
        router.push(`/order-success/${newOrderId}`);
        return;
      }

      setPaymentStep("intent");

      if (paymentMethod === "razorpay") {
        const loaded = await loadRazorpayScript();
        if (!loaded) {
          handlePaymentError("Failed to load Razorpay SDK");
          return;
        }

        const intent = await createIntent.mutateAsync({
          orderId: newOrderId,
          paymentMethod: "razorpay",
        });

        setPaymentStep("processing");

        const options: any = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: Math.round(orderTotal * 100),
          currency: "INR",
          name: "ADIWEAR",
          order_id: intent.razorpayOrderId,
          prefill: {
            name: shippingData.fullName,
            email: shippingData.email,
            contact: shippingData.phone,
          },
          handler: async (razorpayResponse: any) => {
            setPaymentStep("verifying");
            try {
              await verifyPayment.mutateAsync({
                orderId: newOrderId,
                paymentMethod: "razorpay",
                transactionId: razorpayResponse.razorpay_payment_id,
                razorpayPaymentId: razorpayResponse.razorpay_payment_id,
                razorpayOrderId: razorpayResponse.razorpay_order_id,
                razorpaySignature: razorpayResponse.razorpay_signature,
              });
              handleOrderSuccess();
            } catch {
              handlePaymentError("Payment verification failed");
            }
          },
          modal: {
            ondismiss: () => {
              handlePaymentError("Payment cancelled");
            },
          },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      }

      if (paymentMethod === "stripe") {
        setPaymentStep("processing");
        try {
          const intent = await createIntent.mutateAsync({
            orderId: newOrderId,
            paymentMethod: "stripe",
          });

          if (intent.clientSecret) {
            const stripe = (window as any).Stripe(
              process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
            );
            const { error: stripeError } = await stripe.confirmCardPayment(
              intent.clientSecret,
            );

            if (stripeError) {
              handlePaymentError(stripeError.message ?? "Stripe payment failed");
              return;
            }

            setPaymentStep("verifying");
            await verifyPayment.mutateAsync({
              orderId: newOrderId,
              paymentMethod: "stripe",
              transactionId: intent.transactionId ?? "",
              paymentIntentId: intent.transactionId,
            });
            handleOrderSuccess();
          }
        } catch (err: any) {
          handlePaymentError(err?.response?.data?.message ?? err?.message ?? "Stripe payment failed");
        }
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to place order. Please try again.";
      toast.error("Order failed", { description: message });
    }
  }

  const isProcessing = createOrder.isPending || paymentStep !== "idle";

  return (
    <PageContainer as="main" className="py-8 sm:py-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">Checkout</h1>

      <CheckoutSteps currentStep={currentStep} />

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {currentStep === 0 && (
            <ShippingForm defaultValues={shippingData} onNext={handleShippingNext} />
          )}
          {currentStep === 1 && (
            <PaymentMethod onNext={handlePaymentNext} onBack={prevStep} />
          )}
          {currentStep === 2 && (
            <ReviewOrder
              shipping={shippingData}
              payment={paymentMethod}
              items={items}
              discount={discount}
              onPlaceOrder={handlePlaceOrder}
              onBack={prevStep}
              isPending={isProcessing}
            />
          )}
          {paymentStep !== "idle" && (
            <div className="mt-4 rounded-md border border-brand-200 bg-brand-50 p-4 text-center text-sm">
              {paymentStep === "intent" && <p>Initializing payment…</p>}
              {paymentStep === "processing" && <p>Processing payment…</p>}
              {paymentStep === "verifying" && <p>Verifying payment…</p>}
              {paymentError && (
                <p className="mt-2 text-red-600">
                  {paymentError}
                  <button
                    onClick={() => setPaymentStep("idle")}
                    className="ml-2 underline hover:no-underline"
                  >
                    Try again
                  </button>
                </p>
              )}
            </div>
          )}
        </div>

        <div className="border border-brand-200 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest">Order Summary</h2>
          <OrderSummary items={items} discount={discount} />
          <div className="mt-4 border-t border-brand-200 pt-4">
            <CouponInput
              orderTotal={subtotal}
              onApplyDiscount={handleApplyDiscount}
              onRemoveDiscount={handleRemoveDiscount}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
