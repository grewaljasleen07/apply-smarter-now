import { cn } from "@/lib/utils";
import type { ApplicationStatus } from "@/types";

const styles: Record<ApplicationStatus, string> = {
  Saved: "border-border bg-secondary text-secondary-foreground",
  Applied: "border-primary/25 bg-primary-soft text-primary-dark",
  Assessment: "border-warning/30 bg-warning-soft text-warning-foreground",
  Interview: "border-primary/40 bg-primary/10 text-primary-dark",
  Offer: "border-success/30 bg-success-soft text-success",
  Rejected: "border-destructive/25 bg-destructive/10 text-destructive",
};

export function StatusBadge({
  status,
  className,
}: {
  status: ApplicationStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles[status],
        className,
      )}
    >
      {status}
    </span>
  );
}
