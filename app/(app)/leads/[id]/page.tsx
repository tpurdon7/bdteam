import { notFound } from "next/navigation";

import { LeadDetail } from "@/components/leads/lead-detail";
import { PageHeader } from "@/components/ui/page-header";
import { getLeadById } from "@/lib/repositories/platform";

export default async function LeadDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await getLeadById(id);

  if (!lead) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Lead Detail"
        title={`${lead.companyName} / ${lead.personName}`}
        description="Full lead context, provenance, contact intelligence, and message drafts."
      />
      <LeadDetail lead={lead} />
    </div>
  );
}
