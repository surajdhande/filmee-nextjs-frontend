"use client";
import { Eye } from "lucide-react";
import AnimatedOutlineButton from "@/components/ui/AnimatedOutlineButton";
import AnimatedCard from "@/components/ui/AnimatedCard";

export default function ProjectSidebar({ project }) {
  const progress =
    project.funding_target > 0
      ? (project.funding_raised / project.funding_target) * 100
      : 0;

  return (
    <AnimatedCard className="p-6">

      <h2 className="text-xl font-bold text-white">
        Project Status
      </h2>

      <div className="mt-6">

        <div className="mb-2 flex justify-between text-sm text-gray-400">

          <span>Funding Progress</span>

          <span>{progress.toFixed(0)}%</span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-[#2C2C2C]">

          <div
            className="h-full rounded-full bg-[#E50914]"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <div className="mt-3 flex justify-between text-sm">

          <span className="text-white">
            ₹{Number(project.funding_raised).toLocaleString()}
          </span>

          <span className="text-gray-400">
            ₹{Number(project.funding_target).toLocaleString()}
          </span>

        </div>

      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">

        <div className="rounded-2xl bg-[#1F1F1F] p-4">

          <p className="text-xs uppercase text-gray-400">
            Budget
          </p>

          <p className="mt-2 text-xl font-bold text-white">
            ₹{Number(project.funding_target).toLocaleString()}
          </p>

        </div>

        <div className="rounded-2xl bg-[#1F1F1F] p-4">

          <p className="text-xs uppercase text-gray-400">
            Raised
          </p>

          <p className="mt-2 text-xl font-bold text-white">
            ₹{Number(project.funding_raised).toLocaleString()}
          </p>

        </div>

        <div className="rounded-2xl bg-[#1F1F1F] p-4">

          <p className="text-xs uppercase text-gray-400">
            ROI
          </p>

          <p className="mt-2 text-xl font-bold text-white">
            {project.expected_roi_percentage}%
          </p>

        </div>

        <div className="rounded-2xl bg-[#1F1F1F] p-4">

          <p className="text-xs uppercase text-gray-400">
            Stage
          </p>

          <p className="mt-2 text-lg font-bold text-[#E50914]">
            {project.project_status}
          </p>

        </div>

      </div>

      {/* <button className="mt-8 w-full rounded-full bg-gradient-to-r from-[#E50914] to-[#FF2E2E] py-3 font-semibold text-white transition hover:brightness-110">
        Edit Project
      </button> */}

      <div className="mt-4">

    <AnimatedOutlineButton
        className="w-full py-3"
        icon={<Eye size={18} />}
    >
        <span className="font-semibold uppercase tracking-wide">
        View Analytics
        </span>
    </AnimatedOutlineButton>

    </div>

    </AnimatedCard>
  );
}