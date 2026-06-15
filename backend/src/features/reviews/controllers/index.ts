import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { reviewService } from "../services";

export const reviewController = {
  async create(req: Request, res: Response) {
    const userId = req.user!.id;
    const review = await reviewService.create(userId, req.body);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  },

  async update(req: Request, res: Response) {
    const userId = req.user!.id;
    const reviewId = req.params.reviewId as string;
    const review = await reviewService.update(userId, reviewId, req.body);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  },

  async delete(req: Request, res: Response) {
    const userId = req.user!.id;
    const reviewId = req.params.reviewId as string;
    const userRole = req.user!.role;
    await reviewService.delete(userId, reviewId, userRole);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Review deleted successfully",
    });
  },

  async getProductReviews(req: Request, res: Response) {
    const productId = req.params.productId as string;
    const result = await reviewService.getProductReviews(productId, req.query as Record<string, string>);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Reviews fetched successfully",
      data: result.reviews,
      pagination: result.pagination,
    });
  },

  async getMyReviews(req: Request, res: Response) {
    const userId = req.user!.id;
    const result = await reviewService.getMyReviews(userId, req.query as Record<string, string>);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "My reviews fetched successfully",
      data: result.reviews,
      pagination: result.pagination,
    });
  },
};
