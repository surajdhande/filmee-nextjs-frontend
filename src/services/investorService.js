import { apiClient } from "@/lib/apiClient";

/**
 * Get all available projects for browsing (public, no auth required).
 */
export const getInvestmentOpportunities = async () => {
  const response = await apiClient.get("/projects/");

  return response.data.projects.map((project) => ({
    ...project,
    id: project.project_id,
    fundingRaised: Number(project.funding_raised),
    fundingTarget: Number(project.funding_target),
  }));
};

/**
 * Get all investments made by the currently logged-in investor.
 */
export const getMyInvestments = async () => {
  const response = await apiClient.get("/investments/my-investments");
  return response.data.projects;
};

/**
 * Submit a new investment for a project.
 */
export const createInvestment = async (projectId, amount) => {
  const response = await apiClient.post("/investments/", {
    project_id: projectId,
    investment_amount: amount,
  });
  return response.data;
};

export const getMyProfile = async () => {
  const response = await apiClient.get("/profile/me");
  return response.data.profile;
};

export const updateMyProfile = async (data) => {
  const response = await apiClient.put("/profile/me", data);
  return response.data;
};

export const getMyNegotiationEvents = async () => {
  const response = await apiClient.get("/investments/negotiation-events");
  return response.data.events || [];
};

export const getInvestmentOfferEvents = async (investmentId) => {
  const response = await apiClient.get(
    `/investments/${investmentId}/offer-events`
  );
  return response.data.events || [];
};

export const postInvestmentOfferEvent = async (investmentId, payload) => {
  const response = await apiClient.post(
    `/investments/${investmentId}/offer-events`,
    payload
  );
  return response.data;
};

export const uploadProfileImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  const response = await apiClient.put("/profile/me/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
