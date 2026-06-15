export const PRODUCT_SORT_OPTIONS = [
  { label: "Newest", value: "createdAt_desc" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Name: A-Z", value: "name_asc" },
  { label: "Name: Z-A", value: "name_desc" },
] as const;

export const PRODUCTS_KEYS = {
  ALL: ["products"] as const,
  LISTS: () => [...PRODUCTS_KEYS.ALL, "list"] as const,
  LIST: (filters: Record<string, unknown>) =>
    [...PRODUCTS_KEYS.LISTS(), filters] as const,
  DETAILS: () => [...PRODUCTS_KEYS.ALL, "detail"] as const,
  DETAIL: (slug: string) => [...PRODUCTS_KEYS.DETAILS(), slug] as const,
};
