"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ViewProjectHeader from "./ViewProjectHeader";
import ProjectHero from "./ProjectHero";
import ProjectSidebar from "./ProjectSidebar";
import ProjectOverview from "./ProjectOverview";
import ProjectDetails from "./ProjectDetails";
import ProjectDocuments from "./ProjectDocuments";
import EditProjectModal from "@/components/projects/EditProjectModal";

export default function ViewProjectPage({
  project,
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">

      <ViewProjectHeader onEditClick={() => setIsEditOpen(true)} />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 md:px-8 py-6 md:py-8">

        <div className="grid grid-cols-12 gap-6 lg:gap-8">

          <div className="col-span-12 lg:col-span-8">

            <ProjectHero project={project} />

          </div>

          <div className="col-span-12 lg:col-span-4">

            <ProjectSidebar project={project} />

          </div>

        </div>

        <div className="mt-6 lg:mt-8">

          <ProjectOverview project={project} />

        </div>

        <div className="mt-6 lg:mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

          <ProjectDetails project={project} />

          <ProjectDocuments project={project} />

        </div>

      </div>

      <EditProjectModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        project={project}
        onUpdated={() => {
          router.refresh();
          window.location.reload();
        }}
      />

    </div>
  );
}