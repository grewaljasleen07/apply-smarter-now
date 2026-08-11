import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChartPie, FileText, PenLine, ScanSearch, Sparkles, Kanban } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ScoreRing, ScoreBar } from "@/components/shared/ScoreRing";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useActivity, useAnalyses, useApplications, useResumes, useStats } from "@/hooks/useApplyIQData";

export const Route = createFileRoute("/_shell/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — ApplyIQ" },
      { name: "description", content: "Your resume health, match scores and application pipeline at a glance." },
      { property: "og:title", content: "Dashboard — ApplyIQ" },
      { property: "og:description", content: "Your resume health, match scores and application pipeline at a glance." },
    ],
  }),
  component: DashboardPage,
});

const quickActions = [
  { to: "/analyze", label: "Analyze a job", detail: "Paste a description, get a match score", icon: ScanSearch },
  { to: "/tailor", label: "Tailor resume", detail: "Approve targeted rewrites", icon: Sparkles },
  { to: "/cover-letter", label: "Write cover letter", detail: "Grounded in your real experience", icon: PenLine },
  { to: "/resumes", label: "Manage resumes", detail: "Versions, parsing and health", icon: FileText },
] as const;

function DashboardPage() {
  const { data: stats, isLoading } = useStats();
  const { data: analyses = [] } = useAnalyses();
  const { data: applications = [] } = useApplications();
  const { data: resumes = [] } = useResumes();
  const { data: activity = [] } = useActivity();

  const latest = analyses[0];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Where your applications stand and what to work on next."
        actions={
          <Button asChild>
            <Link to="/analyze">New analysis</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading || !stats
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)
          : [
              { label: "Average match", value: `${stats.averageMatch}%`, detail: `${stats.analyses} analyses run` },
              { label: "Resume health", value: `${stats.resumeHealth}%`, detail: `${stats.resumes} resumes stored` },
              { label: "Applications", value: `${stats.applications}`, detail: `${stats.interviews} in interview` },
              { label: "Offers", value: `${stats.offers}`, detail: "Keep the pipeline moving" },
            ].map((card) => (
              <Card key={card.label} className="p-5">
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="mt-2 text-3xl font-semibold tabular-nums tracking-tight">{card.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{card.detail}</p>
              </Card>
            ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Card className="p-6">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-sm font-semibold">Latest analysis</p>
              <p className="text-xs text-muted-foreground">
                {latest ? `${latest.role} · ${latest.company} · ${latest.date}` : "No analyses yet"}
              </p>
            </div>
            {latest && (
              <Button asChild variant="ghost" size="sm">
                <Link to="/analyses/$analysisId" params={{ analysisId: latest.id }}>
                  Open <ArrowRight className="size-4" />
                </Link>
              </Button>
            )}
          </div>

          {latest ? (
            <div className="mt-6 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-center">
              <ScoreRing value={latest.matchScore} />
              <div className="space-y-4">
                {latest.sections.map((section, i) => (
                  <ScoreBar key={section.label} label={section.label} value={section.score} delay={i * 0.08} />
                ))}
              </div>
            </div>
          ) : (
            <Skeleton className="mt-6 h-40 rounded-xl" />
          )}
        </Card>

        <Card className="p-6">
          <p className="text-sm font-semibold">Quick actions</p>
          <div className="mt-4 space-y-2">
            {quickActions.map((action) => (
              <Link
                key={action.to}
                to={action.to}
                className="flex items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:border-primary/40 hover:bg-primary-soft/40"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                  <action.icon className="size-4" />
                </span>
                <span>
                  <span className="block text-sm font-medium">{action.label}</span>
                  <span className="block text-xs text-muted-foreground">{action.detail}</span>
                </span>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-semibold">Application pipeline</p>
            <Button asChild variant="ghost" size="sm">
              <Link to="/applications">
                <Kanban className="size-4" /> View board
              </Link>
            </Button>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {applications.slice(0, 5).map((app) => (
              <li key={app.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{app.role}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {app.company} · {app.location}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold tabular-nums">{app.matchScore}%</span>
                  <StatusBadge status={app.status} />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-semibold">Recent activity</p>
            <Button asChild variant="ghost" size="sm">
              <Link to="/analyses">
                <ChartPie className="size-4" /> All analyses
              </Link>
            </Button>
          </div>
          <ol className="mt-4 space-y-4">
            {activity.slice(0, 6).map((item) => (
              <li key={item.id} className="flex gap-3">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary/70" />
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{item.time}</p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-semibold">Your resumes</p>
          <Button asChild variant="ghost" size="sm">
            <Link to="/resumes">
              <FileText className="size-4" /> Library
            </Link>
          </Button>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {resumes.map((resume) => (
            <Link
              key={resume.id}
              to="/resumes/$resumeId"
              params={{ resumeId: resume.id }}
              className="rounded-lg border border-border p-4 transition-colors hover:border-primary/40"
            >
              <p className="truncate text-sm font-medium">{resume.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {resume.version} · updated {resume.updatedAt}
              </p>
              <p className="mt-3 text-2xl font-semibold tabular-nums">{resume.score}%</p>
              <p className="text-xs text-muted-foreground">Resume health</p>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
