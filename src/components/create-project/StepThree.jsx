"use client";

import FormInput from "@/components/ui/FormInput";

export default function StepThree({
  projectData,
  setProjectData,
}) {

  const handleROIChange = (e) => {
    const value = e.target.value;

    // Allow only positive numbers with up to 2 decimal places
    if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
      setProjectData({
        ...projectData,
        expected_roi_percentage: value,
      });
    }
  };

  return (
    <div className="rounded-2xl border border-[#303030] bg-[#151515] p-5">

      {/* Header */}

      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E50914] font-semibold text-white">
          3
        </div>

        <h2 className="text-[20px] font-semibold text-white">
          Funding & Investment
        </h2>

      </div>

      <div className="space-y-4">

        <FormInput
          label="Funding Goals & Breakdown"
          required
          multiline
          rows={4}
          placeholder="Describe how the funding will be used: production (60%), post-production (25%), marketing (15%)..."
          value={projectData.funding_goals_breakdown}
          onChange={(e) =>
            setProjectData({
              ...projectData,
              funding_goals_breakdown: e.target.value,
            })
          }
        />

        <FormInput
        label="Expected ROI (%)"
        required
        type="text"
        placeholder="25.00"
        suffix="%"
        value={projectData.expected_roi_percentage}
        onChange={handleROIChange}
        />

        <FormInput
          label="Distribution Strategy"
          required
          multiline
          rows={4}
          placeholder="Describe your distribution strategy: film festivals, theatrical release, streaming platforms..."
          value={projectData.distribution_strategy}
          onChange={(e) =>
            setProjectData({
              ...projectData,
              distribution_strategy: e.target.value,
            })
          }
        />

      </div>

    </div>
  );
}