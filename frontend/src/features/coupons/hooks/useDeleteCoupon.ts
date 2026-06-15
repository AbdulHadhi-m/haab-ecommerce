"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { couponApi } from "../services/coupon.service";
import { COUPONS_KEYS } from "../constants";

export function useDeleteCoupon() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => couponApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COUPONS_KEYS.LISTS() });
    },
  });
}
