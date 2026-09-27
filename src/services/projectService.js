import { apiClient } from "@/lib/apiClient";
import { getStoredAuthToken } from "@/lib/apiConfig";

const projectsBase = "/projects";

export const getProjects = async () => {
  const response = await apiClient.get(`${projectsBase}/`);

  return response.data.projects;
};

export const createProject = async (projectData) => {
  const response = await apiClient.post(`${projectsBase}/`, projectData);

  return response.data;
};

export const getMyProjects = async () => {
  const token = getStoredAuthToken();
  if (!token) {
    throw new Error("Authorization token missing");
  }

  const response = await apiClient.get(`${projectsBase}/myprojects`);

  return response.data.projects;
};

export const getProjectById = async (projectId) => {
  const response = await apiClient.get(`${projectsBase}/${projectId}`);

  return response.data.project;
};

/**
 * Fetch full project detail for an investor (no filmmaker restriction).
 */
export const getProjectDetail = async (projectId) => {
  const response = await apiClient.get(`${projectsBase}/${projectId}/detail`);

  return response.data.project;
};

export const updateProject = async (projectId, projectData) => {
  const response = await apiClient.put(`${projectsBase}/${projectId}`, projectData);

  return response.data;
};

/**
 * Record a project page view (once per browser session per project on the client).
 */
export const recordProjectView = async (projectId) => {
  const response = await apiClient.post(`${projectsBase}/${projectId}/view`);
  return response.data;
};

export async function uploadProjectPitchDeck(file) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await apiClient.post(`${projectsBase}/upload/pitch-deck`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function uploadProjectLookbook(file) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await apiClient.post(`${projectsBase}/upload/lookbook`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}
