"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { StarRating } from "./star-rating";

export const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  title: z.string().max(100).optional(),
  comment: z.string().max(1000).optional(),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  defaultValues?: Partial<ReviewFormValues>;
  onSubmit: (values: ReviewFormValues) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function ReviewForm({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = "Submit Review",
}: ReviewFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      title: "",
      comment: "",
      ...defaultValues,
    },
  });

  const rating = watch("rating");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-semibold uppercase tracking-widest text-brand-500">
          Rating
        </label>
        <div>
          <StarRating
            value={rating}
            onChange={(v) => setValue("rating", v, { shouldValidate: true })}
            size="lg"
          />
        </div>
        {errors.rating && (
          <p className="text-xs text-red-500">{errors.rating.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label
          htmlFor="review-title"
          className="text-xs font-semibold uppercase tracking-widest text-brand-500"
        >
          Title (optional)
        </label>
        <Input
          id="review-title"
          placeholder="Summarize your review"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-xs text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label
          htmlFor="review-comment"
          className="text-xs font-semibold uppercase tracking-widest text-brand-500"
        >
          Comment (optional)
        </label>
        <textarea
          id="review-comment"
          rows={4}
          placeholder="Tell others about your experience..."
          className="flex w-full border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
          {...register("comment")}
        />
        {errors.comment && (
          <p className="text-xs text-red-500">{errors.comment.message}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" variant="black" size="sm" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
