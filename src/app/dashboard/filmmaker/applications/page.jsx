"use client";

import { Suspense } from "react";
import ApplicationsPage from "@/components/applications/ApplicationsPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
          Loading...
        </div>
      }
    >
      <ApplicationsPage />
    </Suspense>
  );
}
