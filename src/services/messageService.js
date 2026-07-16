import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api/v1/messages";

function getAuthHeaders() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
}

// Add a global Axios response interceptor to handle 401 Unauthorized errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Only redirect if we are not already on login, signup or landing pages
        const path = window.location.pathname;
        if (path !== "/login" && path !== "/signup" && path !== "/") {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

// ─────────────────────────────────────────────────────────────
// Fetch all conversations for the logged-in user
// ─────────────────────────────────────────────────────────────
export const getConversations = async () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) {
    return [];
  }
  const response = await axios.get(
    `${API_BASE_URL}/conversations`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data.data;
};

// ─────────────────────────────────────────────────────────────
// Fetch messages for a selected conversation
// ─────────────────────────────────────────────────────────────
export const getConversation = async (userId) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) {
    return [];
  }
  const response = await axios.get(
    `${API_BASE_URL}/conversation/${userId}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data.data;
};

// ─────────────────────────────────────────────────────────────
// Send Message
// ─────────────────────────────────────────────────────────────
export const sendMessage = async (
  recipientId,
  messageBody,
  associatedProjectId = null
) => {
  const response = await axios.post(
    `${API_BASE_URL}/send`,
    {
      recipient_id: recipientId,
      message_body: messageBody,
      associated_project_id: associatedProjectId,
    },
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

// ─────────────────────────────────────────────────────────────
// Mark Conversation As Read
// ─────────────────────────────────────────────────────────────
export const markMessageAsRead = async (conversationUserId) => {
  const response = await axios.put(
    `${API_BASE_URL}/read`,
    {
      conversation_user_id: conversationUserId,
    },
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

// ─────────────────────────────────────────────────────────────
// Search Users
// Returns up to 10 users matching the search query
// ─────────────────────────────────────────────────────────────
export const searchUsers = async (query) => {
  const response = await axios.post(
    `${API_BASE_URL}/search-users`,
    {
      query,
    },
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data.data;
};