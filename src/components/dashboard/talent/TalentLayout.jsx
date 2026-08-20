"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Crown, Settings } from "lucide-react";

import DashboardLayout from "../DashboardLayout";

export default function TalentLayout({ children }) {
  const router = useRouter();
  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : { full_name: "Talent" };
    }
    return { full_name: "Talent" };
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  const profileName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.full_name || "Talent"
    : "Talent";

  return (
    <DashboardLayout
      role="TALENT"
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
                  Talent Dashboard
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
                onClick={() => router.push("/dashboard/talent/settings")}
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


            </div>
          </div>
        </header>
      }
    >
      {children}
    </DashboardLayout>
  );
}
