import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/PageHeader";
import { ProcessingPanel } from "@/components/shared/ProcessingPanel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStagedProcess } from "@/hooks/useStagedProcess";
import { useResumes } from "@/hooks/useApplyIQData";
import { analysisService, analysisStages } from "@/services/analysisService";

export const Route = createFileRoute("/_shell/analyze")({
  head: () => ({
    meta: [
      { title: "Analyze a job description — ApplyIQ" },
      { name: "description", content: "Paste a job description and get a semantic match score, skill gaps and fixes." },
      { property: "og:title", content: "Analyze a job description — ApplyIQ" },
      { property: "og:description", content: "Paste a job description and get a semantic match score, skill gaps and fixes." },
    ],
  }),
  component: AnalyzePage,
});

function AnalyzePage() {
  const navigate = useNavigate();
  const { data: resumes = [] } = useResumes();
  const [resumeId, setResumeId] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jd, setJd] = useState("");
  const { running, current, start } = useStagedProcess(analysisStages);

  const selectedResume = resumeId || resumes.find((r) => r.active)?.id || resumes[0]?.id || "";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (jd.trim().length < 40) {
      toast.error("Paste a bit more of the job description", {
        description: "At least a few sentences gives a meaningful match score.",
      });
      return;
    }
    start(async () => {
      const analysis = await analysisService.analyze({
        resumeId: selectedResume,
        jobDescription: jd,
        company,
        role,
      });
      toast.success("Analysis ready");
      navigate({ to: "/analyses/$analysisId", params: { analysisId: analysis.id } });
    });
  }

  if (running) {
    return (
      <div className="mx-auto max-w-xl py-10">
        <ProcessingPanel stages={analysisStages} current={current} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Analyze a job description"
        description="ApplyIQ compares meaning, not keywords — so related experience still counts."
      />

      <form onSubmit={onSubmit} className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card className="p-6">
          <Label htmlFor="jd">Job description</Label>
          <Textarea
            id="jd"
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the full job description here — responsibilities, requirements and nice-to-haves."
            className="mt-2 min-h-80"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            {jd.trim().split(/\s+/).filter(Boolean).length} words
          </p>
        </Card>

        <div className="space-y-4">
          <Card className="space-y-4 p-6">
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
              <Label htmlFor="company">Company</Label>
              <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Stripe" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="role">Role</Label>
              <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Software Engineer" />
            </div>
            <Button type="submit" className="w-full">
              <Sparkles className="size-4" /> Run analysis
            </Button>
          </Card>

          <Card className="p-6">
            <p className="text-sm font-semibold">What you'll get</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>An overall match score with per-section breakdown</li>
              <li>Skills you match, with the evidence found in your resume</li>
              <li>Missing requirements ranked by how much they matter</li>
              <li>Concrete rewrite suggestions you can apply in Tailor</li>
            </ul>
          </Card>
        </div>
      </form>
    </div>
  );
}
