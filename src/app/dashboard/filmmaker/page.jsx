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
        <DashboardHeader username={profile?.full_name || user?.full_name || user?.name || "User"} />
      }
    >
      <div className="flex flex-col gap-14 p-10 lg:pl-16">
        <StatsCardsSection />

        <SubscriptionCard />

        <ChartsSection />
        
        <ProjectsSection />
        
        <RecentActivity />
      </div>
    </DashboardLayout>
  );
}