export interface CreateCouponInput {
  code: string;
  description?: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minimumOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  isActive?: boolean;
  expiresAt?: Date;
}

export interface UpdateCouponInput {
  code?: string;
  description?: string;
  discountType?: "percentage" | "fixed";
  discountValue?: number;
  minimumOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  isActive?: boolean;
  expiresAt?: Date;
}

export interface ValidateCouponInput {
  code: string;
  orderTotal: number;
}
