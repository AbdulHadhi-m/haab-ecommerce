export const AUTH_QUERY_KEYS = {
  currentUser: ["currentUser"],
} as const;

export const AUTH_ROUTES = {
  login: "/login",
  register: "/register",
  account: "/account",
  checkout: "/checkout",
  wishlist: "/wishlist",
} as const;

export const PROTECTED_ROUTES = [
  AUTH_ROUTES.account,
  AUTH_ROUTES.checkout,
  AUTH_ROUTES.wishlist,
] as const;
