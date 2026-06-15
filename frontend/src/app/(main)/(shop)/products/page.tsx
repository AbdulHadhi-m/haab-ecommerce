import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductsPageContent } from "./content";
import { ProductGridSkeleton } from "@/features/products/components/product-skeleton";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our full collection of premium sportswear and lifestyle apparel.",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductsPageContent />
    </Suspense>
  );
}
