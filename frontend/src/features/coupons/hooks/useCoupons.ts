"use client";
import { useQuery } from "@tanstack/react-query";
import { couponApi } from "../services/coupon.service";
import { COUPONS_KEYS } from "../constants";

export function useCoupons(page?: number, limit?: number) {
  return useQuery({
    queryKey: [...COUPONS_KEYS.LISTS(), page, limit],
    queryFn: () => couponApi.getAll(page, limit),
  });
}
