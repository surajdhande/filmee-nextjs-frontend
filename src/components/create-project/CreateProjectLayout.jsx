"use client";

import { useState } from "react";
import {
  createProject,
  uploadProjectPitchDeck,
  uploadProjectLookbook,
} from "@/services/projectService";
import { getApiErrorMessage } from "@/lib/apiClient";
import CreateProjectHeader from "./CreateProjectHeader";
import { useRouter } from "next/navigation";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import NavigationButtons from "./NavigationButtons";
import Toast from "@/components/ui/Toast";

import {
  validateStepOne,
  validateStepTwo,
  validateStepThree,
  validateStepFour,
} from "@/utils/projectValidation";

export default function CreateProjectLayout({
  currentStep,
  setCurrentStep,
  projectData,
  setProjectData,
}) {
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const router = useRouter();

  const logCreateProjectFields = (payload, raw) => {
    const fieldEntries = {
      title: payload.title,
      genre: payload.genre,
      funding_target: payload.funding_target,
      logline: payload.logline,
      synopsis: payload.synopsis,
      production_timeline: payload.production_timeline,
      primary_location: payload.primary_location,
      target_audience: payload.target_audience,
      funding_goals_breakdown: payload.funding_goals_breakdown,
      expected_roi_percentage: payload.expected_roi_percentage,
      distribution_strategy: payload.distribution_strategy,
      open_talent_roles: payload.open_talent_roles,
      pitch_deck_url: payload.pitch_deck_url,
      lookbook_url: payload.lookbook_url,
    };
    console.group("[CreateProject] form submit");
    Object.entries(fieldEntries).forEach(([key, value]) => {
      const isEmpty =
        value === undefined ||
        value === null ||
        (typeof value === "string" && !value.trim()) ||
        (Array.isArray(value) && value.length === 0);
      console.log(`${key}:`, value, isEmpty ? "← EMPTY (required)" : "");
    });
    console.log("full API payload:", payload);
    console.log("raw projectData state:", raw);
    console.groupEnd();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            projectData={projectData}
            setProjectData={setProjectData}
            errors={errors}
          />
        );

      case 2:
        return (
          <StepTwo
            projectData={projectData}
            setProjectData={setProjectData}
            errors={errors}
          />
        );

      case 3:
        return (
          <StepThree
            projectData={projectData}
            setProjectData={setProjectData}
            errors={errors}
          />
        );

      case 4:
        return (
          <StepFour
            projectData={projectData}
            setProjectData={setProjectData}
            errors={errors}
          />
        );

      default:
        return null;
    }
  };

  const handleNext = async() => {
    let result;

    switch (currentStep) {
      case 1:
        result = validateStepOne(projectData);
        break;

      case 2:
        result = validateStepTwo(projectData);
        break;

      case 3:
        result = validateStepThree(projectData);
        break;

      case 4:
        result = validateStepFour(projectData);
        break;

      default:
        result = {
          isValid: true,
          errors: {},
        };
    }

    if (!result.isValid) {
      setErrors(result.errors);
      const errorMsg = Object.values(result.errors).join(" • ");
      console.warn("[CreateProject] step validation failed:", result.errors);
      setToast({
        message: `Please fill in all required fields: ${errorMsg}`,
        type: "error",
      });
      return;
    }

    // Clear previous errors
    setErrors({});

    if (currentStep < 4) {
  setCurrentStep(currentStep + 1);
} else {
  try {
    let pitch_deck_url = null;
    let lookbook_url = null;

    if (projectData.pitchDeck) {
      const uploaded = await uploadProjectPitchDeck(projectData.pitchDeck);
      pitch_deck_url = uploaded.url;
    }
    if (projectData.lookbook) {
      const uploaded = await uploadProjectLookbook(projectData.lookbook);
      lookbook_url = uploaded.url;
    }

    const payload = {
      title: projectData.title,
      genre: projectData.genre,
      funding_target: projectData.funding_target,
      logline: projectData.logline,
      synopsis: projectData.synopsis,

      production_timeline: projectData.production_timeline,
      primary_location: projectData.primary_location,
      target_audience: projectData.target_audience,

      funding_goals_breakdown: projectData.funding_goals_breakdown,
      expected_roi_percentage: projectData.expected_roi_percentage,
      distribution_strategy: projectData.distribution_strategy,

      open_talent_roles: (projectData.castRequirements?.length || projectData.crewRequirements?.length)
        ? [...(projectData.castRequirements || []), ...(projectData.crewRequirements || [])]
        : ["General Role"],
    };

    if (pitch_deck_url) payload.pitch_deck_url = pitch_deck_url;
    if (lookbook_url) payload.lookbook_url = lookbook_url;

    logCreateProjectFields(payload, projectData);

    await createProject(payload);

    setToast({ message: "Project created successfully!", type: "success" });
    setTimeout(() => {
      router.push("/dashboard/filmmaker/projects");
    }, 800);

  } catch (error) {
    console.error("[CreateProject] API error:", error?.response?.data || error);
    const apiData = error?.response?.data;
    const detail =
      apiData?.missing_fields?.length
        ? `Missing: ${apiData.missing_fields.join(", ")}`
        : getApiErrorMessage(error);
    setToast({ message: detail, type: "error" });
  }}
  };

  const handlePrevious = () => {
    setErrors({});

    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <CreateProjectHeader currentStep={currentStep} />

      <main className="mx-auto max-w-[980px] px-6 py-6">
        {renderStep()}

        <NavigationButtons
          currentStep={currentStep}
          totalSteps={4}
          isLastStep={currentStep === 4}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </main>
    </div>
  );
}