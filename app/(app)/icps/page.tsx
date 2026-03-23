import { IcpList } from "@/components/icps/icp-list";
import { IcpRunHistory } from "@/components/icps/icp-run-history";
import { PageHeader } from "@/components/ui/page-header";
import { getIcps, getSearchRuns } from "@/lib/repositories/platform";

export default async function IcpsPage() {
  const [icps, runs] = await Promise.all([getIcps(), getSearchRuns()]);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Search Management"
        title="ICPs"
        description="Define target profiles, tune exclusions, and manually trigger reviewable discovery runs."
      />
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <IcpList icps={icps} />
        <IcpRunHistory runs={runs} />
      </div>
    </div>
  );
}
