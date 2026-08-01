"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProjectsGrid from "./ProjectsGrid";
import { getMyProjects } from "@/services/projectService";

export default function ProjectsPage() {
  const router = useRouter();

    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);


  const loadProjects = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (!storedUser || !token) {
        router.push("/login");
        return;
      }

      setUser(JSON.parse(storedUser));

      const data = await getMyProjects();

      setProjects(data);

    } catch (error) {
      console.error("Error loading projects:", error);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [router]);

    if (!user) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
        </div>
    );
    }


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

        <ProjectsGrid projects={projects} onUpdated={loadProjects} />

      </div>

    </DashboardLayout>
  );
}