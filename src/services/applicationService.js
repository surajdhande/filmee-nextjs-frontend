import { apiClient } from "@/lib/apiClient";

export const getFilmmakerTalentApplications = async () => {
  const response = await apiClient.get("/application/for-filmmaker");
  return response.data;
};

export const updateApplicationStatus = async (applicationId, status) => {
  const response = await apiClient.patch(`/application/${applicationId}/status`, {
    status,
  });
  return response.data;
};

export const getApplicationDetail = async (applicationId) => {
  const response = await apiClient.get(`/application/${applicationId}/detail`);
  return response.data.application;
};
