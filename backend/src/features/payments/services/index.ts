import Razorpay from "razorpay";
import Stripe from "stripe";
import crypto from "crypto";
import { config } from "@/config";
import { NotFoundError, BadRequestError } from "@/shared/errors";
import { Order } from "@/features/orders/order.model";
import { CreatePaymentIntentInput, VerifyPaymentInput } from "../interfaces";

let razorpay: Razorpay | null = null;
let stripe: Stripe | null = null;

function getRazorpay(): Razorpay {
  if (!razorpay) {
    razorpay = new Razorpay({
      key_id: config.razorpayKeyId,
      key_secret: config.razorpayKeySecret,
    });
  }
  return razorpay;
}

function getStripe(): Stripe {
  if (!stripe) {
    stripe = new Stripe(config.stripeSecretKey, { apiVersion: "2025-02-24.acacia" });
  }
  return stripe;
}

export const paymentService = {
  async createPaymentIntent(input: CreatePaymentIntentInput & { paymentMethod: "razorpay" | "stripe" }) {
    const order = await Order.findById(input.orderId);
    if (!order) throw new NotFoundError("Order not found");

    if (input.paymentMethod === "razorpay") {
      const razorpayOrder = await getRazorpay().orders.create({
        amount: Math.round(order.pricing.totalAmount * 100),
        currency: input.currency ?? "INR",
        receipt: order.orderNumber,
      });

      return {
        success: true,
        orderId: order._id.toString(),
        razorpayOrderId: razorpayOrder.id,
        transactionId: razorpayOrder.id,
        paymentMethod: "razorpay" as const,
      };
    }

    const paymentIntent = await getStripe().paymentIntents.create({
      amount: Math.round(order.pricing.totalAmount * 100),
      currency: input.currency ?? "usd",
      metadata: { orderId: order._id.toString(), orderNumber: order.orderNumber },
    });

    return {
      success: true,
      orderId: order._id.toString(),
      clientSecret: paymentIntent.client_secret ?? undefined,
      transactionId: paymentIntent.id,
      paymentMethod: "stripe" as const,
    };
  },

  async verifyPayment(input: VerifyPaymentInput) {
    const order = await Order.findById(input.orderId);
    if (!order) throw new NotFoundError("Order not found");

    if (input.paymentMethod === "razorpay") {
      const expectedSignature = crypto
        .createHmac("sha256", config.razorpayKeySecret)
        .update(`${input.razorpayOrderId}|${input.razorpayPaymentId}`)
        .digest("hex");

      if (expectedSignature !== input.razorpaySignature) {
        await Order.findByIdAndUpdate(input.orderId, {
          "payment.status": "failed",
        });
        throw new BadRequestError("Invalid payment signature");
      }

      await Order.findByIdAndUpdate(input.orderId, {
        "payment.status": "paid",
        "payment.transactionId": input.razorpayPaymentId,
      });
    } else {
      const paymentIntent = await getStripe().paymentIntents.retrieve(input.paymentIntentId!);

      if (paymentIntent.status !== "succeeded") {
        await Order.findByIdAndUpdate(input.orderId, {
          "payment.status": "failed",
        });
        throw new BadRequestError("Payment not successful");
      }

      await Order.findByIdAndUpdate(input.orderId, {
        "payment.status": "paid",
        "payment.transactionId": input.paymentIntentId,
      });
    }

    return { success: true, orderId: input.orderId, transactionId: input.transactionId };
  },

  async handleStripeWebhook(payload: Buffer, signature: string): Promise<void> {
    let event;
    try {
      event = getStripe().webhooks.constructEvent(payload, signature, config.stripeWebhookSecret);
    } catch {
      throw new BadRequestError("Invalid webhook signature");
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      await Order.findOneAndUpdate(
        { "payment.transactionId": paymentIntent.id },
        { "payment.status": "paid" },
      );
    }
  },

  async handleRazorpayWebhook(payload: Record<string, unknown>): Promise<void> {
    const event = payload.event as string;
    if (event === "payment.captured") {
      const payloadData = (payload.payload as Record<string, unknown>) ?? {};
      const paymentData = (payloadData.payment as Record<string, unknown>) ?? {};
      const entity = (paymentData.entity as Record<string, unknown>) ?? {};
      const razorpayOrderId = entity.order_id as string;
      const razorpayPaymentId = entity.id as string;

      await Order.findOneAndUpdate(
        { "payment.transactionId": razorpayOrderId },
        { "payment.status": "paid", "payment.transactionId": razorpayPaymentId },
      );
    }
  },
};
