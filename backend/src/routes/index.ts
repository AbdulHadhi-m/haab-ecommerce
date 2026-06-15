import { Router, Request, Response } from "express";
import { authRoutes } from "@/features/auth/routes";
import { categoryRoutes } from "@/features/categories/routes";
import { productRoutes } from "@/features/products/routes";
import { uploadRoutes } from "@/features/uploads/routes";
import { orderRoutes } from "@/features/orders/routes";
import { adminRoutes } from "@/features/admin/routes";
import { paymentRoutes } from "@/features/payments/routes";
import { reviewRoutes } from "@/features/reviews/routes";
import { userRoutes } from "@/features/user/routes";
import { couponRoutes } from "@/features/coupons/routes";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/uploads", uploadRoutes);
router.use("/orders", orderRoutes);
router.use("/admin", adminRoutes);
router.use("/reviews", reviewRoutes);
router.use("/users", userRoutes);
router.use("/coupons", couponRoutes);
router.use("/payments", paymentRoutes);

export { router as routes };
