"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Search,
  MessageSquare,
  Video,
  Send,
  Shield,
  Filter,
  Clock,
  User,
} from "lucide-react";
import {
  getConversations,
  getConversation,
  sendMessage,
  markMessageAsRead,
} from "@/services/messageService";

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

function mapConversation(c) {
  const name = c.full_name || "Unknown User";
  return {
    id: c.other_user_id,
    name,
    project: c.user_role
      ? c.user_role.charAt(0).toUpperCase() + c.user_role.slice(1)
      : "Project Inquiry",
    avatar: makeInitials(name),
    avatarColor: c.user_role === "filmmaker" ? "#E50914" : "#7C3AED",
    unread: c.unread_count || 0,
    lastMessage: c.message_body || "",
    time: c.sent_at ? formatTime(c.sent_at) : "",
    role: c.user_role || "User",
    isActive: (c.unread_count || 0) > 0,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function InvestorMessages() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Params from "Contact Filmmaker" deep-link
  const paramFilmerId     = searchParams.get("filmerId");
  const paramFilmerName   = searchParams.get("filmerName")    || "Filmmaker";
  const paramProjectId    = searchParams.get("projectId");
  const paramProjectTitle = searchParams.get("projectTitle")  || "this project";

  // ── State ──────────────────────────────────────────────────────────────────
  const [conversations, setConversations]   = useState([]);
  const [activeFilter, setActiveFilter]     = useState("ALL");
  const [searchQuery, setSearchQuery]       = useState("");
  const [selectedConv, setSelectedConv]     = useState(null);
  const [messages, setMessages]             = useState([]);
  const [newMessage, setNewMessage]         = useState("");
  const [currentUser, setCurrentUser]       = useState(null);
  const [autoOpenDone, setAutoOpenDone]     = useState(false);
  const [isSending, setIsSending]           = useState(false);
  const bottomRef = useRef(null);

  const getCurrentUserId = useCallback(() => {
    let token = typeof window !== "undefined" ? localStorage.getItem("investor_token") : null;
    if (!token) {
      token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    }
    if (!token) return null;
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const storedUser = JSON.parse(localStorage.getItem("investor_user") || localStorage.getItem("user") || "null");
      if (storedUser && String(storedUser.user_id ?? storedUser.id) !== String(decoded.user_id)) {
        console.warn(
          "[Auth mismatch] Token user_id does not match stored 'user' object. " +
          "This usually means another login overwrote localStorage in this tab " +
          "(e.g. two dashboards open in tabs of the same browser). " +
          "Messages will render on the wrong side until this is fixed.",
          { tokenUserId: decoded.user_id, storedUser }
        );
      }
      return decoded.user_id;
    } catch (e) {
      console.error("Failed to decode auth token:", e);
      return null;
    }
  }, []);

  // Load current user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setCurrentUser(JSON.parse(stored));
    getCurrentUserId();
  }, [getCurrentUserId]);

  // ── Load conversations ─────────────────────────────────────────────────────
  const loadConversations = useCallback(async () => {
    try {
      const data = await getConversations();
      if (Array.isArray(data)) {
        setConversations(data.map(mapConversation));
      }
    } catch (err) {
      console.error("Failed to load conversations:", err);
    }
  }, []);

  // ── Load messages for a selected conversation ──────────────────────────────
  const loadMessages = useCallback(async (convId) => {
    if (!convId) return;
    try {
      const data = await getConversation(convId);
      if (Array.isArray(data)) {
        const currentUserId = getCurrentUserId();

        const mappedMsgs = data.map((m) => {
          const isMe = String(m.sender_id) === String(currentUserId);
          return {
            id: m.message_id,
            sender: isMe ? "me" : "them",
            text: m.message_body,
            time: new Date(m.sent_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        });
        setMessages(mappedMsgs);
      }
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
  }, [getCurrentUserId]);

  // ── Open a conversation ────────────────────────────────────────────────────
  const openConversation = useCallback(async (conv) => {
    setSelectedConv(conv);
    await loadMessages(conv.id);
    if (conv.unread > 0) {
      try {
        await markMessageAsRead(conv.id);
        setConversations((prev) =>
          prev.map((c) => (c.id === conv.id ? { ...c, unread: 0, isActive: false } : c))
        );
      } catch (err) {
        console.error("Failed to mark as read:", err);
      }
    }
  }, [loadMessages]);

  // ── Poll conversations ─────────────────────────────────────────────────────
  useEffect(() => {
    loadConversations();
    const interval = setInterval(loadConversations, 5000);
    return () => clearInterval(interval);
  }, [loadConversations]);

  // ── Auto-open filmmaker conversation from URL params ───────────────────────
  useEffect(() => {
    if (!paramFilmerId || autoOpenDone) return;

    const filmerId = parseInt(paramFilmerId, 10);
    if (isNaN(filmerId)) return;

    const run = async () => {
      setAutoOpenDone(true);

      const existing = conversations.find((c) => c.id === filmerId);

      if (existing) {
        openConversation(existing);
        return;
      }

      // No prior conversation — send an opening message to start the thread
      const openingMsg = `Hi! I'm interested in your project "${paramProjectTitle}". I'd love to discuss a potential investment.`;
      try {
        await sendMessage(
          filmerId,
          openingMsg,
          paramProjectId ? parseInt(paramProjectId, 10) : null
        );

        // Build a placeholder conversation so the chat panel opens instantly
        const tempConv = {
          id: filmerId,
          name: paramFilmerName,
          project: "Filmmaker",
          avatar: makeInitials(paramFilmerName),
          avatarColor: "#E50914",
          unread: 0,
          lastMessage: openingMsg,
          time: "Just now",
          role: "filmmaker",
          isActive: false,
        };
        setSelectedConv(tempConv);

        // Load the thread (opening message will be in it)
        await loadMessages(filmerId);

        // Refresh conversation list in the sidebar
        await loadConversations();
      } catch (err) {
        console.error("Failed to start conversation:", err);
      }
    };

    run();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversations, paramFilmerId, autoOpenDone]);

  // ── Poll active conversation messages ─────────────────────────────────────
  useEffect(() => {
    if (!selectedConv) return;
    const interval = setInterval(() => loadMessages(selectedConv.id), 4000);
    return () => clearInterval(interval);
  }, [selectedConv, loadMessages]);

  // ── Scroll to bottom on new messages ──────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ── Send a message ────────────────────────────────────────────────────────
  const handleSend = async () => {
    const text = newMessage.trim();
    if (!text || !selectedConv || isSending) return;

    setIsSending(true);
    try {
      const res = await sendMessage(selectedConv.id, text);
      if (res) {
        const optimistic = {
          id: res.message_id || Date.now(),
          sender: "me",
          text,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, optimistic]);
        setNewMessage("");
        setConversations((prev) =>
          prev.map((c) =>
            c.id === selectedConv.id ? { ...c, lastMessage: text, time: "Just now" } : c
          )
        );
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Derived state ──────────────────────────────────────────────────────────
  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.project.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === "ACTIVE") return matchesSearch && c.isActive;
    return matchesSearch;
  });

  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen bg-[#0B0B0B] text-white overflow-hidden">

      {/* ── Top nav bar ── */}
      <header className="shrink-0 w-full border-b border-[#1A1A1A] bg-[#0B0B0B]">
        <div className="flex items-center gap-3 px-6 py-4">
          <button
            onClick={() => router.push("/dashboard/investor")}
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
        <div className="w-[380px] shrink-0 flex flex-col border-r border-[#1A1A1A] bg-[#0B0B0B]">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-6 pb-3">
            <h2 className="text-[17px] font-bold text-white">Messages</h2>
            <div className="rounded-full border border-zinc-800 bg-black px-3 py-1 text-[11px] font-medium text-zinc-300">
              {filteredConversations.length} {filteredConversations.length === 1 ? "chat" : "chats"}
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
                  onClick={() => openConversation(conv)}
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
                      <p className="text-[11px] text-zinc-500 mt-0.5 truncate">{conv.project}</p>
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
        <div className="flex flex-1 flex-col bg-[#0B0B0B]">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A] bg-[#0B0B0B]">
                <div className="flex items-center gap-3">
                  <div
                    className="h-9 w-9 rounded-full flex items-center justify-center text-[14px] font-bold text-white"
                    style={{ backgroundColor: selectedConv.avatarColor }}
                  >
                    {selectedConv.avatar}
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-white leading-tight">{selectedConv.name}</h3>
                    <p className="text-[11px] text-zinc-550 mt-0.5">{selectedConv.project}</p>
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

                {messages.length === 0 && (
                  <p className="text-center text-zinc-650 text-[12px]">No messages yet. Say hello!</p>
                )}

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
                    placeholder={`Message ${selectedConv.name}...`}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="flex-1 bg-transparent text-[13px] text-white placeholder-zinc-550 outline-none px-2"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!newMessage.trim() || isSending}
                    className="h-9 w-9 flex items-center justify-center rounded-full bg-[#E50914] text-white disabled:opacity-40 hover:brightness-110 transition shrink-0 shadow-[0_0_10px_rgba(229,9,20,0.4)]"
                  >
                    <Send size={14} className="transform translate-x-[0.5px]" />
                  </button>
                </div>
                <p className="mt-2.5 text-[10px] text-zinc-500 text-center">
                  Messages are secured and filtered for personal contact information.
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
                  Select a conversation to start chatting, or contact a filmmaker directly from a film&apos;s detail page.
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
    </div>
  );
}
