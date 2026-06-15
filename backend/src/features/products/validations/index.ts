import { z } from "zod";
import { Types } from "mongoose";

const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid category ID",
});

const imageSchema = z.object({
  url: z.string().url("Image URL must be valid"),
  publicId: z.string().min(1, "Public ID is required"),
});

export const createProductSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(200, "Name must not exceed 200 characters")
      .trim(),
    description: z
      .string()
      .min(1, "Description is required")
      .max(5000, "Description must not exceed 5000 characters")
      .trim(),
    price: z.number().positive("Price must be positive"),
    discountPrice: z
      .number()
      .positive("Discount price must be positive")
      .optional()
      .nullable(),
    images: z.array(imageSchema).optional().default([]),
    stock: z.number().int("Stock must be an integer").min(0, "Stock cannot be negative"),
    sku: z.string().min(1, "SKU is required").trim().toUpperCase(),
    category: objectIdSchema,
    featured: z.boolean().optional().default(false),
    isActive: z.boolean().optional().default(true),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(200, "Name must not exceed 200 characters")
      .trim()
      .optional(),
    description: z
      .string()
      .min(1, "Description is required")
      .max(5000, "Description must not exceed 5000 characters")
      .trim()
      .optional(),
    price: z.number().positive("Price must be positive").optional(),
    discountPrice: z
      .number()
      .positive("Discount price must be positive")
      .optional()
      .nullable(),
    images: z.array(imageSchema).optional(),
    stock: z.number().int("Stock must be an integer").min(0, "Stock cannot be negative").optional(),
    sku: z.string().min(1, "SKU is required").trim().toUpperCase().optional(),
    category: objectIdSchema.optional(),
    featured: z.boolean().optional(),
    isActive: z.boolean().optional(),
  }),
});
