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
import { getSocket } from "@/services/socketService";

const FILTERS = ["ALL", "ACTIVE"];

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
      : "Inquiry",
    avatar: makeInitials(name),
    avatarColor: c.user_role === "filmmaker" ? "#E50914" : "#3B82F6",
    unread: c.unread_count || 0,
    lastMessage: c.message_body || "",
    time: c.sent_at ? formatTime(c.sent_at) : "",
    role: c.user_role || "User",
    isActive: (c.unread_count || 0) > 0,
  };
}

export default function TalentMessages({ onBack }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramReceiverId = searchParams.get("receiverId");
  const paramReceiverName = searchParams.get("receiverName") || "Contact";
  const paramProjectId = searchParams.get("projectId");

  const [conversations, setConversations] = useState([]);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConv, setSelectedConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [autoOpenDone, setAutoOpenDone] = useState(false);
  const bottomRef = useRef(null);

  const getCurrentUserId = useCallback(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return null;
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded.user_id;
    } catch (e) {
      return null;
    }
  }, []);

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

  useEffect(() => {
    loadConversations();
    const interval = setInterval(loadConversations, 5000);
    return () => clearInterval(interval);
  }, [loadConversations]);

  useEffect(() => {
    if (!paramReceiverId || autoOpenDone) return;
    const recId = parseInt(paramReceiverId, 10);
    if (isNaN(recId)) return;

    const run = async () => {
      setAutoOpenDone(true);
      const existing = conversations.find((c) => c.id === recId);
      if (existing) {
        openConversation(existing);
        return;
      }

      const openingMsg = `Hi! I'm reaching out regarding the role/application for your project.`;
      try {
        await sendMessage(
          recId,
          openingMsg,
          paramProjectId ? parseInt(paramProjectId, 10) : null
        );

        const tempConv = {
          id: recId,
          name: paramReceiverName,
          project: "Filmmaker",
          avatar: makeInitials(paramReceiverName),
          avatarColor: "#E50914",
          unread: 0,
          lastMessage: openingMsg,
          time: "Just now",
          role: "filmmaker",
          isActive: false,
        };
        setSelectedConv(tempConv);
        await loadMessages(recId);
        await loadConversations();
      } catch (err) {
        console.error("Failed to start conversation:", err);
      }
    };

    run();
  }, [conversations, paramReceiverId, autoOpenDone, openConversation, loadMessages, loadConversations, paramProjectId, paramReceiverName]);

  useEffect(() => {
    if (!selectedConv) return;
    const interval = setInterval(() => loadMessages(selectedConv.id), 4000);
    return () => clearInterval(interval);
  }, [selectedConv, loadMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.project.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === "ACTIVE") return matchesSearch && c.isActive;
    return matchesSearch;
  });

  return (
    <div className="flex flex-col h-screen bg-[#0B0B0B] text-white overflow-hidden font-sans">
      <header className="shrink-0 w-full border-b border-[#1A1A1A] bg-[#0B0B0B]">
        <div className="flex items-center gap-3 px-6 py-4">
          <button
            onClick={onBack ? onBack : () => router.push("/dashboard/talent")}
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

      <div className="flex flex-1 overflow-hidden bg-[#0B0B0B]">
        {/* LEFT PANEL */}
        <div className="w-[380px] shrink-0 flex flex-col border-r border-[#1A1A1A] bg-[#0B0B0B]">
          <div className="flex items-center justify-between px-5 pt-6 pb-3">
            <h2 className="text-[17px] font-bold text-white">Conversations</h2>
            <div className="rounded-full border border-zinc-800 bg-black px-3 py-1 text-[11px] font-medium text-zinc-300">
              {filteredConversations.length} {filteredConversations.length === 1 ? "chat" : "chats"}
            </div>
          </div>

          <div className="px-4 pb-3">
            <div className="flex items-center gap-2 rounded-full bg-[#121212] border border-[#222] px-4 py-2.5">
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-[13px] text-white placeholder-zinc-500 outline-none px-1"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 pb-4">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[12px] font-bold tracking-wider transition-all duration-200 ${
                  activeFilter === f
                    ? "bg-[#E50914] text-white shadow-[0_0_12px_rgba(229,9,20,0.6)]"
                    : "border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto px-3 space-y-2 pb-4">
            {filteredConversations.length === 0 ? (
              <p className="text-center text-zinc-500 text-sm mt-10">No conversations found.</p>
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
                    <div className="relative shrink-0">
                      <div
                        className="h-10 w-10 rounded-full flex items-center justify-center text-[15px] font-bold text-white bg-[#E50914]"
                        style={{ backgroundColor: conv.avatarColor }}
                      >
                        {conv.avatar}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[13px] font-bold text-white truncate">{conv.name}</span>
                        <div className="flex items-center gap-1 text-[10px] text-zinc-500 shrink-0 ml-2">
                          <Clock size={10} />
                          <span>{conv.time}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-zinc-500 mt-0.5 truncate">{conv.project}</p>
                      <p className="text-[12px] text-zinc-400 mt-1 truncate">{conv.lastMessage}</p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-1 flex-col bg-[#0B0B0B]">
          {selectedConv ? (
            <>
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
                    <p className="text-[11px] text-zinc-500 mt-0.5">{selectedConv.project}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 bg-[#0B0B0B]">
                {messages.length === 0 && (
                  <p className="text-center text-zinc-500 text-[12px]">No messages yet. Say hello!</p>
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
                            : "bg-[#161616] text-white border border-zinc-800 rounded-bl-sm"
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

              <div className="px-6 py-4 border-t border-[#1A1A1A] bg-[#0B0B0B]">
                <div className="flex items-center gap-3 rounded-full bg-[#121212] border border-[#222] px-4 py-2.5">
                  <input
                    type="text"
                    placeholder={`Message ${selectedConv.name}...`}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="flex-1 bg-transparent text-[13px] text-white placeholder-zinc-500 outline-none px-2"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!newMessage.trim() || isSending}
                    className="h-9 w-9 flex items-center justify-center rounded-full bg-[#E50914] text-white disabled:opacity-40 hover:brightness-110 transition shrink-0 shadow-[0_0_10px_rgba(229,9,20,0.4)]"
                  >
                    <Send size={14} className="transform translate-x-[0.5px]" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center bg-[#0B0B0B]">
              <div className="text-center rounded-2xl border border-[#2A2A2A] bg-[#111] px-10 py-10 max-w-sm w-full">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#E50914]/10">
                  <MessageSquare size={22} className="text-[#E50914]" />
                </div>
                <h3 className="text-[16px] font-bold text-white mb-2">Welcome to Secure Messaging</h3>
                <p className="text-[13px] text-zinc-500 leading-relaxed">
                  Select a conversation to start chatting with filmmakers or directors.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
