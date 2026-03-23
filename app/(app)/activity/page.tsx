import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { getActivities } from "@/lib/repositories/platform";
import { formatDateTime } from "@/lib/utils";

export default async function ActivityPage() {
  const activities = await getActivities();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Audit Trail"
        title="Activity log"
        description="State changes, workflow events, failure reasons, and timestamps across the platform."
      />
      <Card className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="rounded-xl border border-white/8 bg-black/20 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Badge tone={activity.severity === "error" ? "danger" : activity.severity === "warning" ? "warning" : "neutral"}>
                  {activity.severity}
                </Badge>
                <p className="font-medium text-white">{activity.summary}</p>
              </div>
              <span className="text-sm text-neutral-500">{formatDateTime(activity.createdAt)}</span>
            </div>
            <p className="mt-2 text-sm text-neutral-400">
              {activity.actorName} · {activity.type}
            </p>
            {activity.details ? <p className="mt-2 text-sm text-neutral-500">{activity.details}</p> : null}
          </div>
        ))}
      </Card>
    </div>
  );
}
