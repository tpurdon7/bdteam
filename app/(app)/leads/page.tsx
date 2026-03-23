import { LeadsTable } from "@/components/leads/leads-table";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { getLeads } from "@/lib/repositories/platform";

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Lead Operations"
        title="Leads"
        description="Table-first lead review with clear provenance, ownership, and workflow status."
        actions={
          <>
            <Button variant="secondary">Bulk qualify</Button>
            <Button>New search run</Button>
          </>
        }
      />
      <LeadsTable leads={leads} />
    </div>
  );
}
