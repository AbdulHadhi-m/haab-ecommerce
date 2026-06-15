"use client";

import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { formatPrice } from "@/shared/lib/utils";
import { useCartStore } from "../store";

export function CartSummary() {
  const items = useCartStore((s) => s.items);

  const subtotal = items.reduce(
    (sum, item) => sum + (item.discountPrice ?? item.price) * item.quantity,
    0,
  );
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="border border-brand-200 bg-white p-6 sm:p-8">
      <h2 className="text-lg font-bold tracking-tight">Order Summary</h2>

      <div className="mt-6 space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-brand-600">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-brand-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? (
              <span className="text-green-700">Free</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>
        {shipping > 0 && (
          <p className="text-xs text-brand-400">
            Free shipping on orders over {formatPrice(100)}
          </p>
        )}
        <div className="border-t border-brand-200 pt-4">
          <div className="flex justify-between text-base">
            <span className="font-bold">Estimated Total</span>
            <span className="font-bold">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <Button
        asChild
        variant="black"
        size="lg"
        className="mt-6 w-full uppercase tracking-widest"
      >
        <Link href="/checkout">Proceed to Checkout</Link>
      </Button>

      <Button
        asChild
        variant="ghost"
        size="sm"
        className="mt-3 w-full uppercase tracking-widest text-brand-600"
      >
        <Link href="/products">Continue Shopping</Link>
      </Button>
    </div>
  );
}
