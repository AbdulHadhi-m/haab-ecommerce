"use client";

import { useState } from "react";
import { Circle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import type { PaymentMethod as PaymentMethodType } from "../types";

const PAYMENT_OPTIONS: { value: PaymentMethodType; label: string; description: string; available: boolean }[] = [
  { value: "cod", label: "Cash on Delivery", description: "Pay when you receive your order", available: true },
  { value: "razorpay", label: "Razorpay", description: "Pay with UPI, card, or net banking", available: false },
  { value: "stripe", label: "Stripe", description: "Pay with credit or debit card", available: false },
];

interface PaymentMethodProps {
  onNext: (method: PaymentMethodType) => void;
  onBack: () => void;
}

export function PaymentMethod({ onNext, onBack }: PaymentMethodProps) {
  const [selected, setSelected] = useState<PaymentMethodType>("cod");

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {PAYMENT_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => option.available && setSelected(option.value)}
            disabled={!option.available}
            className={cn(
              "flex w-full items-center gap-4 border p-4 text-left transition-colors",
              selected === option.value
                ? "border-brand-900 bg-brand-50"
                : "border-brand-200 hover:border-brand-400",
              !option.available && "cursor-not-allowed opacity-50",
            )}
          >
            <Circle
              className={cn(
                "h-5 w-5",
                selected === option.value ? "fill-brand-900 text-brand-900" : "text-brand-300",
              )}
            />
            <div>
              <p className="text-sm font-medium">{option.label}</p>
              <p className="text-xs text-brand-500">{option.description}</p>
            </div>
            {!option.available && (
              <span className="ml-auto text-[10px] uppercase tracking-wider text-brand-400">
                Coming soon
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" size="lg" onClick={onBack} className="uppercase tracking-widest">
          Back
        </Button>
        <Button
          type="button"
          variant="black"
          size="lg"
          className="uppercase tracking-widest"
          onClick={() => onNext(selected)}
        >
          Continue to Review
        </Button>
      </div>
    </div>
  );
}
