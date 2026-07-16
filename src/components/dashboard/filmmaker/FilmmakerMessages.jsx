"use client";

import {
  socket,
  joinRoom,
  leaveRoom,
  sendSocketMessage,
} from "@/services/socketService";
import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  getConversation,
  getConversations,
  markMessageAsRead,
  searchUsers,
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
} from "lucide-react";
import Image from "next/image";

// ─── Filter Tabs ──────────────────────────────────────────────────────────────

const FILTERS = ["ALL", "ACTIVE", "VIDEO"];

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

  // Safeguard: Redirect if not logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!storedUser || !token) {
      router.push("/login");
      return;
    }
    try {
      setCurrentUser(JSON.parse(storedUser));
    } catch (e) {
      router.push("/login");
    }
  }, [router]);

const fetchConversations = useCallback(async () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) return;
  try {
    const data = await getConversations();

    console.log("Conversations API:", data);

    console.log("Fetched Conversations:", data);

    const formatted = data.map((conversation) => ({
      id: conversation.other_user_id,
      name: conversation.full_name,
      project: "",
      avatar: conversation.full_name?.charAt(0) || "?",
      avatarColor: "#E50914",
      unread: conversation.unread_count,
      lastMessage: conversation.message_body,
      time: new Date(conversation.sent_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      role: conversation.user_role,
      isActive: false,
    }));

    setConversations(formatted);
  } catch (error) {
    console.error("Failed to fetch conversations:", error);
  }
}, []);

const loadConversation = useCallback(async (userId) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) return;
    // console.log("Loading conversation:", userId);
  try {
    // console.log("Loading conversation:", userId);
    const data = await getConversation(userId);

    const currentUserId = JSON.parse(
      atob(token.split(".")[1])
    ).user_id;

    console.log("[FILMMAKER JWT user_id]:", currentUserId, typeof currentUserId);

    const formattedMessages = data.map((message) => {
      const isMine = String(message.sender_id) === String(currentUserId);
      console.log(
        "[MSG DEBUG]",
        "sender_id:", message.sender_id, "("+typeof message.sender_id+")",
        "currentUserId:", currentUserId, "("+typeof currentUserId+")",
        "isMine:", isMine
      );
      return {
        id: message.message_id,
        sender: isMine ? "me" : "other",
        text: message.message_body,
        time: new Date(message.sent_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
    });
    await markMessageAsRead(userId);
    await fetchConversations();

  } catch (error) {
    console.error(error);
  }
}, []);

  const handleSelectConversation = async (conv) => {
  
    console.log("Selected:", conv.id, conv.name, conv.role);

  try {
    setSelectedConv(conv);

    await loadConversation(conv.id);
  } catch (error) {
    console.error("Failed to select conversation:", error);
  }
};

// Send Message
// Sends a realtime message through Socket.IO
const handleSend = async () => {  const text = newMessage.trim();

  if (!text || !selectedConv) return;

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) return;

  const currentUserId = JSON.parse(
    atob(token.split(".")[1])
  ).user_id;

  sendSocketMessage(
  currentUserId,
  selectedConv.id,
  text,
  null
);
  setNewMessage("");

  // Refresh sidebar so newly created conversations appear
  await fetchConversations();
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

useEffect(() => {
  selectedConvRef.current = selectedConv;
}, [selectedConv]);

