import { couponRepository } from "../repositories";
import { BadRequestError, NotFoundError } from "@/shared/errors";
import { CreateCouponInput, UpdateCouponInput } from "../types";

export const couponService = {
  async create(input: CreateCouponInput) {
    const existing = await couponRepository.findByCode(input.code);
    if (existing) {
      throw new BadRequestError("A coupon with this code already exists");
    }

    const coupon = await couponRepository.create(input);
    return coupon;
  },

  async update(id: string, input: UpdateCouponInput) {
    const coupon = await couponRepository.findById(id);
    if (!coupon) {
      throw new NotFoundError("Coupon not found");
    }

    if (input.code) {
      const duplicate = await couponRepository.findByCode(input.code);
      if (duplicate && duplicate._id.toString() !== id) {
        throw new BadRequestError("A coupon with this code already exists");
      }
    }

    const updated = await couponRepository.update(id, input);
    if (!updated) {
      throw new NotFoundError("Coupon not found");
    }
    return updated;
  },

  async delete(id: string) {
    const coupon = await couponRepository.findById(id);
    if (!coupon) {
      throw new NotFoundError("Coupon not found");
    }

    await couponRepository.delete(id);
  },

  async getAll(page: number, limit: number) {
    return couponRepository.findAll(page, limit);
  },

  async getById(id: string) {
    const coupon = await couponRepository.findById(id);
    if (!coupon) {
      throw new NotFoundError("Coupon not found");
    }
    return coupon;
  },

  async validateCoupon(code: string, orderTotal: number) {
    const coupon = await couponRepository.findByCode(code);
    if (!coupon) {
      throw new NotFoundError("Coupon not found");
    }

    if (!coupon.isActive) {
      throw new BadRequestError("Coupon is not active");
    }

    if (coupon.expiresAt && new Date() > coupon.expiresAt) {
      throw new BadRequestError("Coupon has expired");
    }

    const usageLimit = coupon.usageLimit ?? null;
    if (usageLimit !== null && coupon.usedCount >= usageLimit) {
      throw new BadRequestError("Coupon usage limit has been reached");
    }

    if (orderTotal < coupon.minimumOrderAmount) {
      throw new BadRequestError(
        `Minimum order amount of ${coupon.minimumOrderAmount} is required to use this coupon`,
      );
    }

    let discount: number;
    if (coupon.discountType === "percentage") {
      discount = (orderTotal * coupon.discountValue) / 100;
      const maxDiscount = coupon.maxDiscountAmount ?? null;
      if (maxDiscount !== null && discount > maxDiscount) {
        discount = maxDiscount;
      }
    } else {
      discount = Math.min(coupon.discountValue, orderTotal);
    }

    return { valid: true, coupon, discount };
  },
};
