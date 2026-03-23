import { ReviewQueue } from "@/components/review/review-queue";
import { PageHeader } from "@/components/ui/page-header";
import { getDraftQueue, getLeads } from "@/lib/repositories/platform";

export default async function ReviewPage() {
  const [leads, drafts] = await Promise.all([getLeads(), getDraftQueue()]);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Human Review"
        title="Draft review queue"
        description="Approve, edit, reject, or archive outbound drafts before anything reaches Gmail."
      />
      <ReviewQueue leads={leads} drafts={drafts} />
    </div>
  );
}
