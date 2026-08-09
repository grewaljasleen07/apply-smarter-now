import { mockAnalyses } from "@/mock/data";
import { ok } from "./apiClient";
import type { Analysis } from "@/types";

let analyses: Analysis[] = [...mockAnalyses];

export type AnalysisStage = { label: string; ms: number };

export const analysisStages: AnalysisStage[] = [
  { label: "Reading resume", ms: 900 },
  { label: "Understanding job requirements", ms: 1000 },
  { label: "Comparing experience", ms: 1100 },
  { label: "Identifying skill gaps", ms: 900 },
  { label: "Preparing recommendations", ms: 800 },
];

export const analysisService = {
  async list(): Promise<Analysis[]> {
    return ok(analyses, 400);
  },

  async get(id: string): Promise<Analysis | undefined> {
    return ok(
      analyses.find((a) => a.id === id),
      300,
    );
  },

  /** Mocked semantic analysis. Later this calls the embedding + LLM service. */
  async analyze(input: {
    resumeId: string;
    jobDescription: string;
    company?: string;
    role?: string;
  }): Promise<Analysis> {
    const base = mockAnalyses[0]!;
    const result: Analysis = {
      ...base,
      id: `a_${Date.now()}`,
      resumeId: input.resumeId,
      company: input.company?.trim() || base.company,
      role: input.role?.trim() || base.role,
      date: "Just now",
    };
    analyses = [result, ...analyses];
    return result;
  },
};
