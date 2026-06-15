import { reviewRepository } from "../repositories";
import { Product } from "@/features/products/product.model";
import { NotFoundError, BadRequestError, ForbiddenError } from "@/shared/errors";
import { CreateReviewInput, UpdateReviewInput, ReviewQueryParams, PaginatedReviewResult } from "../types";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

export const reviewService = {
  async create(userId: string, input: CreateReviewInput) {
    const product = await Product.findById(input.productId);
    if (!product) {
      throw new NotFoundError("Product not found");
    }

    const existing = await reviewRepository.findByUserAndProduct(userId, input.productId);
    if (existing) {
      throw new BadRequestError("You have already reviewed this product");
    }

    const review = await reviewRepository.create({ ...input, user: userId });

    const ratings = await reviewRepository.getAverageRating(input.productId);
    await Product.findByIdAndUpdate(input.productId, { ratings });

    return review;
  },

  async update(userId: string, reviewId: string, input: UpdateReviewInput) {
    const review = await reviewRepository.findById(reviewId);
    if (!review) {
      throw new NotFoundError("Review not found");
    }

    if (review.user.toString() !== userId) {
      throw new ForbiddenError("You can only update your own reviews");
    }

    const updated = await reviewRepository.update(reviewId, input);
    if (!updated) {
      throw new NotFoundError("Review not found");
    }

    const ratings = await reviewRepository.getAverageRating(review.product.toString());
    await Product.findByIdAndUpdate(review.product, { ratings });

    return updated;
  },

  async delete(userId: string, reviewId: string, userRole: string) {
    const review = await reviewRepository.findById(reviewId);
    if (!review) {
      throw new NotFoundError("Review not found");
    }

    if (userRole !== "admin" && review.user.toString() !== userId) {
      throw new ForbiddenError("You can only delete your own reviews");
    }

    await reviewRepository.delete(reviewId);

    const ratings = await reviewRepository.getAverageRating(review.product.toString());
    await Product.findByIdAndUpdate(review.product, { ratings });
  },

  async getProductReviews(productId: string, query: ReviewQueryParams): Promise<PaginatedReviewResult> {
    const product = await Product.findById(productId);
    if (!product) {
      throw new NotFoundError("Product not found");
    }

    const page = Math.max(1, parseInt(query.page ?? String(DEFAULT_PAGE), 10) || DEFAULT_PAGE);
    const limit = Math.min(
      MAX_LIMIT,
      Math.max(1, parseInt(query.limit ?? String(DEFAULT_LIMIT), 10) || DEFAULT_LIMIT),
    );
    const sort: Record<string, 1 | -1> = { createdAt: -1 };

    if (query.sort) {
      const sortField = query.sort.startsWith("-") ? query.sort.slice(1) : query.sort;
      const sortOrder = query.sort.startsWith("-") ? -1 : 1;
      const allowedFields = ["createdAt", "rating"];
      if (allowedFields.includes(sortField)) {
        delete sort.createdAt;
        sort[sortField] = sortOrder;
      }
    }

    const { reviews, total } = await reviewRepository.findByProduct(productId, page, limit, sort);
    const totalPages = Math.ceil(total / limit);

    return {
      reviews,
      pagination: { page, limit, total, totalPages },
    };
  },

  async getMyReviews(userId: string, query: ReviewQueryParams): Promise<PaginatedReviewResult> {
    const page = Math.max(1, parseInt(query.page ?? String(DEFAULT_PAGE), 10) || DEFAULT_PAGE);
    const limit = Math.min(
      MAX_LIMIT,
      Math.max(1, parseInt(query.limit ?? String(DEFAULT_LIMIT), 10) || DEFAULT_LIMIT),
    );

    const { reviews, total } = await reviewRepository.findByUser(userId, page, limit);
    const totalPages = Math.ceil(total / limit);

    return {
      reviews,
      pagination: { page, limit, total, totalPages },
    };
  },
};
