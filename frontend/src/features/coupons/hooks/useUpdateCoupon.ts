"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { couponApi } from "../services/coupon.service";
import { COUPONS_KEYS } from "../constants";

export function useUpdateCoupon() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) => couponApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COUPONS_KEYS.LISTS() });
    },
  });
}
