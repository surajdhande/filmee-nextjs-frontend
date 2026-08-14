"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Crown,
  Settings,
  BarChart2,
  Plus,
  Radio,
  Menu,
} from "lucide-react";

const DashboardHeader = ({
  username,
  dashboardTitle = "Filmmaker Dashboard",
  settingsPath = "/dashboard/filmmaker/settings",
  onLogout,
  statusText = "Offline",
  statusColor = "#E50914",
}) => {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true);
  const [displayUsername, setDisplayUsername] = useState(username || "User");

  useEffect(() => {
    if (username && username !== "John Director") {
      setDisplayUsername(username);
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          const name = `${userData.first_name || ""} ${userData.last_name || ""}`.trim();
          setDisplayUsername(name || "User");
        } catch (e) {
          setDisplayUsername("User");
        }
      } else {
        setDisplayUsername("User");
      }
    }
  }, [username]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  return (
    <header className="w-full border-b border-[#262626] bg-[#121212]">

      {/* Top Row */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 gap-2">

        {/* Left — Logo + Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent("dashboard:openSidebar"));
            }}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#262626] bg-[#171717] text-zinc-400 hover:text-white lg:hidden transition-all duration-200"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>

          <Image
            src="/logo.png"
            alt="Filmee Logo"
            width={36}
            height={36}
            className="rounded-lg object-contain hidden sm:block"
          />

          <div>
            <h1 className="text-[15px] sm:text-[18px] font-bold leading-none text-white tracking-tight">
              Filmmaker Dashboard
            </h1>

            <p className="mt-1 sm:mt-1.5 text-[10px] sm:text-xs text-zinc-400">
              Welcome back,{" "}
              <span className="font-semibold text-zinc-300">
                {displayUsername}
              </span>
            </p>
          </div>
        </div>

        {/* Right — Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">

          <button className="flex items-center gap-1.5 rounded-full border border-[#E50914]/50 px-3 sm:px-4 py-1.5 hover:bg-[#E50914]/10 transition-all duration-300">
            <Crown size={13} className="text-[#E50914]" />
            <span className="text-[12px] sm:text-[15px] font-bold uppercase tracking-wider text-[#E50914] hidden md:inline">
              Professional
            </span>
          </button>

          <button
            onClick={() => router.push("/dashboard/filmmaker/settings")}
            className="flex items-center gap-1.5 rounded-full border border-[#E50914]/50 px-3 sm:px-4 py-1.5 hover:bg-[#E50914]/10 transition-all duration-300"
          >
            <Settings size={13} className="text-[#E50914]" />
            <span className="text-[12px] sm:text-[15px] font-bold uppercase tracking-wider text-[#E50914] hidden md:inline">
              Settings
            </span>
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              router.replace("/");
            }}
            className="text-xs sm:text-sm font-semibold text-zinc-400 hover:text-white transition duration-300 uppercase px-1 sm:px-2"
          >
            LOGOUT
          </button>

          <div className="flex items-center gap-1.5 rounded-full bg-[#18C964] px-2.5 py-1.5 shadow-[0_0_12px_rgba(24,201,100,0.3)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            {/* <span className="text-[10px] font-bold uppercase tracking-wider text-white hidden xs:inline">
              Live
            </span> */}
          </div>

        </div>
        </div>
    </header>
  );
}

export default DashboardHeader;