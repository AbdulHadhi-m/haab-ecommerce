import { z } from "zod";
import { Types } from "mongoose";

const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid order ID",
});

export const createPaymentIntentSchema = z.object({
  body: z.object({
    orderId: objectIdSchema,
    paymentMethod: z.enum(["razorpay", "stripe"], {
      errorMap: () => ({ message: "Invalid payment method" }),
    }),
  }),
});

export const verifyPaymentSchema = z.object({
  body: z.object({
    orderId: objectIdSchema,
    paymentMethod: z.enum(["razorpay", "stripe"], {
      errorMap: () => ({ message: "Invalid payment method" }),
    }),
    transactionId: z.string().min(1, "Transaction ID is required"),
    razorpayPaymentId: z.string().optional(),
    razorpayOrderId: z.string().optional(),
    razorpaySignature: z.string().optional(),
    paymentIntentId: z.string().optional(),
  }),
});
