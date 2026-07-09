"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

import ApplicationsFilters from "./ApplicationsFilters";
import EmptyApplications from "./EmptyApplications";

export default function ApplicationsPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [router]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  // Dummy data
  const applications = [];

  return (
    <DashboardLayout
      header={
        <DashboardHeader
          username={`${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim()}
          showOverviewTitle={false}
          showAnalyticsButton={false}
          showCreateButton={false}
        />
      }
    >
      <div className="mx-auto max-w-[1080px] px-8 py-6">

        <div className="mb-8 flex items-start justify-between">

          <div>

            <h1 className="text-[28px] font-bold text-white">
              Investor Applications
            </h1>

            <p className="mt-2 text-gray-400">
              Review offers, negotiate terms, and reach agreements
            </p>

          </div>

          <div className="rounded-full border border-[#E50914] px-4 py-1 text-sm font-semibold text-[#E50914]">
            {applications.length} total
          </div>

        </div>

        <ApplicationsFilters />

        <div className="mt-8">
          <EmptyApplications />
        </div>

      </div>
    </DashboardLayout>
  );
}