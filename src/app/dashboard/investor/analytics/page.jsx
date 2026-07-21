"use client";

import { Suspense } from "react";
import AdvancedAnalytics from "@/components/dashboard/investor/AdvancedAnalytics";

export default function InvestorAnalyticsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
          Loading...
        </div>
      }
    >
      <AdvancedAnalytics />
    </Suspense>
  );
}
