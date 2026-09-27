"use client";

import { Suspense } from "react";
import FilmmakerAnalytics from "@/components/dashboard/filmmaker/FilmmakerAnalytics";

export default function AnalyticsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
          Loading...
        </div>
      }
    >
      <FilmmakerAnalytics />
    </Suspense>
  );
}