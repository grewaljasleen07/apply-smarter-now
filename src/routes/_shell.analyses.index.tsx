import { createFileRoute, Link } from "@tanstack/react-router";
import { ScanSearch } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { SkillChip } from "@/components/shared/SkillChip";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnalyses } from "@/hooks/useApplyIQData";

export const Route = createFileRoute("/_shell/analyses/")({
  head: () => ({
    meta: [
      { title: "Analysis history — ApplyIQ" },
      { name: "description", content: "Every job description you've analysed, with match scores and skill gaps." },
      { property: "og:title", content: "Analysis history — ApplyIQ" },
      { property: "og:description", content: "Every job description you've analysed, with match scores and skill gaps." },
    ],
  }),
  component: AnalysesPage,
});

function AnalysesPage() {
  const { data: analyses = [], isLoading } = useAnalyses();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Analysis history"
        description="Compare roles side by side and see where your resume consistently falls short."
        actions={
          <Button asChild>
            <Link to="/analyze">New analysis</Link>
          </Button>
        }
      />

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-xl" />
          ))}
        </div>
      ) : analyses.length === 0 ? (
        <EmptyState
          icon={ScanSearch}
          title="No analyses yet"
          description="Paste your first job description to see how closely your resume matches."
          action={
            <Button asChild>
              <Link to="/analyze">Analyze a job</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {analyses.map((analysis) => (
            <Card key={analysis.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <Link
                    to="/analyses/$analysisId"
                    params={{ analysisId: analysis.id }}
                    className="text-sm font-semibold hover:text-primary"
                  >
                    {analysis.role}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {analysis.company} · {analysis.date}
                  </p>
                </div>
                <p className="text-2xl font-semibold tabular-nums">{analysis.matchScore}%</p>
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{analysis.summary}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {analysis.matching.slice(0, 3).map((m) => (
                  <SkillChip key={m.skill} label={m.skill} variant="match" />
                ))}
                {analysis.missing.slice(0, 2).map((m) => (
                  <SkillChip key={m.skill} label={m.skill} variant="missing" />
                ))}
              </div>
              <Button asChild size="sm" variant="outline" className="mt-5">
                <Link to="/analyses/$analysisId" params={{ analysisId: analysis.id }}>
                  View full report
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
