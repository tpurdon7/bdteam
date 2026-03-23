import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(190,242,100,0.18),_transparent_26%),linear-gradient(180deg,_#101010_0%,_#090909_100%)] px-6">
      <Card className="w-full max-w-md space-y-6 p-8">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-lime-300/80">Internal Access</p>
          <h1 className="font-serif text-3xl text-white">Sign in</h1>
          <p className="text-sm text-neutral-400">
            This app expects Supabase auth in production. The local scaffold uses demo data until credentials are configured.
          </p>
        </div>
        <Button className="w-full">Continue with Supabase</Button>
        <p className="text-sm text-neutral-500">
          Return to <Link href="/dashboard" className="text-neutral-200 underline">dashboard preview</Link>
        </p>
      </Card>
    </div>
  );
}
