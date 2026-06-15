export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },
  PRODUCTS: {
    BASE: "/products",
    BY_SLUG: (slug: string) => `/products/${slug}`,
    BY_CATEGORY: (category: string) => `/products?category=${category}`,
  },
  CART: {
    BASE: "/cart",
    ITEM: (id: string) => `/cart/${id}`,
  },
  ORDERS: {
    BASE: "/orders",
    BY_ID: (id: string) => `/orders/${id}`,
  },
  USER: {
    PROFILE: "/user/profile",
    ADDRESSES: "/user/addresses",
  },
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;
