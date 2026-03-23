import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  tone?: "neutral" | "positive" | "warning" | "danger";
}

export function Badge({ children, tone = "neutral" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        tone === "neutral" && "border-white/10 bg-white/5 text-neutral-200",
        tone === "positive" && "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
        tone === "warning" && "border-amber-400/20 bg-amber-400/10 text-amber-200",
        tone === "danger" && "border-red-400/20 bg-red-400/10 text-red-200"
      )}
    >
      {children}
    </span>
  );
}
