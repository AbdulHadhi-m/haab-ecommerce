export const ROLES = {
  CUSTOMER: "customer",
  ADMIN: "admin",
} as const;

export const TOKEN_TYPE = {
  ACCESS: "access",
  REFRESH: "refresh",
} as const;

export const COOKIE_NAMES = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
} as const;

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "strict" as const : "lax" as const,
  path: "/",
} as const;
