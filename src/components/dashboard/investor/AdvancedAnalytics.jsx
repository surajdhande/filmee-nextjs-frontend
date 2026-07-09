"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Eye, DollarSign, Users, Film, Radio, TrendingUp,
  Clock, Filter, Download, ArrowUpRight, ArrowDownRight,
  Activity,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ComposedChart,
} from "recharts";
import Image from "next/image";

// ─── API ENDPOINT PLACEHOLDERS ───────────────────────────────────────────────
// Replace BASE_URL with your backend base URL when ready.
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// async function fetchAnalyticsSummary() {
//   // GET /analytics/investor/summary
//   const res = await fetch(`${BASE_URL}/analytics/investor/summary`, {
//     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//   });
//   if (!res.ok) throw new Error("Failed to fetch summary");
//   return res.json();
// }

// async function fetchPerformanceChart() {
//   // GET /analytics/investor/performance?range=30d
//   const res = await fetch(`${BASE_URL}/analytics/investor/performance?range=30d`, {
//     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//   });
//   if (!res.ok) throw new Error("Failed");
//   return res.json();
// }

// async function fetchInvestmentFlow() {
//   // GET /analytics/investor/investment-flow?range=30d
//   const res = await fetch(`${BASE_URL}/analytics/investor/investment-flow?range=30d`, {
//     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//   });
//   if (!res.ok) throw new Error("Failed");
//   return res.json();
// }

// async function fetchLiveStreams() {
//   // GET /analytics/investor/live-streams
//   // Returns: { viewsPerMinute:[...], investmentFlow:[...], engagementRate:[...], activeUsers:[...] }
//   const res = await fetch(`${BASE_URL}/analytics/investor/live-streams`, {
//     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//   });
//   if (!res.ok) throw new Error("Failed");
//   return res.json();
// }

// async function fetchActivityFeed() {
//   // GET /analytics/investor/activity-feed
//   const res = await fetch(`${BASE_URL}/analytics/investor/activity-feed`, {
//     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//   });
//   if (!res.ok) throw new Error("Failed");
//   return res.json();
// }

// ─── STATIC DATA ─────────────────────────────────────────────────────────────
const STATIC_SUMMARY = {
  totalViews:     { value: 24660, delta: "+2.9%", label: "Project page views", positive: true },
  revenue:        { value: "$89,250", delta: "+4.7%", label: "Total revenue generated", positive: true },
  activeUsers:    { value: 367, delta: "+7.5%", label: "Currently active users", positive: true },
  projects:       { value: 28, delta: "+7.1%", label: "Active projects on platform", positive: true },
  engagementRate: { value: "85%", delta: "+3.7%", label: "User engagement rate", positive: true },
  avgSession:     { value: "8m 24s", delta: "+1.5%", label: "Average user session time", positive: true },
};

const STATIC_PERFORMANCE_DATA = [
  { month: "Jan", views: 4000, engagement: 85 },
  { month: "Feb", views: 3000, engagement: 70 },
  { month: "Mar", views: 2000, engagement: 60 },
  { month: "Apr", views: 2800, engagement: 75 },
  { month: "May", views: 1900, engagement: 55 },
  { month: "Jun", views: 2400, engagement: 68 },
  { month: "Jul", views: 3800, engagement: 92 },
];

const STATIC_INVESTMENT_FLOW_DATA = [
  { time: "5m ago", value: 8 },
  { time: "4m ago", value: 12 },
  { time: "3m ago", value: 16 },
  { time: "2m ago", value: 20 },
  { time: "1m ago", value: 22 },
  { time: "Now",    value: 26 },
];

// Live Engagement — area chart (blue tones matching screenshot)
const STATIC_ENGAGEMENT_RATE = [
  { time: "5m ago", value: 60 },
  { time: "4m ago", value: 65 },
  { time: "3m ago", value: 70 },
  { time: "2m ago", value: 75 },
  { time: "1m ago", value: 72 },
  { time: "Now",    value: 80 },
];

// Active Users — bar chart (purple tones matching screenshot)
const STATIC_ACTIVE_USERS = [
  { time: "6m ago", users: 280 },
  { time: "5m ago", users: 310 },
  { time: "4m ago", users: 295 },
  { time: "3m ago", users: 330 },
  { time: "2m ago", users: 345 },
  { time: "1m ago", users: 360 },
  { time: "Now",    users: 367 },
];

