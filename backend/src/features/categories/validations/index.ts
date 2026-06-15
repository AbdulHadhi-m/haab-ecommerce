import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must not exceed 50 characters")
      .trim(),
    description: z
      .string()
      .max(500, "Description must not exceed 500 characters")
      .trim()
      .optional()
      .default(""),
    image: z.string().url("Image must be a valid URL").optional().or(z.literal("")),
    isActive: z.boolean().optional().default(true),
  }),
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must not exceed 50 characters")
      .trim()
      .optional(),
    description: z
      .string()
      .max(500, "Description must not exceed 500 characters")
      .trim()
      .optional(),
    image: z.string().url("Image must be a valid URL").optional().or(z.literal("")),
    isActive: z.boolean().optional(),
  }),
});
