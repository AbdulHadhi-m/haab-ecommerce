"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, ShoppingBag } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { formatPrice, cn } from "@/shared/lib/utils";
import { useCartStore } from "../store";
import { QuantitySelector } from "./quantity-selector";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, increaseQuantity, decreaseQuantity } = useCartStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const subtotal = items.reduce(
    (sum, item) => sum + (item.discountPrice ?? item.price) * item.quantity,
    0,
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-brand-200 px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Cart ({itemCount})
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-brand-400 transition-colors hover:text-brand-900"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingBag className="h-10 w-10 text-brand-300" />
              <p className="mt-4 text-sm text-brand-500">Your cart is empty</p>
            </div>
          ) : (
            <ul className="divide-y divide-brand-100">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-3 py-4">
                  <Link
                    href={`/products/${item.slug}`}
                    className="h-20 w-20 flex-shrink-0 overflow-hidden bg-brand-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between">
                      <Link
                        href={`/products/${item.slug}`}
                        className="text-sm font-medium hover:underline"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-brand-300 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <QuantitySelector
                        quantity={item.quantity}
                        max={item.stock}
                        onIncrease={() => increaseQuantity(item.productId)}
                        onDecrease={() => decreaseQuantity(item.productId)}
                        size="sm"
                      />
                      <span className="text-sm font-semibold">
                        {formatPrice((item.discountPrice ?? item.price) * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-brand-200 px-6 py-5">
            <div className="flex justify-between text-sm">
              <span className="text-brand-600">Subtotal</span>
              <span className="font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-brand-400">Shipping calculated at checkout</p>
            <Button
              asChild
              variant="black"
              size="lg"
              className="mt-4 w-full uppercase tracking-widest"
              onClick={() => setIsOpen(false)}
            >
              <Link href="/cart">View Cart</Link>
            </Button>
            <Button
              asChild
              variant="white"
              size="lg"
              className="mt-2 w-full uppercase tracking-widest"
              onClick={() => setIsOpen(false)}
            >
              <Link href="/checkout">Checkout</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
