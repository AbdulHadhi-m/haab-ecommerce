"use client";

import { Heart } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/shared/lib/utils";
import { useWishlistStore } from "../store";
import type { WishlistItem } from "../types";

interface WishlistButtonProps {
  product: WishlistItem;
  className?: string;
  variant?: "icon" | "full";
}

export function WishlistButton({ product, className, variant = "icon" }: WishlistButtonProps) {
  const { toggleItem, isInWishlist } = useWishlistStore();
  const isActive = isInWishlist(product.productId);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    toast.success(isActive ? "Removed from wishlist" : "Added to wishlist", {
      description: isActive ? `${product.name} has been removed.` : `${product.name} has been saved.`,
    });
  }

  if (variant === "full") {
    return (
      <button
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center gap-2 border px-6 py-3 text-sm uppercase tracking-widest transition-colors",
          isActive
            ? "border-brand-900 bg-brand-900 text-white"
            : "border-brand-200 text-brand-900 hover:bg-brand-50",
          className,
        )}
      >
        <Heart className={cn("h-4 w-4", isActive && "fill-current")} />
        {isActive ? "Wishlisted" : "Add to Wishlist"}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-colors hover:bg-white",
        className,
      )}
      aria-label={isActive ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={cn("h-4 w-4", isActive && "fill-brand-900 text-brand-900")} />
    </button>
  );
}
