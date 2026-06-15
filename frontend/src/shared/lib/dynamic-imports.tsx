"use client";

import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/shared/components/elements/loading-spinner";

// Cart drawer - only loaded when opened
export const DynamicCartDrawer = dynamic(
  () => import("@/features/cart/components/cart-drawer").then((mod) => ({ default: mod.CartDrawer })),
  {
    ssr: false,
    loading: () => null,
  },
);

// Newsletter section - below the fold
export const DynamicNewsletterSection = dynamic(
  () => import("@/features/products/components/newsletter-section").then((mod) => ({ default: mod.NewsletterSection })),
  {
    loading: () => <div className="h-64 animate-pulse bg-brand-100" />,
  },
);

// Review components - below the fold
export const DynamicReviewList = dynamic(
  () => import("@/features/reviews/components/review-list").then((mod) => ({ default: mod.ReviewList })),
  {
    loading: () => <LoadingSpinner />,
  },
);

// Admin components
export const DynamicAdminSidebar = dynamic(
  () => import("@/features/admin/components/admin-sidebar").then((mod) => ({ default: mod.AdminSidebar })),
  { ssr: false },
);

export const DynamicAdminHeader = dynamic(
  () => import("@/features/admin/components/admin-header").then((mod) => ({ default: mod.AdminHeader })),
  { ssr: false },
);

// Charts - heavy libraries, client-side only
export const DynamicBarChart = dynamic(
  () => import("@/features/admin/components/bar-chart").then((mod) => ({ default: mod.BarChart })),
  { ssr: false, loading: () => <div className="h-80 animate-pulse bg-brand-100 rounded-lg" /> },
);
