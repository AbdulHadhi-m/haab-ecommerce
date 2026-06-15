"use client";

import { useSearchParams } from "next/navigation";
import { PageContainer } from "@/shared/components/elements/page-container";
import { EmptyState } from "@/shared/components/elements/empty-state";
import { Button } from "@/shared/components/ui/button";
import { ProductGrid, ProductFilters, ProductPagination, ProductGridSkeleton } from "@/features/products/components";
import { useProducts } from "@/features/products/hooks/useProducts";
import { DEFAULT_PRODUCT_LIMIT } from "@/features/products/constants";
import Link from "next/link";

export function ProductsPageContent() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || undefined;
  const category = searchParams.get("category") || undefined;
  const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
  const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
  const sort = searchParams.get("sort") || undefined;

  const { data, isLoading } = useProducts({
    page,
    limit: DEFAULT_PRODUCT_LIMIT,
    search,
    category,
    minPrice,
    maxPrice,
    sort,
  });

  const products = data?.data ?? [];
  const meta = data?.meta;

  return (
    <PageContainer as="main" className="py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Products</h1>
        <p className="mt-2 text-sm text-brand-500">
          {meta ? `${meta.total} product${meta.total !== 1 ? "s" : ""} found` : "Browse our collection"}
        </p>
      </div>

      <ProductFilters />

      <div className="mt-8">
        {isLoading ? (
          <ProductGridSkeleton />
        ) : products.length > 0 ? (
          <>
            <ProductGrid products={products} />
            {meta && (
              <div className="mt-12">
                <ProductPagination currentPage={meta.page} totalPages={meta.totalPages} />
              </div>
            )}
          </>
        ) : (
          <EmptyState
            title="No products found"
            description="Try adjusting your filters or search terms."
            action={
              <Button variant="black" size="lg" className="uppercase tracking-widest" asChild>
                <Link href="/products">Clear Filters</Link>
              </Button>
            }
          />
        )}
      </div>
    </PageContainer>
  );
}
