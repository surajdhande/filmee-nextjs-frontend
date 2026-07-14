"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Search,
  MessageSquare,
  Video,
  Send,
  Shield,
  Filter,
} from "lucide-react";
import Image from "next/image";
import {
  getConversations,
  getConversationMessages,
  sendMessage,
  markAsRead,
} from "@/services/messageService";

// ─── Filter Tabs ──────────────────────────────────────────────────────────────

const FILTERS = ["ALL", "ACTIVE", "VIDEO"];

// Helper to format timestamps to relative time strings
const formatTime = (isoString) => {
  if (!isoString) return "";
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return diffMins <= 0 ? "Just now" : `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  } catch (e) {
    return "";
  }
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function InvestorMessages() {
  const router = useRouter();
  const [conversations, setConversations] = useState([]);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConv, setSelectedConv] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const bottomRef = useRef(null);

  // Load current user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setCurrentUser(JSON.parse(stored));
    }
  }, []);

  const loadConversations = async () => {
    try {
      const res = await getConversations();
      if (res.success && res.data) {
        const mapped = res.data.map((c) => {
          const name = c.full_name || "Unknown User";
          const initials = name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return {
            id: c.other_user_id,
            name: name,
            project: c.user_role ? c.user_role.charAt(0).toUpperCase() + c.user_role.slice(1) : "Project Inquiry",
            avatar: initials || "?",
            avatarColor: c.user_role === "filmmaker" ? "#E50914" : "#7C3AED",
            unread: c.unread_count || 0,
            lastMessage: c.message_body || "",
            time: c.sent_at ? formatTime(c.sent_at) : "",
            role: c.user_role || "User",
            isActive: c.unread_count > 0,
            raw: c,
          };
        });
        setConversations(mapped);
      }
    } catch (err) {
      console.error("Failed to load conversations:", err);
    }
  };

  // Poll conversations list
  useEffect(() => {
    loadConversations();
    const interval = setInterval(() => {
      loadConversations();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load messages for a selected conversation
  const loadMessages = async (convId) => {
    try {
      const res = await getConversationMessages(convId);
      if (res.success && res.data) {
        const mappedMsgs = res.data.map((m) => ({
          id: m.message_id,
          sender: m.sender_id === currentUser?.user_id ? "me" : "them",
          text: m.message_body,
          time: new Date(m.sent_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));
        setMessages(mappedMsgs);
      }
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
  };

  const handleSelectConversation = async (conv) => {
    setSelectedConv(conv);
    await loadMessages(conv.id);

    // Mark as read
    if (conv.unread > 0) {
      try {
        await markAsRead(conv.id);
        setConversations((prev) =>
          prev.map((c) => (c.id === conv.id ? { ...c, unread: 0, isActive: false } : c))
        );
      } catch (err) {
        console.error("Failed to mark messages as read:", err);
      }
    }
  };

  // Poll selected conversation messages
  useEffect(() => {
    if (!selectedConv || !currentUser) return;
    const fetchInterval = setInterval(() => {
      loadMessages(selectedConv.id);
    }, 4000);
    return () => clearInterval(fetchInterval);
  }, [selectedConv, currentUser]);

  const handleSend = async () => {
    const text = newMessage.trim();
    if (!text || !selectedConv) return;

    try {
      const res = await sendMessage(selectedConv.id, text);
      if (res.success) {
        const newMsgId = res.data?.message_id;
        const msg = {
          id: newMsgId || Date.now(),
          sender: "me",
          text,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, msg]);
        setNewMessage("");

        // Instantly update local conversation info
        setConversations((prev) =>
          prev.map((c) =>
            c.id === selectedConv.id
              ? {
                  ...c,
                  lastMessage: text,
                  time: "Just now",
                }
              : c
          )
        );
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.project.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === "ACTIVE") return matchesSearch && c.isActive;
    if (activeFilter === "VIDEO") return matchesSearch; // extend later
    return matchesSearch;
  });

  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);

  return (
    <div className="flex flex-col h-screen bg-[#0B0B0B] text-white overflow-hidden">
      {/* Top nav bar */}
      <header className="shrink-0 w-full border-b border-[#262626] bg-[#0E0E0E]">
        <div className="flex items-center gap-3 px-6 py-4">
          <button
            onClick={() => router.push("/dashboard/investor")}
            className="text-zinc-400 hover:text-white transition"
          >
            <ArrowLeft size={18} />
          </button>
          <Image
            src="/logo.png"
            alt="Filmee Logo"
            width={30}
            height={30}
            className="rounded-lg object-contain"
          />
          <div>
            <h1 className="text-[16px] font-bold leading-none text-white tracking-tight">
              Messages
            </h1>
            <p className="mt-1 text-[11px] text-zinc-500">Secure communication platform</p>
          </div>
        </div>
      </header>

      {/* Two-panel body */}
      <div className="flex flex-1 overflow-hidden bg-[#0B0B0B]">
        {/* ── LEFT PANEL: Conversation List ─────────────────────────────── */}
        <div className="w-[380px] shrink-0 flex flex-col border-r border-[#222] bg-[#111]">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-6 pb-3">
            <div>
              <h2 className="text-[17px] font-bold text-white">Messages</h2>
              <p className="text-[11px] text-zinc-500">
                {filteredConversations.length} chat{filteredConversations.length !== 1 ? "s" : ""}
              </p>
            </div>
            {totalUnread > 0 && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E50914] text-[11px] font-bold text-white">
                {totalUnread}
              </span>
            )}
          </div>

          {/* Search */}
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] px-3 py-2">
              <Search size={14} className="text-zinc-500 shrink-0" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-[13px] text-white placeholder-zinc-500 outline-none"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 px-4 pb-4">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[12px] font-bold tracking-wider transition-all duration-200 ${
                  activeFilter === f
                    ? "bg-[#E50914] text-white shadow-[0_0_12px_rgba(229,9,20,0.4)]"
                    : "border border-[#2A2A2A] text-zinc-400 hover:border-zinc-600 hover:text-white"
                }`}
              >
                {f === "VIDEO" && <Video size={11} />}
                {f === "ACTIVE" && (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                  </span>
                )}
                {f}
              </button>
            ))}
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto px-3 space-y-1 pb-4">
            {filteredConversations.length === 0 ? (
              <p className="text-center text-zinc-600 text-sm mt-10">No conversations found.</p>
            ) : (
              filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv)}
                  className={`w-full text-left flex items-start gap-3 rounded-xl p-3 transition-all duration-200 ${
                    selectedConv?.id === conv.id
                      ? "bg-[#1E1E1E] border border-[#2A2A2A]"
                      : "hover:bg-[#1A1A1A]"
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div
                      className="h-10 w-10 rounded-full flex items-center justify-center text-[15px] font-bold text-white"
                      style={{ backgroundColor: conv.avatarColor }}
                    >
                      {conv.avatar}
                    </div>
                    {conv.unread > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#E50914] text-[9px] font-bold text-white">
                        {conv.unread}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-bold text-white truncate">
                        {conv.name}
                      </span>
                      <span className="text-[10px] text-zinc-500 shrink-0 ml-2">
                        {conv.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5 truncate">{conv.project}</p>
                    <p className="text-[12px] text-zinc-400 mt-1 truncate">{conv.lastMessage}</p>
                    <span className="mt-1.5 inline-block rounded-sm border border-[#E50914]/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#E50914]">
                      {conv.role}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* ── RIGHT PANEL: Chat or Welcome ──────────────────────────────── */}
        <div className="flex flex-1 flex-col">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#222] bg-[#111]">
                <div className="flex items-center gap-3">
                  <div
                    className="h-9 w-9 rounded-full flex items-center justify-center text-[14px] font-bold text-white"
                    style={{ backgroundColor: selectedConv.avatarColor }}
                  >
                    {selectedConv.avatar}
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-white">{selectedConv.name}</h3>
                    <p className="text-[11px] text-zinc-500">{selectedConv.project}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1.5 rounded-full border border-zinc-700 px-3 py-1.5 text-[12px] font-bold text-zinc-300 hover:border-[#E50914]/50 hover:text-white transition">
                    <Video size={13} className="text-[#E50914]" />
                    VIDEO CALL
                  </button>
                  <span className="rounded-sm border border-[#E50914]/30 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#E50914]">
                    Investor
                  </span>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-[#0B0B0B]">
                {/* System message */}
                <p className="text-center text-[12px] text-zinc-500">
                  Chat room created. You can now communicate about the investment opportunity.
                </p>

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="max-w-[65%] space-y-1">
                      <div
                        className={`rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                          msg.sender === "me"
                            ? "bg-[#E50914] text-white rounded-br-sm"
                            : "bg-[#1E1E1E] text-zinc-200 border border-[#2A2A2A] rounded-bl-sm"
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
              <div className="px-6 py-4 border-t border-[#222] bg-[#111]">
                <div className="flex items-center gap-3 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] px-4 py-3">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-[13px] text-white placeholder-zinc-500 outline-none"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!newMessage.trim()}
                    className="h-9 w-9 flex items-center justify-center rounded-full bg-[#E50914] text-white disabled:opacity-40 hover:brightness-110 transition"
                  >
                    <Send size={15} />
                  </button>
                </div>
                <p className="mt-2 text-[11px] text-zinc-600 text-center">
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
                <h3 className="text-[16px] font-bold text-white mb-2">
                  Welcome to Secure Messaging
                </h3>
                <p className="text-[13px] text-zinc-500 mb-6 leading-relaxed">
                  Select a conversation to start chatting. All messages are filtered for security
                  and personal contact information is automatically removed.
                </p>
                <div className="space-y-2 text-[12px] text-zinc-500">
                  <p className="flex items-center justify-center gap-2">
                    <Shield size={12} className="text-[#E50914]" />
                    End-to-end security
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <Filter size={12} className="text-[#E50914]" />
                    Content filtering
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <Video size={12} className="text-[#E50914]" />
                    Video call support
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
