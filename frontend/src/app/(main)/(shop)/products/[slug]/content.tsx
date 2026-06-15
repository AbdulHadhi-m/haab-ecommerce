"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { PageContainer } from "@/shared/components/elements/page-container";
import { ProductGallery, ProductDetailInfo, RelatedProducts, ProductDetailSkeleton } from "@/features/products/components";
import { DynamicReviewList } from "@/shared/lib/dynamic-imports";
import { useProduct } from "@/features/products/hooks/useProduct";
import { EmptyState } from "@/shared/components/elements/empty-state";
import { Button } from "@/shared/components/ui/button";
import { ProductJsonLd } from "@/shared/components/seo/product-json-ld";
import { SITE } from "@/constants";

interface ProductDetailContentProps {
  slug: string;
}

export function ProductDetailContent({ slug }: ProductDetailContentProps) {
  const { data, isLoading, error } = useProduct(slug);

  if (isLoading) {
    return (
      <PageContainer as="main" className="py-8 sm:py-12">
        <ProductDetailSkeleton />
      </PageContainer>
    );
  }

  if (error || !data?.data) {
    return (
      <PageContainer as="main" className="py-8 sm:py-12">
        <EmptyState
          title="Product not found"
          description="This product may have been removed or is no longer available."
          action={
            <Button variant="black" size="lg" className="uppercase tracking-widest" asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          }
        />
      </PageContainer>
    );
  }

  const product = data.data;

  const categorySlug =
    typeof product.category === "object" && product.category !== null
      ? product.category.slug
      : undefined;

  const productUrl = `${SITE.url}/products/${product.slug}`;

  return (
    <PageContainer as="main" className="py-8 sm:py-12">
      <ProductJsonLd
        name={product.name}
        description={product.description?.slice(0, 160) ?? ""}
        image={product.images?.[0]?.url ?? ""}
        price={product.price}
        currency="USD"
        availability={product.stock > 0 ? "InStock" : "OutOfStock"}
        sku={product.sku}
        brand="HAAB"
        ratingValue={product.ratings?.average ?? product.rating}
        reviewCount={product.ratings?.count ?? 0}
        url={productUrl}
      />

      <Link
        href="/products"
        className="mb-8 inline-flex items-center gap-1 text-sm text-brand-500 transition-colors hover:text-brand-900"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <ProductGallery images={product.images} name={product.name} />
        <ProductDetailInfo product={product} />
      </div>

      <RelatedProducts slug={product.slug} categorySlug={categorySlug} />

      <hr className="my-12 border-border" />

      <DynamicReviewList
        productId={product._id}
        averageRating={product.ratings?.average ?? product.rating}
        totalReviews={product.ratings?.count ?? 0}
      />
    </PageContainer>
  );
}
