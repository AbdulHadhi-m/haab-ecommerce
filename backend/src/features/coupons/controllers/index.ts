import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { couponService } from "../services";

export const couponController = {
  async create(req: Request, res: Response) {
    const coupon = await couponService.create(req.body);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Coupon created successfully",
      data: coupon,
    });
  },

  async getAll(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const result = await couponService.getAll(page, limit);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Coupons fetched successfully",
      data: result,
    });
  },

  async getById(req: Request, res: Response) {
    const couponId = req.params.couponId as string;
    const coupon = await couponService.getById(couponId);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Coupon fetched successfully",
      data: coupon,
    });
  },

  async update(req: Request, res: Response) {
    const couponId = req.params.couponId as string;
    const coupon = await couponService.update(couponId, req.body);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Coupon updated successfully",
      data: coupon,
    });
  },

  async delete(req: Request, res: Response) {
    const couponId = req.params.couponId as string;
    await couponService.delete(couponId);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Coupon deleted successfully",
    });
  },

  async validateCoupon(req: Request, res: Response) {
    const { code, orderTotal } = req.body;

    const result = await couponService.validateCoupon(code, orderTotal);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Coupon is valid",
      data: result,
    });
  },
};
