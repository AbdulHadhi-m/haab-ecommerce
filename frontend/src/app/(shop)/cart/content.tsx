"use client";

import { useCartStore } from "@/features/cart/store";
import { CartItemRow, CartSummary, EmptyCart } from "@/features/cart/components";
import { PageContainer } from "@/shared/components/elements/page-container";

export function CartPageContent() {
  const items = useCartStore((s) => s.items);

  return (
    <PageContainer as="main" className="py-8 sm:py-12">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Shopping Cart</h1>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="mb-2 text-sm text-brand-500">{items.length} item{items.length !== 1 ? "s" : ""} in your cart</p>
            {items.map((item) => (
              <CartItemRow key={item.productId} item={item} />
            ))}
          </div>
          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </PageContainer>
  );
}
