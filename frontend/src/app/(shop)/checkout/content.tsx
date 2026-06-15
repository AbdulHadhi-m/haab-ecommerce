"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/shared/components/elements/page-container";
import { CheckoutSteps, ShippingForm, PaymentMethod, ReviewOrder, OrderSummary } from "@/features/checkout/components";
import { useCheckoutStore } from "@/features/checkout/store";
import { useCreateOrder } from "@/features/checkout/hooks";
import { useCartStore } from "@/features/cart/store";
import { EmptyCart } from "@/features/cart/components/empty-cart";
import type { PaymentMethod as PaymentMethodType } from "@/features/checkout/types";
import type { ShippingFormData } from "@/features/checkout/schemas";

export function CheckoutPageContent() {
  const router = useRouter();
  const { currentStep, nextStep, prevStep, reset } = useCheckoutStore();
  const items = useCartStore((s) => s.items);
  const { mutate, isPending } = useCreateOrder();

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

  function handlePlaceOrder() {
    mutate({
      items: items.map((item) => ({
        productId: item.productId,
        name: item.name,
        image: item.image,
        price: item.discountPrice ?? item.price,
        quantity: item.quantity,
      })),
      shippingAddress: shippingData,
      paymentMethod,
    });
  }

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
              onPlaceOrder={handlePlaceOrder}
              onBack={prevStep}
              isPending={isPending}
            />
          )}
        </div>

        <div className="border border-brand-200 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest">Order Summary</h2>
          <OrderSummary items={items} />
        </div>
      </div>
    </PageContainer>
  );
}
