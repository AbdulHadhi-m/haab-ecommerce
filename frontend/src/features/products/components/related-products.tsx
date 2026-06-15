"use client";

import { ProductCard } from "@/shared/components/elements/product-card";
import { SectionHeader } from "@/shared/components/elements/section-header";
import { ProductGridSkeleton } from "./product-skeleton";
import { useRelatedProducts } from "../hooks/useRelatedProducts";

interface RelatedProductsProps {
  slug: string;
  categorySlug?: string;
}

export function RelatedProducts({ slug }: RelatedProductsProps) {
  const { data, isLoading } = useRelatedProducts(slug);

  const products = data?.data ?? [];

  if (!isLoading && products.length === 0) return null;

  return (
    <section className="mt-16 border-t border-brand-200 pt-16">
      <SectionHeader title="You May Also Like" subtitle="Complete your look with these styles" />
      <div className="mt-8">
        {isLoading ? (
          <ProductGridSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => {
              const cat =
                typeof product.category === "object" && product.category !== null
                  ? { name: product.category.name, slug: product.category.slug }
                  : undefined;

              return (
                <ProductCard
                  key={product._id}
                  _id={product._id}
                  slug={product.slug}
                  name={product.name}
                  price={product.price}
                  discountPrice={product.discountPrice}
                  images={product.images}
                  category={cat}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
