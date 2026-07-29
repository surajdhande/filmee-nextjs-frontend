"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Crown, Settings, Menu } from "lucide-react";

import Image from "next/image";
import DashboardLayout from "../DashboardLayout";

export default function InvestorLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser({ full_name: "Mervin Consultant" });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("investor_user");
    localStorage.removeItem("investor_token");
    router.push("/");
  };

  const profileName = user?.full_name || user?.name || "Mervin Consultant";

  return (
    <DashboardLayout
      role="INVESTOR"
      header={
        <header className="w-full border-b border-[#262626] bg-[#0E0E0E]">
          <div className="flex items-center justify-between px-4 py-3 gap-2 lg:px-6 lg:py-4">
            {/* Left */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Hamburger — mobile only */}
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("dashboard:openSidebar"))}
                aria-label="Open menu"
                className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#141414] text-zinc-400 hover:border-[#E50914]/40 hover:text-white transition-all duration-200 shrink-0"
              >
                <Menu size={16} strokeWidth={2.5} />
              </button>

              <Image
                src="/logo.png"
                alt="Filmee Logo"
                width={32}
                height={32}
                className="rounded-lg object-contain lg:w-[36px] lg:h-[36px]"
              />
              <div>
                <h1 className="text-[15px] font-bold leading-none text-white tracking-tight lg:text-[18px]">
                  Investor Dashboard
                </h1>
                <p className="mt-1 text-[11px] text-zinc-400 lg:mt-1.5 lg:text-xs">
                  Welcome back,{" "}
                  <span className="font-semibold text-zinc-300">
                    {profileName}
                  </span>
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Hide these on mobile to save space */}
              <button className="hidden sm:flex items-center gap-1.5 rounded-full border border-[#E50914]/50 px-4 py-1.5 hover:bg-[#E50914]/10 transition-all duration-300">
                <Crown size={13} className="text-[#E50914]" />
                <span className="text-[13px] font-bold uppercase tracking-wider text-[#E50914]">
                  Professional
                </span>
              </button>

              <button
                onClick={() => router.push("/dashboard/investor/settings")}
                className="hidden sm:flex items-center gap-1.5 rounded-full border border-[#E50914]/50 px-4 py-1.5 hover:bg-[#E50914]/10 transition-all duration-300"
              >
                <Settings size={13} className="text-[#E50914]" />
                <span className="text-[13px] font-bold uppercase tracking-wider text-[#E50914]">
                  Settings
                </span>
              </button>

              <button
                onClick={handleLogout}
                className="text-xs font-semibold text-zinc-400 hover:text-white transition duration-300 uppercase px-2"
              >
                LOGOUT
              </button>

              <div className="flex items-center gap-1.5 rounded-full bg-[#E50914] px-2.5 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white hidden xs:inline">
                  Offline
                </span>
              </div>
            </div>
          </div>
        </header>
      }
    >
      {children}
    </DashboardLayout>
  );
}
