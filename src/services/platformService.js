import { apiClient } from "@/lib/apiClient";

export const searchProjects = async (q) => {
  const response = await apiClient.get("/search", { params: { q } });
  return response.data;
};

export const getNotifications = async () => {
  const response = await apiClient.get("/notifications");
  return response.data.notifications || [];
};

export const submitContactForm = async (payload) => {
  const response = await apiClient.post("/contact", payload);
  return response.data;
};

export const listSavedProjects = async () => {
  const response = await apiClient.get("/saved-projects");
  return response.data.saved || [];
};

export const saveProject = async (projectId) => {
  const response = await apiClient.post("/saved-projects", { project_id: projectId });
  return response.data;
};

export const unsaveProject = async (projectId) => {
  const response = await apiClient.delete(`/saved-projects/${projectId}`);
  return response.data;
};
