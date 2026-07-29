"use client";

import React from "react";
import { ArrowLeft, MessageSquare } from "lucide-react";

export default function MessagesPage({ onBack }) {
  return (
    <main className="flex flex-col min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="h-20 border-b border-zinc-900 bg-[#0a0a0a] flex items-center px-4 sm:px-8 gap-4 sm:gap-6 flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center justify-center p-2 rounded-full border border-zinc-800 hover:bg-zinc-900 hover:text-white text-zinc-400 transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight leading-none">
            Messages
          </h2>
          <p className="text-xs text-zinc-500 mt-1.5">
            Secure communication platform
          </p>
        </div>
      </header>

      {/* ── Main Layout (Split View) ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 relative">
        {/* Left Column - Chats List Panel */}
        <div className="w-full lg:w-[380px] border-b lg:border-b-0 lg:border-r border-zinc-900 flex items-center justify-center p-4 sm:p-8 flex-shrink-0">
          <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center justify-center min-h-[220px] sm:min-h-[260px] w-full">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-4 sm:mb-5">
              <MessageSquare size={24} className="text-zinc-500" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">No Active Chats</h3>
            <p className="text-xs text-zinc-500 max-w-[200px] mx-auto mt-2 leading-relaxed font-semibold">
              Accept investor applications to start conversations
            </p>
          </div>
        </div>

        {/* Right Column - Chat Detail Panel */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
          <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-6 sm:p-8 max-w-md w-full flex flex-col items-center text-center justify-center min-h-[260px] sm:min-h-[300px]">
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
              Welcome to Secure Messaging
            </h3>
            <p className="text-xs text-zinc-400 mt-3 leading-relaxed font-semibold">
              Select a conversation to start chatting. All messages are filtered
              for security and personal contact information is automatically
              removed.
            </p>

            <div className="space-y-2 mt-6 text-left w-fit">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                <span className="text-green-500 font-bold">✓</span>
                <span>End-to-end security</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                <span className="text-green-500 font-bold">✓</span>
                <span>Content filtering</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                <span className="text-green-500 font-bold">✓</span>
                <span>Video call support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
