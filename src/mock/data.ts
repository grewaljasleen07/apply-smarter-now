import type {
  ActivityItem,
  Analysis,
  Application,
  CoverLetter,
  Notification,
  Resume,
  User,
} from "@/types";

export const mockUser: User = {
  id: "u_1",
  name: "Aarav Sharma",
  email: "aarav.sharma@example.com",
  headline: "Final-year CS student · Full-stack developer",
  location: "Pune, India",
  initials: "AS",
  joinedAt: "March 2026",
};

const parsedBase = {
  personal: {
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    location: "Pune, India",
    links: ["github.com/aaravsharma", "linkedin.com/in/aaravsharma"],
  },
  summary:
    "Computer science student with hands-on experience building full-stack web applications using React, Node.js and MongoDB. Comfortable working across API design, UI implementation and deployment.",
  skills: [
    "React",
    "TypeScript",
    "Node.js",
    "Express",
    "MongoDB",
    "REST APIs",
    "Tailwind CSS",
    "Git",
    "Python",
    "SQL",
  ],
  experience: [
    {
      role: "Software Engineering Intern",
      company: "Nimbus Labs",
      period: "May 2025 — Aug 2025",
      bullets: [
        "Developed web applications used by the internal operations team.",
        "Worked with senior engineers on feature delivery and code review.",
      ],
    },
    {
      role: "Frontend Developer (Freelance)",
      company: "Independent",
      period: "Jan 2025 — Apr 2025",
      bullets: [
        "Built marketing sites and dashboards for two small businesses.",
        "Improved page load performance through asset optimisation.",
      ],
    },
  ],
  projects: [
    {
      name: "CampusHire",
      stack: ["React", "Node.js", "MongoDB"],
      description: "Placement portal that lets students track drives and recruiters shortlist candidates.",
    },
    {
      name: "SplitMate",
      stack: ["React Native", "Express"],
      description: "Expense splitting app with settlement suggestions for shared households.",
    },
  ],
  education: [
    {
      degree: "B.E. Computer Engineering",
      school: "Pune Institute of Technology",
      period: "2022 — 2026",
      score: "8.6 CGPA",
    },
  ],
  certifications: [
    { name: "Meta Front-End Developer", issuer: "Coursera", year: "2025" },
    { name: "MongoDB Associate Developer", issuer: "MongoDB", year: "2025" },
  ],
};

export const mockResumes: Resume[] = [
  {
    id: "r_1",
    name: "Full-stack Developer — Master",
    fileName: "aarav_sharma_fullstack.pdf",
    updatedAt: "Aug 6, 2026",
    version: "v4",
    score: 82,
    active: true,
    tags: ["Full-stack", "Master"],
    parsed: parsedBase,
  },
  {
    id: "r_2",
    name: "Frontend Engineer — Product roles",
    fileName: "aarav_sharma_frontend.pdf",
    updatedAt: "Jul 28, 2026",
    version: "v2",
    score: 76,
    active: false,
    tags: ["Frontend"],
    parsed: {
      ...parsedBase,
      summary:
        "Frontend-focused developer with an eye for interface detail, accessibility and design systems in React and TypeScript.",
      skills: ["React", "TypeScript", "Tailwind CSS", "Accessibility", "Vite", "Figma", "Testing"],
    },
  },
  {
    id: "r_3",
    name: "Internship — Data roles",
    fileName: "aarav_sharma_data.pdf",
    updatedAt: "Jun 12, 2026",
    version: "v1",
    score: 64,
    active: false,
    tags: ["Data", "Internship"],
    parsed: {
      ...parsedBase,
      summary: "Aspiring data engineer with coursework in statistics, SQL and Python data tooling.",
      skills: ["Python", "SQL", "Pandas", "NumPy", "Power BI", "Statistics"],
    },
  },
];

