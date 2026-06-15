"use client";

import { Button } from "@/shared/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-4xl font-bold tracking-tight">Something went wrong</h1>
      <p className="text-sm text-brand-500">An unexpected error occurred. Please try again.</p>
      <Button variant="black" onClick={reset}>
        Try Again
      </Button>
    </div>
  );
}
