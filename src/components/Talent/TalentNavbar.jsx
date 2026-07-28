"use client";

import React from "react";
import { Crown, Settings, LogOut, Menu } from "lucide-react";

export default function TalentNavbar({ 
  onLogout, 
  onSubscriptionClick, 
  onMenuClick,
  username = "Mervin Personal" 
}) {
  return (
    <header className="h-16 bg-[#111111] border-b border-zinc-800/60 flex items-center justify-between px-4 md:px-8 flex-shrink-0 sticky top-0 z-30">
      {/* Left: Menu button + Title */}
      <div className="flex items-center gap-3">
        {/* Hamburger menu for mobile */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-zinc-400 hover:text-white transition-colors p-2 -ml-2"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-base md:text-lg font-black text-white tracking-tight">
            Talent Dashboard
          </h1>
          <p className="text-xs text-zinc-400 -mt-0.5 hidden sm:block">
            Welcome back, {username}
          </p>
        </div>
      </div>

      {/* Right: Action buttons */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* FREE badge */}
        <button
          onClick={onSubscriptionClick}
          className="flex items-center gap-1.5 md:gap-2 border border-red-700 rounded-full px-2.5 md:px-4 py-1.5 text-[10px] md:text-xs font-black text-white hover:bg-red-950/30 transition-colors"
        >
          <Crown size={12} className="text-red-500" />
          <span className="hidden sm:inline">FREE</span>
        </button>

        {/* SETTINGS - hide text on mobile */}
        <button className="flex items-center gap-1.5 md:gap-2 border border-red-700 rounded-full px-2.5 md:px-4 py-1.5 text-[10px] md:text-xs font-black text-white hover:bg-red-950/30 transition-colors">
          <Settings size={12} className="text-red-500" />
          <span className="hidden sm:inline">SETTINGS</span>
        </button>

        {/* LOGOUT - hide text on small screens */}
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 text-xs md:text-sm font-black text-white hover:text-red-400 transition-colors"
        >
          <LogOut size={14} />
          <span className="hidden md:inline">LOGOUT</span>
        </button>
      </div>
    </header>
  );
}
