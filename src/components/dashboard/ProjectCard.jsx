"use client";

import React from "react";
// import Image from "next/image";
import { Eye, SquarePen } from "lucide-react";

const ProjectCard = ({
  image,
  status,
  title,
  genre,
  raised,
  target,
  investors,
  applications,
  views,
}) => {
  const progress = (raised / target) * 100;

  return (
    <div className="overflow-hidden rounded-3xl border border-[#2A2A2A] bg-[#171717] transition-all duration-300 hover:border-red-600/40">

      {/* Image */}

      <div className="relative h-[280px] w-full">

        <img
  src={image}
  alt={title}
  className="h-full w-full object-cover"
/>
        <span className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
          {status}
        </span>

      </div>

      {/* Content */}

      <div className="space-y-6 p-5">

        <div>

          <h3 className="text-2xl font-bold text-white">
            {title}
          </h3>

          <p className="mt-1 text-zinc-400">
            {genre}
          </p>

        </div>

        {/* Progress */}

        <div>

          <div className="mb-2 flex items-center justify-between text-sm">

            <span className="text-zinc-400">
              Funding Progress
            </span>

            <span className="font-semibold text-white">
              ${raised.toLocaleString()} / ${target.toLocaleString()}
            </span>

          </div>

          <div className="h-2 overflow-hidden rounded-full bg-[#2B2B2B]">

            <div
              className="h-full rounded-full bg-red-600"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-3 text-center">

          <div>
            <p className="text-2xl font-bold text-white">
              {investors}
            </p>

            <p className="text-sm text-zinc-500">
              Investors
            </p>
          </div>

          <div>
            <p className="text-2xl font-bold text-white">
              {applications}
            </p>

            <p className="text-sm text-zinc-500">
              Applications
            </p>
          </div>

          <div>
            <p className="text-2xl font-bold text-white">
              {views}
            </p>

            <p className="text-sm text-zinc-500">
              Views
            </p>
          </div>

        </div>

        {/* Buttons */}

        <div className="grid grid-cols-2 gap-4">

          <button className="flex items-center justify-center gap-2 rounded-full border border-red-600 py-3 font-semibold uppercase tracking-wide text-red-500 transition hover:bg-red-600 hover:text-white">

            <Eye size={18} />

            View

          </button>

          <button className="flex items-center justify-center gap-2 rounded-full border border-red-600 py-3 font-semibold uppercase tracking-wide text-red-500 transition hover:bg-red-600 hover:text-white">

            <SquarePen size={18} />

            Edit

          </button>

        </div>

      </div>

    </div>
  );
};

export default ProjectCard;