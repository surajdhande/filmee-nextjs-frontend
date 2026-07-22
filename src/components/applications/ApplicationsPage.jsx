"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserCheck, Loader2, DollarSign, Calendar, TrendingUp, Film } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ApplicationsFilters from "./ApplicationsFilters";

const API = "http://127.0.0.1:5000/api/v1";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
}

function fmt(n) {
  return `$${Number(n).toLocaleString()}`;
}

function statusColor(status) {
  switch (status?.toUpperCase()) {
    case "COMPLETED": return "bg-green-500/15 text-green-400 border-green-500/30";
    case "PENDING":   return "bg-yellow-500/15 text-yellow-400 border-yellow-500/30";
    case "FAILED":    return "bg-red-500/15 text-red-400 border-red-500/30";
    default:          return "bg-zinc-700/40 text-zinc-300 border-zinc-600/30";
  }
}

function ApplicationCard({ investment }) {
  const date = investment.created_at
    ? new Date(investment.created_at).toLocaleDateString("en-IN", {
        day: "2-digit", month: "short", year: "numeric",
      })
    : "—";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#2A2A2A] bg-[#171717] px-6 py-5 hover:border-[#E50914]/30 transition-all duration-200">
      {/* Left */}
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E50914]/10">
          <DollarSign size={20} className="text-[#E50914]" />
        </div>
        <div>
          <p className="text-[15px] font-bold text-white">
            {investment.first_name} {investment.last_name}
          </p>
          <p className="text-xs text-zinc-500 mt-0.5">{investment.email}</p>
          <div className="flex items-center gap-2 mt-2">
            <Film size={11} className="text-zinc-500" />
            <span className="text-xs text-zinc-400">{investment.title ?? `Project #${investment.project_id}`}</span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-wrap items-center gap-4 sm:justify-end">
        <div className="text-right">
          <p className="text-[18px] font-extrabold text-white">{fmt(investment.investment_amount)}</p>
          <div className="flex items-center gap-1 text-xs text-zinc-500 mt-0.5 justify-end">
            <Calendar size={11} />
            <span>{date}</span>
          </div>
        </div>
        <span className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${statusColor(investment.investment_status)}`}>
          {investment.investment_status}
        </span>
      </div>
    </div>
  );
}

export default function ApplicationsPage() {
  const router = useRouter();
  const [user, setUser]         = useState(null);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token      = localStorage.getItem("token");
    if (!storedUser || !token) { router.push("/login"); return; }
    const parsed = JSON.parse(storedUser);
    setUser(parsed);
    loadInvestments();
  }, [router]);

  async function loadInvestments() {
    setLoading(true);
    setError("");
    try {
      const headers = getAuthHeaders();

      // 1. Get filmmaker's own projects
      const projRes = await fetch(`${API}/projects/myprojects`, { headers });
      const projData = await projRes.json();
      const projects = projData.projects ?? [];

      if (projects.length === 0) { setInvestments([]); return; }

      // 2. For each project fetch its investments in parallel
      const results = await Promise.all(
        projects.map((p) =>
          fetch(`${API}/investments/project/${p.project_id}`, { headers })
            .then((r) => r.json())
            .then((d) => (d.investors ?? []).map((inv) => ({ ...inv, projectTitle: p.title })))
            .catch(() => [])
        )
      );

      // Flatten and sort newest first
      const all = results.flat().sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setInvestments(all);
    } catch (err) {
      setError("Failed to load investment applications. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const totalRaised = investments.reduce(
    (sum, inv) => sum + parseFloat(inv.investment_amount ?? 0), 0
  );

  return (
    <DashboardLayout
      header={
        <DashboardHeader
          username={`${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim() || "Filmmaker"}
          showOverviewTitle={false}
          showAnalyticsButton={false}
          showCreateButton={false}
        />
      }
    >
      <div className="mx-auto max-w-[1080px] px-8 py-6">

        {/* ── Header ── */}
        <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-[28px] font-bold text-white">Investor Applications</h1>
            <p className="mt-2 text-gray-400">Review offers, negotiate terms, and reach agreements</p>
          </div>
          <div className="flex items-center gap-3">
            {!loading && (
              <div className="flex items-center gap-2 rounded-full border border-[#E50914]/30 bg-[#E50914]/10 px-4 py-1.5">
                <TrendingUp size={13} className="text-[#E50914]" />
                <span className="text-sm font-bold text-[#E50914]">{fmt(totalRaised)} raised</span>
              </div>
            )}
            <div className="rounded-full border border-[#E50914] px-4 py-1 text-sm font-semibold text-[#E50914]">
              {loading ? "…" : investments.length} total
            </div>
          </div>
        </div>

        <ApplicationsFilters />

        {/* ── Body ── */}
        <div className="mt-8 space-y-4">
          {loading ? (
            <div className="flex h-[290px] flex-col items-center justify-center gap-4 rounded-3xl border border-[#2A2A2A] bg-[#171717]">
              <Loader2 size={36} className="animate-spin text-[#E50914]" />
              <p className="text-zinc-400 text-sm">Loading applications…</p>
            </div>
          ) : error ? (
            <div className="flex h-[290px] flex-col items-center justify-center rounded-3xl border border-red-800/40 bg-[#171717]">
              <p className="text-red-400 text-sm">{error}</p>
              <button
                onClick={loadInvestments}
                className="mt-4 rounded-full border border-[#E50914] px-5 py-2 text-xs font-bold uppercase text-[#E50914] hover:bg-[#E50914]/10 transition"
              >
                Retry
              </button>
            </div>
          ) : investments.length === 0 ? (
            <div className="flex h-[290px] flex-col items-center justify-center rounded-3xl border border-[#2A2A2A] bg-[#171717]">
              <UserCheck size={64} className="mb-6 text-gray-500" />
              <h2 className="text-3xl font-bold text-white">No Applications Found</h2>
              <p className="mt-2 text-gray-400">No investor applications yet.</p>
            </div>
          ) : (
            investments.map((inv) => (
              <ApplicationCard key={inv.investment_id} investment={inv} />
            ))
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}