useEffect(() => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) return;

  socket.connect();

  const currentUserId = JSON.parse(
    atob(token.split(".")[1])
  ).user_id;

  socket.on("connected", (data) => {
    console.log(data.message);
    joinRoom(currentUserId);
  });

  socket.on("joined", (data) => {
    console.log(data.message);
  });

  socket.on("receive_message", (message) => {
  const activeConversation = selectedConvRef.current;

  // Update the open chat instantly
  if (
    activeConversation &&
    (
      activeConversation.id === message.sender_id ||
      activeConversation.id === message.recipient_id
    )
  ) {
    setMessages((prev) => {
      // Prevent duplicate messages
      if (prev.some((m) => m.id === message.message_id)) {
        return prev;
      }

      return [
        ...prev,
        {
          id: message.message_id,
          sender:
            Number(message.sender_id) === Number(currentUserId) ? "me" : "other",
          text: message.message_body,
          time: new Date(message.sent_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ];
    });
  }

  // Update conversation preview
  // ─────────────────────────────────────────────────────────────
// Update Conversation Sidebar
// - Update existing conversation
// - Add a new conversation if it doesn't exist
// ─────────────────────────────────────────────────────────────
setConversations((prev) => {
  const otherUserId =
    message.sender_id === currentUserId
      ? message.recipient_id
      : message.sender_id;

  // Check whether the conversation already exists
  const existingConversation = prev.find(
    (conv) => conv.id === otherUserId
  );

  // Update existing conversation
    if (existingConversation) {
    const updatedConversation = {
      ...existingConversation,
      lastMessage: message.message_body,
      time: new Date(message.sent_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    return [
      updatedConversation,
      ...prev.filter((conv) => conv.id !== otherUserId),
    ];
  }

  // Add new conversation to the top of the sidebar
  return [
    {
      id: selectedConvRef.current?.id,
      name: selectedConvRef.current?.name,
      project: "",
      avatar: selectedConvRef.current?.avatar,
      avatarColor: "#E50914",
      unread: 0,
      lastMessage: message.message_body,
      time: new Date(message.sent_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
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
}, []);

// Search Users
useEffect(() => {
  // Don't search for empty text
  if (!userSearch.trim()) {
    setSearchResults([]);
    return;
  }

  const timeout = setTimeout(async () => {
    try {
      setIsSearching(true);

      const users = await searchUsers(userSearch);
      console.log("Search Results:", users);
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
    if (activeFilter === "VIDEO") return matchesSearch; // extend later
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
    <div className="flex flex-col h-screen bg-[#0B0B0B] text-white overflow-hidden">
      {/* Top nav bar */}
      <header className="shrink-0 w-full border-b border-[#262626] bg-[#0E0E0E]">
        <div className="flex items-center gap-3 px-6 py-4">
          <button
            onClick={() => router.push("/dashboard/filmmaker")}
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
            <div className="flex items-center gap-2">
          <button
          onClick={() => setShowNewChatModal(true)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#161616] text-white transition hover:bg-[#222]"
        >
            <Plus size={16} />
          </button>

          {totalUnread > 0 && (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E50914] text-[11px] font-bold text-white">
              {totalUnread}
            </span>
          )}
        </div>
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
            {/* ─────────────────────────────────────────────────────────────
          New Message Modal
          Opens when user clicks the "+" button
      ───────────────────────────────────────────────────────────── */}
      {showNewChatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-[420px] rounded-2xl border border-[#2A2A2A] bg-[#111] shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#222] px-5 py-4">
              <h2 className="text-lg font-semibold text-white">
                New Message
              </h2>

              <button
                onClick={() => setShowNewChatModal(false)}
                className="text-zinc-400 transition hover:text-white"
              >
                ✕
              </button>
            </div>

            {
            /* ─────────────────────────────────────────────────────────────
                Search Input
            ───────────────────────────────────────────────────────────── */}
    <div className="p-5">

      <div className="flex items-center gap-2 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-3 py-2">

        <Search
          size={16}
          className="text-zinc-500 shrink-0"
        />

        <input
          type="text"
          placeholder="Search by name..."
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
          className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
        />

      </div>
      {/* ─────────────────────────────────────────────────────────────
          Search Results
      ───────────────────────────────────────────────────────────── */}

      <div className="mt-4 max-h-72 overflow-y-auto">

        {/* Loading State */}
        {isSearching && (
          <p className="py-4 text-center text-sm text-zinc-500">
            Searching...
          </p>
        )}

        {/* Search Results */}
        {!isSearching &&
          searchResults.map((user) => (
            <button
            key={user.user_id}
            onClick={async () => {
              // ─────────────────────────────────────────────────────────────
              // Open selected user's conversation
              // If no conversation exists, an empty chat is shown.
              // The first message will automatically create the conversation.
              // ─────────────────────────────────────────────────────────────

              const conversation = {
                id: user.user_id,
                name: user.full_name,
                project: "",
                avatar: user.full_name.charAt(0),
                avatarColor: "#E50914",
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
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-[#1A1A1A]"
          >
              {/* Avatar */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E50914] font-bold text-white">
                {user.full_name.charAt(0)}
              </div>

              {/* User Details */}
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold text-white">
                  {user.full_name}
                </span>

                <span className="text-xs uppercase text-zinc-500">
                  {user.user_role}
                </span>
              </div>
            </button>
          ))}

        {/* Empty State */}
        {!isSearching &&
          userSearch.trim() &&
          searchResults.length === 0 && (
            <p className="py-4 text-center text-sm text-zinc-500">
              No users found.
            </p>
          )}

      </div>

    </div>

          </div>
        </div>
      )}
      
    </div>
  );
}
