import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/PageHeader";
import { SkillChip } from "@/components/shared/SkillChip";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { resumeService } from "@/services/resumeService";
import { useResume } from "@/hooks/useApplyIQData";
import type { ParsedResume } from "@/types";

export const Route = createFileRoute("/_shell/resumes/$resumeId")({
  head: () => ({
    meta: [
      { title: "Parsed resume — ApplyIQ" },
      { name: "description", content: "Review and correct the structured data ApplyIQ extracted from your resume." },
      { property: "og:title", content: "Parsed resume — ApplyIQ" },
      { property: "og:description", content: "Review and correct the structured data ApplyIQ extracted from your resume." },
    ],
  }),
  component: ResumeDetailPage,
});

function ResumeDetailPage() {
  const { resumeId } = Route.useParams();
  const { data: resume, isLoading } = useResume(resumeId);
  const qc = useQueryClient();
  const [draft, setDraft] = useState<ParsedResume | null>(null);

  const parsed = draft ?? resume?.parsed ?? null;

  const save = useMutation({
    mutationFn: (next: ParsedResume) => resumeService.updateParsed(resumeId, next),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["resumes"] });
      qc.invalidateQueries({ queryKey: ["resume", resumeId] });
      toast.success("Parsed resume saved");
    },
  });

  if (isLoading || !resume || !parsed) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-16 rounded-xl" />
        <Skeleton className="h-80 rounded-xl" />
      </div>
    );
  }

  const update = (patch: Partial<ParsedResume>) => setDraft({ ...parsed, ...patch });

  return (
    <div className="space-y-8">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link to="/resumes">
          <ArrowLeft className="size-4" /> Resume library
        </Link>
      </Button>

      <PageHeader
        title={resume.name}
        description={`${resume.fileName} · ${resume.version} · resume health ${resume.score}%`}
        actions={
          <Button disabled={!draft || save.isPending} onClick={() => draft && save.mutate(draft)}>
            <Save className="size-4" /> {save.isPending ? "Saving" : "Save changes"}
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <p className="text-sm font-semibold">Personal details</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(["name", "email", "phone", "location"] as const).map((field) => (
              <label key={field} className="space-y-1.5">
                <span className="text-xs font-medium capitalize text-muted-foreground">{field}</span>
                <Input
                  value={parsed.personal[field]}
                  onChange={(e) =>
                    update({ personal: { ...parsed.personal, [field]: e.target.value } })
                  }
                />
              </label>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Links: {parsed.personal.links.join(" · ")}
          </p>
        </Card>

        <Card className="p-6">
          <p className="text-sm font-semibold">Professional summary</p>
          <Textarea
            className="mt-4 min-h-32"
            value={parsed.summary}
            onChange={(e) => update({ summary: e.target.value })}
          />
        </Card>
      </div>

      <Card className="p-6">
        <p className="text-sm font-semibold">Skills</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {parsed.skills.map((skill) => (
            <SkillChip key={skill} label={skill} variant="primary" />
          ))}
        </div>
        <Input
          className="mt-4"
          value={parsed.skills.join(", ")}
          onChange={(e) =>
            update({ skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })
          }
        />
      </Card>

      <Card className="p-6">
        <p className="text-sm font-semibold">Experience</p>
        <div className="mt-4 space-y-5">
          {parsed.experience.map((job, index) => (
            <div key={`${job.company}-${index}`} className="rounded-lg border border-border p-4">
              <p className="text-sm font-medium">
                {job.role} · {job.company}
              </p>
              <p className="text-xs text-muted-foreground">{job.period}</p>
              <ul className="mt-3 space-y-1.5">
                {job.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <p className="text-sm font-semibold">Projects</p>
          <div className="mt-4 space-y-4">
            {parsed.projects.map((project) => (
              <div key={project.name}>
                <p className="text-sm font-medium">{project.name}</p>
                <p className="text-sm text-muted-foreground">{project.description}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <SkillChip key={tech} label={tech} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-sm font-semibold">Education & certifications</p>
          <div className="mt-4 space-y-4">
            {parsed.education.map((edu) => (
              <div key={edu.degree}>
                <p className="text-sm font-medium">{edu.degree}</p>
                <p className="text-xs text-muted-foreground">
                  {edu.school} · {edu.period} · {edu.score}
                </p>
              </div>
            ))}
            {parsed.certifications.map((cert) => (
              <div key={cert.name}>
                <p className="text-sm font-medium">{cert.name}</p>
                <p className="text-xs text-muted-foreground">
                  {cert.issuer} · {cert.year}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
