import { ProductCard } from "@/shared/components/elements/product-card";
import type { Product } from "../types";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => {
        const category =
          typeof product.category === "object" && product.category !== null
            ? { name: product.category.name, slug: product.category.slug }
            : undefined;

        return (
          <ProductCard
            key={product._id}
            slug={product.slug}
            name={product.name}
            price={product.price}
            discountPrice={product.discountPrice}
            images={product.images}
            category={category}
          />
        );
      })}
    </div>
  );
}
