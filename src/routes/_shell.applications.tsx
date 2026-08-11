import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Kanban, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { applicationService, applicationStatuses } from "@/services/applicationService";
import { useApplications } from "@/hooks/useApplyIQData";
import type { Application, ApplicationStatus } from "@/types";

export const Route = createFileRoute("/_shell/applications")({
  head: () => ({
    meta: [
      { title: "Application tracker — ApplyIQ" },
      { name: "description", content: "Track every application from saved to offer on a single board." },
      { property: "og:title", content: "Application tracker — ApplyIQ" },
      { property: "og:description", content: "Track every application from saved to offer on a single board." },
    ],
  }),
  component: ApplicationsPage,
});

function ApplicationsPage() {
  const { data: applications = [], isLoading } = useApplications();
  const qc = useQueryClient();
  const [view, setView] = useState<"board" | "list">("board");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Application | null>(null);
  const [form, setForm] = useState({ company: "", role: "", location: "", status: "Saved" as ApplicationStatus });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["applications"] });

  const create = useMutation({
    mutationFn: () =>
      applicationService.create({
        company: form.company,
        role: form.role,
        location: form.location,
        status: form.status,
        date: "Today",
        notes: "",
      }),
    onSuccess: () => {
      invalidate();
      setOpen(false);
      setForm({ company: "", role: "", location: "", status: "Saved" });
      toast.success("Application added");
    },
  });

  const move = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ApplicationStatus }) =>
      applicationService.updateStatus(id, status),
    onSuccess: () => invalidate(),
  });

  const saveNotes = useMutation({
    mutationFn: ({ id, notes }: { id: string; notes: string }) => applicationService.updateNotes(id, notes),
    onSuccess: () => {
      invalidate();
      toast.success("Notes saved");
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => applicationService.remove(id),
    onSuccess: () => {
      invalidate();
      setSelected(null);
      toast.success("Application removed");
    },
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Application tracker"
        description="One board for every role you're chasing, with notes and a timeline per application."
        actions={
          <div className="flex items-center gap-2">
            <Tabs value={view} onValueChange={(v) => setView(v as "board" | "list")}>
              <TabsList>
                <TabsTrigger value="board">Board</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </Tabs>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="size-4" /> Add application
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add an application</DialogTitle>
                  <DialogDescription>Track a role you've applied to or want to apply to.</DialogDescription>
                </DialogHeader>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    create.mutate();
                  }}
                >
                  <div className="space-y-1.5">
                    <Label htmlFor="app-company">Company</Label>
                    <Input
                      id="app-company"
                      required
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="app-role">Role</Label>
                    <Input
                      id="app-role"
                      required
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="app-location">Location</Label>
                    <Input
                      id="app-location"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      placeholder="Remote · Bengaluru"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Status</Label>
                    <Select
                      value={form.status}
                      onValueChange={(v) => setForm({ ...form, status: v as ApplicationStatus })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {applicationStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full" disabled={create.isPending}>
                    {create.isPending ? "Adding" : "Add application"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      {isLoading ? (
        <Skeleton className="h-96 rounded-xl" />
      ) : applications.length === 0 ? (
        <EmptyState
          icon={Kanban}
          title="No applications tracked"
          description="Add the roles you're applying to and ApplyIQ keeps the pipeline in one place."
        />
      ) : view === "board" ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {applicationStatuses.map((status) => {
            const column = applications.filter((a) => a.status === status);
            return (
              <div key={status} className="rounded-xl border border-border bg-muted/40 p-3">
                <div className="flex items-center justify-between px-1 pb-3">
                  <StatusBadge status={status} />
                  <span className="text-xs tabular-nums text-muted-foreground">{column.length}</span>
                </div>
                <div className="space-y-2">
                  {column.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => setSelected(app)}
                      className="w-full rounded-lg border border-border bg-card p-3 text-left transition-colors hover:border-primary/40"
                    >
                      <p className="text-sm font-medium">{app.role}</p>
                      <p className="text-xs text-muted-foreground">
                        {app.company} · {app.location}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {app.date} · {app.matchScore}% match
                      </p>
                    </button>
                  ))}
                  {column.length === 0 && (
                    <p className="px-1 py-4 text-xs text-muted-foreground">Nothing here yet</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card className="divide-y divide-border">
          {applications.map((app) => (
            <div key={app.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <button className="min-w-0 text-left" onClick={() => setSelected(app)}>
                <p className="truncate text-sm font-medium">{app.role}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {app.company} · {app.location} · {app.date}
                </p>
              </button>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold tabular-nums">{app.matchScore}%</span>
                <Select
                  value={app.status}
                  onValueChange={(v) => move.mutate({ id: app.id, status: v as ApplicationStatus })}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {applicationStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </Card>
      )}

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selected.role} · {selected.company}
                </DialogTitle>
                <DialogDescription>
                  {selected.location} · added {selected.date} · {selected.matchScore}% match
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-1.5">
                <Label>Status</Label>
                <Select
                  value={selected.status}
                  onValueChange={(v) => {
                    move.mutate({ id: selected.id, status: v as ApplicationStatus });
                    setSelected({ ...selected, status: v as ApplicationStatus });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {applicationStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="app-notes">Notes</Label>
                <Textarea
                  id="app-notes"
                  className="min-h-28"
                  value={selected.notes}
                  onChange={(e) => setSelected({ ...selected, notes: e.target.value })}
                />
              </div>

              <div>
                <p className="text-sm font-semibold">Timeline</p>
                <ol className="mt-3 space-y-3">
                  {selected.timeline.map((entry, i) => (
                    <li key={`${entry.label}-${i}`} className="flex gap-3">
                      <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary/70" />
                      <div>
                        <p className="text-sm">{entry.label}</p>
                        <p className="text-xs text-muted-foreground">{entry.date}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  disabled={saveNotes.isPending}
                  onClick={() => saveNotes.mutate({ id: selected.id, notes: selected.notes })}
                >
                  Save notes
                </Button>
                <Button variant="outline" onClick={() => remove.mutate(selected.id)}>
                  <Trash2 className="size-4" /> Delete
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
