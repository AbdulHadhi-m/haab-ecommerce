export const CART_KEYS = {
  ALL: ["cart"] as const,
  DETAIL: () => [...CART_KEYS.ALL, "detail"] as const,
};
