import { Suspense } from "react";
import InvestorMessages from "@/components/dashboard/investor/InvestorMessages";

export default function InvestorMessagesPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#0B0B0B] text-zinc-400 text-sm">Loading messages…</div>}>
      <InvestorMessages />
    </Suspense>
  );
}
