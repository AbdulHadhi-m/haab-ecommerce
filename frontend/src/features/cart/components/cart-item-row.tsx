"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { formatPrice } from "@/shared/lib/utils";
import { QuantitySelector } from "./quantity-selector";
import { useCartStore } from "../store";
import type { CartItem } from "../types";

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const increaseQuantity = useCartStore((s) => s.increaseQuantity);
  const decreaseQuantity = useCartStore((s) => s.decreaseQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const displayPrice = item.discountPrice ?? item.price;

  return (
    <div className="flex gap-4 border-b border-brand-100 py-6 sm:gap-6">
      <Link href={`/products/${item.slug}`} className="h-24 w-24 flex-shrink-0 overflow-hidden bg-brand-50 sm:h-32 sm:w-32">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <Link
              href={`/products/${item.slug}`}
              className="text-sm font-medium hover:underline sm:text-base"
            >
              {item.name}
            </Link>
            <p className="mt-0.5 text-xs text-brand-500">
              {formatPrice(displayPrice)} each
            </p>
          </div>
          <button
            onClick={() => removeItem(item.productId)}
            className="flex-shrink-0 text-brand-400 transition-colors hover:text-red-500"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <QuantitySelector
            quantity={item.quantity}
            max={item.stock}
            onIncrease={() => increaseQuantity(item.productId)}
            onDecrease={() => decreaseQuantity(item.productId)}
            size="sm"
          />
          <span className="text-sm font-semibold">
            {formatPrice(displayPrice * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
