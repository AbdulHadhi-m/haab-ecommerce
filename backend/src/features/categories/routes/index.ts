import { Router } from "express";
import { asyncHandler } from "@/shared/utils";
import { validate } from "@/middlewares/validate";
import { protect, authorize } from "@/middlewares/auth";
import { createCategorySchema, updateCategorySchema } from "../validations";
import { categoryController } from "../controllers";

const router = Router();

router.get("/", asyncHandler(categoryController.getAll));
router.get("/:slug", asyncHandler(categoryController.getBySlug));

router.post(
  "/",
  protect,
  authorize("admin"),
  validate(createCategorySchema),
  asyncHandler(categoryController.create),
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  validate(updateCategorySchema),
  asyncHandler(categoryController.update),
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  asyncHandler(categoryController.delete),
);

export { router as categoryRoutes };
