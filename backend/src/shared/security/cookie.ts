import { CookieOptions } from "express";
import { config } from "@/config";

export const cookieConfig: CookieOptions = {
  httpOnly: true,
  secure: config.nodeEnv === "production",
  sameSite: config.nodeEnv === "production" ? "strict" : "lax",
  path: "/",
};

export const accessTokenCookieOptions: CookieOptions = {
  ...cookieConfig,
  maxAge: 15 * 60 * 1000,
};

export const refreshTokenCookieOptions: CookieOptions = {
  ...cookieConfig,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/api/v1/auth/refresh-token",
};
