"use client";

import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";
import FormTextarea from "@/components/ui/FormTextarea";

const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Thriller",
  "Sci-Fi",
  "Romance",
  "Documentary",
  "Animation",
  "Musical",
  "Western",
  "Crime",
];

export default function StepOne({
  projectData,
  setProjectData,
  errors,
}) {
  return (
    <div className="rounded-2xl border border-[#2A2A2A] bg-[#151515] p-7">

      {/* Step Heading */}
      <div className="mb-8 flex items-center gap-4">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E50914] text-lg font-semibold text-white">
          1
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            Project Basics
          </h2>

        </div>

      </div>

      {/* Form */}

      <div className="space-y-6">

        <FormInput
          label="Project Title"
          required
          placeholder="Enter your project title"
          value={projectData.title}
          error={errors.title}
          onChange={(e) =>
            setProjectData({
              ...projectData,
              title: e.target.value,
            })
          }
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <FormSelect
            label="Genre"
            required
            options={genres}
            value={projectData.genre}
            error={errors.genre}
            onChange={(e) =>
              setProjectData({
                ...projectData,
                genre: e.target.value,
              })
            }
          />

          <FormInput
            label="Budget"
            required
            type="number"
            prefix="$"
            placeholder="250000"
            value={projectData.funding_target}
            error={errors.funding_target}
            onChange={(e) =>
                setProjectData({
                ...projectData,
                funding_target: e.target.value,
                })
            }
            />

        </div>

        <FormInput
          label="Logline"
          required
          placeholder="One sentence describing your project"
          value={projectData.logline}
          error={errors.logline}
          onChange={(e) =>
            setProjectData({
              ...projectData,
              logline: e.target.value,
            })
          }
        />

        <FormTextarea
          label="Synopsis"
          required
          rows={6}
          placeholder="Provide a detailed synopsis of your film..."
          value={projectData.synopsis}
          error={errors.synopsis}
          onChange={(e) =>
            setProjectData({
              ...projectData,
              synopsis: e.target.value,
            })
          }
        />

      </div>

    </div>
  );
}