export const mockAnalyses: Analysis[] = [
  {
    id: "a_1",
    company: "Stripe",
    role: "Software Engineer, Payments",
    matchScore: 87,
    date: "Aug 6, 2026",
    resumeId: "r_1",
    summary:
      "Strong alignment with this role. Your React and Node.js work maps closely to the day-to-day responsibilities. The gap is mostly around explicit API and testing depth in how your experience is written.",
    sections: [
      { label: "Technical Skills", score: 92 },
      { label: "Experience", score: 84 },
      { label: "Projects", score: 86 },
      { label: "Job Requirements", score: 89 },
    ],
    matching: [
      { skill: "React", weight: 96, evidence: "Used across CampusHire and internship work" },
      { skill: "Node.js", weight: 91, evidence: "Backend services at Nimbus Labs" },
      { skill: "MongoDB", weight: 88, evidence: "Primary datastore in two projects" },
      { skill: "REST APIs", weight: 82, evidence: "Implied by project work, not stated" },
      { skill: "TypeScript", weight: 79 },
      { skill: "Git", weight: 90 },
    ],
    missing: [
      { skill: "Automated testing", weight: 70 },
      { skill: "PostgreSQL", weight: 58 },
      { skill: "Payment systems domain", weight: 52 },
      { skill: "CI/CD pipelines", weight: 44 },
    ],
    strengths: [
      "Product-oriented full-stack project experience",
      "Clear ownership of features during internship",
      "Modern React and TypeScript foundation",
    ],
    weaknesses: [
      "API design work is implied rather than described",
      "No measurable outcomes or metrics in bullets",
      "Testing and reliability practices are absent",
    ],
    suggestions: [
      {
        id: "s_1",
        title: "Improve your project section",
        area: "Projects",
        severity: "high",
        detail:
          "This project demonstrates relevant backend experience, but the description does not mention REST API development.",
        original: "Developed web applications.",
        improved:
          "Developed React and Node.js web applications using REST APIs and MongoDB, serving 400+ campus users.",
      },
      {
        id: "s_2",
        title: "Add measurable impact to your internship",
        area: "Experience",
        severity: "medium",
        detail:
          "Recruiters scan for outcomes. Quantify what changed because of your work — users served, time saved, or performance gained.",
        original: "Worked with senior engineers on feature delivery and code review.",
        improved:
          "Shipped 6 features with senior engineers and reduced review turnaround by writing clearer PR documentation.",
      },
      {
        id: "s_3",
        title: "Surface testing experience",
        area: "Skills",
        severity: "medium",
        detail:
          "The job description mentions automated testing twice. If you have written any unit or integration tests, list the tooling explicitly.",
      },
    ],
  },
  {
    id: "a_2",
    company: "Google",
    role: "Frontend Engineer, Cloud Console",
    matchScore: 79,
    date: "Aug 3, 2026",
    resumeId: "r_2",
    summary:
      "Good alignment on frontend fundamentals. Accessibility and large-scale design system experience are the main gaps.",
    sections: [
      { label: "Technical Skills", score: 88 },
      { label: "Experience", score: 72 },
      { label: "Projects", score: 80 },
      { label: "Job Requirements", score: 76 },
    ],
    matching: [
      { skill: "React", weight: 94 },
      { skill: "TypeScript", weight: 86 },
      { skill: "CSS architecture", weight: 74 },
    ],
    missing: [
      { skill: "Accessibility (WCAG)", weight: 66 },
      { skill: "Design systems at scale", weight: 60 },
      { skill: "Performance profiling", weight: 48 },
    ],
    strengths: ["Component-driven UI work", "Comfort with TypeScript"],
    weaknesses: ["No accessibility evidence", "Limited scale in described projects"],
    suggestions: [
      {
        id: "s_4",
        title: "Name your accessibility practices",
        area: "Skills",
        severity: "high",
        detail:
          "Mention keyboard navigation, semantic markup or screen-reader testing if you have done any of it.",
      },
    ],
  },
  {
    id: "a_3",
    company: "Razorpay",
    role: "Associate Backend Engineer",
    matchScore: 71,
    date: "Jul 30, 2026",
    resumeId: "r_1",
    summary: "Moderate alignment. Backend depth and database design are the areas to strengthen.",
    sections: [
      { label: "Technical Skills", score: 76 },
      { label: "Experience", score: 68 },
      { label: "Projects", score: 74 },
      { label: "Job Requirements", score: 66 },
    ],
    matching: [
      { skill: "Node.js", weight: 84 },
      { skill: "Express", weight: 80 },
      { skill: "MongoDB", weight: 72 },
    ],
    missing: [
      { skill: "Relational modelling", weight: 68 },
      { skill: "Message queues", weight: 50 },
      { skill: "Docker", weight: 46 },
    ],
    strengths: ["Working API experience", "Willingness to own end-to-end features"],
    weaknesses: ["Little systems design signal", "No infrastructure exposure"],
    suggestions: [],
  },
];

