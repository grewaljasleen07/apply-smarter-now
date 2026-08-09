import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";

export function SkillChip({
  label,
  variant = "neutral",
  weight,
  className,
}: {
  label: string;
  variant?: "neutral" | "match" | "missing" | "primary";
  weight?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        variant === "neutral" && "border-border bg-secondary text-secondary-foreground",
        variant === "primary" && "border-primary/25 bg-primary-soft text-primary-dark",
        variant === "match" && "border-success/25 bg-success-soft text-success",
        variant === "missing" && "border-warning/30 bg-warning-soft text-warning-foreground",
        className,
      )}
    >
      {variant === "match" && <Check className="size-3" />}
      {variant === "missing" && <Minus className="size-3" />}
      {label}
      {typeof weight === "number" && (
        <span className="tabular-nums opacity-60">{weight}%</span>
      )}
    </span>
  );
}
