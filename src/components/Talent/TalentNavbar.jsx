"use client";

import React from "react";
import { Crown, Settings, LogOut, Menu } from "lucide-react";

export default function TalentNavbar({ onLogout, onSubscriptionClick, onSettingsClick, onMenuToggle, username = "Mervin Personal" }) {
  return (
    <header className="h-16 bg-[#111111] border-b border-zinc-800/60 flex items-center justify-between px-4 sm:px-6 lg:px-8 flex-shrink-0 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden flex items-center justify-center h-9 w-9 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-base sm:text-lg font-black text-white tracking-tight">
            Talent Dashboard
          </h1>
          <p className="text-xs text-zinc-400 -mt-0.5 hidden sm:block">
            Welcome back, {username}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        {/* FREE badge */}
        <button
          onClick={onSubscriptionClick}
          className="flex items-center gap-1.5 sm:gap-2 border border-red-700 rounded-full px-3 sm:px-4 py-1.5 text-xs font-black text-white hover:bg-red-950/30 transition-colors"
        >
          <Crown size={13} className="text-red-500" />
          <span className="hidden sm:inline">FREE</span>
        </button>
        {/* SETTINGS */}
        <button
          onClick={onSettingsClick}
          className="flex items-center gap-1.5 sm:gap-2 border border-red-700 rounded-full px-3 sm:px-4 py-1.5 text-xs font-black text-white hover:bg-red-950/30 transition-colors"
        >
          <Settings size={13} className="text-red-500" />
          <span className="hidden sm:inline">SETTINGS</span>
        </button>
        {/* LOGOUT */}
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 sm:gap-2 text-sm font-black text-white hover:text-red-400 transition-colors ml-1 sm:ml-2"
        >
          <LogOut size={15} />
          <span className="hidden sm:inline">LOGOUT</span>
        </button>
      </div>
    </header>
  );
}
