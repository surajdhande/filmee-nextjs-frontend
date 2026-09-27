import { apiClient } from "@/lib/apiClient";
import { getProjects } from "@/services/projectService";

export const getOpportunities = async () => {
  try {
    const response = await apiClient.get("/talent/opportunities");
    return response.data.opportunities || [];
  } catch (error) {
    const projects = await getProjects();
    return projects || [];
  }
};

export const getTalentData = async () => {
  const response = await apiClient.get("/talent/data");
  return response.data;
};

export const applyToProject = async (projectId, roleTitle = "", coverLetter = "") => {
  const response = await apiClient.post("/application/", {
    project_id: projectId,
    application_type: "TALENT_ROLE",
    applied_role_title: roleTitle || "Talent Role",
    cover_letter_notes: coverLetter,
  });

  return response.data;
};

export const withdrawApplication = async (applicationId) => {
  const response = await apiClient.delete(`/application/${applicationId}`);
  return response.data;
};

export const getProjectDetails = async (projectId) => {
  const response = await apiClient.get(`/projects/${projectId}/detail`);
  return response.data.project;
};
