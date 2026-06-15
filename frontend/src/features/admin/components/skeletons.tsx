export function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border border-brand-200 bg-white p-6">
            <div className="h-3 w-20 rounded bg-brand-100" />
            <div className="mt-2 h-8 w-24 rounded bg-brand-100" />
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="border border-brand-200 bg-white p-6">
          <div className="h-4 w-32 rounded bg-brand-100" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="h-4 flex-1 rounded bg-brand-100" />
                <div className="h-4 w-20 rounded bg-brand-100" />
                <div className="h-4 w-16 rounded bg-brand-100" />
              </div>
            ))}
          </div>
        </div>
        <div className="border border-brand-200 bg-white p-6">
          <div className="h-4 w-32 rounded bg-brand-100" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="h-4 flex-1 rounded bg-brand-100" />
                <div className="h-4 w-20 rounded bg-brand-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="animate-pulse space-y-3">
      <div className="flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="h-10 flex-1 rounded bg-brand-100" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-8 flex-1 rounded bg-brand-50" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function ProductFormSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-24 rounded bg-brand-100" />
            <div className="h-10 w-full rounded bg-brand-50" />
          </div>
        ))}
      </div>
      <div className="h-32 w-full rounded bg-brand-50" />
      <div className="h-10 w-40 rounded bg-brand-100" />
    </div>
  );
}
