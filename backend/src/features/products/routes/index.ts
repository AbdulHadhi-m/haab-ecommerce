import { Router } from "express";
import { asyncHandler } from "@/shared/utils";
import { validate } from "@/middlewares/validate";
import { protect, authorize } from "@/middlewares/auth";
import { createProductSchema, updateProductSchema } from "../validations";
import { productController } from "../controllers";

const router = Router();

router.get("/", asyncHandler(productController.getAll));
router.get("/:slug", asyncHandler(productController.getBySlug));

router.post(
  "/",
  protect,
  authorize("admin"),
  validate(createProductSchema),
  asyncHandler(productController.create),
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  validate(updateProductSchema),
  asyncHandler(productController.update),
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  asyncHandler(productController.delete),
);

export { router as productRoutes };
