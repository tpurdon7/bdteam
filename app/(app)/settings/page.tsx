import { SettingsForm } from "@/components/settings/settings-form";
import { PageHeader } from "@/components/ui/page-header";
import { getSettings } from "@/lib/repositories/platform";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Configuration"
        title="Settings"
        description="Control tone, approval defaults, cooldown rules, and integration placeholders."
      />
      <SettingsForm settings={settings} />
    </div>
  );
}
