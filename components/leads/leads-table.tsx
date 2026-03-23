import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DataTable, type TableColumn } from "@/components/ui/data-table";
import { formatDateTime } from "@/lib/utils";
import type { LeadRecord } from "@/types/domain";

const columns: TableColumn<LeadRecord>[] = [
  {
    key: "company",
    label: "Company / Person",
    render: (lead) => (
      <div>
        <Link href={`/leads/${lead.id}`} className="font-medium text-white underline-offset-4 hover:underline">
          {lead.companyName}
        </Link>
        <p className="mt-1 text-sm text-neutral-400">
          {lead.personName} · {lead.roleTitle}
        </p>
      </div>
    )
  },
  {
    key: "location",
    label: "Geography / Sector",
    render: (lead) => (
      <div className="text-sm text-neutral-300">
        <p>{lead.geography}</p>
        <p className="text-neutral-500">{lead.sector}</p>
      </div>
    )
  },
  {
    key: "score",
    label: "Score",
    render: (lead) => (
      <div>
        <p className="text-lg font-semibold text-lime-300">{lead.score}</p>
        <p className="text-xs text-neutral-500">Confidence {lead.contactConfidence}%</p>
      </div>
    )
  },
  {
    key: "status",
    label: "Status",
    render: (lead) => <Badge tone={lead.status === "needs_review" ? "warning" : "neutral"}>{lead.status.replaceAll("_", " ")}</Badge>
  },
  {
    key: "owner",
    label: "Owner",
    render: (lead) => <span>{lead.ownerName}</span>
  },
  {
    key: "updatedAt",
    label: "Updated",
    render: (lead) => <span>{formatDateTime(lead.updatedAt)}</span>
  }
];

export function LeadsTable({ leads }: { leads: LeadRecord[] }) {
  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-xl text-white">Lead review table</h2>
          <p className="text-sm text-neutral-500">Search, filter, bulk review, and drill into provenance.</p>
        </div>
        <div className="flex gap-2">
          <input
            className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-neutral-500"
            placeholder="Search company or person"
          />
          <select className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none">
            <option>All statuses</option>
            <option>Needs review</option>
            <option>Draft ready</option>
            <option>Qualified</option>
          </select>
        </div>
      </div>
      <DataTable columns={columns} rows={leads} emptyState="No leads available." />
    </Card>
  );
}
