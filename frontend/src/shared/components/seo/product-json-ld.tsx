interface ProductJsonLdProps {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability?: "InStock" | "OutOfStock";
  sku?: string;
  brand?: string;
  ratingValue?: number;
  reviewCount?: number;
  url: string;
}

export function ProductJsonLd({
  name,
  description,
  image,
  price,
  currency = "USD",
  availability = "InStock",
  sku,
  brand = "HAAB",
  ratingValue,
  reviewCount,
  url,
}: ProductJsonLdProps) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    sku,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: currency,
      price,
      availability: `https://schema.org/${availability}`,
      itemCondition: "https://schema.org/NewCondition",
    },
    ...(ratingValue !== undefined && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue,
        reviewCount: reviewCount ?? 0,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(productSchema),
      }}
    />
  );
}
