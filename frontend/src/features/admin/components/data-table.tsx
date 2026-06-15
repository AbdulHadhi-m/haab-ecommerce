import { cn } from "@/shared/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  render: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  isLoading?: boolean;
}

export function DataTable<T>({ columns, data, keyExtractor, isLoading }: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            {columns.map((col) => (
              <div key={col.key} className="h-10 flex-1 rounded bg-brand-100" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-brand-200">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-brand-200 bg-brand-50">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={cn("px-4 py-3 text-xs font-semibold uppercase tracking-widest text-brand-600", col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-sm text-brand-500">
                No data found
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={keyExtractor(item)} className="bg-white transition-colors hover:bg-brand-50">
                {columns.map((col) => (
                  <td key={col.key} className={cn("px-4 py-3", col.className)}>
                    {col.render(item)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
