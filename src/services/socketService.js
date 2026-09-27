import { io } from "socket.io-client";
import { getSocketOrigin } from "@/lib/apiConfig";

export const socket = io(getSocketOrigin(), {
  autoConnect: false,
  transports: ["websocket"],
});

export const joinRoom = (userId) => {
  socket.emit("join", {
    user_id: userId,
  });
};

export const leaveRoom = (userId) => {
  socket.emit("leave", {
    user_id: userId,
  });
};

export const sendSocketMessage = (
  senderId,
  recipientId,
  messageBody,
  associatedProjectId = null
) => {
  socket.emit("send_message", {
    sender_id: senderId,
    recipient_id: recipientId,
    message_body: messageBody,
    associated_project_id: associatedProjectId,
  });
};
