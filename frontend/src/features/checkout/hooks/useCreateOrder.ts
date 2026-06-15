"use client";

import { useMutation } from "@tanstack/react-query";
import { checkoutApi } from "../services/checkout.service";
import type { CreateOrderPayload } from "../types";

export function useCreateOrder() {
  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => checkoutApi.createOrder(payload),
  });
}
