import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ScoreBar, ScoreRing } from "@/components/shared/ScoreRing";
import { SkillChip } from "@/components/shared/SkillChip";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useAnalyses } from "@/hooks/useApplyIQData";

export const Route = createFileRoute("/_shell/analyses/$analysisId")({
  head: () => ({
    meta: [
      { title: "Match report — ApplyIQ" },
      { name: "description", content: "Section scores, matched skills, gaps and rewrite suggestions for this role." },
      { property: "og:title", content: "Match report — ApplyIQ" },
      { property: "og:description", content: "Section scores, matched skills, gaps and rewrite suggestions for this role." },
    ],
  }),
  component: AnalysisDetailPage,
});

const severityTone = {
  high: "border-destructive/25 bg-destructive/10 text-destructive",
  medium: "border-warning/30 bg-warning-soft text-warning-foreground",
  low: "border-border bg-secondary text-secondary-foreground",
} as const;

function AnalysisDetailPage() {
  const { analysisId } = Route.useParams();
  const { data: analyses = [], isLoading } = useAnalyses();
  const analysis = analyses.find((a) => a.id === analysisId);

  if (isLoading || !analysis) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-16 rounded-xl" />
        <Skeleton className="h-72 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link to="/analyses">
          <ArrowLeft className="size-4" /> Analysis history
        </Link>
      </Button>

      <PageHeader
        title={`${analysis.role} · ${analysis.company}`}
        description={`Analysed ${analysis.date}`}
        actions={
          <Button asChild>
            <Link to="/tailor">
              <Sparkles className="size-4" /> Tailor resume for this role
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[auto_1fr]">
        <Card className="grid place-items-center p-8">
          <ScoreRing value={analysis.matchScore} size={168} sublabel="Semantic match" />
        </Card>
        <Card className="p-6">
          <p className="text-sm font-semibold">Section breakdown</p>
          <p className="mt-1 text-sm text-muted-foreground">{analysis.summary}</p>
          <div className="mt-6 space-y-4">
            {analysis.sections.map((section, i) => (
              <ScoreBar key={section.label} label={section.label} value={section.score} delay={i * 0.08} />
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <p className="text-sm font-semibold">Matched requirements</p>
          <div className="mt-4 space-y-3">
            {analysis.matching.map((m) => (
              <div key={m.skill} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between gap-3">
                  <SkillChip label={m.skill} variant="match" weight={m.weight} />
                </div>
                {m.evidence && <p className="mt-2 text-xs text-muted-foreground">{m.evidence}</p>}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-sm font-semibold">Gaps to close</p>
          <div className="mt-4 space-y-3">
            {analysis.missing.map((m) => (
              <div key={m.skill} className="rounded-lg border border-border p-3">
                <SkillChip label={m.skill} variant="missing" weight={m.weight} />
                {m.evidence && <p className="mt-2 text-xs text-muted-foreground">{m.evidence}</p>}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <p className="text-sm font-semibold">Strengths</p>
          <ul className="mt-3 space-y-2">
            {analysis.strengths.map((s) => (
              <li key={s} className="flex gap-2 text-sm text-muted-foreground">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-success" />
                {s}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-6">
          <p className="text-sm font-semibold">Weaknesses</p>
          <ul className="mt-3 space-y-2">
            {analysis.weaknesses.map((s) => (
              <li key={s} className="flex gap-2 text-sm text-muted-foreground">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-warning" />
                {s}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="p-6">
        <p className="text-sm font-semibold">Suggested improvements</p>
        <Accordion type="single" collapsible className="mt-3">
          {analysis.suggestions.map((suggestion) => (
            <AccordionItem key={suggestion.id} value={suggestion.id}>
              <AccordionTrigger className="text-left">
                <span className="flex flex-1 items-center justify-between gap-3 pr-3">
                  <span className="text-sm font-medium">{suggestion.title}</span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${severityTone[suggestion.severity]}`}
                  >
                    {suggestion.severity}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">{suggestion.detail}</p>
                {suggestion.original && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-border bg-muted/50 p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Current
                      </p>
                      <p className="mt-1.5 text-sm">{suggestion.original}</p>
                    </div>
                    <div className="rounded-lg border border-success/25 bg-success-soft p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-success">
                        Suggested
                      </p>
                      <p className="mt-1.5 text-sm">{suggestion.improved}</p>
                    </div>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Button asChild variant="outline" size="sm" className="mt-5">
          <Link to="/tailor">
            Apply these in Tailor <ArrowRight className="size-4" />
          </Link>
        </Button>
      </Card>
    </div>
  );
}
