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

  return response.data.projects.map((project) => ({
    ...project,
    id: project.project_id,
    fundingRaised: Number(project.funding_raised),
    fundingTarget: Number(project.funding_target),
  }));
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

/* ─── Profile API ─────────────────────────────────────────────────── */

/**
 * GET /api/v1/profile/me
 * Returns the logged-in user's full profile.
 */
export const getMyProfile = async () => {
  const response = await axios.get(`${API_BASE_URL}/profile/me`, {
    headers: getAuthHeaders(),
  });
  return response.data.profile;
};

/**
 * PUT /api/v1/profile/me
 * Updates profile fields. All fields below are accepted by the backend.
 * @param {Object} data - { first_name, last_name, phone_number, bio,
 *                          location, website_portfolio_url,
 *                          years_of_experience, skills[], achievements[] }
 */
export const updateMyProfile = async (data) => {
  const response = await axios.put(`${API_BASE_URL}/profile/me`, data, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

/**
 * PUT /api/v1/profile/me/image
 * Uploads a profile avatar image (multipart/form-data).
 * @param {File} imageFile
 */
export const uploadProfileImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  const response = await axios.put(`${API_BASE_URL}/profile/me/image`, formData, {
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data; // { message, profile_image_url }
};
