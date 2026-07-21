import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api/v1/messages";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
}

// ─────────────────────────────────────────────────────────────
// Fetch all conversations for the logged-in user
// ─────────────────────────────────────────────────────────────
export const getConversations = async () => {
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