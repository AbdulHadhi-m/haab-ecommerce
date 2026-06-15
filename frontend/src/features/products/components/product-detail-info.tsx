"use client";

import { useState } from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { formatPrice, cn } from "@/shared/lib/utils";
import type { Product } from "../types";

interface ProductDetailInfoProps {
  product: Product;
}

export function ProductDetailInfo({ product }: ProductDetailInfoProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const categoryName =
    typeof product.category === "object" && product.category !== null
      ? product.category.name
      : "";

  const hasDiscount = product.discountPrice !== null && product.discountPrice < product.price;

  return (
    <div className="space-y-6">
      {categoryName && (
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-500">
          {categoryName}
        </p>
      )}

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{product.name}</h1>

      {product.rating > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.round(product.rating)
                    ? "fill-brand-900 text-brand-900"
                    : "fill-brand-200 text-brand-200",
                )}
              />
            ))}
          </div>
          <span className="text-sm text-brand-500">{product.rating.toFixed(1)}</span>
        </div>
      )}

      <div className="flex items-baseline gap-3">
        {hasDiscount ? (
          <>
            <span className="text-2xl font-bold">{formatPrice(product.discountPrice!)}</span>
            <span className="text-lg text-brand-400 line-through">{formatPrice(product.price)}</span>
          </>
        ) : (
          <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
        )}
      </div>

      <p className="text-sm leading-relaxed text-brand-600">{product.description}</p>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-brand-500">Status:</span>
          {product.stock > 0 ? (
            <span className="font-medium text-green-700">In Stock ({product.stock} available)</span>
          ) : (
            <span className="font-medium text-red-600">Out of Stock</span>
          )}
        </div>
        {product.sku && (
          <div className="flex items-center gap-2">
            <span className="text-brand-500">SKU:</span>
            <span className="font-mono text-xs">{product.sku}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          variant="black"
          size="lg"
          className="flex-1 uppercase tracking-widest"
          disabled={product.stock === 0}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
        <Button
          variant="white"
          size="lg"
          className="uppercase tracking-widest"
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart className={cn("mr-2 h-5 w-5", isWishlisted && "fill-current")} />
          {isWishlisted ? "Wishlisted" : "Wishlist"}
        </Button>
      </div>
    </div>
  );
}
