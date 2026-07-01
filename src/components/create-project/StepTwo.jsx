"use client";

import FormInput from "@/components/ui/FormInput";
import DynamicListInput from "@/components/ui/DynamicListInput";

export default function StepTwo({
  projectData,
  setProjectData,
}) {

  const calculateTimeline = (selectedDate) => {
    if (!selectedDate) return "";

    const today = new Date();
    const endDate = new Date(selectedDate);

    if (endDate <= today) return "";

    let years = endDate.getFullYear() - today.getFullYear();
    let months = endDate.getMonth() - today.getMonth();
    let days = endDate.getDate() - today.getDate();

    if (days < 0) {
      months--;
      const previousMonth = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        0
      ).getDate();
      days += previousMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    let timeline = "";

    if (years > 0) timeline += `${years} Year${years > 1 ? "s" : ""} `;
    if (months > 0) timeline += `${months} Month${months > 1 ? "s" : ""} `;
    if (days > 0) timeline += `${days} Day${days > 1 ? "s" : ""}`;

    return timeline.trim();
  };

  const handleTimelineChange = (e) => {
    const date = e.target.value;

    setProjectData({
      ...projectData,
      production_completion_date: date,
      production_timeline: calculateTimeline(date),
    });
  };

  return (
    <div className="rounded-2xl border border-[#303030] bg-[#151515] p-6">

      {/* Header */}

      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E50914] font-semibold text-white">
          2
        </div>

        <h2 className="text-[22px] font-semibold text-white">
          Production Details
        </h2>

      </div>

      <div className="space-y-5">

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-white">
            Production Timeline
            <span className="ml-1 text-[#E50914]">*</span>
        </label>

        <input
            type="date"
            value={projectData.production_completion_date || ""}
            onChange={handleTimelineChange}
            className="h-12 rounded-lg border border-[#303030] bg-[#1A1A1D] px-4 text-[15px] text-white outline-none focus:border-[#E50914]"
        />

        {projectData.production_timeline && (
            <p className="text-sm text-[#B0B0B0]">
            {projectData.production_timeline}
            </p>
        )}
        </div>

          <FormInput
            label="Primary Location"
            required
            placeholder="Mumbai, India"
            value={projectData.primary_location}
            onChange={(e) =>
              setProjectData({
                ...projectData,
                primary_location: e.target.value,
              })
            }
          />

        </div>

        <FormInput
          label="Target Audience"
          placeholder="Young Adults, Family, Global Audience"
          value={projectData.target_audience}
          onChange={(e) =>
            setProjectData({
              ...projectData,
              target_audience: e.target.value,
            })
          }
        />

        <DynamicListInput
          label="Cast Requirements"
          placeholder="Enter cast requirement"
          items={projectData.castRequirements}
          onChange={(items) =>
            setProjectData({
              ...projectData,
              castRequirements: items,
            })
          }
        />

        <DynamicListInput
          label="Crew Requirements"
          placeholder="Enter crew requirement"
          items={projectData.crewRequirements}
          onChange={(items) =>
            setProjectData({
              ...projectData,
              crewRequirements: items,
            })
          }
        />

      </div>

    </div>
  );
}