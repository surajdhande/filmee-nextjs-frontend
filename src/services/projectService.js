import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api/v1/projects";

export const getProjects = async () => {
  const response = await axios.get(API_BASE_URL);

  return response.data.projects;
};