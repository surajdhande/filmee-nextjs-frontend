"use client";

import { useState } from "react";
import { createProject } from "@/services/projectService";
import CreateProjectHeader from "./CreateProjectHeader";
import { useRouter } from "next/navigation";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import NavigationButtons from "./NavigationButtons";

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
  const router = useRouter();

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
      return;
    }

    // Clear previous errors
    setErrors({});

    if (currentStep < 4) {
  setCurrentStep(currentStep + 1);
} else {
  try {
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

      open_talent_roles: [
        ...projectData.castRequirements,
        ...projectData.crewRequirements,
      ],
    };

    const response = await createProject(payload);

    alert("Project created successfully!");

    router.push("/dashboard/filmmaker/projects");

  } catch (error) {
    alert(error.response?.data?.message || error.message);
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