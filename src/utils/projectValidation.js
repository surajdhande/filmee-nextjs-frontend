export function validateStepOne(projectData) {
  const errors = {};

  // Project Title
  const titleWords = projectData.title.trim().split(/\s+/);

  if (!projectData.title.trim()) {
    errors.title = "Project title is required.";
  } else if (titleWords.length < 2) {
    errors.title = "Project title must contain at least 2 words.";
  }

  // Genre
  if (!projectData.genre) {
    errors.genre = "Please select a genre.";
  }

  // Budget
  if (!projectData.funding_target) {
    errors.funding_target = "Budget is required.";
  } else if (
    isNaN(projectData.funding_target) ||
    Number(projectData.funding_target) <= 0
  ) {
    errors.funding_target = "Enter a valid budget amount.";
  }

  // Logline
  if (!projectData.logline.trim()) {
    errors.logline = "Logline is required.";
  } else if (projectData.logline.trim().length < 10) {
    errors.logline = "Logline must be at least 10 characters.";
  }

  // Synopsis
  if (!projectData.synopsis.trim()) {
    errors.synopsis = "Synopsis is required.";
  } else if (projectData.synopsis.trim().length < 10) {
    errors.synopsis = "Synopsis must be at least 10 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateStepTwo(projectData) {
  const errors = {};

  if (!projectData.production_timeline) {
    errors.production_timeline = "Production timeline is required.";
  }

  if (!projectData.primary_location.trim()) {
    errors.primary_location = "Primary location is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateStepThree(projectData) {
  const errors = {};

  if (!projectData.funding_goals_breakdown.trim()) {
    errors.funding_goals_breakdown =
      "Funding breakdown is required.";
  } else if (
    projectData.funding_goals_breakdown.trim().length < 10
  ) {
    errors.funding_goals_breakdown =
      "Funding breakdown must be at least 10 characters.";
  }

  if (!projectData.expected_roi_percentage) {
    errors.expected_roi_percentage =
      "ROI percentage is required.";
  }

  if (!projectData.distribution_strategy.trim()) {
    errors.distribution_strategy =
      "Distribution strategy is required.";
  } else if (
    projectData.distribution_strategy.trim().length < 10
  ) {
    errors.distribution_strategy =
      "Distribution strategy must be at least 10 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateStepFour(projectData) {
  const errors = {};

  return {
    isValid: true,
    errors,
  };
}