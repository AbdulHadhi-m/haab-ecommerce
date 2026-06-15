import apiClient from "@/lib/axios";
import type { Coupon, CreateCouponPayload, UpdateCouponPayload, ValidateCouponPayload, ValidateCouponResult } from "../types";

export const couponApi = {
  validateCoupon: async (payload: ValidateCouponPayload): Promise<ValidateCouponResult> => {
    const { data } = await apiClient.post<{ success: boolean; data: ValidateCouponResult }>("/coupons/validate", payload);
    return data.data;
  },
  getAll: async (page?: number, limit?: number): Promise<{ coupons: Coupon[]; pagination: any }> => {
    const { data } = await apiClient.get("/coupons", { params: { page, limit } });
    return data.data;
  },
  getById: async (id: string): Promise<Coupon> => {
    const { data } = await apiClient.get(`/coupons/${id}`);
    return data.data;
  },
  create: async (payload: CreateCouponPayload): Promise<Coupon> => {
    const { data } = await apiClient.post("/coupons", payload);
    return data.data;
  },
  update: async (id: string, payload: UpdateCouponPayload): Promise<Coupon> => {
    const { data } = await apiClient.put(`/coupons/${id}`, payload);
    return data.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/coupons/${id}`);
  },
};
