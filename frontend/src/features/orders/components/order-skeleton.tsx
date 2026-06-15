export function OrderCardSkeleton() {
  return (
    <div className="animate-pulse border border-brand-200 bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="h-3 w-32 rounded bg-brand-100" />
          <div className="h-4 w-48 rounded bg-brand-100" />
          <div className="h-3 w-36 rounded bg-brand-100" />
        </div>
        <div className="h-6 w-20 rounded bg-brand-100" />
      </div>
    </div>
  );
}

export function OrdersListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <OrderCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function OrderDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-6 w-48 rounded bg-brand-100" />
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-3">
          <div className="h-4 w-24 rounded bg-brand-100" />
          <div className="h-3 w-40 rounded bg-brand-100" />
          <div className="h-3 w-36 rounded bg-brand-100" />
          <div className="h-3 w-48 rounded bg-brand-100" />
        </div>
        <div className="space-y-3">
          <div className="h-4 w-24 rounded bg-brand-100" />
          <div className="h-3 w-32 rounded bg-brand-100" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-4 w-24 rounded bg-brand-100" />
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="h-16 w-16 rounded bg-brand-100" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 rounded bg-brand-100" />
              <div className="h-3 w-20 rounded bg-brand-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
