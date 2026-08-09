import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileSearch,
  FileText,
  Layers,
  Lock,
  PenLine,
  ShieldCheck,
  Sparkles,
  Target,
  Upload,
  Wand2,
} from "lucide-react";
import { PublicFooter, PublicHeader } from "@/components/layout/PublicChrome";
import { Reveal, SectionHeading, SectionShell } from "@/components/shared/Section";
import {
  AnalysisPreview,
  CoverLetterPreview,
  HeroPreview,
  ResumePreview,
  TailoringPreview,
  TrackerPreview,
} from "@/components/product/Previews";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import jobSeeker from "@/assets/job-seeker.jpg";

const title = "ApplyIQ — AI resume analysis, tailoring & application tracking";
const description =
  "ApplyIQ scores your resume against a specific job description, shows the skills you are missing, rewrites weak bullet points with your approval, drafts cover letters and tracks every application.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <DemoSection />
        <MatchingSection />
        <TailoringSection />
        <CoverLetterSection />
        <TrackerSection />
        <BenefitsSection />
        <AudienceSection />
        <TrustSection />
        <RoadmapSection />
        <FaqSection />
        <FinalCta />
      </main>
      <PublicFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-14 sm:px-8 md:pb-28 md:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-primary-soft/70 to-transparent"
      />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-subtle">
              <Sparkles className="size-3.5 text-primary" />
              Phase 1 · full product experience with simulated AI
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-[3.4rem]">
              Apply smarter.
              <br />
              <span className="text-gradient-brand">Get hired faster.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              ApplyIQ reads your resume and a specific job description, then tells you exactly how
              well they match, what is missing, and how to fix it — line by line, with your
              approval on every change.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link to="/signup">
                  Analyse my resume <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#demo">See the product</a>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-6">
              {[
                ["6 steps", "Upload to tracked application"],
                ["Line level", "Suggestions you approve"],
                ["One place", "Resumes, letters, applications"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="text-sm font-semibold">{value}</dt>
                  <dd className="mt-1 text-xs leading-snug text-muted-foreground">{label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <Reveal delay={0.1} y={24}>
          <HeroPreview />
        </Reveal>
      </div>
    </section>
  );
}

const problems = [
  {
    icon: FileText,
    title: "One resume for every role",
    body: "The same document gets sent to a backend role and a data role. Neither reader sees what they were looking for.",
  },
  {
    icon: FileSearch,
    title: "Keyword filters you cannot see",
    body: "Screening tools reject applications for vocabulary reasons, and the rejection email never explains which words were missing.",
  },
  {
    icon: Clock,
    title: "Hours lost to rewriting",
    body: "Manually re-editing bullet points for every posting is slow, and it is the first thing people skip when they are applying at volume.",
  },
  {
    icon: ClipboardList,
    title: "No record of what happened",
    body: "Applications live across email, spreadsheets and browser tabs, so follow-ups get missed and patterns go unnoticed.",
  },
];

function ProblemSection() {
  return (
    <SectionShell id="problem" tone="surface">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="The problem"
            title="Applying is not the hard part. Applying well is."
            description="Most candidates are not rejected because they lack ability. They are rejected because the resume in front of the reader does not answer the specific role in front of them."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {problems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="h-full rounded-xl border border-border p-5">
                  <item.icon className="size-5 text-primary" />
                  <p className="mt-3 text-sm font-semibold">{item.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-border bg-secondary/40">
            <img
              src={jobSeeker}
              alt="A graduate reviewing their printed resume beside a laptop"
              loading="lazy"
              width={1280}
              height={960}
              className="w-full"
            />
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

const steps = [
  {
    icon: Upload,
    title: "Upload your resume",
    body: "PDF or DOCX. ApplyIQ parses it into structured sections — education, experience, projects, skills and certifications.",
  },
  {
    icon: ClipboardList,
    title: "Paste the job description",
    body: "Add the role you are actually applying for. Requirements are extracted and weighted by how central they are to the posting.",
  },
  {
    icon: Brain,
    title: "Get a semantic match score",
    body: "A score out of 100 with a section-level breakdown, so you can see whether the gap is skills, experience or wording.",
  },
  {
    icon: Wand2,
    title: "Review tailored rewrites",
    body: "Suggestions arrive as before-and-after pairs. Accept, edit or reject each one — nothing is changed silently.",
  },
  {
    icon: PenLine,
    title: "Generate a cover letter",
    body: "A grounded draft built from your real experience, in the tone and length you pick, ready to edit and export.",
  },
  {
    icon: BarChart3,
    title: "Track every application",
    body: "Move roles through Saved, Applied, Assessment, Interview, Offer and Rejected, with notes and a timeline per application.",
  },
];

function HowItWorks() {
  return (
    <SectionShell id="how-it-works">
      <SectionHeading
        eyebrow="How it works"
        title="Six steps from a generic resume to a tracked application"
        description="Each step produces something you can act on immediately, and nothing depends on you trusting a score you cannot inspect."
        align="center"
      />
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <Reveal key={step.title} delay={index * 0.05}>
            <div className="panel h-full p-6">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary">
                  <step.icon className="size-5" />
                </span>
                <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-4 text-base font-semibold">{step.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

function DemoSection() {
  return (
    <SectionShell id="demo" tone="surface">
      <SectionHeading
        eyebrow="Product demo"
        title="Look through the actual screens"
        description="These are the real interfaces, running on sample data. Switch between them to see what each stage of the workflow gives you."
        align="center"
      />
      <Reveal delay={0.08} className="mt-12">
        <Tabs defaultValue="analysis">
          <TabsList className="mx-auto flex w-full max-w-2xl flex-wrap justify-center">
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="tailoring">Tailoring</TabsTrigger>
            <TabsTrigger value="letter">Cover letter</TabsTrigger>
            <TabsTrigger value="tracker">Tracker</TabsTrigger>
          </TabsList>
          <div className="mt-8">
            <TabsContent value="resume">
              <ResumePreview />
            </TabsContent>
            <TabsContent value="analysis">
              <AnalysisPreview />
            </TabsContent>
            <TabsContent value="tailoring">
              <TailoringPreview />
            </TabsContent>
            <TabsContent value="letter">
              <CoverLetterPreview />
            </TabsContent>
            <TabsContent value="tracker">
              <TrackerPreview />
            </TabsContent>
          </div>
        </Tabs>
      </Reveal>
    </SectionShell>
  );
}

function MatchingSection() {
  return (
    <SectionShell id="matching">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="AI matching"
            title="A score is only useful if you can see why"
            description="ApplyIQ compares meaning, not just keywords, so 'built REST endpoints' still counts when the posting asks for API development. Every number opens into the evidence behind it."
          />
          <ul className="mt-8 space-y-4">
            {[
              [Target, "Section-level breakdown across skills, experience, education and keywords."],
              [Layers, "Requirement weighting, so a core requirement moves the score more than a nice-to-have."],
              [CheckCircle2, "Matching skills listed with the line in your resume that earned the match."],
              [Sparkles, "Missing skills separated into 'add this wording' and 'genuinely learn this'."],
            ].map(([Icon, text]) => {
              const IconCmp = Icon as typeof Target;
              return (
                <li key={text as string} className="flex gap-3">
                  <IconCmp className="mt-0.5 size-4.5 shrink-0 text-primary" />
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {text as string}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <Reveal delay={0.1}>
          <AnalysisPreview compact />
        </Reveal>
      </div>
    </SectionShell>
  );
}

function TailoringSection() {
  return (
    <SectionShell id="tailoring" tone="surface">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <SectionHeading
          eyebrow="Resume tailoring"
          title="Rewrites you approve, one line at a time"
          description="ApplyIQ never overwrites your resume. It proposes a stronger version of a specific bullet point, highlights what changed, and waits for you to accept, edit or reject it."
        />
        <Reveal delay={0.1}>
          <TailoringPreview />
        </Reveal>
      </div>
    </SectionShell>
  );
}

function CoverLetterSection() {
  return (
    <SectionShell id="cover-letters">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <SectionHeading
          eyebrow="Cover letters"
          title="Drafts grounded in what you actually did"
          description="Pick the company, role, tone and length. The letter is written from your parsed experience — no invented achievements, no filler paragraphs about being passionate."
        />
        <Reveal delay={0.1}>
          <CoverLetterPreview />
        </Reveal>
      </div>
    </SectionShell>
  );
}

function TrackerSection() {
  return (
    <SectionShell id="tracker" tone="surface">
      <SectionHeading
        eyebrow="Application tracking"
        title="Every application, one board"
        description="Six stages, notes per role, and a timeline that shows what happened and when — so follow-ups stop depending on memory."
        align="center"
      />
      <Reveal delay={0.08} className="mt-12">
        <TrackerPreview />
      </Reveal>
    </SectionShell>
  );
}

const benefits: [string, string][] = [
  ["Stop guessing", "See the fit before you apply, not after a rejection email."],
  ["Apply faster", "Tailoring a resume drops from an hour of editing to a few reviewed suggestions."],
  ["Learn as you go", "Recurring missing skills tell you what to build next."],
  ["Stay organised", "One place for resume versions, letters and application status."],
  ["Write with evidence", "Letters and bullets reference real projects and real numbers."],
  ["Keep control", "Nothing is submitted or rewritten without you clicking accept."],
];

function BenefitsSection() {
  return (
    <SectionShell id="benefits">
      <SectionHeading
        eyebrow="Benefits"
        title="What changes when you apply with ApplyIQ"
        align="center"
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map(([title, body], index) => (
          <Reveal key={title} delay={index * 0.05}>
            <div className="h-full rounded-xl border border-border bg-card p-6">
              <CheckCircle2 className="size-5 text-success" />
              <p className="mt-3 text-sm font-semibold">{title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

const audiences = [
  {
    title: "Final-year students",
    body: "Placement season means dozens of postings in a few weeks. ApplyIQ makes each application specific without starting from scratch.",
  },
  {
    title: "Recent graduates",
    body: "Limited experience makes wording matter more. Suggestions show how to present projects and internships in the language of the role.",
  },
  {
    title: "Career switchers",
    body: "Transferable experience is easy to undersell. The match view surfaces the overlap you already have and names the real gaps.",
  },
  {
    title: "Working professionals",
    body: "Applying quietly alongside a job means time is the constraint. Tailoring and tracking both take minutes, not evenings.",
  },
];

function AudienceSection() {
  return (
    <SectionShell id="audience" tone="surface">
      <SectionHeading
        eyebrow="Who it's for"
        title="Built for people applying to specific roles, not blasting a PDF"
        align="center"
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {audiences.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.06}>
            <div className="h-full rounded-xl border border-border p-6">
              <p className="text-base font-semibold">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

function TrustSection() {
  return (
    <SectionShell id="trust" tone="deep">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <SectionHeading
          eyebrow="Honest by design"
          invert
          title="Your resume, your decisions"
          description="ApplyIQ is an assistant, not an autopilot. It explains its reasoning, keeps you in the approval loop, and does not pretend to guarantee outcomes it cannot control."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            [Lock, "Your documents", "Resumes and letters belong to you and are never shared with employers by ApplyIQ."],
            [ShieldCheck, "No fabrication", "Suggestions rewrite what you did. They do not invent experience you do not have."],
            [Sparkles, "Explained scores", "Every score opens into the requirements and evidence behind it."],
            [CheckCircle2, "Approval first", "Changes apply only after you accept them, and old versions stay available."],
          ].map(([Icon, title, body], index) => {
            const IconCmp = Icon as typeof Lock;
            return (
              <Reveal key={title as string} delay={index * 0.05}>
                <div className="h-full rounded-xl border border-background/15 bg-background/5 p-5">
                  <IconCmp className="size-5" />
                  <p className="mt-3 text-sm font-semibold">{title as string}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-background/70">
                    {body as string}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}

const roadmap = [
  {
    phase: "Phase 1 · now",
    title: "Complete product experience",
    body: "Full interface for parsing, analysis, tailoring, cover letters and tracking, driven by realistic simulated AI responses.",
    active: true,
  },
  {
    phase: "Phase 2",
    title: "Live AI models",
    body: "Real parsing and semantic matching behind the same service layer the interface already calls.",
  },
  {
    phase: "Phase 3",
    title: "Accounts and history",
    body: "Persistent resume versions, saved analyses and application history across devices.",
  },
  {
    phase: "Phase 4",
    title: "Interview preparation",
    body: "Question sets generated from the gap between your resume and the role you applied for.",
  },
];

function RoadmapSection() {
  return (
    <SectionShell id="roadmap">
      <SectionHeading
        eyebrow="Roadmap"
        title="Where ApplyIQ is today, and where it goes next"
        description="Phase 1 is deliberately complete on the experience side: every screen, state and interaction exists, with the AI layer simulated behind a service boundary."
        align="center"
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {roadmap.map((item, index) => (
          <Reveal key={item.phase} delay={index * 0.06}>
            <div
              className={
                item.active
                  ? "h-full rounded-xl border border-primary/30 bg-primary-soft/60 p-6"
                  : "h-full rounded-xl border border-border p-6"
              }
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {item.phase}
              </p>
              <p className="mt-3 text-sm font-semibold">{item.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

const faqs: [string, string][] = [
  [
    "Is the AI real in this version?",
    "Phase 1 runs on realistic simulated responses behind a service layer with the same shapes real models will return. Swapping in live models does not require rebuilding the interface.",
  ],
  [
    "Will ApplyIQ rewrite my resume automatically?",
    "No. Suggestions are shown as before-and-after pairs and applied only when you accept them. You can edit a suggestion before accepting, or reject it entirely.",
  ],
  [
    "How is the match score calculated?",
    "Requirements are extracted from the job description and weighted by prominence, then compared semantically against your resume. The score breaks down by skills, experience, education and keyword coverage.",
  ],
  [
    "Does a high score guarantee an interview?",
    "No, and ApplyIQ does not claim it does. A high score means the resume answers the posting clearly. Hiring decisions depend on many factors outside the document.",
  ],
  [
    "Can I keep several resume versions?",
    "Yes. Each tailored resume is saved as its own version against the role it was written for, so you can compare them later.",
  ],
  [
    "What file formats can I upload?",
    "PDF and DOCX. Parsed output is shown to you section by section so you can confirm nothing was misread before analysis runs.",
  ],
];

function FaqSection() {
  return (
    <SectionShell id="faq" tone="surface">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions people ask first"
          description="If something is not answered here, the product demo above shows the behaviour directly."
        />
        <Reveal delay={0.08}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map(([question, answer]) => (
              <AccordionItem key={question} value={question}>
                <AccordionTrigger className="text-left text-sm font-medium">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </SectionShell>
  );
}

function FinalCta() {
  return (
    <SectionShell>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="panel relative overflow-hidden px-6 py-14 text-center sm:px-14"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-soft/80 via-transparent to-success-soft/50"
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Find out how your resume reads for the role you actually want
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Upload a resume, paste a job description, and get a scored breakdown with rewrites you
            control. Free to try, no card required.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/signup">
                Create free account <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/login">Log in</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  );
}
