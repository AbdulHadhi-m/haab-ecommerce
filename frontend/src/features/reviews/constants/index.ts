export const REVIEW_SORT_OPTIONS = [
  { label: "Newest", value: "-createdAt" },
  { label: "Highest Rated", value: "-rating" },
  { label: "Lowest Rated", value: "rating" },
] as const;

export const REVIEWS_KEYS = {
  ALL: ["reviews"] as const,
  PRODUCT: (productId: string) => [...REVIEWS_KEYS.ALL, "product", productId] as const,
  MY: () => [...REVIEWS_KEYS.ALL, "my"] as const,
};
