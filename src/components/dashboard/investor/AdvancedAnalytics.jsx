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

// ─── API ENDPOINT PLACEHOLDERS ───────────────────────────────────────────────
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// ─── STATIC DATA ─────────────────────────────────────────────────────────────
const STATIC_SUMMARY = {
  totalViews:     { value: "24,660", delta: "+2.9%", label: "Project page views", positive: true },
  revenue:        { value: "$89,250", delta: "+4.7%", label: "Total revenue generated", positive: true },
  activeUsers:    { value: "367", delta: "+7.5%", label: "Currently active users", positive: true },
  projects:       { value: "28", delta: "+7.1%", label: "Active projects on platform", positive: true },
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

const STATIC_ENGAGEMENT_RATE = [
  { time: "5m ago", value: 60 },
  { time: "4m ago", value: 65 },
  { time: "3m ago", value: 70 },
  { time: "2m ago", value: 75 },
  { time: "1m ago", value: 72 },
  { time: "Now",    value: 80 },
];

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

  const [activeTab, setActiveTab]       = useState(TABS.includes(initialTab) ? initialTab : "Performance");
  const [user, setUser]                 = useState(null);
  const [summary]                       = useState(STATIC_SUMMARY);
  const [performanceData]               = useState(STATIC_PERFORMANCE_DATA);
  const [investmentFlow]                = useState(STATIC_INVESTMENT_FLOW_DATA);
  const [engagementRate]                = useState(STATIC_ENGAGEMENT_RATE);
  const [activeUsers]                   = useState(STATIC_ACTIVE_USERS);
  const [activityFeed]                  = useState(STATIC_ACTIVITY_FEED);


  useEffect(() => {
    const stored = localStorage.getItem("user");
    setUser(stored ? JSON.parse(stored) : { full_name: "Investor" });
  }, []);



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
      { key: "totalViews", icon: Eye, label: "Total Views", data: summary.totalViews, color: "text-blue-500", bg: "bg-blue-500/10", tab: "Performance" },
      { key: "revenue", icon: DollarSign, label: "Revenue", data: summary.revenue, color: "text-[#18C964]", bg: "bg-[#18C964]/10", tab: "Revenue" },
      { key: "activeUsers", icon: Users, label: "Active Users", data: summary.activeUsers, color: "text-purple-500", bg: "bg-purple-500/10", tab: "Audience" },
      { key: "projects", icon: Film, label: "Projects", data: summary.projects, color: "text-red-500", bg: "bg-red-500/10", tab: "Projects" },
      { key: "engagementRate", icon: TrendingUp, label: "Engagement Rate", data: summary.engagementRate, color: "text-[#F5A524]", bg: "bg-[#F5A524]/10", tab: "Audience" },
      { key: "avgSession", icon: Clock, label: "Avg Session", data: summary.avgSession, color: "text-pink-500", bg: "bg-pink-500/10", tab: "Audience" },
    ];

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
                <div className="flex items-center gap-1.5">
                  {c.data.positive ? (
                    <TrendingUp size={14} className="text-[#18C964]" />
                  ) : (
                    <ArrowDownRight size={14} className="text-red-500" />
                  )}
                  <span className={`text-xs font-bold tracking-wider ${c.data.positive ? "text-[#18C964]" : "text-red-500"}`}>
                    {c.data.delta}
                  </span>
                  <span className="text-xs text-zinc-500 ml-1">vs last month</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  // ── LIVE DATA STREAMS ───────────────────────────────────────────────────────
  const renderLiveDataStreams = () => (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity size={18} className="text-red-500" />
        <h3 className="text-lg font-bold text-white tracking-tight">Live Data Streams</h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#18C964] bg-[#18C964]/10">
          Real-time
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Views per Minute */}
        <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Live Views</h3>
              <p className="text-xs text-zinc-400 mt-1">Views per Minute</p>
            </div>
            <div className="flex items-center gap-2">
              <Eye size={16} className="text-zinc-500" />
            </div>
          </div>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={investmentFlow}>
                <defs>
                  <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E50914" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#E50914" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                <XAxis dataKey="time" stroke="#52525B" tick={{ fill: '#A1A1AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#52525B" tick={{ fill: '#A1A1AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" name="Views" stroke="#E50914" strokeWidth={3} fill="url(#viewsGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Investment Flow */}
        <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Live Investments</h3>
              <p className="text-xs text-zinc-400 mt-1">Investment Flow</p>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-zinc-500" />
            </div>
          </div>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={investmentFlow}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                <XAxis dataKey="time" stroke="#52525B" tick={{ fill: '#A1A1AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#52525B" tick={{ fill: '#A1A1AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" name="Amount" stroke="#18C964" strokeWidth={3} dot={{ fill: '#18C964', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Live Engagement Rate */}
        <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Live Engagement</h3>
              <p className="text-xs text-zinc-400 mt-1">Engagement Rate (%)</p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-zinc-500" />
            </div>
          </div>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementRate}>
                <defs>
                  <linearGradient id="engagGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                <XAxis dataKey="time" stroke="#52525B" tick={{ fill: '#A1A1AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#52525B" tick={{ fill: '#A1A1AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" name="Engagement" stroke="#3B82F6" strokeWidth={3} fill="url(#engagGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Users */}
        <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Live Users</h3>
              <p className="text-xs text-zinc-400 mt-1">Active Users</p>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-zinc-500" />
            </div>
          </div>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activeUsers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                <XAxis dataKey="time" stroke="#52525B" tick={{ fill: '#A1A1AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#52525B" tick={{ fill: '#A1A1AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="users" name="Users" fill="#8B5CF6" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

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
              {activeTab === "Performance" && "Multi Metric Performance"}
              {activeTab === "Projects" && "Project Activity"}
              {activeTab === "Audience" && "Engagement Rate"}
              {activeTab === "Revenue" && "Revenue Trend"}
            </h3>
          </div>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                <XAxis dataKey="month" stroke="#52525B" tick={{ fill: '#A1A1AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" stroke="#52525B" tick={{ fill: '#A1A1AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#52525B" tick={{ fill: '#A1A1AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar yAxisId="left" dataKey="views" name="Views" fill="#E50914" radius={[6, 6, 0, 0]} barSize={32} />
                <Line yAxisId="right" dataKey="engagement" name="Engagement" type="monotone" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">
            {activeTab === "Performance" && "Investment Flow Analysis"}
            {activeTab === "Projects" && "Projects by Stage"}
            {activeTab === "Audience" && "Active Users"}
            {activeTab === "Revenue" && "Revenue Distribution"}
          </h3>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { time: "Jan", value: 8 }, { time: "Feb", value: 12 },
                { time: "Mar", value: 16 }, { time: "Apr", value: 20 },
                { time: "May", value: 22 }, { time: "Jun", value: 26 },
                { time: "Jul", value: 32 },
              ]}>
                <defs>
                  <linearGradient id="flowGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E50914" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#E50914" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                <XAxis dataKey="time" stroke="#52525B" tick={{ fill: '#A1A1AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#52525B" tick={{ fill: '#A1A1AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" name="Flow" stroke="#E50914" strokeWidth={3} fill="url(#flowGrad2)" />
              </AreaChart>
            </ResponsiveContainer>
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
