"use client";

import { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { EmptyState } from "@/shared/components/elements/empty-state";
import { LoadingSpinner } from "@/shared/components/elements/loading-spinner";
import { useAuthStore } from "@/features/auth/store";
import { useProductReviews, useCreateReview, useUpdateReview, useDeleteReview } from "../hooks";
import { REVIEW_SORT_OPTIONS } from "../constants";
import { StarRating } from "./star-rating";
import { ReviewCard } from "./review-card";
import { ReviewForm, type ReviewFormValues } from "./review-form";
import type { Review, CreateReviewPayload } from "../types";

interface ReviewListProps {
  productId: string;
  averageRating: number;
  totalReviews: number;
}

export function ReviewList({ productId, averageRating, totalReviews }: ReviewListProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [sort, setSort] = useState<string>("-createdAt");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const { data, isLoading } = useProductReviews(productId, { page, limit: 5, sort });
  const createReview = useCreateReview();
  const updateReview = useUpdateReview();
  const deleteReview = useDeleteReview();

  const reviews = data?.reviews ?? [];
  const pagination = data?.pagination;

  function handleCreate(values: ReviewFormValues) {
      createReview.mutate(
      { productId, ...values } as CreateReviewPayload,
      {
        onSuccess: () => {
          setShowForm(false);
        },
      },
    );
  }

  function handleUpdate(values: ReviewFormValues) {
    if (!editingReview) return;
    updateReview.mutate(
      { reviewId: editingReview._id, payload: values },
      {
        onSuccess: () => {
          setEditingReview(null);
        },
      },
    );
  }

  function handleDelete(reviewId: string) {
    if (window.confirm("Are you sure you want to delete this review?")) {
      deleteReview.mutate(reviewId);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <StarRating value={Math.round(averageRating)} size="md" readonly />
            <span className="text-lg font-bold">{averageRating.toFixed(1)}</span>
          </div>
          <span className="text-sm text-brand-400">
            ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
          </span>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="h-9 rounded-none border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {REVIEW_SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {isAuthenticated && !showForm && !editingReview && (
            <Button
              variant="black"
              size="sm"
              className="uppercase tracking-widest"
              onClick={() => setShowForm(true)}
            >
              Write a Review
            </Button>
          )}
        </div>
      </div>

      {showForm && (
        <div className="rounded-lg border border-border p-4">
          <h4 className="mb-4 text-sm font-semibold">Write a Review</h4>
          <ReviewForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
            isSubmitting={createReview.isPending}
          />
        </div>
      )}

      {editingReview && (
        <div className="rounded-lg border border-border p-4">
          <h4 className="mb-4 text-sm font-semibold">Edit Your Review</h4>
          <ReviewForm
            defaultValues={{
              rating: editingReview.rating,
              title: editingReview.title,
              comment: editingReview.comment,
            }}
            onSubmit={handleUpdate}
            onCancel={() => setEditingReview(null)}
            isSubmitting={updateReview.isPending}
            submitLabel="Update Review"
          />
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : reviews.length === 0 ? (
        <EmptyState
          icon={<MessageSquare className="h-12 w-12" />}
          title="No reviews yet"
          description="Be the first to share your thoughts on this product."
        />
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              onEdit={setEditingReview}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <span className="text-sm text-brand-500">
            Page {pagination.page} of {pagination.pages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= pagination.pages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
