"use client";

import { useState } from "react";
import CreateProjectLayout from "@/components/create-project/CreateProjectLayout";

export default function CreateProjectPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const [projectData, setProjectData] = useState({
    title: "",
    genre: "",
    funding_target: "",
    logline: "",
    synopsis: "",

    production_timeline: "",
    primary_location: "",
    target_audience: "",
    castRequirements: [],
    crewRequirements: [],

    funding_goals_breakdown: "",
    expected_roi_percentage: "",
    distribution_strategy: "",

    pitchDeck: null,
    trailer: null,
    storyboard: null,
    lookbook: null,
  });

  return (
    <CreateProjectLayout
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      projectData={projectData}
      setProjectData={setProjectData}
    />
  );
}