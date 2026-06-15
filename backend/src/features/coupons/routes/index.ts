import { Router } from "express";
import { asyncHandler } from "@/shared/utils";
import { validate } from "@/middlewares/validate";
import { protect, authorize } from "@/middlewares/auth";
import {
  createCouponSchema,
  updateCouponSchema,
  validateCouponSchema,
  couponIdParams,
} from "../validations";
import { couponController } from "../controllers";

const router = Router();

router.post(
  "/validate",
  protect,
  validate(validateCouponSchema),
  asyncHandler(couponController.validateCoupon),
);

router.get(
  "/",
  protect,
  authorize("admin"),
  asyncHandler(couponController.getAll),
);

router.get(
  "/:couponId",
  protect,
  authorize("admin"),
  validate(couponIdParams),
  asyncHandler(couponController.getById),
);

router.post(
  "/",
  protect,
  authorize("admin"),
  validate(createCouponSchema),
  asyncHandler(couponController.create),
);

router.put(
  "/:couponId",
  protect,
  authorize("admin"),
  validate(updateCouponSchema),
  asyncHandler(couponController.update),
);

router.delete(
  "/:couponId",
  protect,
  authorize("admin"),
  validate(couponIdParams),
  asyncHandler(couponController.delete),
);

export { router as couponRoutes };
