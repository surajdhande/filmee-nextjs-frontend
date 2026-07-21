"use client";

import FileUpload from "@/components/ui/FileUpload";

export default function StepFour({
  projectData,
  setProjectData,
}) {
  return (
    <div className="rounded-2xl border border-[#303030] bg-[#151515] p-5">

      {/* Header */}

      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E50914] font-semibold text-white">
          4
        </div>

        <h2 className="text-[20px] font-semibold text-white">
          Media & Review
        </h2>

      </div>

      {/* Project Media */}

      <h3 className="mb-4 text-lg font-semibold text-white">
        Project Media
      </h3>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <FileUpload
        title="Pitch Deck"
        accept={{
          "application/pdf": [".pdf"],
        }}
        file={projectData.pitchDeck}
        onChange={(file) =>
          setProjectData({
            ...projectData,
            pitchDeck: file,
          })
        }
      />

      <FileUpload
        title="Trailer / Teaser"
        accept={{
          "video/*": [],
        }}
        file={projectData.trailer}
        onChange={(file) =>
          setProjectData({
            ...projectData,
            trailer: file,
          })
        }
      />

      <FileUpload
        title="Storyboards"
        accept={{
          "image/*": [],
          "application/pdf": [".pdf"],
        }}
        file={projectData.storyboard}
        onChange={(file) =>
          setProjectData({
            ...projectData,
            storyboard: file,
          })
        }
      />

      <FileUpload
        title="Lookbook"
        accept={{
          "image/*": [],
          "application/pdf": [".pdf"],
        }}
        file={projectData.lookbook}
        onChange={(file) =>
          setProjectData({
            ...projectData,
            lookbook: file,
          })
        }
      />

      </div>

      {/* Summary */}

      <div className="mt-8 rounded-xl bg-[#1C1C1C] p-6">

        <h3 className="mb-6 text-2xl font-semibold text-white">
          Project Summary
        </h3>

        <div className="grid grid-cols-2 gap-y-6">

          <SummaryItem
            title="Title"
            value={projectData.title}
          />

          <SummaryItem
            title="Genre"
            value={projectData.genre}
          />

          <SummaryItem
            title="Budget"
            value={
              projectData.funding_target
                ? `$${projectData.funding_target}`
                : ""
            }
          />

          <SummaryItem
            title="Timeline"
            value={projectData.production_timeline}
          />

        </div>

      </div>

    </div>
  );
}

function SummaryItem({ title, value }) {
  return (
    <div>
      <p className="mb-1 text-sm text-[#9CA3AF]">
        {title}
      </p>

      <p className="text-lg font-medium text-white">
        {value || "Not specified"}
      </p>
    </div>
  );
}