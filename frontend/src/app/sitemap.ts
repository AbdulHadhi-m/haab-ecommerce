import type { MetadataRoute } from "next";
import { SITE } from "@/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE.url;

  // Static routes
  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/cart`, lastModified: new Date(), changeFrequency: "never" as const, priority: 0.3 },
    { url: `${baseUrl}/wishlist`, lastModified: new Date(), changeFrequency: "never" as const, priority: 0.3 },
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: "never" as const, priority: 0.1 },
    { url: `${baseUrl}/register`, lastModified: new Date(), changeFrequency: "never" as const, priority: 0.1 },
  ];

  // Fetch products for dynamic routes
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/products?limit=1000&fields=slug,updatedAt`);
    const data = await response.json();
    if (data?.data?.products) {
      productRoutes = data.data.products.map((product: { slug: string; updatedAt: string }) => ({
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: new Date(product.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    }
  } catch {
    // Fail silently - sitemap will just have static routes
  }

  return [...staticRoutes, ...productRoutes];
}
