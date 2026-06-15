import { z } from "zod";

const objectIdRegex = /^[a-fA-F0-9]{24}$/;

export const createCouponSchema = z.object({
  body: z.object({
    code: z
      .string()
      .min(1, "Coupon code is required")
      .max(20, "Coupon code must not exceed 20 characters")
      .trim()
      .transform((v) => v.toUpperCase()),
    discountType: z.enum(["percentage", "fixed"]),
    discountValue: z.number().positive("Discount value must be a positive number"),
    minimumOrderAmount: z.number().min(0).optional().default(0),
    maxDiscountAmount: z.number().min(0).optional(),
    usageLimit: z.number().int("Usage limit must be an integer").positive("Usage limit must be a positive number").optional(),
    isActive: z.boolean().optional().default(true),
    expiresAt: z.string().datetime("Invalid date format").optional(),
    description: z.string().trim().optional(),
  }),
});

export const updateCouponSchema = z.object({
  body: z.object({
    code: z
      .string()
      .min(1, "Coupon code is required")
      .max(20, "Coupon code must not exceed 20 characters")
      .trim()
      .transform((v) => v.toUpperCase())
      .optional(),
    discountType: z.enum(["percentage", "fixed"]).optional(),
    discountValue: z.number().positive("Discount value must be a positive number").optional(),
    minimumOrderAmount: z.number().min(0).optional(),
    maxDiscountAmount: z.number().min(0).optional(),
    usageLimit: z.number().int("Usage limit must be an integer").positive("Usage limit must be a positive number").optional(),
    isActive: z.boolean().optional(),
    expiresAt: z.string().datetime("Invalid date format").optional(),
    description: z.string().trim().optional(),
  }),
});

export const validateCouponSchema = z.object({
  body: z.object({
    code: z
      .string()
      .min(1, "Coupon code is required")
      .trim(),
    orderTotal: z.number().positive("Order total must be a positive number"),
  }),
});

export const couponIdParams = z.object({
  params: z.object({
    couponId: z.string().regex(objectIdRegex, "Invalid coupon ID format"),
  }),
});
