import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <div className="flex flex-col px-5 py-8 sm:px-10">
        <Link to="/" aria-label="ApplyIQ home">
          <Logo />
        </Link>
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">
            <Outlet />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Phase 1 demo — authentication is simulated locally. Any email and password works.
        </p>
      </div>

      <aside className="relative hidden overflow-hidden border-l border-border bg-primary-soft/50 p-12 lg:flex lg:flex-col lg:justify-center">
        <div className="max-w-md">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-dark">
            Smart job applications
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight">
            Understand how your resume fits, before you apply.
          </h2>
          <ul className="mt-8 space-y-4 text-sm text-muted-foreground">
            {[
              "Semantic match scoring against the actual job description",
              "Skill gaps named clearly, with evidence from your resume",
              "Tailored rewrites you approve line by line",
              "Cover letters and an application tracker in one place",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
