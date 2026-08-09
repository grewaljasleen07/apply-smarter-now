import { motion } from "motion/react";
import { Check, FileText, Sparkles, X } from "lucide-react";
import { SkillChip } from "@/components/shared/SkillChip";
import { ScoreBar, ScoreRing } from "@/components/shared/ScoreRing";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { mockAnalyses, mockApplications, mockCoverLetter, mockResumes } from "@/mock/data";
import { applicationStatuses } from "@/services/applicationService";
import { cn } from "@/lib/utils";

const analysis = mockAnalyses[0]!;
const resume = mockResumes[0]!;

export function PreviewFrame({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("panel overflow-hidden", className)}>
      <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
        </span>
        <span className="ml-2 truncate text-xs font-medium text-muted-foreground">{title}</span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

export function ResumePreview() {
  return (
    <PreviewFrame title="ApplyIQ · Resume intelligence">
      <div className="grid gap-4 md:grid-cols-[1fr_1.1fr]">
        <div className="rounded-lg border border-border bg-secondary/40 p-4">
          <div className="flex items-center gap-2.5">
            <FileText className="size-4 text-primary" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{resume.fileName}</p>
              <p className="text-xs text-muted-foreground">Parsed in 2.4s · {resume.version}</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {["Personal information", "Education", "Experience", "Projects", "Certifications"].map(
              (row, index) => (
                <motion.div
                  key={row}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.3 }}
                  className="flex items-center justify-between rounded-md bg-card px-3 py-2 text-xs"
                >
                  <span>{row}</span>
                  <Check className="size-3.5 text-success" />
                </motion.div>
              ),
            )}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Extracted skills
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {resume.parsed.skills.map((skill) => (
              <SkillChip key={skill} label={skill} variant="primary" />
            ))}
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Experience
          </p>
          <div className="mt-2.5 space-y-2">
            {resume.parsed.experience.map((exp) => (
              <div key={exp.role} className="rounded-lg border border-border p-3">
                <p className="text-sm font-medium">{exp.role}</p>
                <p className="text-xs text-muted-foreground">
                  {exp.company} · {exp.period}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

export function AnalysisPreview({ compact = false }: { compact?: boolean }) {
  return (
    <PreviewFrame title={`ApplyIQ · ${analysis.company} — ${analysis.role}`}>
      <div className="grid gap-5 md:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center gap-4 md:w-44">
          <ScoreRing value={analysis.matchScore} size={compact ? 108 : 132} />
          <p className="text-center text-xs text-muted-foreground">
            Strong alignment with this role
          </p>
        </div>
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {analysis.sections.map((section, index) => (
              <ScoreBar
                key={section.label}
                label={section.label}
                value={section.score}
                delay={index * 0.08}
              />
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-success">
                Matching skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {analysis.matching.slice(0, 5).map((m) => (
                  <SkillChip key={m.skill} label={m.skill} variant="match" />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-warning-foreground">
                Missing skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {analysis.missing.map((m) => (
                  <SkillChip key={m.skill} label={m.skill} variant="missing" />
                ))}
              </div>
            </div>
          </div>
          {!compact && <SuggestionPreviewCard />}
        </div>
      </div>
    </PreviewFrame>
  );
}

export function SuggestionPreviewCard() {
  const suggestion = analysis.suggestions[0]!;
  return (
    <div className="rounded-lg border border-primary/25 bg-primary-soft/60 p-4">
      <div className="flex items-start gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-card text-primary shadow-subtle">
          <Sparkles className="size-4" />
        </span>
        <div>
          <p className="text-sm font-semibold">{suggestion.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            &ldquo;{suggestion.detail}&rdquo;
          </p>
          <button className="mt-3 text-sm font-medium text-primary underline-offset-4 hover:underline">
            Review suggestion
          </button>
        </div>
      </div>
    </div>
  );
}

export function TailoringPreview() {
  const suggestion = analysis.suggestions[0]!;
  return (
    <PreviewFrame title="ApplyIQ · Resume tailoring">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Original
          </p>
          <p className="mt-3 text-sm leading-relaxed">{suggestion.original}</p>
        </div>
        <div className="rounded-lg border border-primary/30 bg-primary-soft/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            AI suggestion
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            Developed{" "}
            <mark className="rounded bg-success-soft px-1 text-success">React and Node.js</mark> web
            applications using{" "}
            <mark className="rounded bg-success-soft px-1 text-success">REST APIs and MongoDB</mark>,
            serving 400+ campus users.
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-success px-3 py-1.5 text-xs font-medium text-success-foreground">
          <Check className="size-3.5" /> Accept
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium">
          <X className="size-3.5" /> Reject
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium">
          Edit
        </span>
        <span className="ml-auto text-xs text-muted-foreground">
          Nothing changes until you accept it
        </span>
      </div>
    </PreviewFrame>
  );
}

export function CoverLetterPreview() {
  return (
    <PreviewFrame title="ApplyIQ · Cover letter">
      <div className="grid gap-4 md:grid-cols-[200px_1fr]">
        <div className="space-y-3">
          {[
            ["Company", mockCoverLetter.company],
            ["Position", mockCoverLetter.role],
            ["Tone", mockCoverLetter.tone],
            ["Length", mockCoverLetter.length],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-border px-3 py-2">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
              <p className="text-sm font-medium">{value}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="whitespace-pre-line text-[13px] leading-relaxed text-foreground/90">
            {mockCoverLetter.body.split("\n\n").slice(0, 3).join("\n\n")}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-3 text-xs font-medium">
            {["Edit", "Regenerate", "Copy", "Download"].map((action) => (
              <span key={action} className="rounded-md border border-border px-2.5 py-1">
                {action}
              </span>
            ))}
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

export function TrackerPreview() {
  return (
    <PreviewFrame title="ApplyIQ · Application tracker">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {applicationStatuses.map((status) => {
          const items = mockApplications.filter((a) => a.status === status);
          return (
            <div key={status} className="rounded-lg bg-secondary/50 p-2.5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {status}
                </span>
                <span className="text-[11px] tabular-nums text-muted-foreground">
                  {items.length}
                </span>
              </div>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="rounded-md border border-border bg-card p-2.5">
                    <p className="text-xs font-semibold">{item.company}</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                      {item.role}
                    </p>
                    <p className="mt-1.5 text-[11px] text-muted-foreground">{item.date}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Sample entries shown for demonstration. ApplyIQ has no partnership with these companies.
      </p>
    </PreviewFrame>
  );
}

export function HeroPreview() {
  return (
    <div className="relative">
      <div className="panel overflow-hidden shadow-float">
        <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-3">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span className="size-2 rounded-full bg-success" />
            Job analysis · {analysis.company}
          </div>
          <StatusBadge status="Applied" />
        </div>
        <div className="grid gap-4 p-4 sm:grid-cols-[1fr_1fr] sm:p-5">
          <div className="space-y-3">
            <div className="rounded-lg border border-border p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Resume
              </p>
              <p className="mt-1 truncate text-sm font-medium">{resume.fileName}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {resume.parsed.skills.slice(0, 4).map((s) => (
                  <SkillChip key={s} label={s} variant="primary" />
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Job description
              </p>
              <p className="mt-1 text-sm font-medium">{analysis.role}</p>
              <div className="mt-2 space-y-1.5">
                {["React & Node.js", "REST API design", "Automated testing"].map((line) => (
                  <div key={line} className="h-1.5 w-full rounded-full bg-muted">
                    <div className="h-full w-2/3 rounded-full bg-border" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-secondary/30 p-4">
            <ScoreRing value={analysis.matchScore} size={104} />
            <div className="mt-4 space-y-3">
              <div>
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-success">
                  Matching
                </p>
                <div className="flex flex-wrap gap-1">
                  {analysis.matching.slice(0, 3).map((m) => (
                    <SkillChip key={m.skill} label={m.skill} variant="match" />
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-warning-foreground">
                  Missing
                </p>
                <div className="flex flex-wrap gap-1">
                  {analysis.missing.slice(0, 2).map((m) => (
                    <SkillChip key={m.skill} label={m.skill} variant="missing" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-border p-4 sm:p-5">
          <SuggestionPreviewCard />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="absolute -bottom-6 -left-4 hidden w-52 rounded-xl border border-border bg-card p-3.5 shadow-float sm:block"
      >
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Resume health
        </p>
        <div className="mt-2 flex items-end gap-2">
          <span className="text-2xl font-semibold tabular-nums">82</span>
          <span className="pb-1 text-xs text-muted-foreground">/100</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[82%] rounded-full bg-success" />
        </div>
      </motion.div>
    </div>
  );
}
