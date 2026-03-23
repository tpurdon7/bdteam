import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable, type TableColumn } from "@/components/ui/data-table";
import { formatDateTime } from "@/lib/utils";
import type { IcpRecord } from "@/types/domain";

const columns: TableColumn<IcpRecord>[] = [
  {
    key: "title",
    label: "ICP",
    render: (icp) => (
      <div>
        <p className="font-medium text-white">{icp.title}</p>
        <p className="mt-1 text-sm text-neutral-400">{icp.description}</p>
      </div>
    )
  },
  {
    key: "focus",
    label: "Focus",
    render: (icp) => (
      <div className="space-y-1 text-sm text-neutral-300">
        <p>{icp.geography.join(", ")}</p>
        <p className="text-neutral-500">{icp.sectors.join(", ")}</p>
      </div>
    )
  },
  {
    key: "targets",
    label: "Targets",
    render: (icp) => <span className="text-sm text-neutral-300">{icp.roleTargets.join(", ")}</span>
  },
  {
    key: "priority",
    label: "Priority",
    render: (icp) => <span className="text-lg font-semibold text-lime-300">{icp.priorityScore}</span>
  },
  {
    key: "lastRun",
    label: "Last run",
    render: (icp) => <span>{icp.lastRunAt ? formatDateTime(icp.lastRunAt) : "Never"}</span>
  },
  {
    key: "actions",
    label: "Actions",
    render: () => (
      <div className="flex gap-2">
        <Button variant="secondary">Edit</Button>
        <Button variant="ghost">Duplicate</Button>
      </div>
    )
  }
];

export function IcpList({ icps }: { icps: IcpRecord[] }) {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl text-white">Search definitions</h2>
          <p className="text-sm text-neutral-500">Manual runs stay explicit and reviewable.</p>
        </div>
        <Button>New ICP</Button>
      </div>
      <DataTable columns={columns} rows={icps} emptyState="No ICPs have been defined yet." />
    </Card>
  );
}
