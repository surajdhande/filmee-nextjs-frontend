"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProjectsGrid from "./ProjectsGrid";

export default function ProjectsPage() {
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

  // Dummy data for now
  const projects = [
    {
      project_id: 1,
      image:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80",
      project_status: "Funding",
      title: "The Last Frame",
      genre: "Thriller",
      funding_raised: 150000,
      funding_target: 250000,
      investors: 12,
      applications: 45,
      views: 1250,
    },
    {
      project_id: 2,
      image:
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
      project_status: "Pre-Production",
      title: "Urban Shadows",
      genre: "Drama",
      funding_raised: 180000,
      funding_target: 180000,
      investors: 8,
      applications: 32,
      views: 890,
    },
  ];

  return (
    <DashboardLayout
      header={
        <DashboardHeader
          username={`${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim() || "User"}
          showOverviewTitle={false}
          showAnalyticsButton={false}
          showCreateButton={false}
        />
      }
    >
    <div className="mx-auto max-w-[1120px] px-8 py-6">

        <div className="mb-8 flex items-center justify-between">

          <h1 className="text-[28px] font-bold text-white">
            My Projects
          </h1>

          <button
            onClick={() =>
              router.push("/dashboard/filmmaker/create-project")
            }
            className="rounded-full bg-gradient-to-r from-[#E50914] to-[#FF2E2E] px-8 py-4 font-bold uppercase tracking-wide text-white shadow-lg shadow-red-700/30 transition hover:brightness-110"
          >
            + New Project
          </button>

        </div>

        <ProjectsGrid projects={projects} />

      </div>

    </DashboardLayout>
  );
}