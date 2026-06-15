export const PRODUCT_SORT_OPTIONS = [
  { label: "Newest", value: "-createdAt" },
  { label: "Price: Low to High", value: "price" },
  { label: "Price: High to Low", value: "-price" },
  { label: "Highest Rated", value: "-rating" },
] as const;

export const PRODUCTS_KEYS = {
  ALL: ["products"] as const,
  LISTS: () => [...PRODUCTS_KEYS.ALL, "list"] as const,
  LIST: (filters: Record<string, unknown>) =>
    [...PRODUCTS_KEYS.LISTS(), filters] as const,
  DETAILS: () => [...PRODUCTS_KEYS.ALL, "detail"] as const,
  DETAIL: (slug: string) => [...PRODUCTS_KEYS.DETAILS(), slug] as const,
  FEATURED: () => [...PRODUCTS_KEYS.ALL, "featured"] as const,
  RELATED: (slug: string) => [...PRODUCTS_KEYS.ALL, "related", slug] as const,
};

export const CATEGORIES_KEYS = {
  ALL: ["categories"] as const,
};

export const DEFAULT_PRODUCT_LIMIT = 12;
