"use client";
import { useQuery } from "@tanstack/react-query";
import { couponApi } from "../services/coupon.service";
import { COUPONS_KEYS } from "../constants";

export function useCoupon(id: string) {
  return useQuery({
    queryKey: COUPONS_KEYS.DETAIL(id),
    queryFn: () => couponApi.getById(id),
    enabled: !!id,
  });
}
