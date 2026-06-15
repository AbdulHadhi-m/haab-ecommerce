import { cn } from "@/shared/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: { value: string; positive: boolean };
}

export function StatsCard({ title, value, icon, description, trend }: StatsCardProps) {
  return (
    <div className="border border-brand-200 bg-white p-6 transition-colors hover:border-brand-300">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-500">
            {title}
          </p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {description && <p className="text-xs text-brand-400">{description}</p>}
          {trend && (
            <p className={cn("text-xs font-medium", trend.positive ? "text-green-600" : "text-red-600")}>
              {trend.value}
            </p>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center bg-brand-50 text-brand-600">
          {icon}
        </div>
      </div>
    </div>
  );
}
