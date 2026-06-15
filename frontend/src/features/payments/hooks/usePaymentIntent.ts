"use client";
import { useMutation } from "@tanstack/react-query";
import { paymentApi } from "../services/payment.service";

export function usePaymentIntent() {
  return useMutation({
    mutationFn: paymentApi.createPaymentIntent,
  });
}
