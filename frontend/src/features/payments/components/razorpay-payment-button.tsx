"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { usePaymentIntent } from "../hooks/usePaymentIntent";
import { useVerifyPayment } from "../hooks/useVerifyPayment";
import { loadRazorpayScript } from "../utils/load-razorpay";
import { toast } from "sonner";

interface RazorpayPaymentButtonProps {
  orderId: string;
  amount: number;
  prefill: { name: string; email: string; phone: string };
  onSuccess: () => void;
  onError: (error: string) => void;
  disabled?: boolean;
}

export function RazorpayPaymentButton({ orderId, amount, prefill, onSuccess, onError, disabled }: RazorpayPaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const createIntent = usePaymentIntent();
  const verifyPayment = useVerifyPayment();

  const handlePayment = async () => {
    setLoading(true);
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error("Failed to load Razorpay SDK");
        setLoading(false);
        return;
      }

      const intent = await createIntent.mutateAsync({ orderId, paymentMethod: "razorpay" });

      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "HAAB",
        order_id: intent.razorpayOrderId,
        prefill: {
          name: prefill.name,
          email: prefill.email,
          contact: prefill.phone,
        },
        handler: async (response: any) => {
          try {
            await verifyPayment.mutateAsync({
              orderId,
              paymentMethod: "razorpay",
              transactionId: response.razorpay_payment_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
            onSuccess();
          } catch {
            onError("Payment verification failed");
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            onError("Payment cancelled");
          },
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (err: any) {
      const message = err?.response?.data?.message ?? err?.message ?? "Payment failed";
      toast.error(message);
      onError(message);
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="black"
      size="lg"
      className="w-full uppercase tracking-widest"
      onClick={handlePayment}
      disabled={disabled || loading || verifyPayment.isPending}
    >
      {loading ? "Processing…" : verifyPayment.isPending ? "Verifying…" : "Pay with Razorpay"}
    </Button>
  );
}
