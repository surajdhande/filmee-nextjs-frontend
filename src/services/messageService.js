import { apiClient } from "@/lib/apiClient";
import { getStoredAuthToken } from "@/lib/apiConfig";

const messagesBase = "/messages";

export const getConversations = async () => {
  const token = getStoredAuthToken();
  if (!token) {
    return [];
  }
  const response = await apiClient.get(`${messagesBase}/conversations`);

  return response.data.data;
};

export const getConversation = async (userId) => {
  const token = getStoredAuthToken();
  if (!token) {
    return [];
  }
  const response = await apiClient.get(`${messagesBase}/conversation/${userId}`);

  return response.data.data;
};

export const sendMessage = async (
  recipientId,
  messageBody,
  associatedProjectId = null
) => {
  const response = await apiClient.post(`${messagesBase}/send`, {
    recipient_id: recipientId,
    message_body: messageBody,
    associated_project_id: associatedProjectId,
  });

  return response.data;
};

export const markMessageAsRead = async (conversationUserId) => {
  const response = await apiClient.put(`${messagesBase}/read`, {
    conversation_user_id: conversationUserId,
  });

  return response.data;
};

export const searchUsers = async (query) => {
  const response = await apiClient.post(`${messagesBase}/search-users`, {
    query,
  });

  return response.data.data;
};
