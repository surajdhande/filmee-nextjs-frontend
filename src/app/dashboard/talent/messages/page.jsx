import { Suspense } from "react";
import TalentMessages from "@/components/dashboard/talent/TalentMessages";

export default function TalentMessagesPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#0B0B0B] text-zinc-400 text-sm">Loading messages…</div>}>
      <TalentMessages />
    </Suspense>
  );
}