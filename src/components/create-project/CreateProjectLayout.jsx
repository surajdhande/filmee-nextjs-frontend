"use client";

import { useState } from "react";

import CreateProjectHeader from "./CreateProjectHeader";
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

  const handleNext = () => {
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
      console.log("Create Project", projectData);

      // TODO:
      // Call Flask API here
    }
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