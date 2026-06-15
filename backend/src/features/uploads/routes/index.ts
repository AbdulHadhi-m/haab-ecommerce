import { Router } from "express";
import { asyncHandler } from "@/shared/utils";
import { validate } from "@/middlewares/validate";
import { protect, authorize } from "@/middlewares/auth";
import { upload } from "@/config/multer";
import { deleteImageSchema } from "../validations";
import { uploadController } from "../controllers";

const router = Router();

router.post(
  "/image",
  protect,
  authorize("admin"),
  upload.single("image"),
  asyncHandler(uploadController.uploadSingle),
);

router.post(
  "/images",
  protect,
  authorize("admin"),
  upload.array("images", 10),
  asyncHandler(uploadController.uploadMultiple),
);

router.delete(
  "/:publicId",
  protect,
  authorize("admin"),
  validate(deleteImageSchema),
  asyncHandler(uploadController.deleteImage),
);

export { router as uploadRoutes };
