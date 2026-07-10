import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api/v1";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
}

/**
 * Get all available projects for browsing (public, no auth required).
 */
export const getInvestmentOpportunities = async () => {
  const response = await axios.get(`${API_BASE_URL}/projects/`);
  return response.data.projects;
};

/**
 * Get all investments made by the currently logged-in investor.
 */
export const getMyInvestments = async () => {
  const response = await axios.get(`${API_BASE_URL}/investments/my-investments`, {
    headers: getAuthHeaders(),
  });
  return response.data.projects;
};

/**
 * Submit a new investment for a project.
 * @param {number|string} projectId
 * @param {number} amount
 */
export const createInvestment = async (projectId, amount) => {
  const response = await axios.post(
    `${API_BASE_URL}/investments/`,
    {
      project_id: projectId,
      investment_amount: amount,
    },
    { headers: getAuthHeaders() }
  );
  return response.data;
};
