"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getOpportunities,
  getTalentData,
  applyToProject,
  withdrawApplication,
} from "@/services/talentService";
import {
  Eye,
  Search,
  Briefcase,
  Crown,
  Settings,
  LogOut,
  AlertTriangle,
  Star,
  Users,
  MapPin,
  Calendar,
  X,
} from "lucide-react";
import TalentSidebar from "./TalentSidebar";
import SubscriptionPage from "./SubscriptionPage";
import TalentNavbar from "./TalentNavbar";

// ─── Stats data ───────────────────────────────────────────────────────────────
const STATS = [
  {
    label: "Profile\nViews",
    icon: Eye,
    value: "1,847",
    sub: "+12% this month",
    subColor: "text-green-400",
  },
  {
    label: "Applications",
    icon: Briefcase,
    value: "23",
    sub: "Total submitted",
    subColor: "text-zinc-400",
  },
  {
    label: "Shortlisted",
    icon: Users,
    value: "8",
    sub: "35% success rate",
    subColor: "text-green-400",
  },
  {
    label: "Projects\nHired",
    icon: Users,
    value: "5",
    sub: "Completed successfully",
    subColor: "text-green-400",
  },
  {
    label: "Rating",
    icon: Star,
    value: "4.8",
    sub: "Average rating",
    subColor: "text-zinc-400",
  },
];

// ─── Hot Opportunities ────────────────────────────────────────────────────────
const OPPORTUNITIES = [
  {
    id: 1,
    priority: "High Priority",
    priorityColor: "bg-red-600",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
    role: "Cinematographer",
    project: "The Last Frame",
    director: "John Director",
    budget: "$15,000",
    duration: "6 weeks",
    location: "Los Angeles, CA",
    applications: 12,
    deadline: "2/15/2025",
  },
  {
    id: 2,
    priority: "Medium Priority",
    priorityColor: "bg-yellow-500",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80",
    role: "Lead Actor",
    project: "Silent Echoes",
    director: "Sarah Williams",
    budget: "$25,000",
    duration: "8 weeks",
    location: "New York, NY",
    applications: 45,
    deadline: "2/20/2025",
  },
  {
    id: 3,
    priority: "High Priority",
    priorityColor: "bg-red-600",
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=600&q=80",
    role: "VFX Supervisor",
    project: "Neon Nights",
    director: "Mike Chen",
    budget: "$35,000",
    duration: "12 weeks",
    location: "Vancouver, BC",
    applications: 8,
    deadline: "2/10/2025",
  },
];

// ─── Recent Applications ──────────────────────────────────────────────────────
const RECENT_APPS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=200&q=80",
    role: "Director of Photography",
    project: "Midnight Runner",
    applied: "1/15/2025",
    status: "Shortlisted",
    statusColor: "bg-blue-600",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=200&q=80",
    role: "Cinematographer",
    project: "Urban Shadows",
    applied: "1/10/2025",
    status: "Hired",
    statusColor: "bg-green-600",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=200&q=80",
    role: "Camera Operator",
    project: "Neon Nights",
    applied: "1/20/2025",
    status: "Under Review",
    statusColor: "bg-yellow-600",
  },
];

