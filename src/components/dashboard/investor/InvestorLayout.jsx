"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Crown, Settings } from "lucide-react";

import Image from "next/image";
import DashboardLayout from "../DashboardLayout";

export default function InvestorLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : { full_name: "Mervin Consultant" };
    }
    return { full_name: "Mervin Consultant" };
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("investor_user");
    localStorage.removeItem("investor_token");
    router.push("/login");
  };

  const profileName = user 
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || "Investor"
    : "Investor";

  return (
    <DashboardLayout
      role="INVESTOR"
      header={
        <header className="w-full border-b border-[#2A2A2A] bg-[#0E0E0E]">
          <div className="flex items-center justify-between px-6 py-4 gap-2">
            {/* Left */}
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Filmee Logo"
                width={36}
                height={36}
                className="rounded-lg object-contain"
              />
              <div>
                <h1 className="text-xl font-bold leading-none text-white tracking-tight">
                  Investor Dashboard
                </h1>
                <p className="mt-1.5 text-xs text-zinc-400">
                  Welcome back,{" "}
                  <span className="font-semibold text-zinc-300">
                    {profileName}
                  </span>
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 rounded-full border border-[#2A2A2A] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#1E1E1E] transition-colors">
                <Crown size={14} className="text-red-500" />
                <span>Professional</span>
              </button>

              <button
                onClick={() => router.push("/dashboard/investor/settings")}
                className="flex items-center gap-2 rounded-full border border-[#2A2A2A] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#1E1E1E] transition-colors"
              >
                <Settings size={14} className="text-red-500" />
                <span>Settings</span>
              </button>

              <button
                onClick={handleLogout}
                className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors px-2"
              >
                Logout
              </button>

              <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider bg-[#18C964]/10 text-[#18C964]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#18C964] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#18C964]"></span>
                </span>
                <span>Live</span>
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

