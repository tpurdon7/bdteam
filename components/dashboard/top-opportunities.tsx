import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { LeadRecord } from "@/types/domain";

export function TopOpportunities({ leads }: { leads: LeadRecord[] }) {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl text-white">Top opportunities</h2>
        <Badge tone="positive">Priority queue</Badge>
      </div>
      <div className="space-y-3">
        {leads.map((lead) => (
          <Link key={lead.id} href={`/leads/${lead.id}`} className="block rounded-xl border border-white/8 bg-black/20 p-4 transition hover:border-lime-300/30 hover:bg-black/30">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-white">
                  {lead.companyName} · {lead.personName}
                </p>
                <p className="mt-1 text-sm text-neutral-400">{lead.whyThisLeadMatters}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-lime-300">{lead.score}</p>
                <p className="text-xs uppercase tracking-[0.14em] text-neutral-500">{lead.status.replaceAll("_", " ")}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}
