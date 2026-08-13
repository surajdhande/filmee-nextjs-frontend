"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Crown,
  Settings,
  Menu,
} from "lucide-react";

const DashboardHeader = ({
  username = "John Director",
  dashboardTitle = "Filmmaker Dashboard",
  settingsPath = "/dashboard/filmmaker/settings",
  onLogout,
  statusText = "Offline",
  statusColor = "#E50914",
}) => {
  const router = useRouter();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.clear();
      router.replace("/");
    }
  };

  return (
    <header className="w-full border-b border-[#262626] bg-[#121212]">
      <div className="flex items-center justify-between px-6 py-4 gap-2">

        {/* Left — Logo + Title */}
        <div className="flex items-center gap-3">
          {/* Hamburger — mobile only */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('dashboard:openSidebar'))}
            aria-label="Open menu"
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#141414] text-zinc-400 hover:border-[#E50914]/40 hover:text-white transition-all duration-200 shrink-0"
          >
            <Menu size={16} strokeWidth={2.5} />
          </button>

          <Image
            src="/logo.png"
            alt="Filmee Logo"
            width={36}
            height={36}
            className="rounded-lg object-contain"
          />

          <div>
            <h1 className="text-[18px] font-bold leading-none text-white tracking-tight">
              {dashboardTitle}
            </h1>

            <p className="mt-1.5 text-xs text-zinc-400">
              Welcome back,{" "}
              <span className="font-semibold text-zinc-300">
                {username}
              </span>
            </p>
          </div>
        </div>

        {/* Right — Action buttons */}
        <div className="flex items-center gap-3">

          <button className="hidden sm:flex items-center gap-1.5 rounded-full border border-[#E50914]/50 px-4 py-1.5 hover:bg-[#E50914]/10 transition-all duration-300">
            <Crown size={13} className="text-[#E50914]" />
            <span className="text-[15px] font-bold uppercase tracking-wider text-[#E50914]">
              Professional
            </span>
          </button>

          <button
            onClick={() => router.push(settingsPath)}
            className="hidden sm:flex items-center gap-1.5 rounded-full border border-[#E50914]/50 px-4 py-1.5 hover:bg-[#E50914]/10 transition-all duration-300"
          >
            <Settings size={13} className="text-[#E50914]" />
            <span className="text-[15px] font-bold uppercase tracking-wider text-[#E50914]">
              Settings
            </span>
          </button>

          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-zinc-400 hover:text-white transition duration-300 uppercase px-2"
          >
            LOGOUT
          </button>

          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{ backgroundColor: statusColor }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>

            <span className="text-[10px] font-bold uppercase tracking-wider text-white">
              {statusText}
            </span>
          </div>

        </div>

      </div>
    </header>
  );
}

export default DashboardHeader;