import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { paymentService } from "../services";

export const paymentController = {
  async createPaymentIntent(req: Request, res: Response) {
    const { orderId, paymentMethod } = req.body;
    const result = await paymentService.createPaymentIntent({
      orderId,
      paymentMethod,
      amount: 0,
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Payment intent created successfully",
      data: result,
    });
  },

  async verifyPayment(req: Request, res: Response) {
    const result = await paymentService.verifyPayment(req.body);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Payment verified successfully",
      data: result,
    });
  },

  async stripeWebhook(req: Request, res: Response) {
    const payload = req.body as Buffer;
    const signature = req.headers["stripe-signature"] as string;
    await paymentService.handleStripeWebhook(payload, signature);

    res.status(StatusCodes.OK).json({ received: true });
  },

  async razorpayWebhook(req: Request, res: Response) {
    const payload = req.body as Record<string, unknown>;
    await paymentService.handleRazorpayWebhook(payload);

    res.status(StatusCodes.OK).json({ received: true });
  },
};
