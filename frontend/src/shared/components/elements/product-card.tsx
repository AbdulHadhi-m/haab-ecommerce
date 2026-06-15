import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { formatPrice } from "@/shared/lib/utils";
import { WishlistButton } from "@/features/wishlist/components/wishlist-button";

interface ProductCardImage {
  url: string;
  publicId: string;
}

interface ProductCardProps {
  _id: string;
  slug: string;
  name: string;
  price: number;
  discountPrice?: number | null;
  images: ProductCardImage[];
  category?: { name: string; slug: string };
  className?: string;
}

export function ProductCard({
  _id,
  slug,
  name,
  price,
  discountPrice,
  images,
  category,
  className,
}: ProductCardProps) {
  const imageUrl = images[0]?.url ?? "/placeholder.svg";

  return (
    <Link href={`/products/${slug}`} className={cn("group block", className)}>
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-50">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <WishlistButton
          product={{
            productId: _id,
            slug,
            name,
            image: imageUrl,
            price,
            discountPrice: discountPrice ?? null,
          }}
          className="absolute right-3 top-3"
        />
        {discountPrice && (
          <span className="absolute left-3 top-3 bg-black px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            Sale
          </span>
        )}
      </div>
      <div className="mt-3 space-y-1">
        {category && (
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            {category.name}
          </p>
        )}
        <h3 className="text-sm font-medium leading-tight">{name}</h3>
        <div className="flex items-center gap-2">
          {discountPrice ? (
            <>
              <span className="text-sm font-semibold">{formatPrice(discountPrice)}</span>
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(price)}
              </span>
            </>
          ) : (
            <span className="text-sm font-semibold">{formatPrice(price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
