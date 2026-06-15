import { Coupon } from "../coupon.model";
import { ICoupon } from "../interfaces";
import { CreateCouponInput, UpdateCouponInput } from "../types";

export const couponRepository = {
  async create(input: CreateCouponInput): Promise<ICoupon> {
    return Coupon.create(input);
  },

  async findById(id: string): Promise<ICoupon | null> {
    return Coupon.findById(id);
  },

  async findByCode(code: string): Promise<ICoupon | null> {
    return Coupon.findOne({ code: code.toUpperCase() });
  },

  async findAll(page: number = 1, limit: number = 10): Promise<{ coupons: ICoupon[]; total: number; page: number; totalPages: number }> {
    const skip = (page - 1) * limit;
    const [coupons, total] = await Promise.all([
      Coupon.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Coupon.countDocuments(),
    ]);
    return {
      coupons,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  },

  async update(id: string, input: UpdateCouponInput): Promise<ICoupon | null> {
    return Coupon.findByIdAndUpdate(id, input, { new: true, runValidators: true });
  },

  async delete(id: string): Promise<ICoupon | null> {
    return Coupon.findByIdAndDelete(id);
  },

  async incrementUsage(id: string): Promise<void> {
    await Coupon.updateOne({ _id: id }, { $inc: { usedCount: 1 } });
  },
};
