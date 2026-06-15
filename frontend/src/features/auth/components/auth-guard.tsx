"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "../store";
import { AUTH_ROUTES } from "../constants";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { LoadingSpinner } from "@/shared/components/elements/loading-spinner";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuthStore();
  const { isFetching } = useCurrentUser();

  useEffect(() => {
    if (!isLoading && !isFetching && !isAuthenticated) {
      const redirectUrl = encodeURIComponent(pathname);
      router.replace(`${AUTH_ROUTES.login}?redirect=${redirectUrl}`);
    }
  }, [isAuthenticated, isLoading, isFetching, pathname, router]);

  if (isLoading || isFetching) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
