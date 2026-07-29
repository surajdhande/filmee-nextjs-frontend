"use client";

import { useState } from "react";
import ApplicationDetailNavbar from "./ApplicationDetail/ApplicationDetailNavbar";
import {
  Users,
  MapPin,
  Clock,
  Star,
  Download,
  Play,
  MessageSquare,
} from "lucide-react";

// ─── Per-application detailed data ───────────────────────────────────────────
const APPLICATION_DETAILS = {
  1: {
    project: "The Last Frame",
    role: "Director of Photography",
    director: "Alex Thompson",
    appliedDate: "January 15, 2025",
    status: "Shortlisted",
    statusBg: "bg-blue-600",
    shortDescription:
      "A photographer uncovers a dangerous conspiracy hidden in old film footage.",
    synopsis:
      "A gripping thriller about a photographer who discovers a dark secret hidden in the frames of an old film. As he delves deeper, he realizes the images hold the key to a decades-old mystery that powerful forces want to keep buried.",
    images: [
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80",
    ],
    rating: 4.8,
    stage: "Funding",
    genre: "Thriller",
    location: "Los Angeles, CA",
    timeline: "8 months",
    raised: 150000,
    goal: 250000,
    fundingProgress: 60,
    investors: 12,
    views: 1254,
    targetROI: "25%",
    remaining: 100000,
    team: {
      filmmaker: {
        name: "John Director",
        bio: "Filmmaker creating innovative content",
        previousWorks: ["Previous Work 1", "Previous Work 2"],
      },
      cast: ["TBD - Lead Actor", "TBD - Supporting Actress", "TBD - Antagonist"],
      crew: ["TBD - Cinematographer", "TBD - Sound Designer", "TBD - Editor"],
    },
    openRoles: [
      { title: "Lead Actor", budget: "$15,000", deadline: "7/22/2026" },
      { title: "Supporting Actress", budget: "$20,000", deadline: "7/29/2026" },
      { title: "Antagonist", budget: "$25,000", deadline: "8/5/2026" },
    ],
    financials: {
      budget: [
        { label: "Production", value: "$175,000" },
        { label: "Marketing", value: "$50,000" },
        { label: "Distribution", value: "$25,000" },
      ],
      totalBudget: "$250,000",
      projections: [
        { label: "Projected Revenue", value: "$500,000", green: false },
        { label: "Target ROI", value: "25%", green: true },
        { label: "Break-even", value: "Month 12", green: false },
        { label: "Payback Period", value: "18 months", green: false },
      ],
    },
    documents: [
      { label: "PITCH DECK", icon: "download" },
      { label: "TRAILER PREVIEW", icon: "play" },
      { label: "BUSINESS PLAN", icon: "download" },
    ],
    coverLetter:
      "I have 8 years of experience shooting thriller and noir genres. My work on 'Shadow Falls' and 'Dark Intervals' demonstrates my ability to create moody, tension-filled visuals that serve the story. I am proficient with RED cameras and ARRI Alexa systems.",
    rate: "$650/day",
    availability: "Available from February 1st",
  },
  2: {
    project: "Urban Shadows",
    role: "Cinematographer",
    director: "James Holloway",
    appliedDate: "January 10, 2025",
    status: "Hired",
    statusBg: "bg-green-600",
    shortDescription: "Three lives intersect in the heart of the city.",
    synopsis:
      "An intimate portrait of life in the city, following three interconnected stories of people struggling to find their place in the urban jungle. A taxi driver, a street artist, and a corporate lawyer discover that their paths cross in unexpected ways.",
    images: [
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1800&q=80",
    ],
    rating: 4.9,
    stage: "Pre-Production",
    genre: "Drama",
    location: "New York, NY",
    timeline: "6 months",
    raised: 180000,
    goal: 180000,
    fundingProgress: 100,
    investors: 8,
    views: 892,
    targetROI: "22%",
    remaining: 0,
    team: {
      filmmaker: {
        name: "Sarah Williams",
        bio: "Filmmaker creating innovative content",
        previousWorks: ["Previous Work 1", "Previous Work 2"],
      },
      cast: ["TBD - Lead Male", "TBD - Lead Female", "TBD - Supporting Cast"],
      crew: ["TBD - Director of Photography", "TBD - Production Designer"],
    },
    openRoles: [
      { title: "Lead Actor", budget: "$22,000", deadline: "8/12/2026" },
      { title: "Lead Actress", budget: "$22,000", deadline: "8/12/2026" },
      { title: "Supporting Role", budget: "$10,000", deadline: "8/20/2026" },
    ],
    financials: {
      budget: [
        { label: "Production", value: "$120,000" },
        { label: "Marketing", value: "$35,000" },
        { label: "Distribution", value: "$25,000" },
      ],
      totalBudget: "$180,000",
      projections: [
        { label: "Projected Revenue", value: "$396,000", green: false },
        { label: "Target ROI", value: "22%", green: true },
        { label: "Break-even", value: "Month 10", green: false },
        { label: "Payback Period", value: "16 months", green: false },
      ],
    },
    documents: [
      { label: "PITCH DECK", icon: "download" },
      { label: "TRAILER PREVIEW", icon: "play" },
      { label: "BUSINESS PLAN", icon: "download" },
    ],
    coverLetter:
      "My eye for authentic urban cinematography makes me the right fit for Urban Shadows. I have shot several independent dramas in New York and understand how to capture the raw energy of city life.",
    rate: "$700/day",
    availability: "Available immediately",
  },
  3: {
    project: "Neon Nights",
    role: "Camera Operator",
    director: "Mike Chen",
    appliedDate: "January 20, 2025",
    status: "Under Review",
    statusBg: "bg-yellow-600",
    shortDescription: "A memory thief uncovers a conspiracy in a neon-lit dystopia.",
    synopsis:
      "In a dystopian future where memories can be bought and sold, a memory thief discovers a set of memories that reveal a conspiracy threatening the entire city. Racing against time, they must decide whether to profit from this knowledge or risk everything to expose the truth.",
    images: [
      "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1800&q=80",
    ],
    rating: 4.7,
    stage: "Funding",
    genre: "Sci-Fi",
    location: "Vancouver, BC",
    timeline: "12 months",
    raised: 125000,
    goal: 500000,
    fundingProgress: 25,
    investors: 15,
    views: 2341,
    targetROI: "30%",
    remaining: 375000,
    team: {
      filmmaker: {
        name: "Mike Chen",
        bio: "Filmmaker creating innovative content",
        previousWorks: ["Previous Work 1", "Previous Work 2"],
      },
      cast: ["TBD - Lead Actor", "TBD - Antagonist", "TBD - Tech Specialist"],
      crew: ["TBD - VFX Supervisor", "TBD - Production Designer", "TBD - Cinematographer"],
    },
    openRoles: [
      { title: "Lead Actor", budget: "$15,000", deadline: "7/22/2026" },
      { title: "Antagonist", budget: "$20,000", deadline: "7/29/2026" },
      { title: "Tech Specialist", budget: "$25,000", deadline: "8/5/2026" },
    ],
    financials: {
      budget: [
        { label: "Production", value: "$300,000" },
        { label: "Marketing", value: "$120,000" },
        { label: "Distribution", value: "$80,000" },
      ],
      totalBudget: "$500,000",
      projections: [
        { label: "Projected Revenue", value: "$1,500,000", green: false },
        { label: "Target ROI", value: "30%", green: true },
        { label: "Break-even", value: "Month 15", green: false },
        { label: "Payback Period", value: "24 months", green: false },
      ],
    },
    documents: [
      { label: "PITCH DECK", icon: "download" },
      { label: "TRAILER PREVIEW", icon: "play" },
      { label: "BUSINESS PLAN", icon: "download" },
    ],
    coverLetter:
      "I specialize in futuristic lighting and camera setups. My previous work on indie sci-fi films has prepared me well for the complex environment of Neon Nights.",
    rate: "$550/day",
    availability: "Available from February 15th",
  },
};

