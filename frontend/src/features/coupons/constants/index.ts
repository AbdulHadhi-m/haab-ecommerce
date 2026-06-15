export const COUPONS_KEYS = {
  ALL: ["coupons"] as const,
  LISTS: () => [...COUPONS_KEYS.ALL, "list"] as const,
  DETAIL: (id: string) => [...COUPONS_KEYS.ALL, "detail", id] as const,
};
