import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/_shell/settings")({
  head: () => ({
    meta: [
      { title: "Settings — ApplyIQ" },
      { name: "description", content: "Appearance, notification and account settings for ApplyIQ." },
      { property: "og:title", content: "Settings — ApplyIQ" },
      { property: "og:description", content: "Appearance, notification and account settings for ApplyIQ." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { mode, setMode } = useTheme();
  const { logout } = useAuth();

  return (
    <div className="space-y-8">
      <PageHeader title="Settings" description="Appearance, notifications and account controls." />

      <Card className="p-6">
        <p className="text-sm font-semibold">Appearance</p>
        <div className="mt-4 max-w-xs space-y-1.5">
          <Label>Theme</Label>
          <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">Match system</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="p-6">
        <p className="text-sm font-semibold">Notifications</p>
        <div className="mt-4 space-y-4">
          {[
            ["Analysis finished", "Tell me when a match report is ready"],
            ["Application reminders", "Nudge me if a role sits untouched for a week"],
            ["Product updates", "New ApplyIQ features and improvements"],
          ].map(([title, detail], i) => (
            <div key={title} className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs text-muted-foreground">{detail}</p>
              </div>
              <Switch defaultChecked={i < 2} onCheckedChange={() => toast.success("Preference updated")} />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <p className="text-sm font-semibold">Account</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Data export and account deletion arrive with the backend phase.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => toast.success("Export queued")}>
            Export my data
          </Button>
          <Button variant="ghost" onClick={logout}>
            Sign out
          </Button>
        </div>
      </Card>
    </div>
  );
}