const TABS = ["Overview", "Financials", "Team", "Media", "Open Roles"];

function fmt(n) {
  return "$" + Number(n).toLocaleString();
}

export default function ApplicationDetailPage({ id }) {
  const [activeTab, setActiveTab] = useState("Overview");

  const data = APPLICATION_DETAILS[id] ?? APPLICATION_DETAILS[1];

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Top Navbar (separate component) ─────────────────────────────────── */}
      <ApplicationDetailNavbar />

      {/* ── Two-Column Main Layout ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 max-w-[1400px] mx-auto px-4 sm:px-8 py-6 sm:py-8 items-start">

        {/* ─── LEFT COLUMN ─────────────────────────────────────────────────── */}
        <div className="space-y-6 min-w-0">

          {/* Hero Images — full width if 1 image, split if 2 */}
          {data.images.length === 1 ? (
            <div className="relative h-[200px] sm:h-[280px] lg:h-[340px] rounded-2xl overflow-hidden">
              <img
                src={data.images[0]}
                alt={`${data.project} still`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-1.5 h-[200px] sm:h-[280px] lg:h-[340px] rounded-2xl overflow-hidden">
              {data.images.map((src, i) => (
                <div key={i} className="relative overflow-hidden">
                  <img
                    src={src}
                    alt={`${data.project} still ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                </div>
              ))}
            </div>
          )}

          {/* Project Title & Meta */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                {data.project}
              </h1>
              <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wide">
                {data.stage}
              </span>
              <span className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                <Star size={13} className="fill-yellow-400" />
                {data.rating}
              </span>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed">
              {data.shortDescription}
            </p>

            <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-semibold flex-wrap">
              <span className="text-red-500 font-black">{data.genre}</span>
              <span className="text-zinc-700">•</span>
              <span className="flex items-center gap-1">
                <MapPin size={11} className="text-zinc-500" />
                {data.location}
              </span>
              <span className="text-zinc-700">•</span>
              <span className="flex items-center gap-1">
                <Clock size={11} className="text-zinc-500" />
                {data.timeline}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center bg-[#141414] border border-zinc-800/70 rounded-xl p-1 gap-0.5 overflow-x-auto">
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
              <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-4 sm:p-6">
                <h3 className="text-sm font-black text-white mb-3">Synopsis</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {data.synopsis}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Project Details */}
                <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-4 sm:p-6">
                  <h3 className="text-sm font-black text-white mb-4">
                    Project Details
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: "Genre", value: data.genre },
                      { label: "Location", value: data.location },
                      { label: "Timeline", value: data.timeline },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="flex items-center justify-between text-xs border-b border-zinc-800/40 pb-2.5"
                      >
                        <span className="text-zinc-500 font-semibold">
                          {label}
                        </span>
                        <span className="text-white font-semibold">{value}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between text-xs pt-0.5">
                      <span className="text-zinc-500 font-semibold">Stage</span>
                      <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                        {data.stage}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-4 sm:p-6">
                  <h3 className="text-sm font-black text-white mb-4">
                    Documents
                  </h3>
                  <div className="space-y-3">
                    {data.documents.map((doc) => (
                      <button
                        key={doc.label}
                        className="w-full flex items-center justify-center gap-2.5 border border-zinc-800 hover:border-red-700/50 hover:bg-red-950/10 text-red-500 text-[10px] font-black px-4 py-3 rounded-xl uppercase tracking-widest transition-all duration-200 cursor-pointer"
                      >
                        {doc.icon === "play" ? (
                          <Play
                             size={12}
                             className="flex-shrink-0 fill-red-500"
                          />
                        ) : (
                          <Download size={12} className="flex-shrink-0" />
                        )}
                        {doc.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Your Application */}
              <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-4 sm:p-6 space-y-5">
                <h3 className="text-sm font-black text-white">
                  Your Application
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Applied Date", value: data.appliedDate, highlight: false },
                    { label: "Director", value: data.director, highlight: false },
                    { label: "Your Rate", value: data.rate, highlight: true },
                    { label: "Availability", value: data.availability, highlight: false },
                  ].map(({ label, value, highlight }) => (
                    <div key={label}>
                      <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">
                        {label}
                      </p>
                      <p
                        className={`text-xs font-bold ${
                          highlight ? "text-red-400" : "text-white"
                        }`}
                      >
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-2">
                    Cover Letter
                  </p>
                  <p className="text-zinc-300 text-sm leading-relaxed bg-zinc-900/50 rounded-xl p-4 border border-zinc-800/50">
                    {data.coverLetter}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── Financials Tab ── */}
          {activeTab === "Financials" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Budget Breakdown */}
              <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-4 sm:p-6">
                <h3 className="text-sm font-black text-white mb-5">
                  Budget Breakdown
                </h3>
                <div className="space-y-0">
                  {data.financials.budget.map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between py-3 border-b border-zinc-800/40"
                    >
                      <span className="text-zinc-400 text-xs">{label}:</span>
                      <span className="text-white text-xs font-semibold">
                        {value}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-white text-xs font-black">
                      Total Budget:
                    </span>
                    <span className="text-white text-xs font-black">
                      {data.financials.totalBudget}
                    </span>
                  </div>
                </div>
              </div>

              {/* Projections */}
              <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-4 sm:p-6">
                <h3 className="text-sm font-black text-white mb-5">
                  Projections
                </h3>
                <div className="space-y-0">
                  {data.financials.projections.map(({ label, value, green }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between py-3 border-b border-zinc-800/40 last:border-b-0"
                    >
                      <span className="text-zinc-400 text-xs">{label}:</span>
                      <span
                        className={`text-xs font-semibold ${
                          green ? "text-green-400" : "text-white"
                        }`}
                      >
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Filmmaker card */}
              <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-4 sm:p-6 space-y-4">
                <h3 className="text-sm font-black text-white">Filmmaker</h3>
                <div className="space-y-2">
                  <p className="text-sm font-black text-white">{data.team.filmmaker.name}</p>
                  <p className="text-xs text-red-400">{data.team.filmmaker.bio}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-black text-white">Previous Works:</p>
                  <ul className="space-y-1.5">
                    {data.team.filmmaker.previousWorks.map((work) => (
                      <li key={work} className="flex items-center gap-2 text-xs text-zinc-400">
                        <span className="w-1 h-1 rounded-full bg-zinc-500 flex-shrink-0" />
                        {work}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Cast & Crew card */}
              <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-4 sm:p-6 space-y-5">
                <h3 className="text-sm font-black text-white">Cast &amp; Crew</h3>
                <div className="space-y-2">
                  <p className="text-xs font-black text-white">Cast:</p>
                  <ul className="space-y-1.5">
                    {data.team.cast.map((member) => (
                      <li key={member} className="text-xs text-red-400">{member}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-black text-white">Crew:</p>
                  <ul className="space-y-1.5">
                    {data.team.crew.map((member) => (
                      <li key={member} className="text-xs text-red-400">{member}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ── Open Roles Tab ── */}
          {activeTab === "Open Roles" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.openRoles.map((role) => (
                <div
                  key={role.title}
                  className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-5 flex flex-col gap-4"
                >
                  <h3 className="text-sm font-black text-white">{role.title}</h3>
                  <div className="space-y-2.5 flex-1">
                    <div className="flex items-center justify-between text-xs border-b border-zinc-800/40 pb-2.5">
                      <span className="text-zinc-400">Budget:</span>
                      <span className="text-white font-semibold">{role.budget}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Deadline:</span>
                      <span className="text-white font-semibold">{role.deadline}</span>
                    </div>
                  </div>
                  <button className="w-full bg-red-600 hover:bg-red-500 text-white text-[10px] font-black py-3 rounded-xl uppercase tracking-widest transition-all duration-200 shadow-[0_0_14px_rgba(220,38,38,0.35)] hover:shadow-[0_0_22px_rgba(220,38,38,0.55)] cursor-pointer">
                    APPLY FOR ROLE
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ── Media placeholder ── */}
          {activeTab === "Media" && (
            <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-8 sm:p-14 flex flex-col items-center justify-center text-center gap-3">
              <span className="text-4xl">🎬</span>
              <p className="text-zinc-400 text-sm font-semibold">Media — Coming Soon</p>
              <p className="text-zinc-600 text-xs max-w-xs">
                This section will be available once the project team provides additional information.
              </p>
            </div>
          )}
        </div>

        {/* ─── RIGHT SIDEBAR ──────────────────────────────────────── */}
        <div className="space-y-4 lg:sticky lg:top-24 w-full">
          {/* Project Information Card */}
          <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-5 space-y-5">
            <h3 className="text-sm font-black text-white">
              Project Information
            </h3>

            {/* Funding Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Funding Progress</span>
                <span className="text-white font-black">
                  {data.fundingProgress}%
                </span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-700 to-red-500 rounded-full"
                  style={{ width: `${data.fundingProgress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white font-bold">
                  {fmt(data.raised)} raised
                </span>
                <span className="text-zinc-500">{fmt(data.goal)} goal</span>
              </div>
            </div>

            {/* Stats 2×2 Grid */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Investors", value: data.investors },
                { label: "Views", value: data.views.toLocaleString() },
                { label: "Target ROI", value: data.targetROI },
                { label: "Remaining", value: fmt(data.remaining) },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-[#1a1a1a] border border-zinc-800/50 rounded-xl py-3 px-2 text-center"
                >
                  <p className="text-lg font-black text-white leading-none">
                    {value}
                  </p>
                  <p className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold mt-1.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2.5">
              <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white text-[11px] font-black py-3 rounded-xl uppercase tracking-widest transition-all duration-200 shadow-[0_0_18px_rgba(220,38,38,0.35)] hover:shadow-[0_0_28px_rgba(220,38,38,0.55)] cursor-pointer">
                <Users size={13} />
                View Open Roles
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-zinc-700 hover:border-red-700/50 text-white hover:text-red-400 text-[11px] font-black py-3 rounded-xl uppercase tracking-widest transition-all duration-200 cursor-pointer">
                <MessageSquare size={12} />
                Contact Filmmaker
              </button>
            </div>
          </div>

          {/* Director mini-card */}
          <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-5 space-y-3">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
              Director
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-900 to-zinc-800 flex items-center justify-center text-white text-sm font-black flex-shrink-0">
                {data.director.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-black text-white">{data.director}</p>
                <p className="text-[10px] text-zinc-500">Film Director</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
