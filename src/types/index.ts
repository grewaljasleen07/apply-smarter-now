export type User = {
  id: string;
  name: string;
  email: string;
  headline: string;
  location: string;
  initials: string;
  joinedAt: string;
};

export type ParsedResume = {
  personal: { name: string; email: string; phone: string; location: string; links: string[] };
  summary: string;
  skills: string[];
  experience: { role: string; company: string; period: string; bullets: string[] }[];
  projects: { name: string; stack: string[]; description: string }[];
  education: { degree: string; school: string; period: string; score: string }[];
  certifications: { name: string; issuer: string; year: string }[];
};

export type Resume = {
  id: string;
  name: string;
  fileName: string;
  updatedAt: string;
  version: string;
  score: number;
  active: boolean;
  tags: string[];
  parsed: ParsedResume;
};

export type SkillMatch = { skill: string; weight: number; evidence?: string };

export type Analysis = {
  id: string;
  company: string;
  role: string;
  matchScore: number;
  date: string;
  resumeId: string;
  summary: string;
  sections: { label: string; score: number }[];
  matching: SkillMatch[];
  missing: SkillMatch[];
  strengths: string[];
  weaknesses: string[];
  suggestions: Suggestion[];
};

export type Suggestion = {
  id: string;
  title: string;
  area: string;
  severity: "high" | "medium" | "low";
  detail: string;
  original?: string;
  improved?: string;
};

export type ApplicationStatus =
  | "Saved"
  | "Applied"
  | "Assessment"
  | "Interview"
  | "Offer"
  | "Rejected";

export type Application = {
  id: string;
  company: string;
  role: string;
  location: string;
  status: ApplicationStatus;
  date: string;
  matchScore: number;
  notes: string;
  timeline: { label: string; date: string }[];
};

export type CoverLetter = {
  id: string;
  company: string;
  role: string;
  tone: string;
  length: string;
  body: string;
  createdAt: string;
};

export type ActivityItem = {
  id: string;
  title: string;
  detail: string;
  time: string;
  kind: "resume" | "analysis" | "tailoring" | "cover" | "application";
};

export type Notification = {
  id: string;
  title: string;
  detail: string;
  time: string;
  unread: boolean;
};
