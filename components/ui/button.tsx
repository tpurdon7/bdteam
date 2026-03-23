import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
        variant === "primary" && "bg-lime-300 text-neutral-950 hover:bg-lime-200",
        variant === "secondary" && "bg-white/6 text-white hover:bg-white/10",
        variant === "ghost" && "bg-transparent text-neutral-300 hover:bg-white/6 hover:text-white",
        variant === "danger" && "bg-red-500/90 text-white hover:bg-red-400",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
