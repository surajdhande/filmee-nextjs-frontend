"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ProjectCard from "./ProjectCard";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80";

const ProjectsSection = ({ projects, loading }) => {
  const router = useRouter();
  const list = projects || [];

  return (
    <section className="mt-10 space-y-6">

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Active Projects
        </h2>
      </div>

      {loading && list.length === 0 ? (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          <div className="h-[520px] animate-pulse rounded-3xl border border-[#2A2A2A] bg-[#171717]" />
          <div className="h-[520px] animate-pulse rounded-3xl border border-[#2A2A2A] bg-[#171717]" />
        </div>
      ) : null}

      {!loading && list.length === 0 ? (
        <p className="text-zinc-500">No projects yet. Create your first project to see it here.</p>
      ) : null}

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">

        {list.map((p) => (
          <ProjectCard
            key={p.project_id}
            image={p.lookbook_url || PLACEHOLDER_IMAGE}
            status={(p.project_status || "DEVELOPMENT").replace(/_/g, " ")}
            title={p.title}
            genre={p.genre || "—"}
            raised={Number(p.funding_raised) || 0}
            target={Number(p.funding_target) || 0}
            investors={p.investors ?? 0}
            applications={p.applications ?? 0}
            views={p.view_count ?? 0}
            onView={() =>
              router.push(`/dashboard/filmmaker/projects/${p.project_id}`)
            }
            onEdit={() =>
              router.push(`/dashboard/filmmaker/projects/${p.project_id}`)
            }
          />
        ))}

      </div>

    </section>
  );
};

export default ProjectsSection;
