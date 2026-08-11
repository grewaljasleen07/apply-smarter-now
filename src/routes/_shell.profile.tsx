import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useStats } from "@/hooks/useApplyIQData";

export const Route = createFileRoute("/_shell/profile")({
  head: () => ({
    meta: [
      { title: "Your profile — ApplyIQ" },
      { name: "description", content: "Your ApplyIQ account details and application statistics." },
      { property: "og:title", content: "Your profile — ApplyIQ" },
      { property: "og:description", content: "Your ApplyIQ account details and application statistics." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();
  const { data: stats } = useStats();

  return (
    <div className="space-y-8">
      <PageHeader title="Profile" description="Your account details and how much you've done with ApplyIQ." />

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-full bg-primary-soft text-lg font-semibold text-primary">
              {user?.initials}
            </span>
            <div>
              <p className="text-sm font-semibold">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.headline}</p>
            </div>
          </div>

          <form
            className="mt-6 grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Profile saved");
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="p-name">Full name</Label>
              <Input id="p-name" defaultValue={user?.name} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="p-email">Email</Label>
              <Input id="p-email" type="email" defaultValue={user?.email} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="p-headline">Headline</Label>
              <Input id="p-headline" defaultValue={user?.headline} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="p-location">Location</Label>
              <Input id="p-location" defaultValue={user?.location} />
            </div>
            <Button type="submit" className="sm:col-span-2 sm:w-fit">
              Save changes
            </Button>
          </form>
        </Card>

        <Card className="p-6">
          <p className="text-sm font-semibold">Your numbers</p>
          <dl className="mt-4 space-y-3 text-sm">
            {[
              ["Resumes", stats?.resumes],
              ["Analyses run", stats?.analyses],
              ["Applications", stats?.applications],
              ["Interviews", stats?.interviews],
              ["Offers", stats?.offers],
              ["Average match", stats ? `${stats.averageMatch}%` : undefined],
            ].map(([label, value]) => (
              <div key={String(label)} className="flex items-center justify-between">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="font-semibold tabular-nums">{value ?? "—"}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-muted-foreground">Member since {user?.joinedAt}</p>
        </Card>
      </div>
    </div>
  );
}
