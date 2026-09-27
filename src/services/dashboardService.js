import { apiClient } from "@/lib/apiClient";

export const getFilmmakerOverview = async () => {
  const response = await apiClient.get("/dashboard/filmmaker/overview");
  return response.data;
};

export const getFilmmakerAnalytics = async (projectId) => {
  const params = projectId ? { projectId } : {};
  const response = await apiClient.get("/dashboard/filmmaker/analytics", {
    params,
  });
  return response.data;
};

export const getInvestorOverview = async () => {
  const response = await apiClient.get("/dashboard/investor/overview");
  return response.data;
};

export const getInvestorAnalytics = async () => {
  const response = await apiClient.get("/dashboard/investor/analytics");
  return response.data;
};
