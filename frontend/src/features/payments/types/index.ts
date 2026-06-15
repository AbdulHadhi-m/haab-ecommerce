export interface CreatePaymentIntentPayload {
  orderId: string;
  paymentMethod: "razorpay" | "stripe";
}

export interface PaymentIntentResult {
  success: boolean;
  orderId: string;
  razorpayOrderId?: string;
  clientSecret?: string;
  transactionId?: string;
  paymentMethod: "razorpay" | "stripe";
}

export interface VerifyPaymentPayload {
  orderId: string;
  paymentMethod: "razorpay" | "stripe";
  transactionId: string;
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  razorpaySignature?: string;
  paymentIntentId?: string;
}

export type PaymentGateway = "razorpay" | "stripe";
