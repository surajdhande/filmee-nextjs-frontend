"use client";
import AnimatedCard from "@/components/ui/AnimatedCard";
export default function ProjectDetails({ project }) {
  const details = [
    {
      label: "Genre",
      value: project.genre,
    },
    {
      label: "Location",
      value: project.primary_location,
    },
    {
      label: "Timeline",
      value: project.production_timeline,
    },
    {
      label: "Target Audience",
      value: project.target_audience,
    },
    {
      label: "Funding Goal",
      value: `₹${Number(project.funding_target).toLocaleString()}`,
    },
    {
      label: "Expected ROI",
      value: `${project.expected_roi_percentage}%`,
    },
    {
      label: "Stage",
      value: project.project_status,
    },
  ];

  return (
    <AnimatedCard className="p-4 sm:p-6 md:p-8">

      <h2 className="text-2xl font-bold text-white">
        Project Details
      </h2>

      <div className="mt-8 space-y-6">

        {details.map((detail) => (
          <div
            key={detail.label}
            className="flex items-center justify-between border-b border-[#2A2A2A] pb-4"
          >
            <span className="text-gray-400">
              {detail.label}
            </span>

            <span className="font-semibold text-white">
              {detail.value || "-"}
            </span>
          </div>
        ))}

      </div>

    </AnimatedCard>
  );
}