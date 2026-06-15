"use client";

import { Star } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
}

const sizeMap = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export function StarRating({ value, onChange, size = "md", readonly = false }: StarRatingProps) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(i + 1)}
          className={cn(
            "transition-colors",
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110",
          )}
        >
          <Star
            className={cn(
              sizeMap[size],
              i < value
                ? "fill-brand-900 text-brand-900"
                : "fill-brand-200 text-brand-200",
            )}
          />
        </button>
      ))}
    </span>
  );
}
