import { cn } from "@/shared/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "main" | "section" | "div";
}

export function PageContainer({
  children,
  className,
  as: Component = "div",
}: PageContainerProps) {
  return (
    <Component className={cn("mx-auto max-w-9xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </Component>
  );
}
