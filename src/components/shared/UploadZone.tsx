import { useRef, useState } from "react";
import { UploadCloud, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function UploadZone({
  onFile,
  busy = false,
  hint = "PDF or DOCX · up to 5 MB",
  className,
}: {
  onFile: (fileName: string) => void;
  busy?: boolean;
  hint?: string;
  className?: string;
}) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) onFile(file.name);
      }}
      className={cn(
        "flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border bg-secondary/40 px-6 py-10 text-center transition-colors",
        dragging && "border-primary bg-primary-soft",
        className,
      )}
    >
      <span className="grid size-11 place-items-center rounded-xl bg-card text-primary shadow-subtle">
        {busy ? <FileText className="size-5 animate-pulse" /> : <UploadCloud className="size-5" />}
      </span>
      <div>
        <p className="text-sm font-medium">
          {busy ? "Reading and parsing your resume..." : "Drag your resume here"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file.name);
        }}
      />
      <Button variant="outline" size="sm" disabled={busy} onClick={() => inputRef.current?.click()}>
        Browse files
      </Button>
    </div>
  );
}
