"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ApplicationDetailNavbar from "./ApplicationDetail/ApplicationDetailNavbar";
import {
  Users,
  MapPin,
  Clock,
  Star,
  Download,
  Play,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";

const TABS = ["Overview", "Financials", "Team", "Media", "Open Roles"];

function fmt(n) {
  return "$" + Number(n).toLocaleString();
}

export default function ApplicationDetailPage({ id }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://127.0.0.1:5000/api/v1/projects/${id}/details`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error("Project not found");
        const json = await res.json();
        setProject(json.project);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-zinc-400 text-sm animate-pulse">Loading project details…</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-400 text-sm">Could not load project: {error}</p>
        <button
          onClick={() => router.back()}
          className="text-red-500 text-xs font-bold flex items-center gap-1 hover:text-red-400"
        >
          <ArrowLeft size={13} /> Go back
        </button>
      </div>
    );
  }

  // Normalize data from backend
  const filmmaker = project.filmmaker_first_name
    ? `${project.filmmaker_first_name} ${project.filmmaker_last_name}`
    : "Filmmaker";

  const openRoles = Array.isArray(project.open_talent_roles)
    ? project.open_talent_roles
    : [];

  const fundingTarget = Number(project.funding_target) || 0;
  const fundingRaised = Number(project.funding_raised) || 0;
  const fundingProgress = fundingTarget > 0 ? Math.min(Math.round((fundingRaised / fundingTarget) * 100), 100) : 0;

  const coverImage =
    project.lookbook_url ||
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80";


  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Top Navbar ─────────────────────────────────────────────────────────── */}
      <ApplicationDetailNavbar />

      {/* ── Two-Column Main Layout ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-[1fr_340px] gap-6 max-w-[1400px] mx-auto px-8 py-8 items-start">

        {/* ─── LEFT COLUMN ─────────────────────────────────────────────────────── */}
        <div className="space-y-6 min-w-0">

          {/* Hero Image */}
          <div className="relative h-[340px] rounded-2xl overflow-hidden">
            <img
              src={coverImage}
              alt={`${project.title} still`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
          </div>

          {/* Project Title & Meta */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-4xl font-black text-white tracking-tight leading-none">
                {project.title}
              </h1>
              <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wide">
                {project.project_status || "Active"}
              </span>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed">
              {project.logline || project.synopsis || "No description available."}
            </p>

            <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-semibold flex-wrap">
              <span className="text-red-500 font-black">{project.genre || "Film"}</span>
              <span className="text-zinc-700">•</span>
              <span className="flex items-center gap-1">
                <MapPin size={11} className="text-zinc-500" />
                {project.primary_location || "Not specified"}
              </span>
              <span className="text-zinc-700">•</span>
              <span className="flex items-center gap-1">
                <Clock size={11} className="text-zinc-500" />
                {project.production_timeline || "Flexible"}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center bg-[#141414] border border-zinc-800/70 rounded-xl p-1 gap-0.5">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-[11px] font-black rounded-lg cursor-pointer whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-zinc-800 text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ── Overview Tab ── */}
          {activeTab === "Overview" && (
            <div className="space-y-5">
              <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-6">
                <h3 className="text-sm font-black text-white mb-3">Synopsis</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {project.synopsis || project.logline || "No synopsis available."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {/* Project Details */}
                <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-6">
                  <h3 className="text-sm font-black text-white mb-4">Project Details</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Genre", value: project.genre || "—" },
                      { label: "Location", value: project.primary_location || "—" },
                      { label: "Timeline", value: project.production_timeline || "—" },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="flex items-center justify-between text-xs border-b border-zinc-800/40 pb-2.5"
                      >
                        <span className="text-zinc-500 font-semibold">{label}</span>
                        <span className="text-white font-semibold">{value}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between text-xs pt-0.5">
                      <span className="text-zinc-500 font-semibold">Status</span>
                      <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                        {project.project_status || "Active"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Documents placeholder */}
                <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-6">
                  <h3 className="text-sm font-black text-white mb-4">Documents</h3>
                  <div className="space-y-3">
                    {project.pitch_deck_url ? (
                      <a
                        href={project.pitch_deck_url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full flex items-center justify-center gap-2.5 border border-zinc-800 hover:border-red-700/50 hover:bg-red-950/10 text-red-500 text-[10px] font-black px-4 py-3 rounded-xl uppercase tracking-widest transition-all duration-200"
                      >
                        <Download size={12} className="flex-shrink-0" /> PITCH DECK
                      </a>
                    ) : (
                      <p className="text-zinc-600 text-xs text-center py-4">No documents uploaded</p>
                    )}
                    {project.lookbook_url && (
                      <a
                        href={project.lookbook_url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full flex items-center justify-center gap-2.5 border border-zinc-800 hover:border-red-700/50 hover:bg-red-950/10 text-red-500 text-[10px] font-black px-4 py-3 rounded-xl uppercase tracking-widest transition-all duration-200"
                      >
                        <Play size={12} className="flex-shrink-0 fill-red-500" /> LOOKBOOK
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Financials Tab ── */}
          {activeTab === "Financials" && (
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-6">
                <h3 className="text-sm font-black text-white mb-5">Budget Breakdown</h3>
                <div className="space-y-0">
                  {project.funding_goals_breakdown ? (
                    <div className="py-3 text-xs text-zinc-400 leading-relaxed">
                      {typeof project.funding_goals_breakdown === "string"
                        ? project.funding_goals_breakdown
                        : JSON.stringify(project.funding_goals_breakdown, null, 2)}
                    </div>
                  ) : (
                    <p className="text-zinc-600 text-xs py-4 text-center">No breakdown available</p>
                  )}
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800/40">
                    <span className="text-white text-xs font-black">Total Budget:</span>
                    <span className="text-white text-xs font-black">{fmt(project.funding_target || 0)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-6">
                <h3 className="text-sm font-black text-white mb-5">Projections</h3>
                <div className="space-y-0">
                  {[
                    { label: "Target ROI", value: project.expected_roi_percentage ? `${project.expected_roi_percentage}%` : "—", green: true },
                    { label: "Distribution Strategy", value: project.distribution_strategy || "—", green: false },
                  ].map(({ label, value, green }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between py-3 border-b border-zinc-800/40 last:border-b-0"
                    >
                      <span className="text-zinc-400 text-xs">{label}:</span>
                      <span className={`text-xs font-semibold ${green ? "text-green-400" : "text-white"}`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Team Tab ── */}
          {activeTab === "Team" && (
            <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-black text-white">Filmmaker</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-900 to-zinc-800 flex items-center justify-center text-white text-sm font-black flex-shrink-0">
                  {filmmaker.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-black text-white">{filmmaker}</p>
                  <p className="text-xs text-zinc-500">{project.filmmaker_email || "Film Director"}</p>
                </div>
              </div>
              <p className="text-zinc-500 text-xs">Full team details will be available once the project is in production.</p>
            </div>
          )}

          {/* ── Open Roles Tab ── */}
          {activeTab === "Open Roles" && (
            <div className="grid grid-cols-3 gap-5">
              {openRoles.length === 0 ? (
                <p className="col-span-3 text-zinc-500 text-sm text-center py-8">No open roles listed for this project.</p>
              ) : (
                openRoles.map((role, i) => {
                  const roleTitle = typeof role === "string" ? role : role.role_title || role.title || role.name || `Role ${i + 1}`;
                  return (
                    <div
                      key={i}
                      className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-5 flex flex-col gap-4"
                    >
                      <h3 className="text-sm font-black text-white">{roleTitle}</h3>
                      <div className="space-y-2.5 flex-1">
                        {role.budget && (
                          <div className="flex items-center justify-between text-xs border-b border-zinc-800/40 pb-2.5">
                            <span className="text-zinc-400">Budget:</span>
                            <span className="text-white font-semibold">{role.budget}</span>
                          </div>
                        )}
                        {role.deadline && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-zinc-400">Deadline:</span>
                            <span className="text-white font-semibold">{role.deadline}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* ── Media placeholder ── */}
          {activeTab === "Media" && (
            <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-14 flex flex-col items-center justify-center text-center gap-3">
              <span className="text-4xl">🎬</span>
              <p className="text-zinc-400 text-sm font-semibold">Media — Coming Soon</p>
              <p className="text-zinc-600 text-xs max-w-xs">
                This section will be available once the project team provides additional information.
              </p>
            </div>
          )}
        </div>

        {/* ─── RIGHT SIDEBAR (sticky) ──────────────────────────────────────────── */}
        <div className="sticky top-24 space-y-4">
          {/* Project Information Card */}
          <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-5 space-y-5">
            <h3 className="text-sm font-black text-white">Project Information</h3>

            {/* Funding Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Funding Progress</span>
                <span className="text-white font-black">{fundingProgress}%</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-700 to-red-500 rounded-full"
                  style={{ width: `${fundingProgress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white font-bold">{fmt(fundingRaised)} raised</span>
                <span className="text-zinc-500">{fmt(fundingTarget)} goal</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Target ROI", value: project.expected_roi_percentage ? `${project.expected_roi_percentage}%` : "—" },
                { label: "Remaining", value: fmt(Math.max(0, fundingTarget - fundingRaised)) },
                { label: "Status", value: project.project_status || "Active" },
                { label: "Open Roles", value: openRoles.length },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-[#1a1a1a] border border-zinc-800/50 rounded-xl py-3 px-2 text-center"
                >
                  <p className="text-lg font-black text-white leading-none">{value}</p>
                  <p className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold mt-1.5">{label}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={() => setActiveTab("Open Roles")}
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white text-[11px] font-black py-3 rounded-xl uppercase tracking-widest transition-all duration-200 shadow-[0_0_18px_rgba(220,38,38,0.35)] hover:shadow-[0_0_28px_rgba(220,38,38,0.55)] cursor-pointer"
              >
                <Users size={13} />
                View Open Roles
              </button>
              <button
                onClick={() => router.push(`/dashboard/talent/messages?receiverId=${project.filmmaker_id}&receiverName=${encodeURIComponent(filmmaker)}&projectId=${project.project_id}`)}
                className="w-full flex items-center justify-center gap-2 border border-zinc-700 hover:border-red-700/50 text-white hover:text-red-400 text-[11px] font-black py-3 rounded-xl uppercase tracking-widest transition-all duration-200 cursor-pointer"
              >
                <MessageSquare size={12} />
                Contact Filmmaker
              </button>
            </div>
          </div>

          {/* Director mini-card */}
          <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-5 space-y-3">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Director</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-900 to-zinc-800 flex items-center justify-center text-white text-sm font-black flex-shrink-0">
                {filmmaker.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-black text-white">{filmmaker}</p>
                <p className="text-[10px] text-zinc-500">Film Director</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