export const mockApplications: Application[] = [
  {
    id: "app_1",
    company: "Stripe",
    role: "Software Engineer, Payments",
    location: "Bengaluru · Hybrid",
    status: "Applied",
    date: "Aug 6, 2026",
    matchScore: 87,
    notes: "Tailored resume v4 submitted through careers portal.",
    timeline: [
      { label: "Saved role", date: "Aug 4" },
      { label: "Tailored resume", date: "Aug 5" },
      { label: "Applied", date: "Aug 6" },
    ],
  },
  {
    id: "app_2",
    company: "Google",
    role: "Frontend Engineer, Cloud Console",
    location: "Hyderabad · On-site",
    status: "Interview",
    date: "Aug 3, 2026",
    matchScore: 79,
    notes: "Round 1 scheduled with the console platform team.",
    timeline: [
      { label: "Applied", date: "Jul 22" },
      { label: "Recruiter screen", date: "Jul 29" },
      { label: "Interview scheduled", date: "Aug 3" },
    ],
  },
  {
    id: "app_3",
    company: "Razorpay",
    role: "Associate Backend Engineer",
    location: "Remote",
    status: "Assessment",
    date: "Jul 30, 2026",
    matchScore: 71,
    notes: "Take-home assessment due in 3 days.",
    timeline: [
      { label: "Applied", date: "Jul 26" },
      { label: "Assessment sent", date: "Jul 30" },
    ],
  },
  {
    id: "app_4",
    company: "Zoho",
    role: "Product Engineer Trainee",
    location: "Chennai · On-site",
    status: "Saved",
    date: "Jul 28, 2026",
    matchScore: 68,
    notes: "Needs a resume variant focused on product engineering.",
    timeline: [{ label: "Saved role", date: "Jul 28" }],
  },
  {
    id: "app_5",
    company: "Freshworks",
    role: "Software Developer I",
    location: "Chennai · Hybrid",
    status: "Offer",
    date: "Jul 18, 2026",
    matchScore: 84,
    notes: "Offer received. Deciding by Aug 20.",
    timeline: [
      { label: "Applied", date: "Jun 30" },
      { label: "Interviews", date: "Jul 10" },
      { label: "Offer", date: "Jul 18" },
    ],
  },
  {
    id: "app_6",
    company: "Swiggy",
    role: "Frontend Engineer I",
    location: "Bengaluru · Hybrid",
    status: "Rejected",
    date: "Jul 12, 2026",
    matchScore: 62,
    notes: "Feedback: wanted deeper testing experience.",
    timeline: [
      { label: "Applied", date: "Jun 24" },
      { label: "Rejected", date: "Jul 12" },
    ],
  },
  {
    id: "app_7",
    company: "Postman",
    role: "Frontend Engineer, Platform",
    location: "Bengaluru · Remote",
    status: "Applied",
    date: "Aug 1, 2026",
    matchScore: 77,
    notes: "Referred by a senior from college.",
    timeline: [
      { label: "Saved role", date: "Jul 29" },
      { label: "Applied", date: "Aug 1" },
    ],
  },
];

export const mockCoverLetter: CoverLetter = {
  id: "cl_1",
  company: "Stripe",
  role: "Software Engineer, Payments",
  tone: "Professional",
  length: "Medium",
  createdAt: "Aug 6, 2026",
  body: `Dear Hiring Team,

I am applying for the Software Engineer, Payments role at Stripe. I build full-stack web applications with React, Node.js and MongoDB, and I am drawn to Stripe because payments infrastructure demands the kind of correctness and clarity I try to bring to every feature I ship.

During my internship at Nimbus Labs I worked on an internal operations application used daily by a support team. I designed REST endpoints, implemented the React interface for them, and learned to defend design decisions in code review. On my own, I built CampusHire, a placement portal where students track recruitment drives — it taught me how to model data carefully when several people depend on the same records being accurate.

The parts of this role that map most directly to my experience are API development, working across the frontend and backend of a feature, and communicating clearly with reviewers. The areas I am actively strengthening are automated testing and relational data modelling, and I would welcome a team that expects both.

I would be glad to talk about how I can contribute to the payments team.

Sincerely,
Aarav Sharma`,
};

export const mockActivity: ActivityItem[] = [
  {
    id: "ac_1",
    title: "Analysed Stripe — Software Engineer, Payments",
    detail: "87% match · 4 recommendations generated",
    time: "2 hours ago",
    kind: "analysis",
  },
  {
    id: "ac_2",
    title: "Tailored resume v4",
    detail: "3 of 5 suggested edits accepted",
    time: "3 hours ago",
    kind: "tailoring",
  },
  {
    id: "ac_3",
    title: "Generated cover letter for Stripe",
    detail: "Professional tone · medium length",
    time: "Yesterday",
    kind: "cover",
  },
  {
    id: "ac_4",
    title: "Moved Google application to Interview",
    detail: "Round 1 scheduled Aug 12",
    time: "2 days ago",
    kind: "application",
  },
  {
    id: "ac_5",
    title: "Uploaded aarav_sharma_frontend.pdf",
    detail: "Parsed 7 skills, 2 projects, 1 degree",
    time: "Last week",
    kind: "resume",
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "n_1",
    title: "Assessment deadline approaching",
    detail: "Razorpay take-home is due in 3 days.",
    time: "1h ago",
    unread: true,
  },
  {
    id: "n_2",
    title: "Resume score improved",
    detail: "Your master resume moved from 78 to 82.",
    time: "Yesterday",
    unread: true,
  },
  {
    id: "n_3",
    title: "Interview scheduled",
    detail: "Google Frontend Engineer, Aug 12 at 3:00 PM.",
    time: "2 days ago",
    unread: false,
  },
];

export const sampleJobDescription = `Software Engineer, Payments — Stripe

We are looking for an engineer to help build and maintain the services behind Stripe's payment APIs.

Responsibilities
- Design, build and document REST APIs used by internal and external developers
- Work across the stack: Node.js services and React interfaces
- Write automated tests and participate in code review
- Model data carefully in relational and document databases
- Collaborate with product and design on user-facing flows

Requirements
- Strong JavaScript/TypeScript fundamentals
- Experience with React and a Node.js backend framework
- Understanding of API design and HTTP semantics
- Familiarity with SQL or PostgreSQL
- Comfort with testing tools and CI pipelines
- Bonus: interest in payments, fintech or developer tooling`;
