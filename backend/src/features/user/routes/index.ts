import { Router } from "express";
import { protect } from "@/middlewares/auth";
import { validate } from "@/middlewares/validate";
import { userController } from "../controllers";
import { updateProfileSchema, changePasswordSchema, addAddressSchema, updateAddressSchema } from "../validations";

const router = Router();

router.use(protect);

router.get("/profile", userController.getProfile);
router.put("/profile", validate(updateProfileSchema), userController.updateProfile);
router.put("/password", validate(changePasswordSchema), userController.changePassword);

router.get("/addresses", userController.getProfile);

router.post("/addresses", validate(addAddressSchema), userController.addAddress);
router.put("/addresses/:addressId", validate(updateAddressSchema), userController.updateAddress);
router.delete("/addresses/:addressId", userController.removeAddress);
router.put("/addresses/:addressId/default", userController.setDefaultAddress);

export { router as userRoutes };
