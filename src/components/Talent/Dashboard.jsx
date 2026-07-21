"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
function OverviewPage({ onNavChange, recentApps, onApplyClick, onViewApp }) {
  return (
    <main className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
      {/* ── Section title + Find Opportunities ── */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white tracking-tight">
          Dashboard Overview
        </h2>
        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-xs font-black px-5 py-2.5 rounded-full transition-all duration-200 shadow-[0_0_16px_rgba(220,38,38,0.4)] hover:shadow-[0_0_24px_rgba(220,38,38,0.6)]">
          <Search size={14} />
          FIND OPPORTUNITIES
        </button>
      </div>

      {/* ── Free Plan Warning Banner ── */}
      <div className="flex items-center justify-between bg-[#1a1200] border border-yellow-700/60 rounded-2xl px-6 py-4">
        <div className="flex items-center gap-3">
          <AlertTriangle size={18} className="text-yellow-500 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-yellow-400">Free Plan Limits</p>
            <p className="text-xs text-zinc-400 mt-0.5">
              You can apply to 5 projects per month. 3 applications remaining
              this month.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavChange("subscription")}
          className="flex-shrink-0 ml-8 bg-red-600 hover:bg-red-500 text-white text-xs font-black px-6 py-2.5 rounded-full transition-all duration-200 shadow-[0_0_12px_rgba(220,38,38,0.35)]"
        >
          UPGRADE NOW
        </button>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-5 gap-4">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-5 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <p className="text-xs text-zinc-400 font-semibold leading-tight whitespace-pre-line">
                  {stat.label}
                </p>
                <Icon size={14} className="text-zinc-600 flex-shrink-0 mt-0.5" />
              </div>
              <div>
                <p className="text-3xl font-black text-white">{stat.value}</p>
                <p className={`text-[11px] font-semibold mt-1 ${stat.subColor}`}>
                  {stat.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Subscription Card ── */}
      <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-red-950/40 border border-red-800/50 flex items-center justify-center">
            <Crown size={20} className="text-red-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Free Plan</p>
            <p className="text-xs text-zinc-400 mt-0.5">Renews 1/1/2025</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-2xl font-black text-white">
            $0<span className="text-sm font-normal text-zinc-400">/monthly</span>
          </p>
          <button
            onClick={() => onNavChange("subscription")}
            className="border border-red-700 text-red-500 hover:bg-red-950/30 text-[11px] font-black px-5 py-2 rounded-full transition-colors uppercase tracking-wider"
          >
            MANAGE SUBSCRIPTION
          </button>
          <button
            onClick={() => onNavChange("subscription")}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white text-[11px] font-black px-5 py-2 rounded-full transition-all duration-200 shadow-[0_0_12px_rgba(220,38,38,0.35)] uppercase tracking-wider"
          >
            <Crown size={12} />
            UPGRADE NOW
          </button>
        </div>
      </div>

      {/* ── Hot Opportunities ── */}
      <div>
        <h3 className="text-xl font-black text-white mb-5">Hot Opportunities</h3>
        <div className="grid grid-cols-3 gap-5">
          {OPPORTUNITIES.map((opp) => (
            <div
              key={opp.id}
              className="bg-[#141414] border border-zinc-800/70 rounded-2xl overflow-hidden group transition-all duration-300 hover:border-zinc-700"
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
                  className={`absolute top-3 left-3 ${opp.priorityColor} text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide`}
                >
                  {opp.priority}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div>
                  <h4 className="text-base font-black text-white">{opp.role}</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">{opp.project}</p>
                  <p className="text-xs text-zinc-500">by {opp.director}</p>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold">
                      Budget
                    </p>
                    <p className="text-red-400 font-bold">{opp.budget}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold">
                      Duration
                    </p>
                    <p className="text-white font-bold">{opp.duration}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold">
                      Location
                    </p>
                    <p className="text-white font-bold flex items-center gap-1">
                      <MapPin size={11} className="text-zinc-400" />
                      {opp.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-500 pt-1 border-t border-zinc-800/60">
                  <span>{opp.applications} applications</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    Deadline: {opp.deadline}
                  </span>
                </div>

                <button
                  onClick={() => onApplyClick(opp)}
                  className="w-full bg-red-600 hover:bg-red-500 text-white text-[11px] font-black py-2.5 rounded-full uppercase tracking-wider transition-all duration-200 shadow-[0_0_12px_rgba(220,38,38,0.3)] hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                >
                  APPLY NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recent Applications ── */}
      <div className="pb-8">
        <h3 className="text-xl font-black text-white mb-5">
          Recent Applications
        </h3>
        <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl overflow-hidden divide-y divide-zinc-800/60">
          {recentApps.map((app) => (
            <div
              key={app.id}
              className="flex items-center gap-4 px-6 py-4 hover:bg-zinc-800/20 transition-colors"
            >
              {/* Thumbnail */}
              <img
                src={app.image}
                alt={app.role}
                className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{app.role}</p>
                <p className="text-xs text-zinc-400 truncate">{app.project}</p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Applied: {app.applied}
                </p>
              </div>

              {/* Status + View */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <span
                  className={`${app.statusColor} text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wide`}
                >
                  {app.status}
                </span>
                <button
                  onClick={() => onViewApp && onViewApp(app.id)}
                  className="border border-red-700 text-red-500 hover:bg-red-950/30 text-[10px] font-black px-4 py-1.5 rounded-full transition-colors uppercase tracking-wider cursor-pointer"
                >
                  VIEW
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

function FindRolesPage({ onApplyClick, onViewDetails }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRoles = ROLES.filter(
    (item) =>
      item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
      {/* ── Section title + Search & Filter ── */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white tracking-tight">
          Available Opportunities
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#141414] border border-zinc-800 text-white rounded-lg pl-4 pr-10 py-2.5 text-sm w-64 focus:outline-none focus:border-red-600 transition-colors"
            />
            <Search className="absolute right-3 top-3 text-zinc-500" size={16} />
          </div>
          <button className="flex items-center gap-2 border border-zinc-850 hover:bg-zinc-850 text-white text-xs font-black px-4 py-2.5 rounded-lg transition-colors border-red-700/50 uppercase tracking-wider">
            <Search size={14} className="text-red-500" />
            FILTER
          </button>
        </div>
      </div>

      {/* ── Opportunities Grid ── */}
      <div className="grid grid-cols-2 gap-6">
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

            <div className="p-6 pt-0 flex gap-3">
              <button
                onClick={() => onViewDetails && onViewDetails(opp)}
                className="flex-1 border border-zinc-800 hover:bg-zinc-800/40 text-red-500 text-[11px] font-black py-3 rounded-xl uppercase tracking-wider transition-all duration-200"
              >
                VIEW DETAILS
              </button>
              <button
                onClick={() => onApplyClick(opp)}
                className="flex-2 bg-red-600 hover:bg-red-500 text-white text-[11px] font-black py-3 px-6 rounded-xl uppercase tracking-wider transition-all duration-200 shadow-[0_0_12px_rgba(220,38,38,0.3)]"
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
const APPLICATIONS_DATA = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=200&q=80",
    role: "Director of Photography",
    project: "Midnight Runner",
    director: "Alex Thompson",
    appliedDate: "Applied on 1/15/2025",
    status: "Shortlisted",
    statusColor: "bg-blue-600 text-white",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=200&q=80",
    role: "Cinematographer",
    project: "Ocean Deep",
    director: "Maria Santos",
    appliedDate: "Applied on 1/10/2025",
    status: "Hired",
    statusColor: "bg-green-600 text-white",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=200&q=80",
    role: "Camera Operator",
    project: "City Lights",
    director: "by David Kim",
    appliedDate: "Applied on 1/20/2025",
    status: "Under Review",
    statusColor: "bg-yellow-600 text-white",
  },
];

function MyApplicationsPage({ applications }) {
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredApps = applications.filter((app) => {
    if (filterStatus === "All") return true;
    return app.status.toLowerCase() === filterStatus.toLowerCase();
  });

  return (
    <main className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
      {/* ── Section title + Filter ── */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white tracking-tight">
          My Applications
        </h2>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#141414] border border-zinc-800 text-zinc-300 rounded-lg px-4 py-2.5 text-sm w-44 focus:outline-none focus:border-red-650 transition-colors cursor-pointer appearance-none pr-10"
          >
            <option value="All">All Status</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Hired">Hired</option>
            <option value="Under Review">Under Review</option>
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
      <div className="space-y-6">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-6 flex gap-6 items-center justify-between group hover:border-zinc-700 transition-all duration-300"
          >
            <div className="flex gap-6 items-center">
              {/* Thumbnail */}
              <img
                src={app.image}
                alt={app.role}
                className="w-40 h-24 rounded-xl object-cover flex-shrink-0"
              />

              {/* Details */}
              <div className="space-y-2">
                <div>
                  <h4 className="text-xl font-black text-white">{app.role}</h4>
                  <p className="text-sm text-zinc-400 font-semibold">{app.project}</p>
                  <p className="text-xs text-zinc-500">by {app.director}</p>
                </div>
                <p className="text-xs text-zinc-500 flex items-center gap-1.5">
                  <Calendar size={12} className="text-zinc-500" />
                  {app.appliedDate}
                </p>
              </div>
            </div>

            {/* Actions + Status */}
            <div className="flex flex-col items-end gap-6 justify-between self-stretch">
              {/* Status Badge */}
              <span
                className={`${app.statusColor} text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider`}
              >
                {app.status}
              </span>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="bg-red-650 hover:bg-red-500 text-white text-[11px] font-black py-2.5 px-6 rounded-xl uppercase tracking-wider transition-all duration-200 shadow-[0_0_12px_rgba(220,38,38,0.2)]">
                  VIEW APPLICATION
                </button>
                <button className="border border-zinc-800 hover:bg-zinc-800/40 text-red-500 text-[11px] font-black py-2.5 px-6 rounded-xl uppercase tracking-wider transition-all duration-200">
                  MESSAGE
                </button>
                {app.status === "Under Review" && (
                  <button className="border border-zinc-800 hover:bg-zinc-800/40 text-zinc-500 hover:text-red-500 text-[11px] font-black py-2.5 px-6 rounded-xl uppercase tracking-wider transition-all duration-200">
                    WITHDRAW
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
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
    <main className="flex-1 overflow-y-auto px-8 py-8">
      <h2 className="text-2xl font-black text-white tracking-tight mb-4">
        {title}
      </h2>
      <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-4">
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
          recentApps={pageProps.recentApps}
          onApplyClick={pageProps.onApplyClick}
          onViewApp={pageProps.onViewApp}
        />
      );
    case "find-roles":
      return (
        <FindRolesPage
          onApplyClick={pageProps.onApplyClick}
          onViewDetails={pageProps.onViewDetails}
        />
      );
    case "applications":
      return <MyApplicationsPage applications={pageProps.applications} />;
    case "portfolio":
      return <PlaceholderPage title="Portfolio" />;
    default:
      return (
        <OverviewPage
          onNavChange={onNavChange}
          recentApps={pageProps.recentApps}
          onApplyClick={pageProps.onApplyClick}
          onViewApp={pageProps.onViewApp}
        />
      );
  }
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("overview");

  // ── Apply Modal state ────────────────────────────────────────────────────────
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  // ── Shared application state (drives both Overview & My Applications) ────────
  const today = new Date().toLocaleDateString("en-US");
  const [applications, setApplications] = useState(APPLICATIONS_DATA);
  const [recentApps, setRecentApps] = useState(RECENT_APPS);

  const handleLogout = () => {
    // Remove login information
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Redirect to home page
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

  // Open the apply modal for a given opportunity
  const handleApplyClick = (opportunity) => {
    setSelectedOpportunity(opportunity);
  };

  // Close the modal without submitting
  const handleModalClose = () => {
    setSelectedOpportunity(null);
  };

  // Handle form submission — opportunity is passed from the modal to avoid stale closure reads
  const handleApplySubmit = (opportunity, formData) => {
    if (!opportunity) return;

    const newApp = {
      id: Date.now(),
      image: opportunity.image,
      role: opportunity.role,
      project: opportunity.project,
      director: opportunity.director,
      appliedDate: `Applied on ${today}`,
      status: "Under Review",
      statusColor: "bg-yellow-600 text-white",
    };

    const newRecentApp = {
      id: Date.now(),
      image: opportunity.image,
      role: opportunity.role,
      project: opportunity.project,
      applied: today,
      status: "Under Review",
      statusColor: "bg-yellow-600",
    };

    setApplications((prev) => [newApp, ...prev]);
    setRecentApps((prev) => [newRecentApp, ...prev]);
    setSelectedOpportunity(null);
  };

  // Navigate to the full application detail page
  const handleViewApp = (appId) => {
    router.push(`/dashboard/talent/application/${appId}`);
  };

  // Navigate to matching application detail page for the given opportunity
  const handleViewDetails = (opp) => {
    const matchedApp =
      recentApps.find((app) => app.role.toLowerCase() === opp.role.toLowerCase()) ||
      applications.find((app) => app.role.toLowerCase() === opp.role.toLowerCase()) ||
      recentApps.find((app) => app.project.toLowerCase() === opp.project.toLowerCase()) ||
      applications.find((app) => app.project.toLowerCase() === opp.project.toLowerCase());

    if (matchedApp) {
      router.push(`/dashboard/talent/application/${matchedApp.id}`);
    } else {
      router.push(`/dashboard/talent/application/${opp.id || 1}`);
    }
  };

  const pageProps = {
    applications,
    recentApps,
    onApplyClick: handleApplyClick,
    onViewApp: handleViewApp,
    onViewDetails: handleViewDetails,
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* ── Apply Modal ──────────────────────────────────────────────────────── */}
      <ApplyModal
        opportunity={selectedOpportunity}
        onClose={handleModalClose}
        onSubmit={handleApplySubmit}
      />

      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <TalentSidebar activeNav={activeNav} onNavChange={handleNavChange} />

      {/* ── Main content ────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <TalentNavbar
          onLogout={handleLogout}
          onSubscriptionClick={() => router.push("/dashboard/talent/subscription")}
        />

        {/* Page content — switches based on activeNav */}
        {renderPage(activeNav, handleNavChange, pageProps)}
      </div>
    </div>
  );
}