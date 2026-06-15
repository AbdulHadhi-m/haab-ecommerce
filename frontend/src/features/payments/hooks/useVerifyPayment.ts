"use client";
import { useMutation } from "@tanstack/react-query";
import { paymentApi } from "../services/payment.service";

export function useVerifyPayment() {
  return useMutation({
    mutationFn: paymentApi.verifyPayment,
  });
}
