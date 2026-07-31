"use client";
import { useRouter } from "next/navigation";
import {
  ImageOff,
  MessageSquare,
  SquarePen,
} from "lucide-react";

export default function MyProjectCard({ project }) {
  const router = useRouter();
  const progress =
    project.funding_target > 0
      ? (project.funding_raised / project.funding_target) * 100
      : 0;
  const projectStatusMap = {
    DEVELOPMENT: "Development",
    PRE_PRODUCTION: "Pre-Production",
    PRODUCTION: "Production",
    POST_PRODUCTION: "Post-Production",
    RELEASED: "Released",
  };
  return (
    <div className="rounded-3xl border border-[#2A2A2A] bg-[#171717] p-5 transition hover:border-[#E50914]/40">

      <div className="flex flex-col md:flex-row gap-6">

        {/* Project Image */}
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-[180px] w-full md:h-[120px] md:w-[235px] rounded-2xl object-cover shrink-0"
          />
        ) : (
          <div className="flex h-[180px] w-full md:h-[120px] md:w-[235px] shrink-0 flex-col items-center justify-center rounded-2xl border border-dashed border-[#5A5A5A] bg-gradient-to-br from-[#232323] to-[#171717]">
            <ImageOff
              size={36}
              className="text-gray-500"
            />

            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
              PROJECT POSTER
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Coming Soon
            </p>
          </div>
        )}

        {/* Right Side */}

        <div className="flex flex-1 flex-col justify-between">

          {/* Header */}

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-6">

            <div>

              <h2 className="text-[20px] sm:text-[22px] font-bold text-white">
                {project.title}
              </h2>

              <p className="mt-1 text-sm sm:text-base text-gray-400">
                {project.genre}
              </p>

            </div>

            <span className="self-start sm:self-auto rounded-full bg-[#E50914] px-4 py-1 text-xs sm:text-sm font-semibold text-white">
              {projectStatusMap[project.project_status] || project.project_status}
            </span>

          </div>

          {/* Stats */}

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">

            <div>
              <p className="text-xs sm:text-sm text-gray-400">
                Budget
              </p>

              <p className="text-base sm:text-lg font-bold text-white">
                ${Number(project.funding_target).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-400">
                Raised
              </p>

              <p className="text-base sm:text-xl font-bold text-white">
                ${Number(project.funding_raised).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-400">
                Investors
              </p>

              <p className="text-base sm:text-xl font-bold text-white">
                {project.investors ?? 0}
              </p>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-400">
                Applications
              </p>

              <p className="text-base sm:text-xl font-bold text-white">
                {project.applications ?? 0}
              </p>
            </div>

          </div>

          {/* Progress */}

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#2C0D0D]">

            <div
              className="h-full rounded-full bg-[#E50914]"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          {/* Buttons */}

          <div className="mt-6 flex flex-wrap gap-3">

            <button
              onClick={() =>
                router.push(
                  `/dashboard/filmmaker/projects/${project.project_id}`
                )
              }
              className="flex-1 sm:flex-none text-center rounded-full bg-gradient-to-r from-[#E50914] to-[#FF2E2E] px-6 sm:px-7 py-2.5 font-semibold uppercase text-white shadow-lg shadow-red-600/20 transition hover:brightness-110 text-xs sm:text-sm"
            >
              View Details
            </button>

            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-full border border-[#E50914] px-5 sm:px-6 py-2.5 font-semibold uppercase text-[#E50914] transition hover:bg-[#E50914] hover:text-white text-xs sm:text-sm">

              <SquarePen size={16} />

              <span>Edit</span>

            </button>

            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-full border border-[#E50914] px-5 sm:px-6 py-2.5 font-semibold uppercase text-[#E50914] transition hover:bg-[#E50914] hover:text-white text-xs sm:text-sm">

              <MessageSquare size={16} />

              <span>Messages</span>

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}