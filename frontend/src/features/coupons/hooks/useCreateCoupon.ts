"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { couponApi } from "../services/coupon.service";
import { COUPONS_KEYS } from "../constants";

export function useCreateCoupon() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: couponApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COUPONS_KEYS.LISTS() });
    },
  });
}
