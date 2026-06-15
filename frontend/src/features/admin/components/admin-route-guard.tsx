"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { LoadingSpinner } from "@/shared/components/elements/loading-spinner";

export function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const { isFetching } = useCurrentUser();

  useEffect(() => {
    if (!isLoading && !isFetching) {
      if (!isAuthenticated) {
        router.replace("/login?redirect=/admin");
      } else if (user?.role !== "admin") {
        router.replace("/");
      }
    }
  }, [isAuthenticated, isLoading, isFetching, user, router]);

  if (isLoading || isFetching) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}
