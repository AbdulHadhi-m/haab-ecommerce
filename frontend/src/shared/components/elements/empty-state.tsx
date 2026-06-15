import { PackageOpen } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = "Nothing here yet",
  description = "Check back later or browse our latest collections.",
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      <div className="mb-4 text-muted-foreground">
        {icon ?? <PackageOpen className="h-12 w-12" />}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
