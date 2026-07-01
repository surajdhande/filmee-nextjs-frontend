"use client";

import MyProjectCard from "./MyProjectCard";

export default function ProjectsGrid({ projects }) {
  if (!projects.length) {
    return (
      <div className="rounded-3xl border border-dashed border-[#303030] bg-[#171717] p-16 text-center">

        <h2 className="text-3xl font-bold text-white">
          No Projects Found
        </h2>

        <p className="mt-3 text-gray-400">
          Create your first project to begin fundraising.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      {projects.map((project) => (
        <MyProjectCard
          key={project.project_id}
          project={project}
        />
      ))}

    </div>
  );
}