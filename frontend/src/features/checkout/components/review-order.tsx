"use client";

import { Button } from "@/shared/components/ui/button";
import { OrderSummary } from "./order-summary";
import type { CartItem } from "@/features/cart/types";
import type { PaymentMethod as PaymentMethodType } from "../types";
import type { ShippingFormData } from "../schemas";

const PAYMENT_LABELS: Record<PaymentMethodType, string> = {
  cod: "Cash on Delivery",
  razorpay: "Razorpay",
  stripe: "Stripe",
};

interface ReviewOrderProps {
  shipping: ShippingFormData;
  payment: PaymentMethodType;
  items: CartItem[];
  onPlaceOrder: () => void;
  onBack: () => void;
  isPending: boolean;
}

export function ReviewOrder({ shipping, payment, items, onPlaceOrder, onBack, isPending }: ReviewOrderProps) {
  return (
    <div className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-600">
            Shipping Address
          </h3>
          <div className="space-y-1 text-sm">
            <p className="font-medium">{shipping.fullName}</p>
            <p className="text-brand-600">{shipping.email}</p>
            <p className="text-brand-600">{shipping.phone}</p>
            <p className="text-brand-600">{shipping.address}</p>
            <p className="text-brand-600">
              {shipping.city}, {shipping.state} {shipping.postalCode}
            </p>
            <p className="text-brand-600">{shipping.country}</p>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-600">
            Payment Method
          </h3>
          <p className="text-sm font-medium">{PAYMENT_LABELS[payment]}</p>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-600">
          Order Summary
        </h3>
        <OrderSummary items={items} />
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" size="lg" onClick={onBack} className="uppercase tracking-widest" disabled={isPending}>
          Back
        </Button>
        <Button
          type="button"
          variant="black"
          size="lg"
          className="uppercase tracking-widest"
          onClick={onPlaceOrder}
          disabled={isPending}
        >
          {isPending ? "Placing Order…" : "Place Order"}
        </Button>
      </div>
    </div>
  );
}
