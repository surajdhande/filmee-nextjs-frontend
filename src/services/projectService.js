import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api/v1/projects/";
export const getProjects = async () => {
  const response = await axios.get(API_BASE_URL);

  return response.data.projects;
};
export const createProject = async (projectData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    API_BASE_URL,
    projectData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const getMyProjects = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_BASE_URL}myprojects`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.projects;
};

export const getProjectById = async (projectId) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_BASE_URL}${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.project;
};

/**
 * Fetch full project detail for an investor (no filmmaker restriction).
 * Uses the /api/v1/projects/<id>/details endpoint.
 * @param {number|string} projectId
 */
export const getProjectDetail = async (projectId) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_BASE_URL}${projectId}/details`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.project;
};

export const updateProject = async (projectId, projectData) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_BASE_URL}${projectId}`,
    projectData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
