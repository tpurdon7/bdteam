import Link from "next/link";
import type { PropsWithChildren } from "react";
import { Activity, Columns3, Home, Mail, Search, Settings2, Target } from "lucide-react";

import type { AppUser } from "@/types/domain";

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/icps", label: "ICPs", icon: Target },
  { href: "/leads", label: "Leads", icon: Search },
  { href: "/review", label: "Review Queue", icon: Mail },
  { href: "/pipeline", label: "Pipeline", icon: Columns3 },
  { href: "/activity", label: "Activity", icon: Activity },
  { href: "/settings", label: "Settings", icon: Settings2 }
] as const;

export function AppShell({
  user,
  children
}: PropsWithChildren<{ user: AppUser }>) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(190,242,100,0.14),_transparent_24%),linear-gradient(180deg,_#111111_0%,_#090909_100%)] text-white">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 gap-0 px-4 py-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="rounded-3xl border border-white/10 bg-black/20 p-4 backdrop-blur lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
          <div className="mb-8 space-y-2 border-b border-white/10 pb-6">
            <p className="text-xs uppercase tracking-[0.24em] text-lime-300/80">Outbound Ops</p>
            <h1 className="font-serif text-2xl">BD Team Platform</h1>
            <p className="text-sm text-neutral-400">Review-first prospecting and outreach operations.</p>
          </div>
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-neutral-300 transition hover:bg-white/5 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Signed in</p>
            <p className="mt-2 text-sm font-medium text-white">{user.fullName}</p>
            <p className="text-sm text-neutral-400">{user.email}</p>
          </div>
        </aside>
        <main className="min-w-0 px-0 py-4 lg:px-6">{children}</main>
      </div>
    </div>
  );
}
