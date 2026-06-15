import type { Metadata } from "next";
import { ProductDetailContent } from "./content";
import { SITE } from "@/constants";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    return { title: "Product Not Found" };
  }

  const json = await res.json();
  const product = json.data;

  if (!product) {
    return { title: "Product Not Found" };
  }

  const imageUrl = product.images?.[0]?.url;
  const description = product.description?.slice(0, 160);

  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      url: `${SITE.url}/products/${product.slug}`,
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: product.name }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: `${SITE.url}/products/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  return <ProductDetailContent slug={slug} />;
}
