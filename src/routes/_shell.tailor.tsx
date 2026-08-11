import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, RefreshCw, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/PageHeader";
import { ProcessingPanel } from "@/components/shared/ProcessingPanel";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStagedProcess } from "@/hooks/useStagedProcess";
import { useAnalyses, useResumes } from "@/hooks/useApplyIQData";
import { tailoringService, tailoringStages, type TailoringEdit } from "@/services/tailoringService";

export const Route = createFileRoute("/_shell/tailor")({
  head: () => ({
    meta: [
      { title: "Tailor your resume — ApplyIQ" },
      { name: "description", content: "Review suggested rewrites one by one and keep only the edits you approve." },
      { property: "og:title", content: "Tailor your resume — ApplyIQ" },
      { property: "og:description", content: "Review suggested rewrites one by one and keep only the edits you approve." },
    ],
  }),
  component: TailorPage,
});

function TailorPage() {
  const { data: resumes = [] } = useResumes();
  const { data: analyses = [] } = useAnalyses();
  const [resumeId, setResumeId] = useState("");
  const [analysisId, setAnalysisId] = useState("");
  const [jd, setJd] = useState("");
  const [edits, setEdits] = useState<TailoringEdit[] | null>(null);
  const [regenerating, setRegenerating] = useState<string | null>(null);
  const { running, current, start } = useStagedProcess(tailoringStages);

  const selectedResume = resumeId || resumes.find((r) => r.active)?.id || resumes[0]?.id || "";
  const selectedAnalysis = analysisId || analyses[0]?.id || "";

  const accepted = edits?.filter((e) => e.status === "accepted") ?? [];

  function run() {
    start(async () => {
      const next = await tailoringService.generate(selectedResume, selectedAnalysis);
      setEdits(next);
      toast.success(`${next.length} suggested edits ready to review`);
    });
  }

  function decide(id: string, status: TailoringEdit["status"]) {
    setEdits((prev) => prev?.map((e) => (e.id === id ? { ...e, status } : e)) ?? prev);
  }

  async function regenerate(edit: TailoringEdit) {
    setRegenerating(edit.id);
    const next = await tailoringService.regenerate(edit);
    setEdits((prev) => prev?.map((e) => (e.id === edit.id ? next : e)) ?? prev);
    setRegenerating(null);
    toast.success("New wording generated");
  }

  if (running) {
    return (
      <div className="mx-auto max-w-xl py-10">
        <ProcessingPanel title="Tailoring your resume..." stages={tailoringStages} current={current} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Tailor your resume"
        description="Every change is a suggestion. Nothing is rewritten without your approval."
        actions={
          edits && (
            <Button
              variant="outline"
              onClick={() =>
                toast.success(`${accepted.length} edits saved as a new version`, {
                  description: "A tailored copy is stored alongside your master resume.",
                })
              }
              disabled={accepted.length === 0}
            >
              Save tailored version ({accepted.length})
            </Button>
          )
        }
      />

      <Card className="grid gap-4 p-6 md:grid-cols-3">
        <div className="space-y-1.5">
          <Label>Resume</Label>
          <Select value={selectedResume} onValueChange={setResumeId}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a resume" />
            </SelectTrigger>
            <SelectContent>
              {resumes.map((resume) => (
                <SelectItem key={resume.id} value={resume.id}>
                  {resume.name} · {resume.version}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Target role</Label>
          <Select value={selectedAnalysis} onValueChange={setAnalysisId}>
            <SelectTrigger>
              <SelectValue placeholder="Pick a previous analysis" />
            </SelectTrigger>
            <SelectContent>
              {analyses.map((analysis) => (
                <SelectItem key={analysis.id} value={analysis.id}>
                  {analysis.role} · {analysis.company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button className="w-full" onClick={run}>
            <Sparkles className="size-4" /> Generate suggestions
          </Button>
        </div>
        <div className="space-y-1.5 md:col-span-3">
          <Label htmlFor="tailor-jd">Extra context (optional)</Label>
          <Textarea
            id="tailor-jd"
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the job description or notes about what this team cares about."
            className="min-h-24"
          />
        </div>
      </Card>

      {!edits ? (
        <EmptyState
          icon={Sparkles}
          title="No suggestions yet"
          description="Pick a resume and a target role, then generate suggestions to review side by side."
        />
      ) : (
        <div className="space-y-4">
          {edits.map((edit) => (
            <Card key={edit.id} className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{edit.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {edit.area} · {edit.section} · {edit.severity} priority
                  </p>
                </div>
                {edit.status === "accepted" && (
                  <span className="rounded-full border border-success/25 bg-success-soft px-2.5 py-1 text-xs font-medium text-success">
                    Accepted
                  </span>
                )}
                {edit.status === "rejected" && (
                  <span className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    Skipped
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm text-muted-foreground">{edit.detail}</p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-muted/50 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Current
                  </p>
                  <p className="mt-1.5 text-sm">{edit.original}</p>
                </div>
                <div className="rounded-lg border border-success/25 bg-success-soft p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-success">
                    Suggested
                  </p>
                  <p className="mt-1.5 text-sm">{edit.improved}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" onClick={() => decide(edit.id, "accepted")}>
                  <Check className="size-4" /> Accept
                </Button>
                <Button size="sm" variant="outline" onClick={() => decide(edit.id, "rejected")}>
                  <X className="size-4" /> Skip
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={regenerating === edit.id}
                  onClick={() => regenerate(edit)}
                >
                  <RefreshCw className={`size-4 ${regenerating === edit.id ? "animate-spin" : ""}`} />
                  Regenerate
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
