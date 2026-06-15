import { Review } from "../review.model";
import { IReview } from "../interfaces";
import { CreateReviewInput, UpdateReviewInput } from "../types";
import { Types } from "mongoose";

export const reviewRepository = {
  async create(data: CreateReviewInput & { user: string }): Promise<IReview> {
    return Review.create(data);
  },

  async findById(id: string): Promise<IReview | null> {
    return Review.findById(id).populate("user", "name");
  },

  async findByProduct(
    productId: string,
    page: number,
    limit: number,
    sort: Record<string, 1 | -1>,
  ): Promise<{ reviews: IReview[]; total: number }> {
    const [reviews, total] = await Promise.all([
      Review.find({ product: productId })
        .populate("user", "name")
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit),
      Review.countDocuments({ product: productId }),
    ]);

    return { reviews, total };
  },

  async findByUserAndProduct(userId: string, productId: string): Promise<IReview | null> {
    return Review.findOne({ user: userId, product: productId });
  },

  async findByUser(
    userId: string,
    page: number,
    limit: number,
  ): Promise<{ reviews: IReview[]; total: number }> {
    const [reviews, total] = await Promise.all([
      Review.find({ user: userId })
        .populate("product", "name images")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Review.countDocuments({ user: userId }),
    ]);

    return { reviews, total };
  },

  async update(id: string, data: UpdateReviewInput): Promise<IReview | null> {
    return Review.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  },

  async delete(id: string): Promise<IReview | null> {
    return Review.findByIdAndDelete(id);
  },

  async getAverageRating(productId: string): Promise<{ average: number; count: number }> {
    const result = await Review.aggregate([
      { $match: { product: new Types.ObjectId(productId) } },
      { $group: { _id: "$product", average: { $avg: "$rating" }, count: { $sum: 1 } } },
    ]);

    if (result.length === 0) {
      return { average: 0, count: 0 };
    }

    return {
      average: Math.round(result[0].average * 10) / 10,
      count: result[0].count,
    };
  },
};
