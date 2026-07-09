"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Crown,
  Settings,
  BarChart2,
  Plus,
  Radio,
} from "lucide-react";

const DashboardHeader = ({
  username = "John Director",
  showOverviewTitle = true,
  showAnalyticsButton = true,
  showCreateButton = true,
  overviewTitle = "Dashboard Overview",
}) => {
  const router = useRouter();

  return (
    <header className="w-full border-b border-[#262626] bg-[#121212]">

      {/* Top Row */}
      <div className="flex items-center justify-between px-6 py-4">

        {/* Left — Title without logo */}
        <div>
          <h1 className="text-[18px] font-bold leading-none text-white tracking-tight">
            Filmmaker Dashboard
          </h1>
          <p className="mt-1.5 text-xs text-zinc-400">
            Welcome back,{" "}
            <span className="font-medium text-zinc-300">
              {username}
            </span>
          </p>
        </div>

        {/* Right — Action buttons */}
        <div className="flex items-center gap-3">

          <button className="flex items-center gap-1.5 rounded-full border border-red-600/70 px-4 py-1.5">
            <Crown size={13} className="text-red-500" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-500">
              Professional
            </span>
            <span className="rounded-full bg-blue-600 px-1.5 py-[1px] text-[9px] font-bold text-white">
              7D
            </span>
          </button>

          <button className="flex items-center gap-1.5 rounded-full border border-red-600/70 px-4 py-1.5 text-red-500 transition hover:bg-red-600/10">
            <Settings size={13} />
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Settings
            </span>
          </button>

          <button className="text-xs font-semibold text-white transition hover:opacity-70 uppercase px-2">
            LOGOUT
          </button>

          <div className="flex items-center gap-1 rounded-full bg-[#18C964] px-2.5 py-1">
            <Radio size={10} className="text-white" />
            <span className="text-[10px] font-semibold uppercase text-white">
              Live
            </span>
          </div>

        </div>

      </div>

      {/* Second Row — optional title and action buttons */}
      {(showOverviewTitle || showAnalyticsButton || showCreateButton) && (
        <div className="flex items-center justify-between px-6 pb-4">

          <div>
            {showOverviewTitle && (
              <h2 className="text-[16px] font-bold text-white tracking-tight">
                {overviewTitle}
              </h2>
            )}
          </div>

          <div className="flex items-center gap-3">

            {showAnalyticsButton && (
              <button className="flex items-center gap-1.5 rounded-full border border-red-600 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-red-500 transition hover:bg-red-600/10">
                <BarChart2 size={13} />
                View Analytics
              </button>
            )}

            {showCreateButton && (
              <button
                onClick={() =>
                  router.push("/dashboard/filmmaker/create-project")
                }
                className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#E50914] to-[#FF2E2E] px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(229,9,20,0.4)] transition hover:brightness-110"
              >
                <Plus size={14} />
                Create Project
              </button>
            )}

          </div>

        </div>
      )}

    </header>
  );
};

export default DashboardHeader;