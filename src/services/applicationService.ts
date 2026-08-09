import { mockApplications } from "@/mock/data";
import { ok } from "./apiClient";
import type { Application, ApplicationStatus } from "@/types";

let applications: Application[] = [...mockApplications];

export const applicationStatuses: ApplicationStatus[] = [
  "Saved",
  "Applied",
  "Assessment",
  "Interview",
  "Offer",
  "Rejected",
];

export const applicationService = {
  async list(): Promise<Application[]> {
    return ok(applications, 400);
  },

  async create(input: Omit<Application, "id" | "timeline" | "matchScore"> & { matchScore?: number }) {
    const created: Application = {
      ...input,
      matchScore: input.matchScore ?? 0,
      id: `app_${Date.now()}`,
      timeline: [{ label: `Added as ${input.status}`, date: input.date }],
    };
    applications = [created, ...applications];
    return ok(applications, 500);
  },

  async updateStatus(id: string, status: ApplicationStatus): Promise<Application[]> {
    applications = applications.map((a) =>
      a.id === id
        ? { ...a, status, timeline: [...a.timeline, { label: `Moved to ${status}`, date: "Today" }] }
        : a,
    );
    return ok(applications, 250);
  },

  async updateNotes(id: string, notes: string): Promise<Application[]> {
    applications = applications.map((a) => (a.id === id ? { ...a, notes } : a));
    return ok(applications, 250);
  },

  async remove(id: string): Promise<Application[]> {
    applications = applications.filter((a) => a.id !== id);
    return ok(applications, 250);
  },
};
