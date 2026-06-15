import Link from "next/link";
import { Heart } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { formatPrice } from "@/shared/lib/utils";

interface ProductCardImage {
  url: string;
  publicId: string;
}

interface ProductCardProps {
  slug: string;
  name: string;
  price: number;
  discountPrice?: number | null;
  images: ProductCardImage[];
  category?: { name: string; slug: string };
  className?: string;
}

export function ProductCard({
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
        <button
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-colors hover:bg-white"
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Heart className="h-4 w-4" />
        </button>
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
