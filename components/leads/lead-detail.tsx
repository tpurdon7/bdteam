import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";
import type { LeadRecord } from "@/types/domain";

export function LeadDetail({ lead }: { lead: LeadRecord }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.3fr_0.8fr]">
      <Card className="space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-lime-300/80">{lead.sector}</p>
            <h1 className="mt-2 font-serif text-3xl text-white">
              {lead.companyName} · {lead.personName}
            </h1>
            <p className="mt-1 text-neutral-400">
              {lead.roleTitle} · {lead.geography}
            </p>
          </div>
          <Badge tone="warning">{lead.status.replaceAll("_", " ")}</Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-white/8 bg-black/20 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">Why this lead matters</p>
            <p className="mt-2 text-sm text-neutral-200">{lead.whyThisLeadMatters}</p>
          </div>
          <div className="rounded-xl border border-white/8 bg-black/20 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">Best outreach angle</p>
            <p className="mt-2 text-sm text-neutral-200">{lead.bestOutreachAngle}</p>
          </div>
        </div>

        <div className="rounded-xl border border-white/8 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">Draft variants</p>
          <div className="mt-3 space-y-3">
            <p className="text-sm text-neutral-200"><span className="font-medium text-white">Short:</span> {lead.draftShort ?? "Not generated yet."}</p>
            <p className="text-sm text-neutral-200"><span className="font-medium text-white">Warm:</span> {lead.draftWarm ?? "Not generated yet."}</p>
            <p className="text-sm text-neutral-200"><span className="font-medium text-white">Follow-up:</span> {lead.draftFollowUp ?? "Not generated yet."}</p>
          </div>
        </div>

        <div className="rounded-xl border border-white/8 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">Source links</p>
          <div className="mt-3 space-y-2">
            {lead.sourceLinks.map((link) => (
              <a key={link} href={link} className="block text-sm text-lime-200 underline underline-offset-4">
                {link}
              </a>
            ))}
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="space-y-3">
          <h2 className="font-serif text-xl text-white">Contact intelligence</h2>
          <div className="text-sm text-neutral-300">
            <p>
              Best path: {lead.bestContactPath?.type ?? "Unknown"} · {lead.bestContactPath?.value ?? "Pending"}
            </p>
            <p className="mt-1 text-neutral-500">
              Confidence: {lead.contactConfidence}% · Updated {formatDateTime(lead.updatedAt)}
            </p>
          </div>
          {lead.bestContactPath?.sourceUrl ? (
            <a href={lead.bestContactPath.sourceUrl} className="text-sm text-lime-200 underline underline-offset-4">
              Source provenance
            </a>
          ) : null}
        </Card>
        <Card className="space-y-3">
          <h2 className="font-serif text-xl text-white">Recommended action</h2>
          <p className="text-sm text-neutral-300">{lead.nextRecommendedAction}</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-white/8 bg-black/20 p-4">
              <p className="text-neutral-500">Score</p>
              <p className="mt-1 text-2xl font-semibold text-lime-300">{lead.score}</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-black/20 p-4">
              <p className="text-neutral-500">Owner</p>
              <p className="mt-1 text-white">{lead.ownerName}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
