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