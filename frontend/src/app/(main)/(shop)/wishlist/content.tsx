"use client";

import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { PageContainer } from "@/shared/components/elements/page-container";
import { EmptyWishlist } from "@/features/wishlist/components/empty-wishlist";
import { useWishlistStore } from "@/features/wishlist/store";
import { useCartStore } from "@/features/cart/store";
import { toast } from "sonner";
import { formatPrice } from "@/shared/lib/utils";

export function WishlistPageContent() {
  const items = useWishlistStore((s) => s.items);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const addToCart = useCartStore((s) => s.addItem);

  function handleMoveToCart(item: (typeof items)[number]) {
    addToCart({
      productId: item.productId,
      slug: item.slug,
      name: item.name,
      image: item.image,
      price: item.price,
      discountPrice: item.discountPrice,
      quantity: 1,
      stock: 999,
    });
    removeItem(item.productId);
    toast.success("Moved to cart", {
      description: `${item.name} has been moved to your cart.`,
    });
  }

  return (
    <PageContainer as="main" className="py-8 sm:py-12">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">My Wishlist</h1>

      {items.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <>
          <p className="mt-2 text-sm text-brand-500">
            {items.length} saved item{items.length !== 1 ? "s" : ""}
          </p>
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <div key={item.productId} className="group">
                <Link
                  href={`/products/${item.slug}`}
                  className="relative block aspect-[3/4] overflow-hidden bg-brand-50"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="mt-3 space-y-2">
                  <Link
                    href={`/products/${item.slug}`}
                    className="block text-sm font-medium leading-tight hover:underline"
                  >
                    {item.name}
                  </Link>
                  <div className="flex items-center gap-2">
                    {item.discountPrice ? (
                      <>
                        <span className="text-sm font-semibold">{formatPrice(item.discountPrice)}</span>
                        <span className="text-xs text-brand-400 line-through">{formatPrice(item.price)}</span>
                      </>
                    ) : (
                      <span className="text-sm font-semibold">{formatPrice(item.price)}</span>
                    )}
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button
                      variant="black"
                      size="sm"
                      className="flex-1 text-xs uppercase tracking-widest"
                      onClick={() => handleMoveToCart(item)}
                    >
                      <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
                      Add to Cart
                    </Button>
                    <button
                      onClick={() => {
                        removeItem(item.productId);
                        toast.success("Removed from wishlist");
                      }}
                      className="flex h-9 w-9 items-center justify-center border border-brand-200 transition-colors hover:border-red-300 hover:text-red-500"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </PageContainer>
  );
}
