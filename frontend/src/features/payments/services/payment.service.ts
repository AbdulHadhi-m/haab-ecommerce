import apiClient from "@/lib/axios";
import type { CreatePaymentIntentPayload, PaymentIntentResult, VerifyPaymentPayload } from "../types";

export const paymentApi = {
  createPaymentIntent: async (payload: CreatePaymentIntentPayload): Promise<PaymentIntentResult> => {
    const { data } = await apiClient.post<{ success: boolean; data: PaymentIntentResult }>(
      "/payments/create-payment-intent",
      payload,
    );
    return data.data;
  },
  verifyPayment: async (payload: VerifyPaymentPayload): Promise<void> => {
    await apiClient.post("/payments/verify", payload);
  },
};
