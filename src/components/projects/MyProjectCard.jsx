"use client";

import { Eye, MessageSquare, SquarePen } from "lucide-react";

export default function MyProjectCard({ project }) {
  const progress =
    project.funding_target > 0
      ? (project.funding_raised / project.funding_target) * 100
      : 0;

  return (
    <div className="rounded-3xl border border-[#2A2A2A] bg-[#171717] p-5 transition hover:border-[#E50914]/40">

      <div className="flex gap-6">

        {/* Project Image */}

        <img
          src={project.image}
          alt={project.title}
          className="h-[120px] w-[235px] rounded-2xl object-cover"
        />

        {/* Right Side */}

        <div className="flex flex-1 flex-col">

          {/* Header */}

          <div className="flex items-start justify-between">

            <div>

              <h2 className="text-[22px] font-bold text-white"s>
                {project.title}
              </h2>

              <p className="mt-1 text-base text-gray-400">
                {project.genre}
              </p>

            </div>

            <span className="rounded-full bg-[#E50914] px-4 py-1 text-sm font-semibold text-white">
              {project.project_status}
            </span>

          </div>

          {/* Stats */}

          <div className="mt-5 grid grid-cols-4 gap-8">

            <div>
              <p className="text-sm text-gray-400">
                Budget
              </p>

              <p className="text-lg font-bold text-white">
                ${project.funding_target.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Raised
              </p>

              <p className="text-xl font-bold text-white">
                ${project.funding_raised.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Investors
              </p>

              <p className="text-xl font-bold text-white">
                {project.investors}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Applications
              </p>

              <p className="text-xl font-bold text-white">
                {project.applications}
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

          <div className="mt-6 flex gap-4">

            <button className="rounded-full bg-gradient-to-r from-[#E50914] to-[#FF2E2E] px-7 py-2.5 font-semibold uppercase text-white shadow-lg shadow-red-600/20 transition hover:brightness-110">
              View Details
            </button>

            <button className="flex items-center gap-2 rounded-full border border-[#E50914] px-6 py-2.5 font-semibold uppercase text-[#E50914] transition hover:bg-[#E50914] hover:text-white">

              <SquarePen size={18} />

              Edit Project

            </button>

            <button className="flex items-center gap-2 rounded-full border border-[#E50914] px-6 py-2.5 font-semibold uppercase text-[#E50914] transition hover:bg-[#E50914] hover:text-white">

              <MessageSquare size={18} />

              Messages

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}