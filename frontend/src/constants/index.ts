export const SITE = {
  name: "HAAB",
  tagline: "Premium Sportswear",
  description: "Premium sportswear and lifestyle apparel. Inspired by heritage, built for performance.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
} as const;

export const NAV_CATEGORIES = [
  { label: "Men", href: "/products?category=men" },
  { label: "Women", href: "/products?category=women" },
  { label: "Kids", href: "/products?category=kids" },
  { label: "Sports", href: "/products?category=sports" },
  { label: "New Arrivals", href: "/products?sort=-createdAt" },
] as const;

export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
    REFRESH: "/auth/refresh-token",
  },
  PRODUCTS: {
    BASE: "/products",
    BY_SLUG: (slug: string) => `/products/${slug}`,
  },
  CATEGORIES: {
    BASE: "/categories",
    BY_SLUG: (slug: string) => `/categories/${slug}`,
  },
  UPLOADS: {
    IMAGE: "/uploads/image",
    IMAGES: "/uploads/images",
    DELETE: (publicId: string) => `/uploads/${publicId}`,
  },
  ORDERS: {
    CREATE: "/orders",
    MY_ORDERS: "/orders/my-orders",
    BY_ID: (id: string) => `/orders/${id}`,
    ADMIN_ALL: "/orders/admin/all",
    UPDATE_STATUS: (id: string) => `/orders/${id}/status`,
  },
  USERS: {
    PROFILE: "/users/profile",
    PASSWORD: "/users/password",
    ADDRESSES: "/users/addresses",
    ADDRESS_BY_ID: (id: string) => `/users/addresses/${id}`,
    ADDRESS_DEFAULT: (id: string) => `/users/addresses/${id}/default`,
  },
  REVIEWS: {
    PRODUCT: (productId: string) => `/reviews/products/${productId}`,
    BASE: "/reviews",
    BY_ID: (id: string) => `/reviews/${id}`,
    MY: "/reviews/my-reviews",
  },
  COUPONS: {
    VALIDATE: "/coupons/validate",
    BASE: "/coupons",
    BY_ID: (id: string) => `/coupons/${id}`,
  },
  PAYMENTS: {
    CREATE_INTENT: "/payments/create-payment-intent",
    VERIFY: "/payments/verify",
  },
} as const;
