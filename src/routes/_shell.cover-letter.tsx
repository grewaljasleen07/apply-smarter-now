import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Download, PenLine, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/PageHeader";
import { ProcessingPanel } from "@/components/shared/ProcessingPanel";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStagedProcess } from "@/hooks/useStagedProcess";
import { useResumes } from "@/hooks/useApplyIQData";
import { coverLetterService, coverLetterStages } from "@/services/coverLetterService";
import type { CoverLetter } from "@/types";

export const Route = createFileRoute("/_shell/cover-letter")({
  head: () => ({
    meta: [
      { title: "Cover letter generator — ApplyIQ" },
      { name: "description", content: "Generate a grounded cover letter built from your real resume evidence." },
      { property: "og:title", content: "Cover letter generator — ApplyIQ" },
      { property: "og:description", content: "Generate a grounded cover letter built from your real resume evidence." },
    ],
  }),
  component: CoverLetterPage,
});

const tones = ["Professional", "Enthusiastic", "Concise", "Formal"];
const lengths = ["Short", "Standard", "Long"];

function CoverLetterPage() {
  const { data: resumes = [] } = useResumes();
  const [resumeId, setResumeId] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jd, setJd] = useState("");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Standard");
  const [letter, setLetter] = useState<CoverLetter | null>(null);
  const { running, current, start } = useStagedProcess(coverLetterStages);

  const selectedResume = resumeId || resumes.find((r) => r.active)?.id || resumes[0]?.id || "";

  function run() {
    start(async () => {
      const next = await coverLetterService.generate({
        resumeId: selectedResume,
        jobDescription: jd,
        company,
        role,
        tone,
        length,
      });
      setLetter(next);
      toast.success("Cover letter ready");
    });
  }

  if (running) {
    return (
      <div className="mx-auto max-w-xl py-10">
        <ProcessingPanel title="Writing your cover letter..." stages={coverLetterStages} current={current} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Cover letter generator"
        description="Written from what your resume actually says — no invented achievements."
      />

      <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
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
                    {resume.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cl-company">Company</Label>
            <Input id="cl-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Stripe" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cl-role">Role</Label>
            <Input id="cl-role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Software Engineer" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Length</Label>
              <Select value={length} onValueChange={setLength}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {lengths.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cl-jd">Job description (optional)</Label>
            <Textarea
              id="cl-jd"
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              className="min-h-28"
              placeholder="Paste the description so the letter mirrors its priorities."
            />
          </div>
          <Button className="w-full" onClick={run}>
            <PenLine className="size-4" /> {letter ? "Regenerate letter" : "Generate letter"}
          </Button>
        </Card>

        {letter ? (
          <Card className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
              <div>
                <p className="text-sm font-semibold">
                  {letter.role} · {letter.company}
                </p>
                <p className="text-xs text-muted-foreground">
                  {letter.tone} · {letter.length} · {letter.createdAt}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    void navigator.clipboard.writeText(letter.body);
                    toast.success("Copied to clipboard");
                  }}
                >
                  <Copy className="size-4" /> Copy
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toast.success("Export queued", { description: "PDF export arrives with the backend." })}
                >
                  <Download className="size-4" /> Export
                </Button>
                <Button size="sm" variant="ghost" onClick={run}>
                  <RefreshCw className="size-4" /> Rewrite
                </Button>
              </div>
            </div>
            <Textarea
              className="mt-4 min-h-[520px] resize-none border-0 px-0 text-sm leading-7 shadow-none focus-visible:ring-0"
              value={letter.body}
              onChange={(e) => setLetter({ ...letter, body: e.target.value })}
            />
          </Card>
        ) : (
          <EmptyState
            icon={PenLine}
            title="No letter yet"
            description="Fill in the company and role, choose a tone, and ApplyIQ drafts a letter you can edit inline."
          />
        )}
      </div>
    </div>
  );
}
