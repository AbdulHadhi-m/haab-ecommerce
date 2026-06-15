import apiClient from "@/lib/axios";
import type { Coupon, CreateCouponPayload, UpdateCouponPayload, ValidateCouponPayload, ValidateCouponResult } from "../types";

export const couponApi = {
  validateCoupon: async (payload: ValidateCouponPayload): Promise<ValidateCouponResult> => {
    const { data } = await apiClient.post<ValidateCouponResult>("/coupons/validate", payload);
    return data;
  },
  getAll: async (page?: number, limit?: number): Promise<{ coupons: Coupon[]; total: number; page: number; totalPages: number }> => {
    const { data } = await apiClient.get<{ coupons: Coupon[]; total: number; page: number; totalPages: number }>("/coupons", { params: { page, limit } });
    return data;
  },
  getById: async (id: string): Promise<Coupon> => {
    const { data } = await apiClient.get<Coupon>(`/coupons/${id}`);
    return data;
  },
  create: async (payload: CreateCouponPayload): Promise<Coupon> => {
    const { data } = await apiClient.post<Coupon>("/coupons", payload);
    return data;
  },
  update: async (id: string, payload: UpdateCouponPayload): Promise<Coupon> => {
    const { data } = await apiClient.put<Coupon>(`/coupons/${id}`, payload);
    return data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/coupons/${id}`);
  },
};
