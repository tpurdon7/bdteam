import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";
import type { ActivityRecord } from "@/types/domain";

export function RecentActivity({ activities }: { activities: ActivityRecord[] }) {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl text-white">Recent workflow activity</h2>
        <Badge tone="warning">Failures visible</Badge>
      </div>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="rounded-xl border border-white/8 bg-black/20 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-medium text-white">{activity.summary}</p>
              <span className="text-xs text-neutral-500">{formatDateTime(activity.createdAt)}</span>
            </div>
            <p className="mt-1 text-sm text-neutral-400">
              {activity.actorName} · {activity.type}
            </p>
            {activity.details ? <p className="mt-2 text-sm text-neutral-500">{activity.details}</p> : null}
          </div>
        ))}
      </div>
    </Card>
  );
}
