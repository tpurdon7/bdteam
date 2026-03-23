import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface TableColumn<T> {
  key: string;
  label: string;
  render: (row: T) => ReactNode;
  className?: string;
}

export function DataTable<T>({
  columns,
  rows,
  emptyState
}: {
  columns: TableColumn<T>[];
  rows: T[];
  emptyState?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-white/[0.03]">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn("px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500", column.className)}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-neutral-950/80">
            {rows.length ? (
              rows.map((row, index) => (
                <tr key={index} className="hover:bg-white/[0.02]">
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-4 align-top text-sm text-neutral-200">
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-sm text-neutral-500">
                  {emptyState ?? "No records."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
