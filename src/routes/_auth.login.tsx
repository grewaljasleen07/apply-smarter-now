import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/_auth/login")({
  head: () => ({
    meta: [
      { title: "Log in — ApplyIQ" },
      { name: "description", content: "Log in to ApplyIQ to analyse, tailor and track your job applications." },
      { property: "og:title", content: "Log in — ApplyIQ" },
      { property: "og:description", content: "Log in to ApplyIQ to analyse, tailor and track your job applications." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("aarav.sharma@example.com");
  const [password, setPassword] = useState("applyiq-demo");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await login(email, password);
    toast.success("Welcome back to ApplyIQ");
    navigate({ to: "/dashboard" });
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Log in to ApplyIQ</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Pick up where you left off with your resumes and applications.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between">
            <Label htmlFor="password">Password</Label>
            <span className="text-xs text-muted-foreground">Demo · any value works</span>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? "Signing you in" : "Log in"}
        </Button>
      </form>

      <p className="mt-6 text-sm text-muted-foreground">
        New here?{" "}
        <Link to="/signup" className="font-medium text-primary hover:underline">
          Create a free account
        </Link>
      </p>
    </div>
  );
}
