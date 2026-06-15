export const SITE = {
  name: "ADIWEAR",
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
} as const;
