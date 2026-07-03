"use client";
import AnimatedCard from "@/components/ui/AnimatedCard";
export default function ProjectOverview({ project }) {
  return (
    <AnimatedCard className="p-8">

      <h2 className="text-2xl font-bold text-white">
        Overview
      </h2>

      <div className="mt-8">

        <h3 className="text-lg font-semibold text-white">
          Logline
        </h3>

        <p className="mt-2 leading-8 text-gray-400">
          {project.logline}
        </p>

      </div>

      <div className="mt-8">

        <h3 className="text-lg font-semibold text-white">
          Synopsis
        </h3>

        <p className="mt-2 whitespace-pre-line leading-8 text-gray-400">
          {project.synopsis}
        </p>

      </div>

    </AnimatedCard>
  );
}