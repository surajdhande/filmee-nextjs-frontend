"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

  return (
    <DashboardLayout>
  <DashboardHeader username={user?.full_name || user?.name || "John Director"} />

  <div className="p-8">
    <StatsCardsSection />

    <SubscriptionCard />

    <ChartsSection />
    <ProjectsSection />
    <RecentActivity />
  </div>
</DashboardLayout>
  );
}