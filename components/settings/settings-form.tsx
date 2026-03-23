import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { SettingsRecord } from "@/types/domain";

export function SettingsForm({ settings }: { settings: SettingsRecord }) {
  return (
    <form className="space-y-6">
      <Card className="grid gap-5 md:grid-cols-2">
        <Field label="Brand tone" name="brandTone" defaultValue={settings.brandTone} />
        <Field
          label="Writing preferences"
          name="writingPreferences"
          defaultValue={settings.writingPreferences.join(", ")}
        />
        <Field label="Signature block" name="signatureBlock" defaultValue={settings.signatureBlock} textarea />
        <Field label="Outreach rules" name="outreachRules" defaultValue={settings.outreachRules.join(", ")} textarea />
        <Field label="Cooldown days" name="cooldownDays" defaultValue={String(settings.cooldownDays)} />
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-300" htmlFor="approvalDefault">
            Approval default
          </label>
          <select
            id="approvalDefault"
            name="approvalDefault"
            defaultValue={settings.approvalDefault}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
          >
            <option value="draft">Draft</option>
            <option value="review">Review</option>
            <option value="send">Send</option>
          </select>
        </div>
      </Card>

      <Card className="space-y-4">
        <h2 className="font-serif text-xl text-white">Integrations</h2>
        <p className="text-sm text-neutral-400">
          Placeholder blocks for OpenAI, Gmail, and n8n secrets belong in environment variables and Supabase-managed settings records.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          <IntegrationBlock title="OpenAI" value="Model config in env" />
          <IntegrationBlock title="n8n" value="Shared secret and webhook URLs" />
          <IntegrationBlock title="Gmail" value="OAuth client to be configured" />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button type="submit">Save settings</Button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  textarea
}: {
  label: string;
  name: string;
  defaultValue: string;
  textarea?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-neutral-300" htmlFor={name}>
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          defaultValue={defaultValue}
          rows={4}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
        />
      ) : (
        <input
          id={name}
          name={name}
          defaultValue={defaultValue}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
        />
      )}
    </div>
  );
}

function IntegrationBlock({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">{title}</p>
      <p className="mt-2 text-sm text-neutral-300">{value}</p>
    </div>
  );
}
