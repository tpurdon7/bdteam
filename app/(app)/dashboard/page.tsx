import { RecentActivity } from "@/components/dashboard/recent-activity";
import { StatCard } from "@/components/dashboard/stat-card";
import { TopOpportunities } from "@/components/dashboard/top-opportunities";
import { PageHeader } from "@/components/ui/page-header";
import {
  getActivities,
  getDashboardStats,
  getTopOpportunities,
  getWorkflowRuns
} from "@/lib/repositories/platform";

export default async function DashboardPage() {
  const [stats, activities, opportunities, workflowRuns] = await Promise.all([
    getDashboardStats(),
    getActivities(),
    getTopOpportunities(),
    getWorkflowRuns()
  ]);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Operations"
        title="Dashboard"
        description="Review queue health, workflow execution, and the best outbound opportunities right now."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total leads" value={stats.totalLeads} trend="All active and archived lead records." />
        <StatCard label="Strong leads" value={stats.strongLeads} trend="Score 85 and above." />
        <StatCard label="Draft-ready leads" value={stats.draftReadyLeads} trend="Ready for message generation review." />
        <StatCard label="Awaiting review" value={stats.awaitingReview} trend="Human approval required." />
        <StatCard label="Sent this week" value={stats.sentThisWeek} trend="External outreach events logged this week." />
        <StatCard label="Follow-ups due" value={stats.followUpsDue} trend="Leads that need operator attention." />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <TopOpportunities leads={opportunities} />
        <RecentActivity activities={activities} />
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl text-white">Workflow health</h2>
          <p className="text-sm text-neutral-500">Recent n8n execution states</p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {workflowRuns.map((run) => (
            <div key={run.id} className="rounded-xl border border-white/8 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">{run.kind.replaceAll("_", " ")}</p>
              <p className="mt-2 text-lg font-medium text-white">{run.externalRunId}</p>
              <p className="mt-1 text-sm text-neutral-400">
                Status: <span className="text-white">{run.status}</span>
              </p>
              {run.lastError ? <p className="mt-2 text-sm text-red-300">{run.lastError}</p> : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
