import { mockResumes } from "@/mock/data";
import { ok } from "./apiClient";
import type { ParsedResume, Resume } from "@/types";

let resumes: Resume[] = [...mockResumes];

export const resumeService = {
  async list(): Promise<Resume[]> {
    return ok(resumes, 500);
  },

  async get(id: string): Promise<Resume | undefined> {
    return ok(
      resumes.find((r) => r.id === id),
      400,
    );
  },

  async upload(fileName: string): Promise<Resume> {
    const base = resumes[0];
    const created: Resume = {
      ...base,
      id: `r_${Date.now()}`,
      name: fileName.replace(/\.(pdf|docx?|txt)$/i, ""),
      fileName,
      updatedAt: "Just now",
      version: "v1",
      score: 71,
      active: false,
      tags: ["New"],
    };
    resumes = [created, ...resumes];
    await ok(null, 1400);
    return created;
  },

  async rename(id: string, name: string): Promise<Resume[]> {
    resumes = resumes.map((r) => (r.id === id ? { ...r, name } : r));
    return ok(resumes, 300);
  },

  async remove(id: string): Promise<Resume[]> {
    resumes = resumes.filter((r) => r.id !== id);
    return ok(resumes, 300);
  },

  async setActive(id: string): Promise<Resume[]> {
    resumes = resumes.map((r) => ({ ...r, active: r.id === id }));
    return ok(resumes, 300);
  },

  async updateParsed(id: string, parsed: ParsedResume): Promise<Resume[]> {
    resumes = resumes.map((r) => (r.id === id ? { ...r, parsed, updatedAt: "Just now" } : r));
    return ok(resumes, 400);
  },
};
