import { Card } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";
import type { SearchRunRecord } from "@/types/database";

export function IcpRunHistory({ runs }: { runs: SearchRunRecord[] }) {
  return (
    <Card className="space-y-4">
      <div>
        <h2 className="font-serif text-xl text-white">Recent runs</h2>
        <p className="text-sm text-neutral-500">Workflow-linked ICP discovery jobs.</p>
      </div>
      <div className="space-y-3">
        {runs.map((run) => (
          <div key={run.id} className="rounded-xl border border-white/8 bg-black/20 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-white">{run.source} run</p>
              <p className="text-xs text-neutral-500">{formatDateTime(run.startedAt)}</p>
            </div>
            <p className="mt-1 text-sm text-neutral-400">
              Status: {run.status} · Results: {run.resultCount}
            </p>
            {run.workflowRunId ? <p className="mt-1 text-xs text-neutral-500">Workflow: {run.workflowRunId}</p> : null}
          </div>
        ))}
      </div>
    </Card>
  );
}
