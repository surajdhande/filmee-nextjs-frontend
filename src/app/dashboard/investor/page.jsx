"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function InvestorDashboardPlaceholder() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      router.push("/login");
      return;
    }

    setUser(() => JSON.parse(storedUser));
  }, [router]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <DashboardLayout role="INVESTOR">
      <DashboardHeader username={user?.full_name || user?.name || "Investor"} />
      <div className="p-8">
        <div className="flex min-h-[60vh] items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950/40">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Investor Dashboard</h1>
            <p className="mt-4 text-xl text-zinc-400">Coming soon.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}