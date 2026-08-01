import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api/v1/talent";

export const getOpportunities = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${API_BASE_URL}/opportunities`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.opportunities || [];
  } catch (error) {
    const fallbackResponse = await axios.get("http://127.0.0.1:5000/api/v1/projects/");
    return fallbackResponse.data.projects || [];
  }
};

export const getTalentData = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_BASE_URL}/data`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const applyToProject = async (projectId, roleTitle = "", coverLetter = "") => {
  const token = localStorage.getItem("token");
  
  console.log("applyToProject called with:", { projectId, roleTitle, coverLetter });
  console.log("Token exists:", !!token);

  if (!token) {
    throw new Error("No authentication token found. Please log in again.");
  }

  const response = await axios.post(
    "http://127.0.0.1:5000/api/v1/application/",
    {
      project_id: projectId,
      application_type: "TALENT_ROLE",
      applied_role_title: roleTitle || "Talent Role",
      cover_letter_notes: coverLetter,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const withdrawApplication = async (applicationId) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `http://127.0.0.1:5000/api/v1/application/${applicationId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getProjectDetails = async (projectId) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `http://127.0.0.1:5000/api/v1/projects/${projectId}/details`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.project;
};
