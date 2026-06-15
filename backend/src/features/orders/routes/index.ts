import { Router } from "express";
import { asyncHandler } from "@/shared/utils";
import { validate } from "@/middlewares/validate";
import { protect, authorize } from "@/middlewares/auth";
import { createOrderSchema, updateOrderStatusSchema } from "../validations";
import { orderController } from "../controllers";

const router = Router();

router.post(
  "/",
  protect,
  validate(createOrderSchema),
  asyncHandler(orderController.create),
);

router.get(
  "/my-orders",
  protect,
  asyncHandler(orderController.getMyOrders),
);

router.get(
  "/:id",
  protect,
  asyncHandler(orderController.getById),
);

router.patch(
  "/:id/status",
  protect,
  authorize("admin"),
  validate(updateOrderStatusSchema),
  asyncHandler(orderController.updateStatus),
);

router.get(
  "/admin/all",
  protect,
  authorize("admin"),
  asyncHandler(orderController.getAllOrders),
);

export { router as orderRoutes };
