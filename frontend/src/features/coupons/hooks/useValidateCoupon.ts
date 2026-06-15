"use client";
import { useMutation } from "@tanstack/react-query";
import { couponApi } from "../services/coupon.service";

export function useValidateCoupon() {
  return useMutation({
    mutationFn: couponApi.validateCoupon,
  });
}
