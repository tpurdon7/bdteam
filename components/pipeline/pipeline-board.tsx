import { Card } from "@/components/ui/card";
import type { LeadStatus, LeadRecord } from "@/types/domain";

const stages: LeadStatus[] = [
  "discovered",
  "qualified",
  "contact_path_found",
  "draft_ready",
  "needs_review",
  "draft_created",
  "sent",
  "replied",
  "followup_due",
  "archived"
];

export function PipelineBoard({ leads }: { leads: LeadRecord[] }) {
  return (
    <div className="grid gap-4 xl:grid-cols-5">
      {stages.map((stage) => {
        const stageLeads = leads.filter((lead) => lead.status === stage);

        return (
          <Card key={stage} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-300">
                {stage.replaceAll("_", " ")}
              </h2>
              <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-neutral-500">{stageLeads.length}</span>
            </div>
            <div className="space-y-3">
              {stageLeads.map((lead) => (
                <div key={lead.id} className="rounded-xl border border-white/8 bg-black/20 p-4">
                  <p className="font-medium text-white">{lead.companyName}</p>
                  <p className="mt-1 text-sm text-neutral-400">
                    {lead.personName} · {lead.roleTitle}
                  </p>
                  <p className="mt-2 text-sm text-neutral-500">{lead.nextRecommendedAction}</p>
                </div>
              ))}
              {!stageLeads.length ? <p className="text-sm text-neutral-600">No leads in this stage.</p> : null}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
