import { Router, Request, Response } from "express";
import { authRoutes } from "@/features/auth/routes";
import { categoryRoutes } from "@/features/categories/routes";
import { productRoutes } from "@/features/products/routes";
import { uploadRoutes } from "@/features/uploads/routes";

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

export { router as routes };
