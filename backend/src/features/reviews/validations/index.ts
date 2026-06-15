import { z } from "zod";
import { Types } from "mongoose";

const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid MongoDB ObjectId",
});

export const createReviewSchema = z.object({
  body: z.object({
    productId: objectIdSchema,
    rating: z
      .number()
      .int("Rating must be an integer")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot exceed 5"),
    title: z.string().max(100, "Title must not exceed 100 characters").optional(),
    comment: z.string().max(1000, "Comment must not exceed 1000 characters").optional(),
  }),
});

export const updateReviewSchema = z.object({
  body: z.object({
    rating: z
      .number()
      .int("Rating must be an integer")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot exceed 5")
      .optional(),
    title: z.string().max(100, "Title must not exceed 100 characters").optional(),
    comment: z.string().max(1000, "Comment must not exceed 1000 characters").optional(),
  }),
});

export const reviewParamsSchema = z.object({
  params: z.object({
    reviewId: objectIdSchema,
  }),
});
