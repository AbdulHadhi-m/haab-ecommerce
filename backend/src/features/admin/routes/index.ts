import { Router } from "express";
import { asyncHandler } from "@/shared/utils";
import { protect, authorize } from "@/middlewares/auth";
import { adminController } from "../controllers";

const router = Router();

router.use(protect, authorize("admin"));

router.get("/dashboard", asyncHandler(adminController.getDashboard));
router.get("/customers", asyncHandler(adminController.getCustomers));

export { router as adminRoutes };
