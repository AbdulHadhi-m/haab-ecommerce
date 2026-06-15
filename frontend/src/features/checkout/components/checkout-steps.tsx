import { cn } from "@/shared/lib/utils";
import { CHECKOUT_STEPS } from "../constants";

interface CheckoutStepsProps {
  currentStep: number;
}

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <div className="flex items-center justify-center gap-0">
      {CHECKOUT_STEPS.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "flex h-8 w-8 items-center justify-center text-xs font-bold transition-colors",
                i <= currentStep
                  ? "bg-brand-900 text-white"
                  : "border border-brand-200 text-brand-400",
              )}
            >
              {i + 1}
            </span>
            <span
              className={cn(
                "hidden text-xs font-medium uppercase tracking-wider sm:block",
                i <= currentStep ? "text-brand-900" : "text-brand-400",
              )}
            >
              {label}
            </span>
          </div>
          {i < CHECKOUT_STEPS.length - 1 && (
            <div
              className={cn(
                "mx-3 h-px w-8 sm:w-16",
                i < currentStep ? "bg-brand-900" : "bg-brand-200",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
