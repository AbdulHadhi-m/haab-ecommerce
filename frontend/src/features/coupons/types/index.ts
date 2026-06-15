export interface Coupon {
  _id: string;
  code: string;
  description?: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minimumOrderAmount: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ValidateCouponPayload {
  code: string;
  orderTotal: number;
}

export interface ValidateCouponResult {
  valid: boolean;
  coupon: Coupon;
  discount: number;
}

export interface CreateCouponPayload {
  code: string;
  description?: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minimumOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  isActive?: boolean;
  expiresAt?: string;
}

export type UpdateCouponPayload = Partial<CreateCouponPayload>;
