import { cn } from "@/shared/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-2",
        align === "center" && "text-center",
        className,
      )}
    >
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-muted-foreground sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
