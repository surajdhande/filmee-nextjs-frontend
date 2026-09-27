"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FilmmakerLayout from "./FilmmakerLayout";
import {
  ArrowLeft, Download, Filter, TrendingUp,
  Eye, Clock, DollarSign, Activity, Crown
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar
} from "recharts";
import { getFilmmakerAnalytics } from "@/services/dashboardService";
import { formatCompactNumber, formatCurrency } from "@/lib/formatDashboard";

const POLL_MS = 15000;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-3 shadow-xl">
        <p className="text-zinc-400 text-xs mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-bold text-white">
            {entry.name}: <span style={{ color: entry.color }}>{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function FilmmakerAnalytics() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectIdParam = searchParams.get("projectId");
  const projectId = projectIdParam ? parseInt(projectIdParam, 10) : undefined;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    return getFilmmakerAnalytics(projectId)
      .then((res) => setData(res))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [projectId]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const interval = setInterval(load, POLL_MS);
    const onFocus = () => load();
    window.addEventListener("focus", onFocus);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, [load]);

  const stats = data?.stats || {};
  const weeklyViews = data?.weekly_views || [];
  const monthlyFunding = data?.monthly_funding || [];
  const audienceData = data?.audience_breakdown || [];
  const projectTable = data?.project_table || [];
  const recentActivity = data?.recent_activity || [];

  const audienceTotal = audienceData.reduce((s, a) => s + (a.value || 0), 0);

  const renderHeader = () => (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <button
          onClick={() => router.push("/dashboard/filmmaker")}
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white hover:text-red-500 transition-colors self-start sm:self-auto"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="h-8 w-px bg-[#2A2A2A] hidden sm:block" />
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Analytics Dashboard</h1>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            {projectId
              ? "Metrics for the selected project."
              : "Monitor your projects, audience growth and funding performance."}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-full border border-[#2A2A2A] px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:bg-[#1E1E1E] transition-colors">
          <Filter size={16} />
          <span>Date Filter</span>
        </button>
        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:bg-red-700 transition-colors">
          <Download size={16} />
          <span>Export Report</span>
        </button>
      </div>
    </div>
  );

  const renderStatCards = () => {
    const cards = [
      { label: "Total Views", value: formatCompactNumber(stats.total_views), icon: Eye, color: "text-blue-500", bg: "bg-blue-500/10" },
      { label: "Projects", value: String(stats.project_count ?? 0), icon: Clock, color: "text-purple-500", bg: "bg-purple-500/10" },
      { label: "Funding Raised", value: formatCurrency(stats.funding_raised), icon: DollarSign, color: "text-[#18C964]", bg: "bg-[#18C964]/10" },
      { label: "Investment Success", value: `${stats.success_rate ?? 0}%`, icon: Activity, color: "text-red-500", bg: "bg-red-500/10" },
    ];

    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 ${loading ? "opacity-60" : ""}`}>
        {cards.map((stat, idx) => (
          <div key={idx} className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <p className="text-sm font-medium text-zinc-400">{stat.label}</p>
              <div className={`p-2 rounded-full ${stat.bg}`}>
                <stat.icon size={16} className={stat.color} />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-white mb-2 tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderFirstRow = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      <div className="lg:col-span-2 rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6">
        <h3 className="text-lg font-bold text-white mb-6">Views (last 7 days)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyViews} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
              <XAxis dataKey="name" stroke="#52525B" tick={{ fill: '#A1A1AA', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#52525B" tick={{ fill: '#A1A1AA', fontSize: 12 }} axisLine={false} tickLine={false} />
              <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: '#2A2A2A' }} />
              <Line type="monotone" dataKey="views" name="Views" stroke="#E50914" strokeWidth={3} dot={{ r: 4, fill: '#E50914', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#E50914' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6 flex flex-col">
        <h3 className="text-lg font-bold text-white mb-6">Audience Breakdown</h3>
        <div className="h-[200px] w-full relative flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={audienceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {audienceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-white">{formatCompactNumber(audienceTotal)}</span>
            <span className="text-xs text-zinc-400">Total</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          {audienceData.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-zinc-300 font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecondRow = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6">
        <h3 className="text-lg font-bold text-white mb-6">Funding Trend</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyFunding} margin={{ top: 5, right: 10, left: -10, bottom: 0 }} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
              <XAxis dataKey="name" stroke="#52525B" tick={{ fill: '#A1A1AA', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#52525B" tick={{ fill: '#A1A1AA', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value/1000}k`} />
              <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: '#1A1A1A' }} />
              <Bar dataKey="funding" name="Funding" fill="#18C964" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6 flex items-center justify-center">
        <p className="text-sm text-zinc-500 text-center px-6">
          Traffic source analytics will appear here when referral tracking is enabled.
        </p>
      </div>
    </div>
  );

  const renderTable = () => {
    const getStatusColor = (status) => {
      switch(status) {
        case "Active": return "text-[#18C964] bg-[#18C964]/10";
        case "Completed": return "text-blue-500 bg-blue-500/10";
        case "Draft": return "text-zinc-400 bg-zinc-800";
        default: return "text-white bg-zinc-800";
      }
    };

    return (
      <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6 mb-6 overflow-hidden">
        <h3 className="text-lg font-bold text-white mb-6">Project Analytics</h3>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-zinc-400 border-b border-[#2A2A2A]">
              <tr>
                <th className="pb-4 font-medium px-2">Project Name</th>
                <th className="pb-4 font-medium px-2">Views</th>
                <th className="pb-4 font-medium px-2">Funding</th>
                <th className="pb-4 font-medium px-2">Completion</th>
                <th className="pb-4 font-medium px-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300 divide-y divide-[#2A2A2A]">
              {projectTable.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-zinc-500">No projects to show.</td>
                </tr>
              ) : null}
              {projectTable.map((proj) => (
                <tr key={proj.project_id || proj.name} className="hover:bg-[#1A1A1A] transition-colors group">
                  <td className="py-4 px-2 font-bold text-white group-hover:text-red-500 transition-colors cursor-pointer">{proj.name}</td>
                  <td className="py-4 px-2">{Number(proj.views).toLocaleString()}</td>
                  <td className="py-4 px-2">{formatCurrency(proj.funding)}</td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-24 rounded-full bg-[#2A2A2A] overflow-hidden">
                        <div className="h-full bg-red-600 rounded-full" style={{ width: `${proj.completion}%` }} />
                      </div>
                      <span className="text-xs text-zinc-400">{proj.completion}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(proj.status)}`}>
                      {proj.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderTimeline = () => (
    <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6">
      <h3 className="text-lg font-bold text-white mb-6">Recent Analytics</h3>
      {recentActivity.length === 0 ? (
        <p className="text-zinc-500">No recent events.</p>
      ) : (
        <div className="relative pl-3">
          <div className="absolute left-6 top-4 bottom-4 w-px bg-[#2A2A2A]" />
          <div className="flex flex-col gap-6">
            {recentActivity.map((evt, idx) => (
              <div key={idx} className="relative flex items-start gap-6">
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                  <Eye size={18} className="text-blue-500" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-white">{evt.title}</h4>
                    <span className="text-xs text-zinc-500">{evt.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <FilmmakerLayout>
      <div className="bg-[#0B0B0B] text-white px-4 py-6 sm:px-6 md:px-8 md:py-10">
        {renderHeader()}
        {renderStatCards()}
        {renderFirstRow()}
        {renderSecondRow()}
        {renderTable()}
        {renderTimeline()}
      </div>
    </FilmmakerLayout>
  );
}
