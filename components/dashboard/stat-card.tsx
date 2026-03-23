import { ArrowUpRight } from "lucide-react";

import { Card } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  trend
}: {
  label: string;
  value: string | number;
  trend: string;
}) {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-400">{label}</p>
        <ArrowUpRight className="h-4 w-4 text-lime-300" />
      </div>
      <div>
        <p className="text-3xl font-semibold tracking-tight text-white">{value}</p>
        <p className="mt-1 text-sm text-neutral-500">{trend}</p>
      </div>
    </Card>
  );
}
