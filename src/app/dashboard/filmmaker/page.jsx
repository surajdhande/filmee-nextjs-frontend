"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BarChart2, Plus } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCardsSection from "@/components/dashboard/StatsCardsSection";
import ChartsSection from "@/components/dashboard/ChartsSection";
import SubscriptionCard from "@/components/dashboard/SubscriptionCard";
import ProjectsSection from "@/components/dashboard/ProjectsSection";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
    loadProfile();
  }, [router]);

  async function loadProfile() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/v1/profile/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setProfile(data.profile);
    } catch (error) {
      console.log(error);
    }
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0B0B] text-white">
        Loading...
      </div>
    );
  }

  return (
  <DashboardLayout
    header={
      <DashboardHeader
        username={
          profile?.full_name ||
          (user ? `${user.first_name || ""} ${user.last_name || ""}`.trim() : "") ||
          "User"
        }
        showOverviewTitle={false}
      />
    }
  >
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 p-6">

  {/* =========================================================
      Dashboard Actions
      ========================================================= */}
  <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4">

    <button className="flex items-center justify-center gap-2 rounded-full border border-red-600 px-6 py-3.5 text-[12px] font-bold uppercase tracking-wider text-red-500 transition hover:bg-red-600/10 w-full sm:w-auto">
      <BarChart2 size={14} />
      View Analytics
    </button>

    <button
      onClick={() => router.push("/dashboard/filmmaker/create-project")}
      className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E50914] to-[#FF2E2E] px-6 py-3.5 text-[12px] font-bold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(229,9,20,0.4)] transition hover:brightness-110 w-full sm:w-auto"
    >
      <Plus size={15} />
      Create Project
    </button>

  </div>

  <StatsCardsSection />

  <SubscriptionCard />

  <ChartsSection />

  <ProjectsSection />

  <RecentActivity />

</div>
  </DashboardLayout>
);
}