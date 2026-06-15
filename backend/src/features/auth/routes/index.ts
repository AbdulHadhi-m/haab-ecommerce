import { Router } from "express";
import { asyncHandler } from "@/shared/utils";
import { validate } from "@/middlewares/validate";
import { protect } from "@/middlewares/auth";
import { registerSchema, loginSchema } from "../validations";
import { authController } from "../controllers";

const router = Router();

router.post("/register", validate(registerSchema), asyncHandler(authController.register));
router.post("/login", validate(loginSchema), asyncHandler(authController.login));
router.post("/logout", asyncHandler(authController.logout));
router.post("/refresh-token", asyncHandler(authController.refreshToken));
router.get("/me", protect, asyncHandler(authController.getMe));

export { router as authRoutes };
