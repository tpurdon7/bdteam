import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { DraftRecord, LeadRecord } from "@/types/domain";

export function ReviewQueue({
  leads,
  drafts
}: {
  leads: LeadRecord[];
  drafts: DraftRecord[];
}) {
  return (
    <div className="grid gap-4">
      {drafts.map((draft) => {
        const lead = leads.find((item) => item.id === draft.leadId);

        if (!lead) {
          return null;
        }

        return (
          <Card key={draft.id} className="space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-lime-300/80">{lead.status.replaceAll("_", " ")}</p>
                <h2 className="mt-2 font-serif text-2xl text-white">
                  {lead.companyName} · {lead.personName}
                </h2>
                <p className="text-sm text-neutral-400">{lead.bestOutreachAngle}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold text-lime-300">{lead.score}</p>
                <p className="text-sm text-neutral-500">confidence {lead.contactConfidence}%</p>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
              <div className="rounded-xl border border-white/8 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">Why selected</p>
                <ul className="mt-3 space-y-2 text-sm text-neutral-200">
                  {draft.whySelected.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-white/8 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">Personalization points</p>
                <ul className="mt-3 space-y-2 text-sm text-neutral-200">
                  {draft.personalizationPoints.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-white/8 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">Recommended action</p>
                <p className="mt-3 text-sm text-neutral-200">{lead.nextRecommendedAction}</p>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
              <DraftBlock title="Short" body={draft.shortDraft} />
              <DraftBlock title="Warm" body={draft.warmDraft} />
              <DraftBlock title="Follow-up" body={draft.followUpDraft} />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button>Edit</Button>
              <Button variant="secondary">Approve to draft</Button>
              <Button variant="secondary">Approve to send</Button>
              <Button variant="ghost">Reject</Button>
              <Button variant="danger">Archive</Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function DraftBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">{title}</p>
      <p className="mt-3 text-sm leading-6 text-neutral-200">{body}</p>
    </div>
  );
}
