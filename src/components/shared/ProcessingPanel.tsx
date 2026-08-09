import { motion } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProcessStage = { label: string; ms: number };

export function ProcessingPanel({
  title = "Analysing your application...",
  stages,
  current,
  className,
}: {
  title?: string;
  stages: ProcessStage[];
  current: number;
  className?: string;
}) {
  const progress = Math.min(100, Math.round((current / stages.length) * 100));

  return (
    <div className={cn("panel p-6 sm:p-8", className)}>
      <div className="flex items-center gap-3">
        <span className="relative grid size-9 place-items-center rounded-lg bg-primary-soft text-primary">
          <Loader2 className="size-4.5 animate-spin" />
        </span>
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-muted-foreground">
            Simulated AI pipeline · {progress}% complete
          </p>
        </div>
      </div>

      <div className="mt-5 h-1 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-primary"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <ul className="mt-6 space-y-3">
        {stages.map((stage, index) => {
          const state = index < current ? "done" : index === current ? "active" : "idle";
          return (
            <li key={stage.label} className="flex items-center gap-3 text-sm">
              <span
                className={cn(
                  "grid size-5 shrink-0 place-items-center rounded-full border text-[10px]",
                  state === "done" && "border-success bg-success text-success-foreground",
                  state === "active" && "border-primary text-primary",
                  state === "idle" && "border-border text-muted-foreground",
                )}
              >
                {state === "done" ? (
                  <Check className="size-3" />
                ) : state === "active" ? (
                  <motion.span
                    className="size-1.5 rounded-full bg-primary"
                    animate={{ opacity: [1, 0.25, 1] }}
                    transition={{ duration: 1.1, repeat: Infinity }}
                  />
                ) : null}
              </span>
              <span
                className={cn(
                  state === "idle" && "text-muted-foreground",
                  state === "active" && "font-medium text-foreground",
                )}
              >
                {stage.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
