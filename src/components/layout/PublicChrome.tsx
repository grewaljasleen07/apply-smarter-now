import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Product demo", href: "#demo" },
  { label: "AI matching", href: "#matching" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
];

export function PublicHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-200",
        scrolled ? "border-border bg-card/85 backdrop-blur-md" : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link to="/" aria-label="ApplyIQ home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <Button asChild variant="ghost" size="sm">
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/signup">Get started free</Link>
          </Button>
        </div>

        <button
          className="grid size-9 place-items-center rounded-md border border-border sm:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-card px-5 py-4 sm:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            <Button asChild variant="outline">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Get started free</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-card px-5 py-12 sm:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            ApplyIQ helps you understand how your resume fits a specific role, improve it with your
            approval, and keep every application organised.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            A final-year project build. Phase 1 demonstrates the full product experience with
            simulated AI responses.
          </p>
        </div>
        <FooterColumn
          title="Product"
          items={[
            ["How it works", "#how-it-works"],
            ["Product demo", "#demo"],
            ["AI matching", "#matching"],
            ["Benefits", "#benefits"],
          ]}
        />
        <FooterColumn
          title="Resources"
          items={[
            ["Roadmap", "#roadmap"],
            ["FAQ", "#faq"],
            ["Who it's for", "#audience"],
            ["Privacy approach", "#trust"],
          ]}
        />
        <div>
          <p className="text-sm font-semibold">Get started</p>
          <div className="mt-3 flex flex-col gap-2">
            <Button asChild size="sm">
              <Link to="/signup">Create free account</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link to="/login">Log in</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 w-full max-w-6xl border-t border-border pt-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} ApplyIQ · Apply Smarter. Get Hired Faster.
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="text-sm text-muted-foreground hover:text-foreground">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
