"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useValidateCoupon } from "../hooks/useValidateCoupon";
import { formatPrice } from "@/shared/lib/utils";
import { X, Check } from "lucide-react";

interface CouponInputProps {
  orderTotal: number;
  onApplyDiscount: (discount: number, code: string) => void;
  onRemoveDiscount: () => void;
}

export function CouponInput({ orderTotal, onApplyDiscount, onRemoveDiscount }: CouponInputProps) {
  const [code, setCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const { mutate, isPending } = useValidateCoupon();

  const handleApply = () => {
    if (!code.trim()) return;
    mutate(
      { code: code.trim(), orderTotal },
      {
        onSuccess: (result) => {
          if (result.valid) {
            setAppliedCoupon({ code: result.coupon.code, discount: result.discount });
            onApplyDiscount(result.discount, result.coupon.code);
            setCode("");
          }
        },
        onError: () => {
          setAppliedCoupon(null);
          onRemoveDiscount();
        },
      },
    );
  };

  const handleRemove = () => {
    setAppliedCoupon(null);
    onRemoveDiscount();
    setCode("");
  };

  if (appliedCoupon) {
    return (
      <div className="flex items-center justify-between rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm">
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-600" />
          <span className="font-medium text-green-700">{appliedCoupon.code}</span>
          <span className="text-green-600">(-{formatPrice(appliedCoupon.discount)})</span>
        </div>
        <button onClick={handleRemove} className="text-green-600 hover:text-green-800">
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium uppercase tracking-wide text-brand-900">Coupon Code</label>
      <div className="flex gap-2">
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Enter coupon code"
          disabled={isPending}
        />
        <Button type="button" variant="black" onClick={handleApply} disabled={isPending || !code.trim()}>
          {isPending ? "..." : "Apply"}
        </Button>
      </div>
    </div>
  );
}
