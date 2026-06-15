export interface CreatePaymentIntentInput {
  orderId: string;
  amount: number;
  currency?: string;
}

export interface PaymentIntentResult {
  success: boolean;
  orderId: string;
  transactionId?: string;
  razorpayOrderId?: string;
  clientSecret?: string;
  paymentMethod: "razorpay" | "stripe";
}

export interface VerifyPaymentInput {
  orderId: string;
  paymentMethod: "razorpay" | "stripe";
  transactionId: string;
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  razorpaySignature?: string;
  paymentIntentId?: string;
}
