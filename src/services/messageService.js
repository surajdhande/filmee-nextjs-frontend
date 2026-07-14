import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api/v1/messages";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
}

/**
 * Fetch list of conversations for the currently logged-in user.
 */
export const getConversations = async () => {
  const response = await axios.get(`${API_BASE_URL}/conversations`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

/**
 * Fetch messages between the logged-in user and other user.
 */
export const getConversationMessages = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/conversation/${userId}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

/**
 * Send a message to a recipient.
 */
export const sendMessage = async (recipientId, messageBody, associatedProjectId = null) => {
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

/**
 * Mark messages from a conversation user as read.
 */
export const markAsRead = async (conversationUserId) => {
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
