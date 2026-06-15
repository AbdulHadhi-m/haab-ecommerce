"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
          <h1 className="text-4xl font-bold tracking-tight">Critical Error</h1>
          <p className="text-sm text-brand-500">A critical error occurred. Please refresh the page.</p>
          <button
            onClick={reset}
            className="rounded-md bg-brand-900 px-6 py-2 text-sm font-medium text-white hover:bg-black"
          >
            Refresh Page
          </button>
        </div>
      </body>
    </html>
  );
}
