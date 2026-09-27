"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Eye,
  DollarSign,
  Users,
  Film,
  TrendingUp,
  Clock,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ComposedChart,
} from "recharts";

import { getInvestorAnalytics } from "@/services/dashboardService";

const TABS = ["Performance", "Projects"];

const POLL_MS = 15000;

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-3 shadow-xl">
        {label && <p className="text-zinc-400 text-xs mb-1">{label}</p>}
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-bold text-white">
            {entry.name || "Value"}: <span style={{ color: entry.color || "#E50914" }}>
              {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};



// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function AdvancedAnalytics() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "Performance";

  const [activeTab, setActiveTab] = useState(
    TABS.includes(initialTab) ? initialTab : "Performance"
  );
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState({});
  const [performanceData, setPerformanceData] = useState([]);
  const [projectRows, setProjectRows] = useState([]);
  const [activityFeed, setActivityFeed] = useState([]);

  const loadAnalytics = React.useCallback(() => {
    return getInvestorAnalytics()
      .then((data) => {
        setSummary(data.summary || {});
        setPerformanceData(
          (data.performance_data || []).map((row) => ({
            month: row.month,
            invested: row.invested,
            views: row.invested,
          }))
        );
        setProjectRows(data.project_rows || []);
        setActivityFeed(data.activity_feed || []);
      })
      .catch(() => {
        setSummary({});
        setPerformanceData([]);
        setProjectRows([]);
        setActivityFeed([]);
      });
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    setUser(stored ? JSON.parse(stored) : { full_name: "Investor" });
    loadAnalytics();
  }, [loadAnalytics]);

  useEffect(() => {
    const interval = setInterval(loadAnalytics, POLL_MS);
    const onFocus = () => loadAnalytics();
    window.addEventListener("focus", onFocus);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, [loadAnalytics]);



  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0B0B] text-white">
        Loading...
      </div>
    );
  }

  // ── HEADER ──────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <button
          onClick={() => router.push("/dashboard/investor")}
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white hover:text-red-500 transition-colors self-start sm:self-auto"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="h-8 w-px bg-[#2A2A2A] hidden sm:block" />
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Advanced Analytics</h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">Real-time insights and performance metrics.</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:gap-4">


        <select className="flex-1 sm:flex-none rounded-full border border-[#2A2A2A] bg-[#141414] px-4 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white outline-none cursor-pointer hover:bg-[#1E1E1E] transition-colors">
          <option className="bg-[#141414] text-white">Last 30 days</option>
          <option className="bg-[#141414] text-white">Last 7 days</option>
          <option className="bg-[#141414] text-white">Last 90 days</option>
        </select>

        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-full border border-[#2A2A2A] px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:bg-[#1E1E1E] transition-colors">
          <Filter size={16} />
          <span>Filter</span>
        </button>

        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:bg-red-700 transition-colors">
          <Download size={16} />
          <span>Export</span>
        </button>
      </div>
    </div>
  );

  // ── SUMMARY CARDS ───────────────────────────────────────────────────────────
  const renderSummaryCards = () => {
    const cards = [
      { key: "total_invested", icon: DollarSign, label: "Total Invested", data: summary.total_invested, color: "text-[#18C964]", bg: "bg-[#18C964]/10", tab: "Performance" },
      { key: "portfolio_views", icon: Eye, label: "Portfolio Views", data: summary.portfolio_views, color: "text-blue-500", bg: "bg-blue-500/10", tab: "Performance" },
      { key: "active_projects", icon: Film, label: "Active Projects", data: summary.active_projects, color: "text-red-500", bg: "bg-red-500/10", tab: "Projects" },
      { key: "pending_offers", icon: Users, label: "Pending Offers", data: summary.pending_offers, color: "text-purple-500", bg: "bg-purple-500/10", tab: "Projects" },
      { key: "average_roi", icon: TrendingUp, label: "Avg ROI", data: summary.average_roi, color: "text-[#F5A524]", bg: "bg-[#F5A524]/10", tab: "Performance" },
      { key: "engagement_rate", icon: Clock, label: "Engagement", data: summary.engagement_rate, color: "text-pink-500", bg: "bg-pink-500/10", tab: "Performance" },
    ].filter((c) => c.data && c.data.value !== undefined);

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <button
              key={c.key}
              onClick={() => setActiveTab(c.tab)}
              className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-5 flex flex-col justify-between hover:border-red-600/50 transition-all text-left w-full cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{c.label}</p>
                <div className={`p-2 rounded-full ${c.bg}`}>
                  <Icon size={16} className={c.color} />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-1.5 tracking-tight group-hover:text-red-500 transition-colors">
                  {c.data.value}
                </p>
                {c.data.delta ? (
                  <div className="flex items-center gap-1.5">
                    {c.data.positive ? (
                      <TrendingUp size={14} className="text-[#18C964]" />
                    ) : (
                      <ArrowDownRight size={14} className="text-red-500" />
                    )}
                    <span className={`text-xs font-bold tracking-wider ${c.data.positive ? "text-[#18C964]" : "text-red-500"}`}>
                      {c.data.delta}
                    </span>
                  </div>
                ) : (
                  <p className="text-xs text-zinc-500">{c.data.label}</p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  const renderLiveDataStreams = () => null;

  // ── TABBED CHARTS ───────────────────────────────────────────────────────────
  const renderTabbedCharts = () => (
    <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6 mb-6">
      <div className="mb-6 rounded-full border border-[#2A2A2A] bg-[#1A1A1A] p-1 flex overflow-x-auto whitespace-nowrap scrollbar-none w-fit">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-5 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
              activeTab === tab
                ? "bg-red-600 text-white shadow-[0_0_12px_rgba(229,9,20,0.4)]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Chart */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Activity size={16} className="text-red-500" />
            <h3 className="text-lg font-bold text-white">
              {activeTab === "Performance" && "Accepted investments (6 mo)"}
              {activeTab === "Projects" && "Funding progress"}
            </h3>
          </div>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {activeTab === "Performance" ? (
              <ComposedChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                <XAxis dataKey="month" stroke="#52525B" tick={{ fill: '#A1A1AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#52525B" tick={{ fill: '#A1A1AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="invested" name="Invested ($)" fill="#E50914" radius={[6, 6, 0, 0]} barSize={32} />
              </ComposedChart>
              ) : (
              <BarChart data={projectRows}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                <XAxis dataKey="title" stroke="#52525B" tick={{ fill: '#A1A1AA', fontSize: 10 }} axisLine={false} tickLine={false} interval={0} angle={-20} textAnchor="end" height={60} />
                <YAxis stroke="#52525B" tick={{ fill: '#A1A1AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="progress" name="Funding %" fill="#18C964" radius={[6, 6, 0, 0]} barSize={28} />
              </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">
            {activeTab === "Performance" ? "Portfolio projects" : "Investment amounts"}
          </h3>
          <div className="h-[260px] w-full overflow-auto">
            {projectRows.length > 0 ? (
              <table className="w-full text-left text-sm text-zinc-300">
                <thead>
                  <tr className="text-zinc-500 border-b border-[#2A2A2A]">
                    <th className="pb-2">Project</th>
                    <th className="pb-2">Invested</th>
                    <th className="pb-2">Views</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {projectRows.map((row) => (
                    <tr key={row.title} className="border-b border-[#2A2A2A]/50">
                      <td className="py-2 font-medium text-white">{row.title}</td>
                      <td className="py-2">${Number(row.invested).toLocaleString()}</td>
                      <td className="py-2">{row.views}</td>
                      <td className="py-2">{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-zinc-500 text-sm pt-4">No accepted investments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // ── LIVE ACTIVITY FEED ──────────────────────────────────────────────────────
  const renderActivityFeed = () => (
    <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-red-500" />
          <h3 className="text-lg font-bold text-white">Live Activity Feed</h3>
        </div>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-red-500 bg-red-500/10">
          {activityFeed.length} new
        </span>
      </div>
      <div className="relative pl-3">
        <div className="absolute left-6 top-4 bottom-4 w-px bg-[#2A2A2A]" />
        <div className="flex flex-col gap-6">
          {activityFeed.map((item) => (
            <div key={item.id} className="relative flex items-start gap-6">
              <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                item.type === "investment" ? "bg-[#18C964]/10" : "bg-blue-500/10"
              }`}>
                {item.type === "investment" ? (
                  <DollarSign size={18} className="text-[#18C964]" />
                ) : (
                  <Activity size={18} className="text-blue-500" />
                )}
              </div>
              <div className="flex-1 pt-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-white">{item.message}</h4>
                  <span className="text-xs text-zinc-500">{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white px-4 py-6 sm:px-6 md:px-8 md:py-10">
      {renderHeader()}
      {renderSummaryCards()}
      {renderLiveDataStreams()}
      {renderTabbedCharts()}
      {renderActivityFeed()}
    </div>
  );
}
