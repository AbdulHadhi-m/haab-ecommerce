"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { checkoutApi } from "../services/checkout.service";
import { useCartStore } from "@/features/cart/store";
import type { CreateOrderPayload } from "../types";

export function useCreateOrder() {
  const router = useRouter();
  const clearCart = useCartStore((s) => s.clearCart);

  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => checkoutApi.createOrder(payload),
    onSuccess: (response) => {
      clearCart();
      toast.success("Order placed!", {
        description: "Your order has been placed successfully.",
      });
      router.push(`/order-success/${response.data._id}`);
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to place order. Please try again.";
      toast.error("Order failed", { description: message });
    },
  });
}
