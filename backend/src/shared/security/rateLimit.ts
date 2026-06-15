import rateLimit from "express-rate-limit";
import { config } from "@/config";

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: config.nodeEnv === "production" ? 100 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later" },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: config.nodeEnv === "production" ? 20 : 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many authentication attempts, please try again later" },
  skipSuccessfulRequests: true,
});

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: config.nodeEnv === "production" ? 60 : 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please slow down" },
});
