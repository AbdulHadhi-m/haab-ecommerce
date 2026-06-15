"use client";

import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { SectionHeader } from "@/shared/components/elements/section-header";
import { PageContainer } from "@/shared/components/elements/page-container";
import { ProductCard } from "@/shared/components/elements/product-card";
import { useFeaturedProducts } from "../hooks/useFeaturedProducts";
import { ProductGridSkeleton } from "./product-skeleton";

export function FeaturedProductsSection() {
  const { data, isLoading } = useFeaturedProducts();

  const products = data?.data ?? [];

  return (
    <section className="py-20 sm:py-28">
      <PageContainer>
        <SectionHeader
          title="Featured"
          subtitle="Curated for performance and style"
          align="center"
        />
        <div className="mt-10">
          {isLoading ? (
            <ProductGridSkeleton count={4} />
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {products.slice(0, 8).map((product) => {
                const cat =
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
                    category={cat}
                  />
                );
              })}
            </div>
          ) : null}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="black" size="lg" className="uppercase tracking-widest">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </PageContainer>
    </section>
  );
}
