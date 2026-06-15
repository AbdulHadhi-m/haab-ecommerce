export const ORDERS_KEYS = {
  ALL: ["orders"] as const,
  LISTS: () => [...ORDERS_KEYS.ALL, "list"] as const,
  LIST: () => [...ORDERS_KEYS.LISTS()] as const,
  DETAILS: () => [...ORDERS_KEYS.ALL, "detail"] as const,
  DETAIL: (id: string) => [...ORDERS_KEYS.DETAILS(), id] as const,
};
