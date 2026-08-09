import { mockCoverLetter } from "@/mock/data";
import { ok } from "./apiClient";
import type { CoverLetter } from "@/types";

export const coverLetterStages = [
  { label: "Understanding the role", ms: 900 },
  { label: "Identifying relevant experience", ms: 1000 },
  { label: "Writing your personalised letter", ms: 1200 },
];

export type CoverLetterInput = {
  resumeId: string;
  jobDescription: string;
  company: string;
  role: string;
  tone: string;
  length: string;
};

const toneOpeners: Record<string, string> = {
  Professional: "Dear Hiring Team,",
  Enthusiastic: "Hello ApplyIQ — I mean, hello hiring team,",
  Concise: "Dear Hiring Team,",
  Formal: "Dear Sir or Madam,",
};

export const coverLetterService = {
  async generate(input: CoverLetterInput): Promise<CoverLetter> {
    const company = input.company.trim() || "the company";
    const role = input.role.trim() || "the role";
    const opener = toneOpeners[input.tone] ?? "Dear Hiring Team,";

    const paragraphs = [
      `I am applying for the ${role} position at ${company}. I build full-stack web applications with React, Node.js and MongoDB, and the responsibilities in this description line up closely with the work I have already been doing.`,
      `During my internship at Nimbus Labs I designed REST endpoints and built the React interface consuming them for an internal operations tool. On my own I built CampusHire, a placement portal used by students to track recruitment drives, which taught me to model shared data carefully.`,
      `The parts of this role that map most directly to my experience are API development, working across the frontend and backend of a feature, and communicating clearly in review. The areas I am actively strengthening are automated testing and relational data modelling.`,
      `I would be glad to talk about how I can contribute to the team at ${company}.`,
    ];

    const trimmed =
      input.length === "Short"
        ? paragraphs.slice(0, 2)
        : input.length === "Long"
          ? [...paragraphs.slice(0, 3), `Outside coursework I keep a habit of shipping small tools and reading other people's code, which is where most of my practical judgement has come from.`, paragraphs[3]!]
          : paragraphs;

    return ok(
      {
        ...mockCoverLetter,
        id: `cl_${Date.now()}`,
        company,
        role,
        tone: input.tone,
        length: input.length,
        createdAt: "Just now",
        body: `${opener}\n\n${trimmed.join("\n\n")}\n\nSincerely,\nAarav Sharma`,
      },
      300,
    );
  },
};
