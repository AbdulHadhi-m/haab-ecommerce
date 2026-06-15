import helmet from "helmet";
import { config } from "@/config";

export const helmetConfig = helmet({
  contentSecurityPolicy: config.nodeEnv === "production"
    ? {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "https://checkout.razorpay.com", "https://js.stripe.com"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "https://res.cloudinary.com", "https://*.cloudinary.com"],
          connectSrc: ["'self'", "https://api.razorpay.com", "https://api.stripe.com"],
          frameSrc: ["'self'", "https://checkout.razorpay.com", "https://js.stripe.com"],
          fontSrc: ["'self'", "data:"],
          objectSrc: ["'none'"],
          mediaSrc: ["'none'"],
          frameAncestors: ["'none'"],
        },
      }
    : false,
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: { policy: "same-origin" },
  crossOriginResourcePolicy: { policy: "cross-origin" },
  dnsPrefetchControl: { allow: true },
  frameguard: { action: "deny" },
  hidePoweredBy: true,
  hsts: config.nodeEnv === "production"
    ? {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      }
    : false,
  ieNoOpen: true,
  noSniff: true,
  permittedCrossDomainPolicies: { permittedPolicies: "none" },
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  xssFilter: true,
});
