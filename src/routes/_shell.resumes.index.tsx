import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CheckCircle2, FileText, MoreHorizontal, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/PageHeader";
import { UploadZone } from "@/components/shared/UploadZone";
import { EmptyState } from "@/components/shared/EmptyState";
import { SkillChip } from "@/components/shared/SkillChip";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { resumeService } from "@/services/resumeService";
import { useResumes } from "@/hooks/useApplyIQData";

export const Route = createFileRoute("/_shell/resumes/")({
  head: () => ({
    meta: [
      { title: "Resume library — ApplyIQ" },
      { name: "description", content: "Upload, version and manage every resume you send out." },
      { property: "og:title", content: "Resume library — ApplyIQ" },
      { property: "og:description", content: "Upload, version and manage every resume you send out." },
    ],
  }),
  component: ResumesPage,
});

function ResumesPage() {
  const { data: resumes = [], isLoading } = useResumes();
  const qc = useQueryClient();
  const [renaming, setRenaming] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");

  const invalidate = () => qc.invalidateQueries({ queryKey: ["resumes"] });

  const upload = useMutation({
    mutationFn: (fileName: string) => resumeService.upload(fileName),
    onSuccess: (resume) => {
      invalidate();
      toast.success(`${resume.fileName} parsed`, {
        description: "Sections, skills and experience were extracted.",
      });
    },
  });

  const setActive = useMutation({
    mutationFn: (id: string) => resumeService.setActive(id),
    onSuccess: () => {
      invalidate();
      toast.success("Default resume updated");
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => resumeService.remove(id),
    onSuccess: () => {
      invalidate();
      toast.success("Resume deleted");
    },
  });

  const rename = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) => resumeService.rename(id, name),
    onSuccess: () => {
      invalidate();
      setRenaming(null);
      toast.success("Resume renamed");
    },
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Resume library"
        description="Keep a master resume plus role-specific versions. ApplyIQ parses each one into structured sections."
      />

      <UploadZone busy={upload.isPending} onFile={(fileName) => upload.mutate(fileName)} />

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      ) : resumes.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No resumes yet"
          description="Upload a PDF or DOCX and ApplyIQ will parse it into editable sections."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {resumes.map((resume) => (
            <Card key={resume.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  {renaming === resume.id ? (
                    <form
                      className="flex gap-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        rename.mutate({ id: resume.id, name: draftName });
                      }}
                    >
                      <Input
                        value={draftName}
                        autoFocus
                        onChange={(e) => setDraftName(e.target.value)}
                        className="h-8"
                      />
                      <Button type="submit" size="sm" disabled={rename.isPending}>
                        Save
                      </Button>
                    </form>
                  ) : (
                    <Link
                      to="/resumes/$resumeId"
                      params={{ resumeId: resume.id }}
                      className="truncate text-sm font-semibold hover:text-primary"
                    >
                      {resume.name}
                    </Link>
                  )}
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {resume.fileName} · {resume.version} · updated {resume.updatedAt}
                  </p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="grid size-8 place-items-center rounded-md border border-border"
                      aria-label={`Actions for ${resume.name}`}
                    >
                      <MoreHorizontal className="size-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setRenaming(resume.id);
                        setDraftName(resume.name);
                      }}
                    >
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActive.mutate(resume.id)}>
                      <Star className="size-4" /> Make default
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => remove.mutate(resume.id)}>
                      <Trash2 className="size-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-3xl font-semibold tabular-nums">{resume.score}%</p>
                  <p className="text-xs text-muted-foreground">Resume health</p>
                </div>
                {resume.active && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-success/25 bg-success-soft px-2.5 py-1 text-xs font-medium text-success">
                    <CheckCircle2 className="size-3" /> Default
                  </span>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {resume.parsed.skills.slice(0, 6).map((skill) => (
                  <SkillChip key={skill} label={skill} />
                ))}
              </div>

              <div className="mt-5 flex gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link to="/resumes/$resumeId" params={{ resumeId: resume.id }}>
                    View parsed data
                  </Link>
                </Button>
                <Button asChild size="sm" variant="ghost">
                  <Link to="/analyze">Analyze against a job</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
