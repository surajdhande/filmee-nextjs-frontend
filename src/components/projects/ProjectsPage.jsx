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
    <div className="mx-auto max-w-[1120px] px-4 sm:px-6 md:px-8 py-6">

        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row gap-4 sm:gap-0 sm:items-center justify-between">

          <h1 className="text-[24px] sm:text-[28px] font-bold text-white">
            My Projects
          </h1>

          <button
            onClick={() =>
              router.push("/dashboard/filmmaker/create-project")
            }
            className="w-full sm:w-auto text-center rounded-full bg-gradient-to-r from-[#E50914] to-[#FF2E2E] px-7 sm:px-8 py-3.5 sm:py-4 font-bold uppercase tracking-wide text-white shadow-lg shadow-red-700/30 transition hover:brightness-110 text-sm"
          >
            + New Project
          </button>

        </div>

        <ProjectsGrid projects={projects} onUpdated={loadProjects} />

      </div>

    </DashboardLayout>
  );
}