// ─── Overview Page ────────────────────────────────────────────────────────────
function OverviewPage({ onNavChange, applications = [], onApplyClick, onViewApp, opportunities, appliedProjectIds = [] }) {
  const rawList = opportunities && opportunities.length > 0 ? opportunities : OPPORTUNITIES;
  const displayOpportunities = rawList.filter((opp) => !appliedProjectIds.includes(opp.id));
  const recentApps = (applications || []).slice(0, 5);
  return (
    <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 md:py-10 space-y-6 md:space-y-8 bg-[#0B0B0B]">
      {/* ── Section title + Find Opportunities ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">Manage your auditions, applications, and profile performance.</p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(229,9,20,0.4)] w-full sm:w-auto">
          <Search size={16} />
          <span>Find Opportunities</span>
        </button>
      </div>

      {/* ── Free Plan Warning Banner ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6">
        <div className="flex items-start sm:items-center gap-3">
          <AlertTriangle size={18} className="text-yellow-500 flex-shrink-0 mt-0.5 sm:mt-0" />
          <div>
            <p className="text-sm font-bold text-white">Free Plan Limits</p>
            <p className="text-xs text-zinc-400 mt-0.5">
              You can apply to 5 projects per month. 3 applications remaining this month.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavChange("subscription")}
          className="flex-shrink-0 w-full sm:w-auto rounded-full bg-red-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-700 transition-colors text-center"
        >
          Upgrade Now
        </button>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-5 flex flex-col justify-between hover:border-red-600/50 transition-all"
            >
              <div className="flex items-start justify-between">
                <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider leading-tight whitespace-pre-line">
                  {stat.label}
                </p>
                <div className="p-2 rounded-full bg-[#1E1E1E]">
                  <Icon size={14} className="text-zinc-400" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{stat.value}</p>
                <p className={`text-xs font-bold mt-1 tracking-wider ${stat.subColor}`}>
                  {stat.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Subscription Card ── */}
      <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-red-600/40 transition-all">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#1E1E1E] flex items-center justify-center flex-shrink-0">
            <Crown size={22} className="text-red-500" />
          </div>
          <div>
            <p className="text-base font-bold text-white">Free Plan</p>
            <p className="text-xs text-zinc-400 mt-0.5">Renews 1/1/2025</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <p className="text-2xl font-bold text-white tracking-tight">
            $0<span className="text-xs font-normal text-zinc-400">/monthly</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => onNavChange("subscription")}
              className="rounded-full border border-[#2A2A2A] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#1E1E1E] transition-colors text-center"
            >
              Manage Subscription
            </button>
            <button
              onClick={() => onNavChange("subscription")}
              className="flex items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(229,9,20,0.4)]"
            >
              <Crown size={14} />
              <span>Upgrade Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Hot Opportunities ── */}
      <div>
        <h3 className="text-lg font-bold text-white mb-6">Hot Opportunities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] overflow-hidden group transition-all duration-300 hover:border-red-600/40 flex flex-col justify-between"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={opp.image}
                  alt={opp.role}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                <span
                  className="absolute top-4 left-4 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600 text-white"
                >
                  {opp.priority}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">{opp.role}</h4>
                  <p className="text-xs text-zinc-400 mt-1">{opp.project}</p>
                  <p className="text-xs text-zinc-500">by {opp.director}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs border-t border-[#2A2A2A] pt-3">
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-medium">
                      Budget
                    </p>
                    <p className="text-red-500 font-bold text-sm mt-0.5">{opp.budget}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-medium">
                      Duration
                    </p>
                    <p className="text-white font-bold text-sm mt-0.5">{opp.duration}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-medium">
                      Location
                    </p>
                    <p className="text-white font-medium text-xs flex items-center gap-1 mt-0.5">
                      <MapPin size={12} className="text-zinc-400" />
                      {opp.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-[#2A2A2A]">
                  <span>{opp.applications} applications</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    Deadline: {opp.deadline}
                  </span>
                </div>

                <button
                  onClick={() => onApplyClick(opp)}
                  className="w-full rounded-full bg-red-600 hover:bg-red-700 text-xs font-bold uppercase tracking-wider py-2.5 text-white transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recent Applications ── */}
      <div className="pb-8">
        <h3 className="text-lg font-bold text-white mb-6">
          Recent Applications
        </h3>
        <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6 divide-y divide-[#2A2A2A]">
          {recentApps.map((app) => (
            <div
              key={app.id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 first:pt-0 last:pb-0 transition-colors"
            >
              {/* Thumbnail */}
              <img
                src={app.image}
                alt={app.role}
                className="w-full sm:w-16 sm:h-16 h-32 rounded-xl object-cover flex-shrink-0"
              />

              {/* Info */}
              <div className="flex-1 min-w-0 w-full sm:w-auto">
                <p className="text-sm font-bold text-white truncate">{app.role}</p>
                <p className="text-xs text-zinc-400 truncate">{app.project}</p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Applied: {app.applied}
                </p>
              </div>

              {/* Status + View */}
              <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-500"
                >
                  {app.status}
                </span>
                <button
                  onClick={() => onViewApp && onViewApp(app.id)}
                  className="rounded-full border border-[#2A2A2A] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#1E1E1E] transition-colors"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

// ─── Find Roles Page ──────────────────────────────────────────────────────────
const ROLES = [
  {
    id: 1,
    priority: "High Priority",
    priorityColor: "bg-red-600",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
    role: "Cinematographer",
    project: "The Last Frame",
    director: "John Director",
    budget: "$15,000",
    duration: "6 weeks",
    location: "Los Angeles, CA",
    deadline: "2/15/2025",
    description: "Experience with thriller genre, RED camera experience preferred",
  },
  {
    id: 2,
    priority: "Medium Priority",
    priorityColor: "bg-yellow-500",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80",
    role: "Lead Actor",
    project: "Silent Echoes",
    director: "Sarah Williams",
    budget: "$25,000",
    duration: "8 weeks",
    location: "New York, NY",
    deadline: "2/20/2025",
    description: "Male, 25-35 years old, dramatic acting experience",
  },
  {
    id: 3,
    priority: "High Priority",
    priorityColor: "bg-red-600",
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=600&q=80",
    role: "VFX Supervisor",
    project: "Neon Nights",
    director: "Mike Chen",
    budget: "$35,000",
    duration: "12 weeks",
    location: "Vancouver, BC",
    deadline: "2/10/2025",
    description: "Sci-fi VFX experience, After Effects, Nuke proficiency",
  },
  {
    id: 4,
    priority: "Low Priority",
    priorityColor: "bg-emerald-600",
    image:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    role: "Sound Designer",
    project: "Urban Legend",
    director: "Emma Rodriguez",
    budget: "$12,000",
    duration: "4 weeks",
    location: "Atlanta, GA",
    deadline: "2/25/2025",
    description: "Horror genre experience, Pro Tools expertise",
  },
];

function FindRolesPage({ onApplyClick, opportunities, appliedProjectIds = [], onViewDetails }) {
  const [searchQuery, setSearchQuery] = useState("");

  const rolesList = opportunities && opportunities.length > 0 ? opportunities : ROLES;

  const filteredRoles = rolesList.filter(
    (item) =>
      !appliedProjectIds.includes(item.id) &&
      (item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
       item.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
       item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <main className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8 space-y-6 md:space-y-8">
      {/* ── Section title + Search & Filter ── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
        <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
          Available Opportunities
        </h2>
        <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <input
              type="text"
              placeholder="Search roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#141414] border border-zinc-800 text-white rounded-lg pl-4 pr-10 py-2.5 text-sm w-full md:w-64 focus:outline-none focus:border-red-600 transition-colors"
            />
            <Search className="absolute right-3 top-3 text-zinc-500" size={16} />
          </div>
          <button className="flex items-center gap-2 border border-zinc-850 hover:bg-zinc-850 text-white text-[10px] md:text-xs font-black px-3 md:px-4 py-2.5 rounded-lg transition-colors border-red-700/50 uppercase tracking-wider flex-shrink-0">
            <Search size={14} className="text-red-500" />
            <span className="hidden sm:inline">FILTER</span>
          </button>
        </div>
      </div>

      {/* ── Opportunities Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {filteredRoles.map((opp) => (
          <div
            key={opp.id}
            className="bg-[#141414] border border-zinc-800/70 rounded-2xl overflow-hidden group transition-all duration-300 hover:border-zinc-700 flex flex-col justify-between"
          >
            <div>
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={opp.image}
                  alt={opp.role}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                <span
                  className={`absolute top-3 left-3 ${opp.priorityColor} text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide`}
                >
                  {opp.priority}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-black text-white">{opp.role}</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">{opp.project}</p>
                    <p className="text-xs text-zinc-500">by {opp.director}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-white">{opp.budget}</p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
                      {opp.duration}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin size={12} className="text-zinc-500" />
                    <span className="text-zinc-300">{opp.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={12} className="text-zinc-500" />
                    <span className="text-zinc-400">Deadline: {opp.deadline}</span>
                  </div>
                </div>

                <p className="text-zinc-400 text-xs leading-relaxed border-t border-zinc-800/60 pt-3">
                  {opp.description}
                </p>
              </div>
            </div>

            <div className="p-4 md:p-6 pt-0 flex flex-col sm:flex-row gap-2 md:gap-3">
              <button
                onClick={() => onViewDetails && onViewDetails(opp.id)}
                className="flex-1 border border-zinc-800 hover:bg-zinc-800/40 text-red-500 text-[10px] md:text-[11px] font-black py-2.5 md:py-3 rounded-xl uppercase tracking-wider transition-all duration-200 text-center"
              >
                VIEW DETAILS
              </button>
              <button
                onClick={() => onApplyClick(opp)}
                className="flex-1 sm:flex-2 bg-red-600 hover:bg-red-500 text-white text-[10px] md:text-[11px] font-black py-2.5 md:py-3 px-4 md:px-6 rounded-xl uppercase tracking-wider transition-all duration-200 shadow-[0_0_12px_rgba(220,38,38,0.3)] text-center"
              >
                APPLY FOR ROLE
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

// ─── My Applications Page ─────────────────────────────────────────────────────
// ─── My Applications Page ─────────────────────────────────────────────────────
function MyApplicationsPage({ applications, onWithdraw, onNavChange, onViewApplication, onMessageFilmmaker }) {
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredApps = (applications || []).filter((app) => {
    if (filterStatus === "All") return true;
    return app.status.toLowerCase() === filterStatus.toLowerCase();
  });

  return (
    <main className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8 space-y-6 md:space-y-8">
      {/* ── Section title + Filter ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
          My Applications
        </h2>
        <div className="relative w-full sm:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#141414] border border-zinc-800 text-zinc-300 rounded-lg px-4 py-2.5 text-sm w-full sm:w-44 focus:outline-none focus:border-red-650 transition-colors cursor-pointer appearance-none pr-10"
          >
            <option value="All">All Status</option>
            <option value="Under Review">Under Review</option>
            <option value="Hired">Hired</option>
            <option value="Declined">Declined</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Applications List ── */}
      <div className="space-y-4 md:space-y-6">
        {filteredApps.length === 0 ? (
          <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-8 text-center text-zinc-400">
            <p className="text-sm font-semibold">No applications submitted yet.</p>
            <p className="text-xs text-zinc-500 mt-1">Browse open roles to apply for active projects!</p>
          </div>
        ) : (
          filteredApps.map((app) => (
            <div
              key={app.id}
              className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center justify-between group hover:border-zinc-700 transition-all duration-300"
            >
              <div className="flex gap-4 md:gap-6 items-start md:items-center w-full md:w-auto">
                {/* Thumbnail */}
                <img
                  src={app.image}
                  alt={app.role}
                  className="w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 rounded-xl object-cover flex-shrink-0"
                />

                {/* Details */}
                <div className="space-y-1 md:space-y-2 flex-1">
                  <div>
                    <h4 className="text-base md:text-xl font-black text-white">{app.role}</h4>
                    <p className="text-xs md:text-sm text-zinc-400 font-semibold">{app.project}</p>
                    <p className="text-[10px] md:text-xs text-zinc-500">by {app.director}</p>
                  </div>
                  <p className="text-[10px] md:text-xs text-zinc-500 flex items-center gap-1.5">
                    <Calendar size={12} className="text-zinc-500" />
                    {app.appliedDate}
                  </p>
                </div>
              </div>

              {/* Actions + Status */}
              <div className="flex flex-col items-start md:items-end gap-3 md:gap-6 justify-between w-full md:w-auto md:self-stretch">
                {/* Status Badge */}
                <span
                  className={`${app.statusColor} text-[9px] md:text-[10px] font-black px-3 md:px-3.5 py-1 rounded-full uppercase tracking-wider`}
                >
                  {app.status}
                </span>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full md:w-auto">
                  <button
                    onClick={() => onViewApplication && onViewApplication(app.id)}
                    className="bg-red-600 hover:bg-red-500 text-white text-[10px] md:text-[11px] font-black py-2 md:py-2.5 px-4 md:px-6 rounded-xl uppercase tracking-wider transition-all duration-200 shadow-[0_0_12px_rgba(220,38,38,0.2)] text-center"
                  >
                    VIEW APPLICATION
                  </button>
                  <button 
                    onClick={() => onMessageFilmmaker && onMessageFilmmaker(app.filmakerId)}
                    className="border border-zinc-800 hover:bg-zinc-800/40 text-red-500 text-[10px] md:text-[11px] font-black py-2 md:py-2.5 px-4 md:px-6 rounded-xl uppercase tracking-wider transition-all duration-200 text-center"
                  >
                    MESSAGE
                  </button>
                  {app.status === "Under Review" && (
                    <button 
                      onClick={() => onWithdraw && onWithdraw(app.id)}
                      className="border border-zinc-800 hover:bg-zinc-800/40 text-zinc-500 hover:text-red-500 text-[10px] md:text-[11px] font-black py-2 md:py-2.5 px-4 md:px-6 rounded-xl uppercase tracking-wider transition-all duration-200 text-center"
                    >
                      WITHDRAW
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

// ─── Apply Modal Component ───────────────────────────────────────────────────
function ApplyModal({ opportunity, onClose, onSubmit }) {
  const [coverLetter, setCoverLetter] = useState("");
  const [rate, setRate] = useState("500");
  const [availability, setAvailability] = useState("Available from March 1st");

  if (!opportunity) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass opportunity back so the parent doesn't rely on stale closure state
    onSubmit(opportunity, {
      coverLetter,
      rate,
      availability,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-[#141414] border border-zinc-800/80 rounded-2xl p-6 shadow-2xl text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl font-black text-white tracking-tight">
            Apply for {opportunity.role}
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Submit your application for {opportunity.project}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Cover Letter */}
          <div>
            <label className="text-xs font-bold text-white block mb-1.5 uppercase tracking-wider">
              Cover Letter
            </label>
            <textarea
              required
              rows={4}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Tell us why you're perfect for this role..."
              className="w-full bg-[#1c1c1c] border border-zinc-800 focus:border-red-650 focus:ring-1 focus:ring-red-650/50 text-white rounded-xl p-3.5 text-sm focus:outline-none transition-all duration-200 resize-none placeholder-zinc-500"
            />
          </div>

          {/* Your Rate */}
          <div>
            <label className="text-xs font-bold text-white block mb-1.5 uppercase tracking-wider">
              Your Rate (per day)
            </label>
            <input
              type="text"
              required
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full bg-[#1c1c1c] border border-zinc-800 focus:border-red-650 focus:ring-1 focus:ring-red-650/50 text-white rounded-xl p-3.5 text-sm focus:outline-none transition-all duration-200"
            />
          </div>

          {/* Availability */}
          <div>
            <label className="text-xs font-bold text-white block mb-1.5 uppercase tracking-wider">
              Availability
            </label>
            <input
              type="text"
              required
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full bg-[#1c1c1c] border border-zinc-800 focus:border-red-650 focus:ring-1 focus:ring-red-650/50 text-white rounded-xl p-3.5 text-sm focus:outline-none transition-all duration-200"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="border border-zinc-800 hover:bg-zinc-900/50 text-red-500 text-xs font-black px-6 py-3 rounded-full transition-colors uppercase tracking-wider cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-500 text-white text-xs font-black px-6 py-3 rounded-full transition-all duration-200 shadow-[0_0_12px_rgba(220,38,38,0.3)] hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] uppercase tracking-wider cursor-pointer"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Placeholder pages for other nav items ────────────────────────────────────
function PlaceholderPage({ title }) {
  return (
    <main className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
      <h2 className="text-xl md:text-2xl font-black text-white tracking-tight mb-4">
        {title}
      </h2>
      <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-zinc-800/60 flex items-center justify-center">
          <span className="text-3xl">🎬</span>
        </div>
        <p className="text-zinc-400 text-sm font-semibold">
          {title} — Coming Soon
        </p>
        <p className="text-zinc-600 text-xs max-w-xs">
          This section is under construction. Check back soon for updates.
        </p>
      </div>
    </main>
  );
}

// ─── Page router ──────────────────────────────────────────────────────────────
function renderPage(activeNav, onNavChange, pageProps) {
  switch (activeNav) {
    case "overview":
      return (
        <OverviewPage
          onNavChange={onNavChange}
          applications={pageProps.applications}
          onApplyClick={pageProps.onApplyClick}
          onViewApp={pageProps.onViewApp}
          opportunities={pageProps.opportunities}
          appliedProjectIds={pageProps.appliedProjectIds}
        />
      );
    case "find-roles":
      return (
        <FindRolesPage
          onApplyClick={pageProps.onApplyClick}
          opportunities={pageProps.opportunities}
          appliedProjectIds={pageProps.appliedProjectIds}
          onViewDetails={pageProps.onViewDetails}
        />
      );
    case "applications":
      return (
        <MyApplicationsPage
          applications={pageProps.applications}
          onWithdraw={pageProps.onWithdraw}
          onNavChange={onNavChange}
          onViewApplication={pageProps.onViewApplication}
          onMessageFilmmaker={pageProps.onMessageFilmmaker}
        />
      );
    case "portfolio":
      return <PlaceholderPage title="Portfolio" />;
    default:
      return (
        <OverviewPage
          onNavChange={onNavChange}
          applications={pageProps.applications}
          onApplyClick={pageProps.onApplyClick}
          onViewApp={pageProps.onViewApp}
          opportunities={pageProps.opportunities}
          appliedProjectIds={pageProps.appliedProjectIds}
        />
      );
  }
}

function formatOpenRoles(rawRoles) {
  if (!rawRoles) return "Talent Role Needed";
  let roles = rawRoles;
  if (typeof roles === "string") {
    try {
      roles = JSON.parse(roles);
    } catch {
      return roles;
    }
  }
  if (Array.isArray(roles)) {
    if (roles.length === 0) return "Talent Role Needed";
    const list = roles.map((r) => {
      if (typeof r === "string") return r;
      if (typeof r === "object" && r !== null) return r.role_title || r.title || r.name || String(r);
      return String(r);
    });
    return list.join(", ");
  }
  return String(roles);
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ── Toast notification state ────────────────────────────────────────────────
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 4000);
  };

  // ── Apply Modal state ────────────────────────────────────────────────────────
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  // ── Dynamic state loaded from backend ────────────────────────────────────────
  const [applications, setApplications] = useState([]);
  const [dbOpportunities, setDbOpportunities] = useState([]);
  const [userName, setUserName] = useState("User");

  const loadDashboardData = async () => {
    try {
      // Load user info from localStorage
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUserName(userData.first_name || "User");
      }

      // 1. Fetch live user data & applications
      const talentData = await getTalentData();
      if (talentData && Array.isArray(talentData.applications)) {
        const mappedApps = talentData.applications.map((a) => {
          let statusText = "Under Review";
          let statusColor = "bg-yellow-600 text-white";

          if (a.status === "ACCEPTED" || a.status === "HIRED") {
            statusText = "Hired";
            statusColor = "bg-green-600 text-white";
          } else if (a.status === "DECLINED") {
            statusText = "Declined";
            statusColor = "bg-red-600 text-white";
          }

          return {
            id: a.application_id,
            projectId: a.project_id,
            filmakerId: a.filmmaker_id, // Add filmmaker ID for messaging
            image: a.lookbook_url || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=200&q=80",
            role: a.applied_role_title || formatOpenRoles(a.open_talent_roles),
            project: a.project_title,
            director: a.filmmaker_first_name ? `${a.filmmaker_first_name} ${a.filmmaker_last_name}` : "Filmmaker",
            appliedDate: `Applied on ${a.created_at ? new Date(a.created_at).toLocaleDateString() : new Date().toLocaleDateString()}`,
            status: statusText,
            statusColor: statusColor,
          };
        });
        setApplications(mappedApps);
      }

      // 2. Fetch live project opportunities
      const oppData = await getOpportunities();
      if (Array.isArray(oppData)) {
        const mappedOpp = oppData.map((p) => ({
          id: p.project_id,
          filmakerId: p.filmmaker_id, // Add filmmaker ID for messaging
          priority: p.project_status || "Active Project",
          priorityColor: "bg-red-600",
          image: p.lookbook_url || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
          role: formatOpenRoles(p.open_talent_roles),
          project: p.title,
          director: p.filmmaker_first_name ? `${p.filmmaker_first_name} ${p.filmmaker_last_name}` : "Filmmaker",
          directorName: p.filmmaker_first_name && p.filmmaker_last_name ? `${p.filmmaker_first_name} ${p.filmmaker_last_name}` : "Filmmaker",
          budget: p.funding_target ? `$${Number(p.funding_target).toLocaleString()}` : "$0",
          duration: p.production_timeline || "Flexible",
          location: p.primary_location || "Not Specified",
          applications: p.total_applications || 0,
          deadline: p.created_at ? new Date(p.created_at).toLocaleDateString() : "Open",
          description: p.logline || p.synopsis || "Opportunity open for talent applications.",
        }));
        setDbOpportunities(mappedOpp);
      }
    } catch (err) {
      console.error("Failed to load talent dashboard data:", err);
      showToast("Failed to load dashboard data. Please try refreshing.", "error");
    }
  };

  useEffect(() => {
    let isMounted = true;
    Promise.resolve().then(() => {
      if (isMounted) {
        loadDashboardData();
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleNavChange = (id) => {
    if (id === "subscription") {
      router.push("/dashboard/talent/subscription");
    } else if (id === "messages") {
      router.push("/dashboard/talent/messages");
    } else {
      setActiveNav(id);
    }
  };

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleApplyClick = (opportunity) => {
    setSelectedOpportunity(opportunity);
  };

  const handleModalClose = () => {
    setSelectedOpportunity(null);
  };

  const handleApplySubmit = async (opportunity, formData) => {
    if (!opportunity) return;

    try {
      console.log("Submitting application for project:", opportunity.id);
      console.log("Role:", opportunity.role);
      console.log("Cover Letter:", formData.coverLetter);
      
      const result = await applyToProject(
        opportunity.id,
        opportunity.role,
        formData.coverLetter
      );
      
      console.log("Application submitted successfully:", result);
      showToast(`Successfully applied to ${opportunity.project}!`, "success");
      setSelectedOpportunity(null);
      await loadDashboardData();
      setActiveNav("applications"); // auto-navigate to My Applications
    } catch (err) {
      console.error("Error submitting application:", err);
      const message = err.response?.data?.message || err.message || "Failed to submit application";
      showToast(message, "error");
      setSelectedOpportunity(null);
    }
  };

  const handleWithdrawApp = async (applicationId) => {
    try {
      await withdrawApplication(applicationId);
      showToast("Application withdrawn successfully", "success");
      await loadDashboardData();
    } catch (err) {
      const message = err.response?.data?.message || "Failed to withdraw application";
      showToast(message, "error");
    }
  };

  const handleViewApp = (appId) => {
    router.push(`/dashboard/talent/application/${appId}`);
  };

  const handleViewProjectDetails = (projectId) => {
    router.push(`/dashboard/talent/application/${projectId}`);
  };

  const handleMessageFilmmaker = (filmakerId) => {
    // Navigate to messages page with the correct parameters
    if (filmakerId) {
      router.push(`/dashboard/talent/messages?receiverId=${filmakerId}`);
    } else {
      router.push(`/dashboard/talent/messages`);
    }
  };

  // Create a Set of project IDs that the user has already applied to
  const appliedProjectIds = applications.map((a) => a.projectId);

  const pageProps = {
    applications,
    opportunities: dbOpportunities,
    appliedProjectIds,
    onApplyClick: handleApplyClick,
    onViewApp: handleViewApp,
    onWithdraw: handleWithdrawApp,
    onViewDetails: handleViewProjectDetails,
    onViewApplication: handleViewApp,
    onMessageFilmmaker: handleMessageFilmmaker,
  };

  // Overview page also needs applications for the Recent Applications section

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white font-sans relative">
      {/* ── Toast Notification ───────────────────────────────────────────── */}
      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border font-bold text-sm transition-all duration-300 ${
            toast.type === "success"
              ? "bg-green-950/90 border-green-700/80 text-green-300"
              : "bg-red-950/90 border-red-700/80 text-red-300"
          }`}
        >
          <span>{toast.message}</span>
        </div>
      )}

      {/* ── Apply Modal ──────────────────────────────────────────────────────── */}
      <ApplyModal
        opportunity={selectedOpportunity}
        onClose={handleModalClose}
        onSubmit={handleApplySubmit}
      />

      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <TalentSidebar 
        activeNav={activeNav} 
        onNavChange={handleNavChange}
        isOpen={isMobileMenuOpen}
        onClose={handleMenuClose}
      />

      {/* ── Main content ────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <TalentNavbar
          onLogout={handleLogout}
          onSubscriptionClick={() => router.push("/dashboard/talent/subscription")}
          onMenuClick={handleMenuToggle}
          username={userName}
        />

        {/* Page content — switches based on activeNav */}
        {renderPage(activeNav, handleNavChange, pageProps)}
      </div>
    </div>
  );
}