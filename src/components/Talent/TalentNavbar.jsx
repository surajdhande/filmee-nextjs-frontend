"use client";

import React from "react";
import { Crown, Settings, LogOut } from "lucide-react";

export default function TalentNavbar({ onLogout, onSubscriptionClick, username = "Mervin Personal" }) {
  return (
    <header className="h-16 bg-[#111111] border-b border-zinc-800/60 flex items-center justify-between px-8 flex-shrink-0 sticky top-0 z-10">
      <div>
        <h1 className="text-lg font-black text-white tracking-tight">
          Talent Dashboard
        </h1>
        <p className="text-xs text-zinc-400 -mt-0.5">
          Welcome back, {username}
        </p>
      </div>
      <div className="flex items-center gap-3">
        {/* FREE badge */}
        <button
          onClick={onSubscriptionClick}
          className="flex items-center gap-2 border border-red-700 rounded-full px-4 py-1.5 text-xs font-black text-white hover:bg-red-950/30 transition-colors"
        >
          <Crown size={13} className="text-red-500" />
          FREE
        </button>
        {/* SETTINGS */}
        <button className="flex items-center gap-2 border border-red-700 rounded-full px-4 py-1.5 text-xs font-black text-white hover:bg-red-950/30 transition-colors">
          <Settings size={13} className="text-red-500" />
          SETTINGS
        </button>
        {/* LOGOUT */}
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-sm font-black text-white hover:text-red-400 transition-colors ml-2"
        >
          <LogOut size={15} />
          LOGOUT
        </button>
      </div>
    </header>
  );
}
