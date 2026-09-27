"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BarChart2, Plus } from "lucide-react";
import FilmmakerLayout from "@/components/dashboard/filmmaker/FilmmakerLayout";
import StatsCardsSection from "@/components/dashboard/StatsCardsSection";
import ChartsSection from "@/components/dashboard/ChartsSection";
import SubscriptionCard from "@/components/dashboard/SubscriptionCard";
import ProjectsSection from "@/components/dashboard/ProjectsSection";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { getFilmmakerOverview } from "@/services/dashboardService";

const POLL_MS = 15000;

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadOverview = useCallback(() => {
    return getFilmmakerOverview()
      .then((data) => {
        setOverview(data);
      })
      .catch(() => {
        setOverview(null);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
    loadOverview();
  }, [router, loadOverview]);

  useEffect(() => {
    if (!user) return undefined;

    const interval = setInterval(loadOverview, POLL_MS);

    const onFocus = () => {
      loadOverview();
    };
    window.addEventListener("focus", onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, [user, loadOverview]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0B0B] text-white">
        Loading...
      </div>
    );
  }

  return (
  <FilmmakerLayout>
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 p-6">

  <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4">

    <button
      type="button"
      onClick={() => router.push("/dashboard/filmmaker/analytics")}
      className="flex items-center justify-center gap-2 rounded-full border border-red-600 px-6 py-3.5 text-[12px] font-bold uppercase tracking-wider text-red-500 transition hover:bg-red-600/10 w-full sm:w-auto"
    >
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

  <StatsCardsSection stats={overview?.stats} loading={loading} />

  <SubscriptionCard subscriptionPath="/dashboard/filmmaker/subscription" />

  <ChartsSection
    weeklyViews={overview?.charts?.weekly_views}
    monthlyFunding={overview?.charts?.monthly_funding}
    loading={loading}
  />

  <ProjectsSection projects={overview?.projects} loading={loading} />

  <RecentActivity activities={overview?.recent_activity} loading={loading} />

</div>
  </FilmmakerLayout>
);
}
