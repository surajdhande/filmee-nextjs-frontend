"use client";

import React from "react";
import Image from "next/image";
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

      <div className="flex items-center justify-between px-7 py-5">

        {/* Left */}

        <div className="flex items-center gap-4">

          <Image
            src="/logo.png"
            alt="Filmee"
            width={48}
            height={48}
            className="object-contain"
          />

          <div>

            <h1 className="text-[22px] font-bold leading-none text-white">
              Filmmaker Dashboard
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Welcome back,{" "}
              <span className="font-medium text-zinc-300">
                {username}
              </span>
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          <button className="flex items-center gap-2 rounded-full border border-red-600/70 px-5 py-2">

            <Crown size={16} className="text-red-500" />

            <span className="text-[12px] font-bold uppercase tracking-wider text-red-500">
              Professional
            </span>

            <span className="rounded-full bg-blue-600 px-2 py-[2px] text-[10px] font-bold text-white">
              7D
            </span>

          </button>

          <button className="flex items-center gap-2 rounded-full border border-red-600/70 px-5 py-2 text-red-500 transition hover:bg-red-600/10">

            <Settings size={15} />

            <span className="text-[12px] font-bold uppercase tracking-wider">
              Settings
            </span>

          </button>

          <button className="text-sm font-semibold text-white transition hover:opacity-70">
            LOGOUT
          </button>

          <div className="flex items-center gap-1 rounded-full bg-[#18C964] px-3 py-1.5">

            <Radio size={12} className="text-white" />

            <span className="text-[11px] font-semibold uppercase text-white">
              Live
            </span>

          </div>

        </div>

      </div>

      {(showOverviewTitle || showAnalyticsButton || showCreateButton) && (

        <div className="flex items-center justify-between px-7 pb-6">

          <div>

            {showOverviewTitle && (
              <h2 className="text-[20px] font-bold text-white">
                {overviewTitle}
              </h2>
            )}

          </div>

          <div className="flex items-center gap-4">

            {showAnalyticsButton && (
              <button className="flex items-center gap-2 rounded-full border border-red-600 px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-red-500 transition hover:bg-red-600/10">

                <BarChart2 size={15} />

                View Analytics

              </button>
            )}

            {showCreateButton && (
              <button
                onClick={() =>
                  router.push("/dashboard/filmmaker/create-project")
                }
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E50914] to-[#FF2E2E] px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-white shadow-[0_0_18px_rgba(229,9,20,0.45)] transition hover:brightness-110"
              >
                <Plus size={16} />

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