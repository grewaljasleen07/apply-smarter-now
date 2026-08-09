import { cn } from "@/lib/utils";

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-glow">
        <svg viewBox="0 0 24 24" className="size-4.5" fill="none" aria-hidden="true">
          <path
            d="M5 17.5 10.2 6.5a1 1 0 0 1 1.8 0l2.1 4.4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M7.4 13.6h5.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="16.6" cy="15.4" r="3.4" stroke="currentColor" strokeWidth="2" />
          <path d="m19.4 18.2 1.9 1.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      {!compact && (
        <span className="text-[1.0625rem] font-semibold tracking-tight text-foreground">
          Apply<span className="text-primary">IQ</span>
        </span>
      )}
    </span>
  );
}
