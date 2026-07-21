"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getProjectById } from "@/services/projectService";
import ViewProjectPage from "@/components/view-project/ViewProjectPage";

export default function ProjectDetailsPage() {
  const { project_id } = useParams();

  const [project, setProject] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await getProjectById(project_id);
        setProject(data);
      } catch (error) {
        console.error("Error loading project:", error);
      }
    };

    if (project_id) {
      loadProject();
    }
  }, [project_id]);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return <ViewProjectPage project={project} />;
}