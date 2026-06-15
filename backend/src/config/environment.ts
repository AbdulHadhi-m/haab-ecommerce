import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  JWT_ACCESS_SECRET: z.string().min(1, "JWT_ACCESS_SECRET is required"),
  JWT_REFRESH_SECRET: z.string().min(1, "JWT_REFRESH_SECRET is required"),
  ACCESS_TOKEN_EXPIRES: z.string().default("15m"),
  REFRESH_TOKEN_EXPIRES: z.string().default("7d"),
  CLOUDINARY_CLOUD_NAME: z.string().min(1, "CLOUDINARY_CLOUD_NAME is required"),
  CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY is required"),
  CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY_API_SECRET is required"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");
  const { fieldErrors } = parsed.error.flatten();
  for (const [key, messages] of Object.entries(fieldErrors)) {
    console.error(`  ${key}: ${messages?.join(", ")}`);
  }
  process.exit(1);
}

export const environment = parsed.data;
