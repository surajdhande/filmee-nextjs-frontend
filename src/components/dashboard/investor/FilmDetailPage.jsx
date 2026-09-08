"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProjectDetail } from "@/services/projectService";
import { createInvestment } from "@/services/investorService";
import { sendMessage } from "@/services/messageService";
import EscrowPaymentFlow from "./EscrowPaymentFlow";

import {
  ArrowLeft,
  Share2,
  Bookmark,
  Star,
  MapPin,
  Calendar,
  TrendingUp,
  Users,
  Eye,
  DollarSign,
  Download,
  Play,
  Award,
  MessageSquare,
  Crown,
  X,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

// ─────────────────────────────────────────────
// Helper: map raw API project → UI film shape
// ─────────────────────────────────────────────
function mapProjectToFilm(p) {
  const target = parseFloat(p.funding_target) || 0;
  const raised = parseFloat(p.funding_raised) || 0;
  const progress = target > 0 ? Math.round((raised / target) * 100) : 0;
  const remaining = target - raised;

  const directorName =
    [p.filmmaker_first_name, p.filmmaker_last_name].filter(Boolean).join(" ") || "—";

  const heroImage =
    p.lookbook_url ||
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80";

  // Build documents list from known URL fields
  const documents = [];
  if (p.pitch_deck_url) documents.push({ label: "Pitch Deck", type: "download", url: p.pitch_deck_url });
  if (p.lookbook_url) documents.push({ label: "Lookbook", type: "download", url: p.lookbook_url });
  if (documents.length === 0) documents.push({ label: "No documents uploaded", type: "download" });

  return {
    id: p.project_id,
    filmmakerId: p.filmmaker_id,
    title: p.title,
    tagline: p.logline || "",
    genre: p.genre || "—",
    location: p.primary_location || "—",
    timeline: p.production_timeline || "—",
    stage: p.project_status?.replace(/_/g, " ") ?? "—",
    status: p.project_status?.replace(/_/g, " ") ?? "—",
    rating: null,

    // filmmaker identity — used by "Contact Filmmaker" button
    teamFilmakerId: p.filmmaker_id ?? null,

    images: [heroImage],

    fundingProgress: progress,
    raised,
    goal: target,
    investors: p.investor_count ?? 0,
    views: 0,
    targetRoi: p.expected_roi_percentage ? `${p.expected_roi_percentage}%` : "N/A",
    remaining,

    synopsis: p.synopsis || "No synopsis provided.",
    projectDetails: {
      genre: p.genre || "—",
      location: p.primary_location || "—",
      timeline: p.production_timeline || "—",
      stage: p.project_status?.replace(/_/g, " ") ?? "—",
    },
    documents,

    financials: {
      totalBudget: fmt(target),
      productionCost: "—",
      marketingBudget: "—",
      contingency: "—",
      postProduction: "—",
      revenueProjection: "—",
      breakEven: "—",
      projectedRoi: p.expected_roi_percentage ? `${p.expected_roi_percentage}%` : "N/A",
      distributionRevenue: "—",
      streamingDeals: "—",
      internationalSales: "—",
      _fundingBreakdown: p.funding_goals_breakdown || null,
      _distributionStrategy: p.distribution_strategy || null,
    },

    team: [
      {
        name: directorName,
        role: "Filmmaker",
        bio: p.filmmaker_email || "",
        avatar: `https://i.pravatar.cc/80?u=${p.filmmaker_id}`,
      },
    ],

    media: [
      {
        type: "image",
        src: heroImage,
        caption: p.title,
      },
    ],
  };
}


function fmt(n) {
  return `$${Number(n).toLocaleString()}`;
}

const TABS = ["Overview", "Financials", "Team", "Media"];

// ── Tab components ────────────────────────────────────────────────────────────

function OverviewTab({ film }) {
  return (
    <div className="space-y-6 ">
      <div className="bg-[#141414] border border-[#222] rounded-2xl p-6">
        <h3 className="text-[13px] pb-2 font-bold text-zinc-400 uppercase tracking-wider mb-3">Synopsis</h3>
        <p className="text-zinc-400 leading-relaxed text-[15px]">{film.synopsis}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-[#141414] border border-[#222] rounded-2xl p-6 space-y-3">
          <h3 className="text-[13px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Project Details</h3>
          {Object.entries(film.projectDetails).map(([key, val]) => (
            <div key={key} className="flex items-center justify-between border-b border-zinc-800/50 pb-3">
              <span className="text-zinc-500 capitalize text-sm">{key}:</span>
              {key === "stage" ? (
                <span className="bg-[#E50914] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {val}
                </span>
              ) : (
                <span className="text-zinc-200 text-sm font-semibold">{val}</span>
              )}
            </div>
          ))}
        </div>

        <div className="bg-[#141414] border border-[#222] rounded-2xl p-6 space-y-3">
          <h3 className="text-[13px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Documents</h3>
          {film.documents.map((doc, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 border border-[#E50914]/30 rounded-xl px-4 py-3 text-[13px] font-bold uppercase tracking-wider text-[#E50914] hover:bg-[#E50914]/10 transition-all duration-200"
            >
              {doc.type === "play" ? <Play size={14} /> : <Download size={14} />}
              {doc.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FinancialsTab({ film }) {
  const f = film.financials;
  const budgetItems = [
    { label: "Production Cost", value: f.productionCost },
    { label: "Marketing Budget", value: f.marketingBudget },
    { label: "Post Production", value: f.postProduction },
    { label: "Contingency", value: f.contingency },
  ];
  const revenueItems = [
    { label: "Distribution Revenue", value: f.distributionRevenue },
    { label: "Streaming Deals", value: f.streamingDeals },
    { label: "International Sales", value: f.internationalSales },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Budget", value: f.totalBudget, icon: <DollarSign size={18} />, color: "text-blue-400 bg-blue-500/10" },
          { label: "Revenue Proj.", value: f.revenueProjection, icon: <TrendingUp size={18} />, color: "text-green-400 bg-green-500/10" },
          { label: "Break Even", value: f.breakEven, icon: <Award size={18} />, color: "text-yellow-400 bg-yellow-500/10" },
          { label: "Projected ROI", value: f.projectedRoi, icon: <Star size={18} />, color: "text-[#E50914] bg-[#E50914]/10" },
        ].map((m) => (
          <div key={m.label} className="bg-[#141414] border border-[#222] rounded-2xl p-5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${m.color}`}>{m.icon}</div>
            <p className="text-[11px] uppercase tracking-wider text-zinc-500 mb-1">{m.label}</p>
            <p className="text-[18px] font-extrabold text-white">{m.value}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-[#141414] border border-[#222] rounded-2xl p-6">
          <h3 className="text-[13px] font-bold text-zinc-400 uppercase tracking-wider mb-4">Budget Breakdown</h3>
          <div className="space-y-3">
            {budgetItems.map((item) => (
              <div key={item.label} className="flex justify-between items-center border-b border-zinc-800/40 pb-3">
                <span className="text-zinc-400 text-sm">{item.label}</span>
                <span className="text-white font-semibold text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#141414] border border-[#222] rounded-2xl p-6">
          <h3 className="text-[13px] font-bold text-zinc-400 uppercase tracking-wider mb-4">Revenue Projections</h3>
          <div className="space-y-3">
            {revenueItems.map((item) => (
              <div key={item.label} className="flex justify-between items-center border-b border-zinc-800/40 pb-3">
                <span className="text-zinc-400 text-sm">{item.label}</span>
                <span className="text-green-400 font-semibold text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamTab({ film }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {film.team.map((member, i) => (
        <div
          key={i}
          className="bg-[#141414] border border-[#222] rounded-2xl p-5 flex flex-col items-center text-center hover:border-[#E50914]/30 hover:shadow-[0_4px_24px_rgba(229,9,20,0.08)] transition-all duration-300"
        >
          <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#E50914]/40 mb-3" />
          <h4 className="text-[15px] font-bold text-white">{member.name}</h4>
          <span className="text-[11px] uppercase tracking-wider text-[#E50914] font-semibold mt-1 mb-2">{member.role}</span>
          <p className="text-zinc-500 text-xs leading-relaxed">{member.bio}</p>
        </div>
      ))}
    </div>
  );
}

function MediaTab({ film }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {film.media.map((item, i) => (
        <div
          key={i}
          className="relative group rounded-2xl overflow-hidden border border-[#222] hover:border-[#E50914]/40 transition-all duration-300 cursor-pointer"
          style={{ aspectRatio: "16/10" }}
        >
          <img
            src={item.src}
            alt={item.caption}
            className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
          />
          {item.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#E50914]/80 flex items-center justify-center">
                <Play size={20} fill="white" className="text-white ml-0.5" />
              </div>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <p className="text-white text-xs font-semibold">{item.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Apply to Invest Modal ─────────────────────────────────────────────────────
function ApplyToInvestModal({ film, onClose, onSuccess }) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const maxAmount = film.remaining;
  const charLimit = 500;

  const [investing, setInvesting] = useState(false);
  const [investError, setInvestError] = useState("");

 async function handleSubmit(e) {
  e.preventDefault();
  setInvesting(true);
  setInvestError("");

  try {
    await createInvestment(film.id, parseFloat(amount));

    if (onSuccess) {
      onSuccess(parseFloat(amount));
    }
  } catch (err) {
    const msg =
      err?.response?.data?.message ||
      "Failed to submit investment. Please try again.";

    setInvestError(msg);
  } finally {
    setInvesting(false);
  }
}
  // Trap click on backdrop
  function handleBackdrop(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 "
      onClick={handleBackdrop}
    >
      <div className="relative w-full max-w-[480px] max-h-[700px] bg-[#111] border border-[#2a2a2a] rounded-3xl p-7 shadow-2xl animate-fadeIn">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        
          <>
            {/* Header */}
            <h2 className="text-xl font-bold text-white mb-1">Apply to Invest</h2>
            <p className="text-zinc-400 text-sm mb-5">
              Submit your investment application for{" "}
              <span className="text-white font-semibold">"{film.title}"</span>
            </p>

            {/* Project summary */}
            <div className="bg-[#1A1A1A] border border-[#2a2a2a] rounded-2xl p-4 mb-5 space-y-2">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#222] text-white text-[11px] font-bold px-3 py-1 rounded-full">{film.genre}</span>
                <span className="bg-[#E50914] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase">
                  {film.status}
                </span>
              </div>

              {[
                { label: "Total Budget:", value: fmt(film.goal), color: "text-white" },
                { label: "Raised:", value: fmt(film.raised), color: "text-white" },
                { label: "Remaining:", value: fmt(film.remaining), color: "text-[#E50914]" },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-zinc-400">{label}</span>
                  <span className={`font-semibold ${color}`}>{value}</span>
                </div>
              ))}

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-xs text-zinc-500 mb-1 mt-1">
                  <span>Funding Progress</span>
                  <span>{film.fundingProgress}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#E50914] to-[#FF4444] rounded-full"
                    style={{ width: `${film.fundingProgress}%` }}
                  />
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Investment Amount */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-bold text-white mb-2">
                  <DollarSign size={14} className="text-[#E50914]" />
                  Investment Amount
                </label>
                <input
                  type="number"
                  min={1}
                  max={maxAmount}
                  placeholder="50,000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="w-full bg-[#0D0D0D] border border-[#E50914]/60 focus:border-[#E50914] outline-none rounded-xl px-4 py-3 text-white text-base placeholder-zinc-600 transition-colors"
                />
                <p className="text-xs text-zinc-500 mt-1">Maximum: {fmt(maxAmount)}</p>
              </div>

              {/* Interest message */}
              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Why are you interested in this project?
                </label>
                <textarea
                  rows={4}
                  maxLength={charLimit}
                  placeholder="Tell the filmmaker why you want to invest in their project..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full bg-[#0D0D0D] border border-[#2a2a2a] focus:border-[#E50914]/60 outline-none rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 resize-none transition-colors"
                />
                <div className="flex justify-between text-xs text-zinc-500 mt-1">
                  <span>Be specific about your investment goals and experience</span>
                  <span>{message.length}/{charLimit}</span>
                </div>
              </div>

              {/* Escrow notice */}
              <div className="flex items-start gap-3 bg-[#1A0A0A] border border-[#E50914]/25 rounded-2xl p-4">
                <ShieldCheck size={18} className="text-[#E50914] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-white mb-1">Protected by Escrow</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    After filmmaker approval, you'll make a secure escrow payment. Funds are only released when you
                    approve completed project milestones.
                  </p>
                </div>
              </div>

              {/* Invest error */}
              {investError && (
                <p className="text-red-400 text-xs text-center -mt-2">{investError}</p>
              )}

                            {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 border border-red-700 text-[#E50914] font-bold uppercase tracking-wider text-sm py-3 rounded-full hover:bg-zinc-800 transition-all duration-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={investing}
                  className="flex-1 bg-gradient-to-r from-[#E50914] to-[#B3070F] text-white font-bold uppercase tracking-wider text-sm py-3 rounded-full shadow-[0_4px_20px_rgba(229,9,20,0.35)] hover:brightness-110 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {investing ? "Submitting…" : "Submit Application"}
                </button>
              </div>
            </form>
          </>
      </div>
    </div>
  );
}

// ── Investment Panel (right column) ──────────────────────────────────────────
function InvestmentPanel({ film, hasApplied }) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [escrowOpen, setEscrowOpen] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState("");

  function handleContactFilmaker() {
    const params = new URLSearchParams({
      filmerId: film.teamFilmakerId ?? "",
      filmerName: film.team?.[0]?.name ?? "Filmmaker",
      projectId: film.id ?? "",
      projectTitle: film.title ?? "",
    });
    router.push(`/dashboard/investor/messages?${params.toString()}`);
  }

  function handleModalClose() {
    setModalOpen(false);
  }

  function handleInvestmentSuccess(amount) {
    setInvestmentAmount(amount);
    setModalOpen(false);
    setEscrowOpen(true);
  }

  return (
    <>
      <div className="w-[400px] bg-[#121212] border border-[#222] rounded-3xl p-6 space-y-5">
        <h3 className="text-[16px] font-bold text-white">Investment Opportunity</h3>

        {/* Funding Progress */}
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-zinc-500 font-semibold uppercase tracking-wider">Funding Progress</span>
            <span className="text-white font-bold">{film.fundingProgress}%</span>
          </div>
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#E50914] to-[#FF4444] "
              style={{ width: `${film.fundingProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs mt-2">
            <span className="text-zinc-300 font-semibold">{fmt(film.raised)} raised</span>
            <span className="text-zinc-500">{fmt(film.goal)} goal</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Investors", value: film.investors },
            { label: "Views", value: film.views.toLocaleString()},
            { label: "Target ROI", value: film.targetRoi},
            { label: "Remaining", value: fmt(film.remaining)},
          ].map((s) => (
            <div key={s.label} className="bg-[#1A1A1A] rounded-xl p-3 text-center">
              <div className="flex justify-center mb-1">{s.icon}</div>
              <p className="text-[16px] font-extrabold text-white">{s.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        {!hasApplied ? (
          <button
            onClick={() => setModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#E50914] to-[#B3070F] text-white font-bold uppercase tracking-wider text-sm py-3.5 rounded-full shadow-[0_4px_20px_rgba(229,9,20,0.35)] hover:brightness-110 transition-all duration-200"
          >
            <TrendingUp size={16} />
            Apply to Invest
          </button>
        ) : (
          <div className="w-full flex items-center justify-center gap-2 bg-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-sm py-3.5 rounded-full cursor-not-allowed">
            <ShieldCheck size={16} />
            Application Submitted
          </div>
        )}
        <button
          onClick={handleContactFilmaker}
          className="w-full flex items-center justify-center gap-2 border border-red-600 text-red-600 text-sm uppercase tracking-wider py-3 rounded-full hover:bg-[#E50914]/10 transition duration-200"
        >
          <MessageSquare size={14} />
          Contact Filmmaker
        </button>
      </div>

      {modalOpen && (
        <ApplyToInvestModal
          film={film}
          onClose={handleModalClose}
          onSuccess={handleInvestmentSuccess}
        />
      )}
      {escrowOpen && (
      <EscrowPaymentFlow
        film={film}
        investmentAmount={investmentAmount}
        onClose={() => setEscrowOpen(false)}
      />
    )}
    </>
  );
}


// ── Main Component ────────────────────────────────────────────────────────────
// Props:
//   filmId       — dynamic ID from URL (e.g. params.id)
//   film         — optional pre-fetched data (pass from server component to skip client fetch)
//
// Backend Integration:
//   Find the useEffect below and replace the mock with:
//     const res = await fetch(`http://127.0.0.1:5000/films/${filmId}`);
//     const data = await res.json();
//     setFilm(data);
// ─────────────────────────────────────────────────────────────────────────────
export default function FilmDetailPage({ filmId, film: initialFilm }) {
  const router = useRouter();
  const [film, setFilm] = useState(initialFilm || null);
  const [loading, setLoading] = useState(!initialFilm);
  const [activeTab, setActiveTab] = useState("Overview");
  const [heroIdx, setHeroIdx] = useState(0);
  const [user, setUser] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : { full_name: "Investor" });
  }, []);

  // ── Data Fetch — real API call ──
  useEffect(() => {
    if (initialFilm) return;
    async function loadFilm() {
      setLoading(true);
      try {
        const raw = await getProjectDetail(filmId);
        setFilm(mapProjectToFilm(raw));
        
        // Check if user already applied to this project
        await checkIfUserApplied();
      } catch (err) {
        console.error("Failed to load film:", err);
        setFilm(null);
      } finally {
        setLoading(false);
      }
    }
    loadFilm();
  }, [filmId, initialFilm]);

  // Check if the current user has already applied to this project
  async function checkIfUserApplied() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      const response = await fetch(
        "http://127.0.0.1:5000/api/v1/investments/my-investments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        const userInvestments = data.projects || [];
        const applied = userInvestments.some(
          (inv) => String(inv.project_id) === String(filmId)
        );
        setHasApplied(applied);
      }
    } catch (err) {
      console.error("Failed to check application status:", err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  const profileName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.full_name || user.name || "Investor"
    : "Investor";

  if (loading || !film) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0B0B]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#E50914] border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-500 text-sm">Loading film details…</p>
        </div>
      </div>
    );
  }

  const currentImage = film.images?.[heroIdx] ?? film.images?.[0];

  return (
    /*
     * Standalone layout — no DashboardLayout, no sidebar.
     * The page is a single flex column: navbar + scrollable body.
     * `overflow-y-auto` lives on the body div so `sticky` on the
     * investment panel is anchored to this scroll container.
     */
    <div className="flex flex-col h-screen bg-[#0B0B0B] text-white">

      {/* ── Navbar ── */}
      <header className="shrink-0 w-full border-b border-[#262626] bg-[#0E0E0E]">
        <div className="flex items-center justify-between px-6 py-4 gap-2">
          {/* Left */}
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Filmee Logo" width={36} height={36} className="rounded-lg object-contain" />
            <div>
              <h1 className="text-[18px] font-bold leading-none text-white tracking-tight">Investor Dashboard</h1>
              <p className="mt-1.5 text-xs text-zinc-400">
                Welcome back, <span className="font-semibold text-zinc-300">{profileName}</span>
              </p>
            </div>
          </div>
          {/* Right */}
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-1.5 rounded-full border border-[#E50914]/50 px-4 py-1.5 hover:bg-[#E50914]/10 transition-all duration-300">
              <Crown size={13} className="text-[#E50914]" />
              <span className="text-[15px] font-bold uppercase tracking-wider text-[#E50914]">Professional</span>
            </button>
            <button
              onClick={handleLogout}
              className="text-s font-semibold text-zinc-400 hover:text-white transition duration-300 uppercase px-2"
            >
              LOGOUT
            </button>

          </div>
        </div>
      </header>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-7 space-y-6">

          {/* Back + Share/Save */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-200 text-sm font-semibold uppercase tracking-wider"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </button>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 border border-zinc-700 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:bg-zinc-800 transition duration-200">
                <Share2 size={13} /> Share
              </button>
              <button className="flex items-center gap-2 border border-zinc-700 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:bg-zinc-800 transition duration-200">
                <Bookmark size={13} /> Save
              </button>
            </div>
          </div>

          {/* ── Two-column layout: image + panel side by side, then tabs below ── */}
          <div className="flex gap-7 items-start">

            {/* ── Left column ── */}
            <div className="flex-1 min-w-0 space-y-5">

              {/* Hero Image + Investment Panel in one row */}
              <div className="flex gap-6 items-start">
                {/* Hero Image */}
                <div
                  className="relative flex-1 min-w-0 rounded-3xl overflow-hidden bg-zinc-900"
                  style={{ aspectRatio: "16/9" }}
                >
                  <img src={currentImage} alt={film.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {film.images.length > 1 && (
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {film.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setHeroIdx(idx)}
                          className={`w-16 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            heroIdx === idx ? "border-[#E50914]" : "border-transparent opacity-60"
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Investment Panel — sits beside the image */}
                <div className="hidden lg:block w-[420px] shrink-0">
                  <InvestmentPanel
                    film={film}
                    hasApplied={hasApplied}
                  />
                </div>
              </div>

              {/* Film title & meta */}
              <div>
                <div className="flex items-center gap-130 mb-2 flex-wrap">
                  <h2 className="text-[26px] font-extrabold text-white tracking-tight">{film.title}</h2>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="bg-[#E50914] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {film.status}
                    </span>
                    {film.rating && (
                    <div className="flex items-center gap-1 text-white-400 text-sm font-bold">
                      <Star size={14} fill="yellow" border="yellow" />
                      {film.rating}
                    </div>
                    )}
                  </div>
                </div>
                <p className="text-zinc-400 text-[15px] mb-3">{film.tagline}</p>
                <div className="flex items-center gap-4 text-zinc-500 text-sm flex-wrap">
                  <span className="font-semibold text-zinc-400">{film.genre}</span>
                  <span className="flex items-center gap-1">•<MapPin size={13} /> {film.location}</span>
                  <span className="flex items-center gap-1">•<Calendar size={13} />{film.timeline}</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="inline-flex items-center gap-1 bg-zinc-825 border border-[#2a2a2a] rounded-full p-1">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-zinc-900 text-white border border-[#3a3a3a] shadow-sm"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="pb-10">
                {activeTab === "Overview" && <OverviewTab film={film} />}
                {activeTab === "Financials" && <FinancialsTab film={film} />}
                {activeTab === "Team" && <TeamTab film={film} />}
                {activeTab === "Media" && <MediaTab film={film} />}
              </div>
            </div>
          </div>

          {/* Mobile: investment panel below hero */}
          <div className="lg:hidden pb-8">
            <InvestmentPanel
              film={film}
              hasApplied={hasApplied}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
