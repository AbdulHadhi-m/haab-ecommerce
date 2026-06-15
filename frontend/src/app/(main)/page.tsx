import type { Metadata } from "next";
import { HeroBanner } from "@/features/products/components/hero-banner";
import { FeaturedProductsSection } from "@/features/products/components/featured-products-section";
import { NewsletterSection } from "@/features/products/components/newsletter-section";
import { SITE } from "@/constants";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    siteName: SITE.name,
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main>
      <HeroBanner />
      <FeaturedProductsSection />
      <NewsletterSection />
    </main>
  );
}
