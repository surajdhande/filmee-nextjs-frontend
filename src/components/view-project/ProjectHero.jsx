"use client";

import { ImageOff } from "lucide-react";
import AnimatedCard from "@/components/ui/AnimatedCard";
export default function ProjectHero({ project }) {
  const progress =
    project.funding_target > 0
      ? (project.funding_raised / project.funding_target) * 100
      : 0;

  const formattedStatus =
    project.project_status
      ?.toLowerCase()
      .replace("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <AnimatedCard className="overflow-hidden">

      {/* Poster */}

      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="h-[220px] sm:h-[300px] md:h-[380px] w-full object-cover"
        />
      ) : (
        <div className="flex h-[220px] sm:h-[300px] md:h-[380px] flex-col items-center justify-center bg-gradient-to-br from-[#232323] to-[#171717]">

          <ImageOff
            size={48}
            className="text-gray-500"
          />

          <p className="mt-4 text-base sm:text-lg font-semibold text-gray-400">
            Project Poster
          </p>

          <p className="text-xs sm:text-sm text-gray-500">
            Coming Soon
          </p>

        </div>
      )}

      {/* Details */}

      <div className="p-4 sm:p-6 md:p-8">

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6">

          <div className="flex-1">

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              {project.title}
            </h1>

            <p className="mt-3 max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed sm:leading-8 text-gray-300">
              {project.logline}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">

              <span className="font-medium">
                {project.genre}
              </span>

              <span>•</span>

              <span>
                {project.primary_location}
              </span>

              <span>•</span>

              <span>
                {project.production_timeline}
              </span>

            </div>

          </div>

          <span className="self-start sm:self-auto rounded-full bg-[#E50914] px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white">
            {formattedStatus}
          </span>

        </div>

        {/* Funding Progress */}

        <div className="mt-8">

          <div className="mb-2 flex justify-between text-sm text-gray-400">

            <span>
              ₹{Number(project.funding_raised).toLocaleString()}
            </span>

            <span>
              ₹{Number(project.funding_target).toLocaleString()}
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-[#2B2B2B]">

            <div
              className="h-full rounded-full bg-[#E50914] transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      </div>

    </AnimatedCard>
  );
}