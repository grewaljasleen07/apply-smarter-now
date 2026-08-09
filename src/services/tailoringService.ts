import { mockAnalyses } from "@/mock/data";
import { ok } from "./apiClient";
import type { Suggestion } from "@/types";

export type TailoringEdit = Suggestion & {
  section: string;
  status: "pending" | "accepted" | "rejected";
};

export const tailoringStages = [
  { label: "Reviewing your experience", ms: 900 },
  { label: "Comparing job requirements", ms: 1000 },
  { label: "Preparing targeted improvements", ms: 1100 },
  { label: "Generating tailored version", ms: 900 },
];

const baseEdits: TailoringEdit[] = [
  {
    id: "t_1",
    title: "Project description lacks API detail",
    area: "Projects",
    section: "CampusHire",
    severity: "high",
    detail: "Name the technologies and the scope so the relevance is explicit.",
    original: "Developed web applications.",
    improved:
      "Developed React and Node.js web applications using REST APIs and MongoDB, serving 400+ campus users.",
    status: "pending",
  },
  {
    id: "t_2",
    title: "Internship bullet has no outcome",
    area: "Experience",
    section: "Nimbus Labs",
    severity: "medium",
    detail: "Add a measurable result so the reader knows what changed.",
    original: "Worked with senior engineers on feature delivery and code review.",
    improved:
      "Shipped 6 features alongside senior engineers and cut review turnaround by documenting each change set.",
    status: "pending",
  },
  {
    id: "t_3",
    title: "Summary can mirror the role language",
    area: "Summary",
    section: "Professional summary",
    severity: "medium",
    detail: "Reflect the job's emphasis on API development without overstating experience.",
    original:
      "Computer science student with hands-on experience building full-stack web applications using React, Node.js and MongoDB.",
    improved:
      "Computer science student building full-stack products end to end — REST API design in Node.js, React interfaces, and MongoDB data modelling.",
    status: "pending",
  },
  {
    id: "t_4",
    title: "Skills order does not match priority",
    area: "Skills",
    section: "Skills",
    severity: "low",
    detail: "Lead with the skills the job description mentions first.",
    original: "React, TypeScript, Node.js, Express, MongoDB, REST APIs, Tailwind CSS, Git",
    improved: "React, Node.js, REST APIs, TypeScript, Express, MongoDB, Git, Tailwind CSS",
    status: "pending",
  },
  {
    id: "t_5",
    title: "Freelance work can name the stack",
    area: "Experience",
    section: "Freelance",
    severity: "low",
    detail: "Specific tooling reads stronger than a generic description.",
    original: "Built marketing sites and dashboards for two small businesses.",
    improved:
      "Built two client dashboards in React with Express APIs, improving first paint by 40% through asset optimisation.",
    status: "pending",
  },
];

export const tailoringService = {
  async generate(_resumeId: string, _analysisId?: string): Promise<TailoringEdit[]> {
    return ok(baseEdits.map((e) => ({ ...e })), 300);
  },

  async regenerate(edit: TailoringEdit): Promise<TailoringEdit> {
    const alt = mockAnalyses[0]!.suggestions.find((s) => s.area === edit.area);
    return ok(
      {
        ...edit,
        improved: alt?.improved ?? edit.improved,
        status: "pending",
      },
      900,
    );
  },
};
