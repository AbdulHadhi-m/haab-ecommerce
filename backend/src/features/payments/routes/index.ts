import { Router } from "express";
import express from "express";
import { asyncHandler } from "@/shared/utils";
import { validate } from "@/middlewares/validate";
import { protect } from "@/middlewares/auth";
import { createPaymentIntentSchema, verifyPaymentSchema } from "../validations";
import { paymentController } from "../controllers";

const router = Router();

router.post(
  "/create-payment-intent",
  protect,
  validate(createPaymentIntentSchema),
  asyncHandler(paymentController.createPaymentIntent),
);

router.post(
  "/verify",
  protect,
  validate(verifyPaymentSchema),
  asyncHandler(paymentController.verifyPayment),
);

router.post(
  "/stripe-webhook",
  express.raw({ type: "application/json" }),
  asyncHandler(paymentController.stripeWebhook),
);

router.post(
  "/razorpay-webhook",
  express.json(),
  asyncHandler(paymentController.razorpayWebhook),
);

export { router as paymentRoutes };
