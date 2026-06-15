"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface QuantitySelectorProps {
  quantity: number;
  max?: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: "sm" | "md";
}

export function QuantitySelector({
  quantity,
  max,
  onIncrease,
  onDecrease,
  size = "md",
}: QuantitySelectorProps) {
  const isMin = quantity <= 1;
  const isMax = max !== undefined && quantity >= max;

  return (
    <div
      className={cn(
        "inline-flex items-center border border-brand-200",
        size === "sm" ? "h-8" : "h-10",
      )}
    >
      <button
        onClick={onDecrease}
        disabled={isMin}
        className={cn(
          "flex items-center justify-center transition-colors hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40",
          size === "sm" ? "h-8 w-8" : "h-10 w-10",
        )}
        aria-label="Decrease quantity"
      >
        <Minus className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
      </button>
      <span
        className={cn(
          "flex items-center justify-center border-x border-brand-200 font-medium tabular-nums",
          size === "sm" ? "h-8 w-10 text-xs" : "h-10 w-12 text-sm",
        )}
      >
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        disabled={isMax}
        className={cn(
          "flex items-center justify-center transition-colors hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40",
          size === "sm" ? "h-8 w-8" : "h-10 w-10",
        )}
        aria-label="Increase quantity"
      >
        <Plus className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
      </button>
    </div>
  );
}
