import { Request, Response, NextFunction } from "express";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

export const mongoSanitizeMiddleware = mongoSanitize({
  replaceWith: "_",
  onSanitize: ({ req, key }) => {
    console.warn(`Sanitized ${key} in request to ${req.originalUrl}`);
  },
});

export const xssCleanMiddleware = xss();

export function sanitizeInput(req: Request, _res: Response, next: NextFunction): void {
  if (req.body) {
    sanitizeObject(req.body);
  }
  if (req.query) {
    sanitizeObject(req.query as Record<string, unknown>);
  }
  if (req.params) {
    sanitizeObject(req.params);
  }
  next();
}

function sanitizeObject(obj: Record<string, unknown>): void {
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (typeof value === "string") {
      obj[key] = value.replace(/<[^>]*>/g, "");
      obj[key] = (obj[key] as string).replace(/\$/g, "");
      if (key.startsWith("$") || obj[key] === "") {
        delete obj[key];
      }
    } else if (typeof value === "object" && value !== null) {
      sanitizeObject(value as Record<string, unknown>);
    }
  }
}
