"use client";

import React from "react";
import {
  Eye,
  Search,
  Briefcase,
  Camera,
  MessageSquare,
  Crown,
} from "lucide-react";

// ─── Sidebar nav items ────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: Eye },
  { id: "find-roles", label: "Find Roles", icon: Search },
  { id: "applications", label: "My Applications", icon: Briefcase },
  { id: "portfolio", label: "Portfolio", icon: Camera },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "subscription", label: "Subscription", icon: Crown },
];

// ─── TalentSidebar Component ──────────────────────────────────────────────────
export default function TalentSidebar({ activeNav, onNavChange }) {
  return (
    <aside className="w-60 flex-shrink-0 bg-[#111111] border-r border-zinc-800/60 flex flex-col min-h-screen sticky top-0">
      {/* Logo area */}
      <div className="h-16 flex items-center px-5 border-b border-zinc-800/60">
        <div className="flex flex-col leading-none">
          <span className="text-[8px] tracking-[0.3em] font-extrabold text-zinc-400">
            THE
          </span>
          <span className="text-sm tracking-[0.1em] font-black text-white">
            FILMEE
          </span>
          <span className="text-[9px] tracking-[0.2em] font-bold text-red-500">
            GRID
          </span>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavChange(id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeNav === id
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>

      {/* Bottom "Manage cookies" area */}
      <div className="p-4 border-t border-zinc-800/60">
        <button className="w-full text-xs text-zinc-500 hover:text-zinc-300 transition-colors py-2 px-3 rounded-lg hover:bg-zinc-800/40">
          Manage cookies or opt-out
        </button>
      </div>
    </aside>
  );
}
