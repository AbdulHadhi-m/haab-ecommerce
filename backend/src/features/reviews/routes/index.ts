import { Router } from "express";
import { asyncHandler } from "@/shared/utils";
import { validate } from "@/middlewares/validate";
import { protect } from "@/middlewares/auth";
import { createReviewSchema, updateReviewSchema, reviewParamsSchema } from "../validations";
import { reviewController } from "../controllers";

const router = Router();

router.get(
  "/products/:productId",
  asyncHandler(reviewController.getProductReviews),
);

router.post(
  "/",
  protect,
  validate(createReviewSchema),
  asyncHandler(reviewController.create),
);

router.put(
  "/:reviewId",
  protect,
  validate(updateReviewSchema),
  validate(reviewParamsSchema),
  asyncHandler(reviewController.update),
);

router.delete(
  "/:reviewId",
  protect,
  validate(reviewParamsSchema),
  asyncHandler(reviewController.delete),
);

router.get(
  "/my-reviews",
  protect,
  asyncHandler(reviewController.getMyReviews),
);

export { router as reviewRoutes };
