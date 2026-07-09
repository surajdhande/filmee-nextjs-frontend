"use client";

import ViewProjectHeader from "./ViewProjectHeader";
import ProjectHero from "./ProjectHero";
import ProjectSidebar from "./ProjectSidebar";
import ProjectOverview from "./ProjectOverview";
import ProjectDetails from "./ProjectDetails";
import ProjectDocuments from "./ProjectDocuments";

export default function ViewProjectPage({
  project,
}) {
  return (
    <div className="min-h-screen bg-black text-white">

      <ViewProjectHeader />

      <div className="mx-auto max-w-[1280px] px-8 py-8">

        <div className="grid grid-cols-12 gap-8">

          <div className="col-span-8">

            <ProjectHero project={project} />

          </div>

          <div className="col-span-4">

            <ProjectSidebar project={project} />

          </div>

        </div>

        <div className="mt-8">

          <ProjectOverview project={project} />

        </div>

        <div className="mt-8 grid grid-cols-2 gap-8">

          <ProjectDetails project={project} />

          <ProjectDocuments project={project} />

        </div>

      </div>

    </div>
  );
}