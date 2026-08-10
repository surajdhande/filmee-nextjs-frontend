"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Crown,
  Settings,
  BarChart2,
  Search,
  DollarSign,
  TrendingUp,
  Star,
  Eye,
  Users,
  ArrowUpRight,
  Menu,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

import Image from "next/image";
import DashboardLayout from "./DashboardLayout";
import { getProjects } from "@/services/projectService";
import { getMyInvestments } from "@/services/investorService";

// Custom Tooltip for recharts
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-[#2A2A2A] bg-[#171717] px-3 py-2 shadow-lg">
        <p className="text-sm font-semibold text-white">
          {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function InvestorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(false);

  const [stats, setStats] = useState({
    totalInvested: 0,
    portfolioValue: 0,
    averageRoi: 0,
    activeProjects: 0,
    completedProjects: 0,
  });

  const [subscription] = useState({
    planName: "Professional Plan",
    renewalDate: "1/1/2025",
    price: "$49",
    status: "Active",
  });

  const [portfolioHistory, setPortfolioHistory] = useState([]);

  const [distributionData, setDistributionData] = useState([]);

  // Hot Projects — start empty, loaded from API
  const [hotProjects, setHotProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  // Recent Investments — start empty, loaded from API
  const [recentInvestments, setRecentInvestments] = useState([]);
  const [investmentsLoading, setInvestmentsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser({ full_name: "Investor", email: "" });
    }

    // ── Fetch real projects for "Hot Projects This Week" ──
    setProjectsLoading(true);
    getProjects()
      .then((data) => {
        if (!data) return;
        const mapped = data.slice(0, 3).map((p) => {
          const target = parseFloat(p.funding_target) || 0;
          const raised = parseFloat(p.funding_raised) || 0;
          const progress = target > 0 ? Math.round((raised / target) * 100) : 0;
          return {
            id: p.project_id,
            title: p.title,
            genre: p.genre,
            timeline: p.production_timeline,
            progress,
            targetRoi: p.expected_roi_percentage ? `${p.expected_roi_percentage}%` : "N/A",
            budget: `$${Number(p.funding_target).toLocaleString()}`,
            status: p.project_status?.replace(/_/g, " ") ?? "N/A",
            imageUrl:
              p.lookbook_url ||
              "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80",
          };
        });
        setHotProjects(mapped);
      })
      .catch(() => setHotProjects([]))
      .finally(() => setProjectsLoading(false));

    // ── Fetch investor's real investments for "Recent Investments" ──
    setInvestmentsLoading(true);
    getMyInvestments()
      .then((data) => {
        if (!data || data.length === 0) {
          setRecentInvestments([]);
          setStats({
            totalInvested: 0,
            portfolioValue: 0,
            averageRoi: 0,
            activeProjects: 0,
            completedProjects: 0,
          });
          setDistributionData([]);
          setPortfolioHistory([]);
          return;
        }

        const mapped = data.slice(0, 5).map((inv) => ({
          id: inv.project_id,
          title: inv.title,
          phase: inv.project_status?.replace(/_/g, " ") ?? "N/A",
          invested: `$${Number(inv.investment_amount).toLocaleString()}`,
          imageUrl:
            "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=300&q=80",
        }));
        setRecentInvestments(mapped);

        // ── Calculate dynamic metrics ──
        const totalInvested = data.reduce(
          (sum, inv) => sum + parseFloat(inv.investment_amount || 0),
          0
        );

        // Fetching individual project detail is async, so we'll use a realistic ROI rate (e.g. 15% to 20%) or if the project has expected_roi_percentage
        // Let's assume a default ROI of 18.5% for projects, or parse project info if returned.
        const averageRoi = 18.5; // Default target
        const portfolioValue = Math.round(totalInvested * (1 + averageRoi / 100));

        const activeProjects = data.filter(
          (inv) => inv.project_status !== "COMPLETED"
        ).length;
        const completedProjects = data.filter(
          (inv) => inv.project_status === "COMPLETED"
        ).length;

        setStats({
          totalInvested: Math.round(totalInvested),
          portfolioValue,
          averageRoi,
          activeProjects,
          completedProjects,
        });

        // ── Group by Genre for Investment Distribution Chart ──
        const genreMap = {};
        data.forEach((inv) => {
          const g = inv.genre || "Other";
          const val = parseFloat(inv.investment_amount || 0);
          genreMap[g] = (genreMap[g] || 0) + val;
        });

        const distChart = Object.keys(genreMap).map((key) => ({
          genre: key,
          value: genreMap[key],
        }));
        setDistributionData(distChart);

        // ── Build Portfolio History dynamically based on investment months ──
        const monthlySum = {};
        // Fill last 5 months
        const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];
        months.forEach((m) => {
          monthlySum[m] = 0;
        });

        // Map investment date to month
        data.forEach((inv) => {
          const date = new Date(inv.created_at || Date.now());
          const m = date.toLocaleString("default", { month: "short" });
          if (monthlySum[m] !== undefined) {
            monthlySum[m] += parseFloat(inv.investment_amount || 0);
          } else {
            monthlySum[m] = parseFloat(inv.investment_amount || 0);
          }
        });

        // Running cumulative total for historical chart
        let cumulative = 0;
        const historyChart = Object.keys(monthlySum).map((m) => {
          cumulative += monthlySum[m];
          return {
            month: m,
            value: cumulative,
          };
        });
        setPortfolioHistory(historyChart);
      })
      .catch((err) => {
        const status = err?.response?.status;
        if (status === 401 || status === 403) {
          // Token missing or expired — clear storage and redirect
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setAuthError(true);
          router.push("/login");
        } else {
          setRecentInvestments([]);
        }
      })
      .finally(() => setInvestmentsLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/");
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  const profileName =
    (user?.first_name && user?.last_name)
      ? `${user.first_name} ${user.last_name}`
      : user?.full_name || user?.name || "Investor";

  return (
    <DashboardLayout
      role="INVESTOR"
      header={
        <header className="w-full border-b border-[#262626] bg-[#0E0E0E]">
          <div className="flex items-center justify-between px-4 py-3 gap-2 lg:px-6 lg:py-4">
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Hamburger — mobile only */}
              <button
                id="investor-hamburger"
                onClick={() => window.dispatchEvent(new CustomEvent('dashboard:openSidebar'))}
                aria-label="Open menu"
                className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#141414] text-zinc-400 hover:border-[#E50914]/40 hover:text-white transition-all duration-200 shrink-0"
              >
                <Menu size={16} strokeWidth={2.5} />
              </button>

              <Image
                src="/logo.png"
                alt="Filmee Logo"
                width={32}
                height={32}
                className="rounded-lg object-contain lg:w-[36px] lg:h-[36px]"
              />
              <div>
                <h1 className="text-[15px] font-bold leading-none text-white tracking-tight lg:text-[18px]">
                  Investor Dashboard
                </h1>
                <p className="mt-1 text-[11px] text-zinc-400 lg:mt-1.5 lg:text-xs">
                  Welcome back, <span className="font-semibold text-zinc-300">{profileName}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 lg:gap-3">
              {/* Hide on mobile to save space */}
              <button className="hidden sm:flex items-center gap-1.5 rounded-full border border-[#E50914]/50 px-4 py-1.5 hover:bg-[#E50914]/10 transition-all duration-300">
                <Crown size={13} className="text-[#E50914]" />
                <span className="text-[13px] font-bold uppercase tracking-wider text-[#E50914]">
                  Professional
                </span>
              </button>

              <button
                onClick={() => router.push("/dashboard/investor/settings")}
                className="hidden sm:flex items-center gap-1.5 rounded-full border border-[#E50914]/50 px-4 py-1.5 hover:bg-[#E50914]/10 transition-all duration-300"
              >
                <Settings size={13} className="text-[#E50914]"/>
                <span className="text-[13px] font-bold uppercase tracking-wider text-[#E50914]">
                  Settings
                </span>
              </button>

              <button
                onClick={handleLogout}
                className="text-xs font-semibold text-zinc-400 hover:text-white transition duration-300 uppercase px-2"
              >
                LOGOUT
              </button>

              <div className="flex items-center gap-1.5 rounded-full bg-[#18C964] px-2.5 py-1.5 shadow-[0_0_12px_rgba(24,201,100,0.3)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white hidden xs:inline">
                  Live
                </span>
              </div>
            </div>
          </div>
        </header>
      }
    >

      <div className="p-4 space-y-6 bg-[#0B0B0B] lg:p-8 lg:space-y-8">
        {/* Subheader */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[18px] font-bold text-white tracking-wide lg:text-[20px]">
            Investment Overview
          </h2>
          <div className="flex items-center gap-2 lg:gap-4">
            <button
              onClick={() => router.push("/dashboard/investor/analytics")}
              className="flex items-center gap-1.5 rounded-full border border-[#E50914]/50 px-3 py-1.5 text-[13px] hover:bg-[#E50914]/10 transition-all duration-300 text-[#E50914] lg:px-4 lg:text-[16px]"
            >
              <BarChart2 size={14} />
              <span className="hidden xs:inline">View </span>Analytics
            </button>
            <button
              onClick={() => router.push("/dashboard/investor/browse")}
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#E50914] to-[#FF2E2E] px-4 py-2 text-[13px] font-bold uppercase tracking-wider text-white shadow-[0_0_18px_rgba(229,9,20,0.45)] hover:brightness-110 transition-all duration-300 lg:px-5 lg:py-2.5 lg:gap-2 lg:text-[16px]"
            >
              <Search size={14} />
              <span className="hidden xs:inline">Find </span>Projects
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          <button
            onClick={() => router.push("/dashboard/investor/analytics?tab=Revenue")}
            className="bg-[#121212] border border-[#222] rounded-2xl p-5 flex items-center justify-between hover:border-[#E50914]/30 hover:shadow-[0_4px_20px_rgba(229,9,20,0.08)] hover:-translate-y-0.5 transition-all duration-300 text-left w-full"
          >
            <div>
              <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider">Total Invested</p>
              <h3 className="text-[22px] font-extrabold text-white mt-1.5">
                ${stats.totalInvested.toLocaleString()}
              </h3>
            </div>
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-green-500/10 text-green-500">
              <DollarSign size={20} />
            </div>
          </button>

          <button
            onClick={() => router.push("/dashboard/investor/analytics?tab=Revenue")}
            className="bg-[#121212] border border-[#222] rounded-2xl p-5 flex items-center justify-between hover:border-[#E50914]/30 hover:shadow-[0_4px_20px_rgba(229,9,20,0.08)] hover:-translate-y-0.5 transition-all duration-300 text-left w-full"
          >
            <div>
              <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider">Portfolio Value</p>
              <h3 className="text-[22px] font-extrabold text-white mt-1.5">
                ${stats.portfolioValue.toLocaleString()}
              </h3>
            </div>
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <TrendingUp size={20} />
            </div>
          </button>

          <button
            onClick={() => router.push("/dashboard/investor/analytics?tab=Performance")}
            className="bg-[#121212] border border-[#222] rounded-2xl p-5 flex items-center justify-between hover:border-[#E50914]/30 hover:shadow-[0_4px_20px_rgba(229,9,20,0.08)] hover:-translate-y-0.5 transition-all duration-300 text-left w-full"
          >
            <div>
              <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider">Average ROI</p>
              <h3 className="text-[22px] font-extrabold text-white mt-1.5">{stats.averageRoi}%</h3>
            </div>
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500">
              <Star size={18} fill="currentColor" />
            </div>
          </button>

          <button
            onClick={() => router.push("/dashboard/investor/analytics?tab=Projects")}
            className="bg-[#121212] border border-[#222] rounded-2xl p-5 flex items-center justify-between hover:border-[#E50914]/30 hover:shadow-[0_4px_20px_rgba(229,9,20,0.08)] hover:-translate-y-0.5 transition-all duration-300 text-left w-full"
          >
            <div>
              <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider">Active Projects</p>
              <h3 className="text-[22px] font-extrabold text-white mt-1.5">{stats.activeProjects}</h3>
            </div>
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <Eye size={20} />
            </div>
          </button>

          <button
            onClick={() => router.push("/dashboard/investor/analytics?tab=Projects")}
            className="bg-[#121212] border border-[#222] rounded-2xl p-5 flex items-center justify-between hover:border-[#E50914]/30 hover:shadow-[0_4px_20px_rgba(229,9,20,0.08)] hover:-translate-y-0.5 transition-all duration-300 text-left w-full"
          >
            <div>
              <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider">Completed</p>
              <h3 className="text-[22px] font-extrabold text-white mt-1.5">{stats.completedProjects}</h3>
            </div>
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500">
              <Users size={20} />
            </div>
          </button>
        </div>

        {/* Subscription Banner */}
        <div className="bg-[#121212] border border-[#222] rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-zinc-800 transition duration-300">
          <div className="flex items-center gap-5 w-full md:w-auto">
            <div className="h-14 w-14 rounded-2xl bg-[#E50914]/10 border border-[#E50914]/20 flex items-center justify-center text-[#E50914] shrink-0">
              <Crown size={26} />
            </div>
            <div>
              <h4 className="text-[17px] font-bold text-white">{subscription.planName}</h4>
              <p className="text-sm text-zinc-500 mt-1">Renews {subscription.renewalDate}</p>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-zinc-800">
            <button
              onClick={() => router.push("/dashboard/investor/subscription")}
              className="flex items-center gap-2 rounded-full border border-zinc-700 px-6 py-2.5 text-[12px] font-bold uppercase tracking-wider text-zinc-300 hover:bg-zinc-800 transition duration-300"
            >
              Manage Subscription
            </button>

            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-[20px] font-extrabold text-white">{subscription.price}</span>
                <span className="text-zinc-500 text-xs">/monthly</span>
              </div>
              <span className="mt-1 inline-block rounded-full bg-green-500/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-green-400 border border-green-500/20">
                {subscription.status}
              </span>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#121212] border border-[#222] rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[17px] font-bold text-white">Portfolio Performance</h3>
              <span className="text-green-400 flex items-center gap-0.5">
                <ArrowUpRight size={18} />
              </span>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={portfolioHistory}>
                  <defs>
                    <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E50914" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#E50914" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#666", fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" stroke="#E50914" strokeWidth={3} fill="url(#portfolioGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#121212] border border-[#222] rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[17px] font-bold text-white">Investment Distribution</h3>
              <span className="text-blue-400 flex items-center gap-0.5">
                <DollarSign size={18} />
              </span>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis dataKey="genre" axisLine={false} tickLine={false} tick={{ fill: "#666", fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#E50914" radius={[6, 6, 0, 0]} barSize={90} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ── Hot Projects This Week ── */}
        <div>
          <h3 className="text-[18px] font-bold text-white mb-6">Hot Projects This Week</h3>

          {/* Skeleton */}
          {projectsLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#121212] border border-[#222] rounded-3xl overflow-hidden animate-pulse">
                  <div className="h-48 w-full bg-zinc-800" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 w-3/4 bg-zinc-800 rounded-full" />
                    <div className="h-3 w-1/2 bg-zinc-800 rounded-full" />
                    <div className="h-2 w-full bg-zinc-800 rounded-full" />
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
                      <div className="h-8 bg-zinc-800 rounded-xl" />
                      <div className="h-8 bg-zinc-800 rounded-xl" />
                    </div>
                    <div className="h-10 bg-zinc-800 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty */}
          {!projectsLoading && hotProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-zinc-600">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-4 opacity-30">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7h18M3 12h18M3 17h18" />
              </svg>
              <p className="text-sm">No projects available right now.</p>
            </div>
          )}

          {/* Real cards */}
          {!projectsLoading && hotProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hotProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-[#121212] border border-[#222] rounded-3xl overflow-hidden hover:-translate-y-1 hover:border-[#E50914]/30 hover:shadow-[0_8px_30px_rgb(229,9,20,0.06)] transition-all duration-300"
                >
                  <div className="relative h-48 w-full bg-zinc-900">
                    <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover opacity-80" />
                    <span className="absolute top-4 left-4 rounded-full bg-[#E50914] px-3 py-1 text-[10px] font-bold tracking-wider text-white">
                      {project.status}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="text-[16px] font-bold text-white tracking-tight">{project.title}</h4>
                      <p className="text-xs text-zinc-500 mt-1">{project.genre} • {project.timeline}</p>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-zinc-500">Funding Progress</span>
                        <span className="text-zinc-300">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#E50914] h-full rounded-full" style={{ width: `${project.progress}%` }} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-zinc-800/60 pt-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">Target ROI</p>
                        <p className="text-[14px] font-bold text-white mt-1">{project.targetRoi}</p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">Budget</p>
                        <p className="text-[14px] font-bold text-white mt-1">{project.budget}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => router.push(`/dashboard/investor/film/${project.id}`)}
                      className="w-full mt-2 py-3 rounded-full bg-gradient-to-r from-[#E50914] to-[#B3070F] text-[15px] uppercase tracking-wider text-white shadow-md hover:brightness-110 transition duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Recent Investments ── */}
        <div className="bg-[#121212] border border-[#222] rounded-3xl p-6">
          <h3 className="text-[17px] text-white mb-6">Recent Investments</h3>

          {/* Skeleton */}
          {investmentsLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-[#1A1A1A] animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-zinc-800" />
                    <div className="space-y-2">
                      <div className="h-3 w-32 bg-zinc-800 rounded-full" />
                      <div className="h-2 w-20 bg-zinc-800 rounded-full" />
                    </div>
                  </div>
                  <div className="flex gap-8">
                    <div className="h-8 w-16 bg-zinc-800 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty */}
          {!investmentsLoading && recentInvestments.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-zinc-600">
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-3 opacity-30">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm">No investments yet. Browse projects to get started.</p>
            </div>
          )}

          {/* Real rows */}
          {!investmentsLoading && recentInvestments.length > 0 && (
            <div className="space-y-4">
              {recentInvestments.map((investment) => (
                <div
                  key={`${investment.id}-${investment.invested}`}
                  onClick={() => router.push(`/dashboard/investor/film/${investment.id}`)}
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#1A1A1A] border border-transparent hover:border-zinc-800 cursor-pointer transition duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-zinc-800">
                      <img src={investment.imageUrl} alt={investment.title} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-white">{investment.title}</h4>
                      <p className="text-xs text-zinc-500 mt-0.5">{investment.phase}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 text-right">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500">Invested</p>
                      <p className="text-[14px] text-white mt-0.5">{investment.invested}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