const STATIC_ACTIVITY_FEED = [
  { id: 1, type: "investment", message: "New investment of $33,400 received", time: "2:10:41 PM" },
  { id: 2, type: "milestone",  message: "Project reached milestone: 1000+ views this hour", time: "2:10:13 PM" },
];

const TABS = ["Performance", "Projects", "Audience", "Revenue"];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-[#2A2A2A] bg-[#171717] px-3 py-2 shadow-lg">
        <p className="text-sm font-semibold text-white">
          {typeof payload[0].value === "number"
            ? payload[0].value.toLocaleString()
            : payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const LiveBadge = ({ offline = false }) => (
  <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
    offline
      ? "bg-red-500/20 border-red-500/30 text-red-400"
      : "bg-green-500/10 border-green-500/20 text-green-400"
  }`}>
    <span className={`relative flex h-1.5 w-1.5 rounded-full ${offline ? "bg-red-400" : "bg-green-400"}`}>
      {!offline && (
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
      )}
    </span>
    {offline ? "Offline" : "Live"}
  </div>
);

const SummaryCard = ({ icon: Icon, label, value, delta, positive, color, sublabel, onClick }) => (
  <button
    onClick={onClick}
    className="text-left bg-[#0E0E0E] border border-[#222] rounded-2xl p-4 hover:border-[#E50914]/30 hover:shadow-[0_4px_20px_rgba(229,9,20,0.08)] transition-all duration-300 w-full"
  >
    <div className="flex items-start justify-between mb-3">
      <div className={`h-9 w-9 flex items-center justify-center rounded-xl ${color}`}>
        <Icon size={17} />
      </div>
      <LiveBadge />
    </div>
    <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">{label}</p>
    <h3 className="text-[22px] font-extrabold text-white mt-1 leading-none">{value}</h3>
    <div className={`flex items-center gap-1 mt-1.5 text-[11px] font-semibold ${positive ? "text-green-400" : "text-red-400"}`}>
      {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
      {delta}
    </div>
    {sublabel && <p className="text-[10px] text-zinc-600 mt-1">{sublabel}</p>}
  </button>
);

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function AdvancedAnalytics() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "Performance";

  const [activeTab, setActiveTab]       = useState(TABS.includes(initialTab) ? initialTab : "Performance");
  const [user, setUser]                 = useState(null);
  const [summary]                       = useState(STATIC_SUMMARY);
  const [performanceData]               = useState(STATIC_PERFORMANCE_DATA);
  const [investmentFlow]                = useState(STATIC_INVESTMENT_FLOW_DATA);
  const [engagementRate]                = useState(STATIC_ENGAGEMENT_RATE);
  const [activeUsers]                   = useState(STATIC_ACTIVE_USERS);
  const [activityFeed]                  = useState(STATIC_ACTIVITY_FEED);
  const [liveMode, setLiveMode]         = useState(false);
  const liveIntervalRef                 = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    setUser(stored ? JSON.parse(stored) : { full_name: "Investor" });

    // ── Uncomment to wire up real backend data ──────────────────────────────
    // Promise.allSettled([
    //   fetchAnalyticsSummary().then(setSummary),
    //   fetchPerformanceChart().then(setPerformanceData),
    //   fetchInvestmentFlow().then(setInvestmentFlow),
    //   fetchActivityFeed().then(setActivityFeed),
    // ]);
  }, []);

  // Live mode polling every 5 s
  useEffect(() => {
    if (liveMode) {
      liveIntervalRef.current = setInterval(() => {
        // fetchLiveStreams().then(data => {
        //   setInvestmentFlow(data.investmentFlow);
        //   setEngagementRate(data.engagementRate);
        //   setActiveUsers(data.activeUsers);
        // });
      }, 5000);
    } else {
      clearInterval(liveIntervalRef.current);
    }
    return () => clearInterval(liveIntervalRef.current);
  }, [liveMode]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0B0B] text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex flex-col">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="w-full border-b border-[#262626] bg-[#0E0E0E] shrink-0">
        <div className="flex items-center justify-between px-6 py-4 gap-2 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="text-zinc-400 hover:text-white transition"
              aria-label="Go back"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <Image src="/logo.png" alt="Filmee" width={32} height={32} className="rounded-lg object-contain" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[18px] font-bold text-white tracking-tight">Advanced Analytics</h1>
                <LiveBadge offline={!liveMode} />
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">Real-time insights and performance metrics</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setLiveMode((v) => !v)}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-[12px] font-bold uppercase tracking-wider transition-all duration-300 ${
                liveMode
                  ? "bg-[#E50914] text-white shadow-[0_0_18px_rgba(229,9,20,0.4)]"
                  : "border border-[#E50914]/50 text-[#E50914] hover:bg-[#E50914]/10"
              }`}
            >
              <Radio size={13} /> Live Mode
            </button>
            <select className="bg-[#1A1A1A] border border-[#333] text-zinc-300 text-xs rounded-full px-3 py-2 outline-none cursor-pointer">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
            </select>
            <button className="flex items-center gap-1.5 border border-[#333] text-zinc-400 hover:text-white rounded-full px-4 py-2 text-xs transition">
              <Filter size={13} /> Filter
            </button>
            <button className="flex items-center gap-1.5 border border-[#333] text-zinc-400 hover:text-white rounded-full px-4 py-2 text-xs transition">
              <Download size={13} /> Export
            </button>
          </div>
        </div>
      </header>

      {/* ── PAGE BODY ──────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8">

        {/* 1. Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <SummaryCard icon={Eye}        label="Total Views"     value={summary.totalViews.value}     delta={summary.totalViews.delta}     positive sublabel={summary.totalViews.label}     color="bg-green-500/10 text-green-500"    onClick={() => setActiveTab("Performance")} />
          <SummaryCard icon={DollarSign} label="Revenue"         value={summary.revenue.value}         delta={summary.revenue.delta}         positive sublabel={summary.revenue.label}         color="bg-emerald-500/10 text-emerald-400" onClick={() => setActiveTab("Revenue")} />
          <SummaryCard icon={Users}      label="Active Users"    value={summary.activeUsers.value}    delta={summary.activeUsers.delta}    positive sublabel={summary.activeUsers.label}    color="bg-blue-500/10 text-blue-400"      onClick={() => setActiveTab("Audience")} />
          <SummaryCard icon={Film}       label="Projects"        value={summary.projects.value}        delta={summary.projects.delta}        positive sublabel={summary.projects.label}        color="bg-purple-500/10 text-purple-400"  onClick={() => setActiveTab("Projects")} />
          <SummaryCard icon={TrendingUp} label="Engagement Rate" value={summary.engagementRate.value} delta={summary.engagementRate.delta} positive sublabel={summary.engagementRate.label} color="bg-yellow-500/10 text-yellow-500"  onClick={() => setActiveTab("Audience")} />
          <SummaryCard icon={Clock}      label="Avg Session"     value={summary.avgSession.value}     delta={summary.avgSession.delta}     positive sublabel={summary.avgSession.label}     color="bg-pink-500/10 text-pink-400"      onClick={() => setActiveTab("Audience")} />
        </div>

        {/* 2. Live Data Streams — row 1: Views per Minute + Investment Flow */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Activity size={15} className="text-[#E50914]" />
            <h3 className="text-[16px] font-bold text-white">Live Data Streams</h3>
            <span className="rounded-full bg-green-500/10 border border-green-500/20 px-2 py-0.5 text-[9px] font-bold text-green-400 uppercase tracking-wider">
              Real-time
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {/* Views per Minute */}
            <div className="bg-[#121212] border border-[#222] rounded-3xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-[14px] font-bold text-white">Live Views</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">Views per Minute</p>
                </div>
                <div className="flex items-center gap-2">
                  <LiveBadge offline={!liveMode} />
                  <Eye size={15} className="text-zinc-500" />
                </div>
              </div>
              <div className="h-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={investmentFlow}>
                    <defs>
                      <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#E50914" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#E50914" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#555", fontSize: 10 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="value" stroke="#E50914" strokeWidth={2} fill="url(#viewsGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Investment Flow */}
            <div className="bg-[#121212] border border-[#222] rounded-3xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-[14px] font-bold text-white">Live Investments</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">Investment Flow</p>
                </div>
                <div className="flex items-center gap-2">
                  <LiveBadge offline={!liveMode} />
                  <DollarSign size={15} className="text-zinc-500" />
                </div>
              </div>
              <div className="h-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={investmentFlow}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" vertical={false} />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#555", fontSize: 10 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="value" stroke="#18C964" strokeWidth={2} dot={{ fill: "#18C964", r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Live Data Streams — row 2: Live Engagement + Active Users */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Live Engagement Rate */}
            <div className="bg-[#121212] border border-[#222] rounded-3xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-[14px] font-bold text-white">Live Engagement</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">Engagement Rate</p>
                </div>
                <div className="flex items-center gap-2">
                  <LiveBadge offline={!liveMode} />
                  <TrendingUp size={15} className="text-zinc-500" />
                </div>
              </div>
              <div className="h-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={engagementRate}>
                    <defs>
                      <linearGradient id="engagGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#3B82F6" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#555", fontSize: 10 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fill="url(#engagGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Active Users */}
            <div className="bg-[#121212] border border-[#222] rounded-3xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-[14px] font-bold text-white">Live Users</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">Active Users</p>
                </div>
                <div className="flex items-center gap-2">
                  <LiveBadge offline={!liveMode} />
                  <Users size={15} className="text-zinc-500" />
                </div>
              </div>
              <div className="h-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activeUsers}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" vertical={false} />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#555", fontSize: 10 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="users" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Tabbed Charts */}
        <div className="bg-[#121212] border border-[#222] rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-6 bg-[#1A1A1A] rounded-full p-1 w-fit border border-[#2a2a2a]">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-[#E50914] text-white shadow-[0_0_12px_rgba(229,9,20,0.3)]"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left — Multi Metric */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Activity size={13} className="text-[#E50914]" />
                <h4 className="text-[14px] font-bold text-white">
                  {activeTab === "Performance" && "Multi Metric Performance"}
                  {activeTab === "Projects"    && "Project Activity"}
                  {activeTab === "Audience"    && "Engagement Rate"}
                  {activeTab === "Revenue"     && "Revenue Trend"}
                </h4>
              </div>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#555", fontSize: 11 }} />
                    <YAxis yAxisId="left"  axisLine={false} tickLine={false} tick={{ fill: "#555", fontSize: 10 }} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: "#555", fontSize: 10 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar  yAxisId="left"  dataKey="views"      fill="#E50914" radius={[4,4,0,0]} barSize={36} />
                    <Line yAxisId="right" dataKey="engagement" type="monotone" stroke="#ffffff" strokeWidth={2} dot={{ fill: "#fff", r: 3 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right — Investment Flow Analysis */}
            <div>
              <h4 className="text-[14px] font-bold text-white mb-4">
                {activeTab === "Performance" && "Investment Flow Analysis"}
                {activeTab === "Projects"    && "Projects by Stage"}
                {activeTab === "Audience"    && "Active Users"}
                {activeTab === "Revenue"     && "Revenue Distribution"}
              </h4>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    { time: "Jan", value: 8  }, { time: "Feb", value: 12 },
                    { time: "Mar", value: 16 }, { time: "Apr", value: 20 },
                    { time: "May", value: 22 }, { time: "Jun", value: 26 },
                    { time: "Jul", value: 32 },
                  ]}>
                    <defs>
                      <linearGradient id="flowGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#E50914" stopOpacity={0.6} />
                        <stop offset="95%" stopColor="#E50914" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" vertical={false} />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#555", fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#555", fontSize: 10 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="value" stroke="#E50914" strokeWidth={2.5} fill="url(#flowGrad2)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Live Activity Feed */}
        <div className="bg-[#121212] border border-[#222] rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Activity size={14} className="text-[#E50914]" />
            <h3 className="text-[15px] font-bold text-white">Live Activity Feed</h3>
            <span className="rounded-full bg-[#E50914] px-2.5 py-0.5 text-[10px] font-bold text-white">
              {activityFeed.length} new
            </span>
          </div>
          <div className="space-y-1">
            {activityFeed.map((item) => (
              <div key={item.id} className="flex items-start gap-3 py-3 border-b border-[#1e1e1e] last:border-0">
                <span className={`mt-1.5 flex h-2 w-2 shrink-0 rounded-full ${
                  item.type === "investment" ? "bg-green-400" : "bg-blue-400"
                }`} />
                <div>
                  <p className="text-sm text-zinc-300">{item.message}</p>
                  <p className="text-[10px] text-zinc-600 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>{/* end page body */}
    </div> /* end root */
  );
}
