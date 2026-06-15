"use client";

import { BadgeCheck, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useAuthStore } from "@/features/auth/store";
import { StarRating } from "./star-rating";
import type { Review } from "../types";

interface ReviewCardProps {
  review: Review;
  onEdit?: (review: Review) => void;
  onDelete?: (reviewId: string) => void;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function ReviewCard({ review, onEdit, onDelete }: ReviewCardProps) {
  const user = useAuthStore((s) => s.user);
  const isOwner = user?.id === review.user._id;

  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <StarRating value={review.rating} size="sm" readonly />
            <span className="text-sm font-semibold">{review.user.name}</span>
            {review.isVerifiedPurchase && (
              <span className="inline-flex items-center gap-1 text-xs text-green-600">
                <BadgeCheck className="h-3 w-3" />
                Verified Purchase
              </span>
            )}
          </div>

          <p className="text-xs text-brand-400">{formatDate(review.createdAt)}</p>

          {review.title && (
            <p className="text-sm font-semibold">{review.title}</p>
          )}

          {review.comment && (
            <p className="text-sm text-brand-600">{review.comment}</p>
          )}
        </div>

        {isOwner && (
          <div className="flex shrink-0 gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEdit?.(review)}
            >
              <Pencil className="h-3.5 w-3.5" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500 hover:text-red-600"
              onClick={() => onDelete?.(review._id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
