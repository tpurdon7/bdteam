import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

export function Card({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.8)]", className)}>
      {children}
    </div>
  );
}
