import { PipelineBoard } from "@/components/pipeline/pipeline-board";
import { PageHeader } from "@/components/ui/page-header";
import { getLeads } from "@/lib/repositories/platform";

export default async function PipelinePage() {
  const leads = await getLeads();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Pipeline"
        title="Lead pipeline"
        description="Kanban view across the outbound operating states from discovery to reply or archive."
      />
      <PipelineBoard leads={leads} />
    </div>
  );
}
