"use client";

import {
  socket,
  joinRoom,
  leaveRoom,
  sendSocketMessage,
} from "@/services/socketService";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import FilmmakerLayout from "./FilmmakerLayout";
import {
  getConversation,
  getConversations,
  markMessageAsRead,
  searchUsers,
  sendMessage,
} from "@/services/messageService";
import {
  ArrowLeft,
  Search,
  MessageSquare,
  Video,
  Send,
  Shield,
  Filter,
  Plus,
  Clock,
  User,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const FILTERS = ["ALL", "ACTIVE", "VIDEO"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatTime = (isoString) => {
  if (!isoString) return "";
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 60) return diffMins <= 0 ? "Just now" : `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  } catch {
    return "";
  }
};

function makeInitials(name = "") {
  return name.split(" ").map((n) => n[0] ?? "").join("").slice(0, 2).toUpperCase() || "?";
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FilmmakerMessages() {
  const router = useRouter();
  const [conversations, setConversations] = useState([]);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConv, setSelectedConv] = useState(null);
  const selectedConvRef = useRef(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const bottomRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);
  const currentUserIdRef = useRef(null);

  const getCurrentUserId = useCallback(() => {
    let token = typeof window !== "undefined" ? localStorage.getItem("filmmaker_token") : null;
    if (!token) {
      token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    }
    if (!token) return null;
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const storedUser = JSON.parse(localStorage.getItem("filmmaker_user") || localStorage.getItem("user") || "null");
      if (storedUser && String(storedUser.user_id ?? storedUser.id) !== String(decoded.user_id)) {
        console.warn(
          "[Auth mismatch] Token user_id does not match stored 'user' object. " +
          "This usually means another login overwrote localStorage in this tab " +
          "(e.g. two dashboards open in tabs of the same browser). " +
          "Messages will render on the wrong side until this is fixed.",
          { tokenUserId: decoded.user_id, storedUser }
        );
      }
      currentUserIdRef.current = decoded.user_id;
      return decoded.user_id;
    } catch (e) {
      console.error("Failed to decode auth token:", e);
      return null;
    }
  }, []);

  // Safeguard: Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("filmmaker_token") || localStorage.getItem("token");
    const storedUser = localStorage.getItem("filmmaker_user") || localStorage.getItem("user");
    if (!storedUser || !token) {
      router.push("/login");
      return;
    }
    try {
      setCurrentUser(JSON.parse(storedUser));
      getCurrentUserId();
    } catch (e) {
      router.push("/login");
    }
  }, [router, getCurrentUserId]);

  const fetchConversations = useCallback(async () => {
    const token = typeof window !== "undefined"
      ? (localStorage.getItem("filmmaker_token") || localStorage.getItem("token"))
      : null;
    if (!token) return;
    try {
      const data = await getConversations();
      const formatted = data.map((conversation) => {
        const name = conversation.full_name || "Unknown User";
        return {
          id: conversation.other_user_id,
          name,
          project: conversation.user_role === "investor" ? "Investor Inquiry" : "Project Inquiry",
          avatar: makeInitials(name),
          avatarColor: conversation.user_role === "investor" ? "#7C3AED" : "#E50914",
          unread: conversation.unread_count || 0,
          lastMessage: conversation.message_body || "",
          time: conversation.sent_at ? formatTime(conversation.sent_at) : "",
          role: conversation.user_role || "User",
          isActive: (conversation.unread_count || 0) > 0,
        };
      });

      setConversations(formatted);
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    }
  }, []);

  const loadConversation = useCallback(async (userId) => {
    const token = typeof window !== "undefined"
      ? (localStorage.getItem("filmmaker_token") || localStorage.getItem("token"))
      : null;
    if (!token) return;
    try {
      const data = await getConversation(userId);
      const currentUserId = getCurrentUserId();

      const formattedMessages = data.map((message) => {
        const isMe = String(message.sender_id) === String(currentUserId);
        return {
          id: message.message_id,
          sender: isMe ? "me" : "other",
          text: message.message_body,
          time: new Date(message.sent_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      });
      setMessages(formattedMessages);
      await markMessageAsRead(userId);
      await fetchConversations();
    } catch (error) {
      console.error(error);
    }
  }, [getCurrentUserId, fetchConversations]);

  const handleSelectConversation = async (conv) => {
    try {
      setSelectedConv(conv);
      await loadConversation(conv.id);
    } catch (error) {
      console.error("Failed to select conversation:", error);
    }
  };

  const handleSend = async () => {
    const text = newMessage.trim();
    if (!text || !selectedConv) return;

    // Prefer filmmaker_token to avoid session collision with investor tab
    const token = typeof window !== "undefined"
      ? (localStorage.getItem("filmmaker_token") || localStorage.getItem("token"))
      : null;
    if (!token) return;

    const currentUserId = getCurrentUserId();
    setNewMessage("");

    try {
      const res = await sendMessage(selectedConv.id, text, null);
      const optimistic = {
        id: res?.message_id || Date.now(),
        sender: "me",
        text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, optimistic]);

      sendSocketMessage(
        currentUserId,
        selectedConv.id,
        text,
        null
      );

      await fetchConversations();
    } catch (error) {
      console.error("Failed to send message:", error);
      setNewMessage(text);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Poll conversation list every 5s so new conversations appear without refresh
  useEffect(() => {
    const interval = setInterval(() => fetchConversations(), 5000);
    return () => clearInterval(interval);
  }, [fetchConversations]);

  // Poll messages fallback every 4s for the active conversation
  useEffect(() => {
    if (!selectedConv) return;
    const interval = setInterval(() => loadConversation(selectedConv.id), 4000);
    return () => clearInterval(interval);
  }, [selectedConv, loadConversation]);

  useEffect(() => {
    selectedConvRef.current = selectedConv;
  }, [selectedConv]);

  // WebSocket connection
  useEffect(() => {
    const token = typeof window !== "undefined"
      ? (localStorage.getItem("filmmaker_token") || localStorage.getItem("token"))
      : null;
    if (!token) return;

    socket.connect();
    const currentUserId = getCurrentUserId();

    socket.on("connected", (data) => {
      joinRoom(currentUserId);
    });

    socket.on("joined", (data) => {
      // room joined
    });

    socket.on("receive_message", (message) => {
      const activeConversation = selectedConvRef.current;

      if (
        activeConversation &&
        (
          activeConversation.id === message.sender_id ||
          activeConversation.id === message.recipient_id
        )
      ) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === message.message_id)) {
            return prev;
          }
          if (message.sender === "sender") {
            return prev;
          }

          return [
            ...prev,
            {
              id: message.message_id,
              sender: "other",
              text: message.message_body,
              time: new Date(message.sent_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ];
        });
      }

      setConversations((prev) => {
        const otherUserId =
          message.sender_id === currentUserId
            ? message.recipient_id
            : message.sender_id;

        const existingConversation = prev.find(
          (conv) => conv.id === otherUserId
        );

        if (existingConversation) {
          const updatedConversation = {
            ...existingConversation,
            lastMessage: message.message_body,
            time: formatTime(message.sent_at),
          };

          return [
            updatedConversation,
            ...prev.filter((conv) => conv.id !== otherUserId),
          ];
        }

        return [
          {
            id: selectedConvRef.current?.id,
            name: selectedConvRef.current?.name,
            project: selectedConvRef.current?.project || "",
            avatar: selectedConvRef.current?.avatar,
            avatarColor: selectedConvRef.current?.avatarColor || "#E50914",
            unread: 0,
            lastMessage: message.message_body,
            time: formatTime(message.sent_at),
            role: selectedConvRef.current?.role,
            isActive: false,
          },
          ...prev,
        ];
      });
    });

    return () => {
      leaveRoom(currentUserId);
      socket.off("connected");
      socket.off("joined");
      socket.off("receive_message");
      socket.disconnect();
    };
  }, [getCurrentUserId]);

  // Search Users
  useEffect(() => {
    if (!userSearch.trim()) {
      setSearchResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setIsSearching(true);
        const users = await searchUsers(userSearch);
        setSearchResults(users);
      } catch (error) {
        console.error("Failed to search users:", error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [userSearch]);

  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.project.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === "ACTIVE") return matchesSearch && c.isActive;
    return matchesSearch;
  });

  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);

  if (!currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0B0B] text-white">
        Loading...
      </div>
    );
  }

  return (
    <FilmmakerLayout>
      <div className="flex flex-col h-full bg-[#0B0B0B] text-white overflow-hidden">

      {/* ── Top nav bar ── */}
      <header className="shrink-0 w-full border-b border-[#1A1A1A] bg-[#0B0B0B]">
        <div className="flex items-center gap-3 px-6 py-4">
          <button
            onClick={() => router.push("/dashboard/filmmaker")}
            className="text-zinc-400 hover:text-white transition"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-[16px] font-bold leading-none text-white tracking-tight">Messages</h1>
            <p className="mt-1 text-[11px] text-zinc-500">Secure communication platform</p>
          </div>
        </div>
      </header>

      {/* ── Two-panel body ── */}
      <div className="flex flex-1 overflow-hidden bg-[#0B0B0B]">

        {/* ── LEFT PANEL: Conversation List ── */}
        <div className={`w-full lg:w-[380px] shrink-0 flex flex-col border-r border-[#1A1A1A] bg-[#0B0B0B] ${selectedConv ? "hidden lg:flex" : "flex"}`}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-6 pb-3">
            <h2 className="text-[17px] font-bold text-white">Messages</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNewChatModal(true)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-800 bg-black text-white hover:bg-zinc-900 transition"
              >
                <Plus size={14} />
              </button>
              <div className="rounded-full border border-zinc-800 bg-black px-3 py-1 text-[11px] font-medium text-zinc-300">
                {filteredConversations.length} {filteredConversations.length === 1 ? "chat" : "chats"}
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2 rounded-full bg-[#121212] border border-[#222] px-4 py-2.5">
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-[13px] text-white placeholder-zinc-550 outline-none px-1"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 px-4 pb-4">
            {FILTERS.map((f) => {
              let Icon;
              if (f === "ALL") Icon = MessageSquare;
              else if (f === "ACTIVE") Icon = User;
              else if (f === "VIDEO") Icon = Video;

              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[12px] font-bold tracking-wider transition-all duration-200 ${
                    activeFilter === f
                      ? "bg-[#E50914] text-white shadow-[0_0_12px_rgba(229,9,20,0.6)]"
                      : "border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"
                  }`}
                >
                  {Icon && <Icon size={12} />}
                  {f}
                </button>
              );
            })}
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto px-3 space-y-2 pb-4">
            {filteredConversations.length === 0 ? (
              <p className="text-center text-zinc-650 text-sm mt-10">No conversations found.</p>
            ) : (
              filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv)}
                  className={`w-full text-left flex flex-col rounded-2xl p-4 transition-all duration-200 border ${
                    selectedConv?.id === conv.id
                      ? "bg-[#161616]/90 border-[#E50914] shadow-[0_0_10px_rgba(229,9,20,0.15)]"
                      : "bg-[#111111]/40 border-transparent hover:bg-[#161616]/50 hover:border-zinc-800"
                  }`}
                >
                  <div className="flex gap-3 items-start w-full">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <div
                        className="h-10 w-10 rounded-full flex items-center justify-center text-[15px] font-bold text-white bg-[#E50914]"
                        style={{ backgroundColor: conv.avatarColor }}
                      >
                        {conv.avatar}
                      </div>
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-[13px] font-bold text-white truncate">{conv.name}</span>
                          {conv.unread > 0 && (
                            <span className="flex h-5 min-w-[20px] px-1 items-center justify-center rounded-full bg-[#E50914] text-[10px] font-bold text-white shrink-0">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-zinc-500 shrink-0 ml-2">
                          <Clock size={10} />
                          <span>{conv.time}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-zinc-500 mt-0.5 truncate">{conv.project || "No Project"}</p>
                      <p className="text-[12px] text-zinc-400 mt-1 truncate">{conv.lastMessage}</p>
                      <div className="mt-2.5">
                        <span className="inline-flex items-center rounded-full border border-zinc-800 bg-black px-2.5 py-0.5 text-[10px] text-zinc-350 font-medium capitalize">
                          {conv.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* ── RIGHT PANEL: Chat or Welcome ── */}
        <div className={`flex flex-1 flex-col bg-[#0B0B0B] ${selectedConv ? "flex" : "hidden lg:flex"}`}>
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#1A1A1A] bg-[#0B0B0B]">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <button
                    onClick={() => setSelectedConv(null)}
                    className="mr-1 text-zinc-400 hover:text-white lg:hidden transition shrink-0"
                    aria-label="Back to chats"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <div
                    className="h-9 w-9 rounded-full flex items-center justify-center text-[14px] font-bold text-white"
                    style={{ backgroundColor: selectedConv.avatarColor || '#E50914' }}
                  >
                    {selectedConv.avatar}
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-white leading-tight">{selectedConv.name}</h3>
                    <p className="text-[11px] text-zinc-550 mt-0.5">{selectedConv.project || selectedConv.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1.5 rounded-full border border-[#E50914] px-4 py-1.5 text-[12px] font-bold text-[#E50914] hover:bg-[#E50914]/10 transition">
                    <Video size={13} />
                    VIDEO CALL
                  </button>
                  <div className="flex items-center gap-1.5 rounded-full border border-zinc-800 bg-black px-3 py-1.5 text-xs font-medium text-white">
                    <User size={12} className="text-zinc-400" />
                    <span className="capitalize">{selectedConv.role}</span>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 bg-[#0B0B0B]">
                {/* System message */}
                <div className="flex justify-center my-2">
                  <div className="rounded-full bg-[#161616] border border-[#222] px-5 py-1.5 text-[11px] text-zinc-350 text-center">
                    Chat room created. You can now communicate about the investment opportunity.
                  </div>
                </div>

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="max-w-[65%] space-y-1">
                      <div
                        className={`rounded-2xl px-5 py-3 text-[13px] leading-relaxed ${
                          msg.sender === "me"
                            ? "bg-[#E50914] text-white rounded-br-sm"
                            : "bg-[#161616] text-white border border-zinc-850 rounded-bl-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <p
                        className={`text-[10px] text-zinc-500 ${
                          msg.sender === "me" ? "text-right" : "text-left"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input Area */}
              <div className="px-6 py-4 border-t border-[#1A1A1A] bg-[#0B0B0B]">
                <div className="flex items-center gap-3 rounded-full bg-[#121212] border border-[#222] px-4 py-2.5">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-[13px] text-white placeholder-zinc-550 outline-none px-2"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!newMessage.trim()}
                    className="h-9 w-9 flex items-center justify-center rounded-full bg-[#E50914] text-white disabled:opacity-40 hover:brightness-110 transition shrink-0 shadow-[0_0_10px_rgba(229,9,20,0.4)]"
                  >
                    <Send size={14} className="transform translate-x-[0.5px]" />
                  </button>
                </div>
                <p className="mt-2.5 text-[10px] text-zinc-500 text-center">
                  Messages are automatically filtered to remove personal contact information.
                </p>
              </div>
            </>
          ) : (
            /* Welcome / Empty State */
            <div className="flex flex-1 items-center justify-center bg-[#0B0B0B]">
              <div className="text-center rounded-2xl border border-[#2A2A2A] bg-[#111] px-10 py-10 max-w-sm w-full">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#E50914]/10">
                  <MessageSquare size={22} className="text-[#E50914]" />
                </div>
                <h3 className="text-[16px] font-bold text-white mb-2">Welcome to Secure Messaging</h3>
                <p className="text-[13px] text-zinc-500 mb-6 leading-relaxed">
                  Select a conversation to start chatting. All messages are filtered for security
                  and personal contact information is automatically removed.
                </p>
                <div className="space-y-2 text-[12px] text-zinc-500">
                  <p className="flex items-center justify-center gap-2">
                    <Shield size={12} className="text-[#E50914]" /> End-to-end security
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <Filter size={12} className="text-[#E50914]" /> Content filtering
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <Video size={12} className="text-[#E50914]" /> Video call support
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Message Modal */}
      {showNewChatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-[420px] rounded-2xl border border-zinc-850 bg-[#0B0B0B] shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#1A1A1A] px-5 py-4">
              <h2 className="text-md font-bold text-white">
                New Message
              </h2>
              <button
                onClick={() => setShowNewChatModal(false)}
                className="text-zinc-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            {/* Search Input */}
            <div className="p-5">
              <div className="flex items-center gap-2 rounded-full border border-zinc-850 bg-[#121212] px-4 py-2.5">
                <Search
                  size={14}
                  className="text-zinc-500 shrink-0"
                />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder-zinc-550 outline-none px-1"
                />
              </div>

              {/* Search Results */}
              <div className="mt-4 max-h-72 overflow-y-auto space-y-1">
                {isSearching && (
                  <p className="py-4 text-center text-xs text-zinc-500">
                    Searching...
                  </p>
                )}

                {!isSearching &&
                  searchResults.map((user) => (
                    <button
                      key={user.user_id}
                      onClick={async () => {
                        const name = user.full_name;
                        const conversation = {
                          id: user.user_id,
                          name,
                          project: user.user_role === "investor" ? "Investor Inquiry" : "Project Inquiry",
                          avatar: makeInitials(name),
                          avatarColor: user.user_role === "investor" ? "#7C3AED" : "#E50914",
                          unread: 0,
                          lastMessage: "",
                          time: "",
                          role: user.user_role,
                          isActive: false,
                        };

                        setSelectedConv(conversation);
                        await loadConversation(user.user_id);
                        setShowNewChatModal(false);
                        setUserSearch("");
                        setSearchResults([]);
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-[#121212] border border-transparent hover:border-zinc-850"
                    >
                      {/* Avatar */}
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E50914] font-bold text-[14px] text-white shrink-0">
                        {makeInitials(user.full_name)}
                      </div>

                      {/* User Details */}
                      <div className="flex flex-col items-start min-w-0">
                        <span className="text-[13px] font-bold text-white truncate">
                          {user.full_name}
                        </span>
                        <span className="text-[10px] uppercase text-zinc-500 mt-0.5 tracking-wider font-semibold">
                          {user.user_role}
                        </span>
                      </div>
                    </button>
                  ))}

                {!isSearching &&
                  userSearch.trim() &&
                  searchResults.length === 0 && (
                    <p className="py-4 text-center text-xs text-zinc-500">
                      No users found.
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </FilmmakerLayout>
  );
}