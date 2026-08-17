"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Crown,
  BarChart2,
  Search,
  DollarSign,
  TrendingUp,
  Star,
  Eye,
  Users,
  ArrowUpRight,
  Settings,
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

import DashboardLayout from "./DashboardLayout";
import DashboardHeader from "./DashboardHeader";
import { getProjects } from "@/services/projectService";
import { getMyInvestments } from "@/services/investorService";

// Custom Tooltip for recharts
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-3 shadow-xl">
        <p className="text-sm font-bold text-white">
          {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function InvestorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : { full_name: "Investor", email: "" };
    }
    return { full_name: "Investor", email: "" };
  });
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

  const [hotProjects, setHotProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  const [recentInvestments, setRecentInvestments] = useState([]);
  const [investmentsLoading, setInvestmentsLoading] = useState(true);

  useEffect(() => {
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

        const totalInvested = data.reduce(
          (sum, inv) => sum + parseFloat(inv.investment_amount || 0),
          0
        );

        const averageRoi = 18.5;
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

        const monthlySum = {};
        const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];
        months.forEach((m) => {
          monthlySum[m] = 0;
        });

        data.forEach((inv) => {
          const date = new Date(inv.created_at || Date.now());
          const m = date.toLocaleString("default", { month: "short" });
          if (monthlySum[m] !== undefined) {
            monthlySum[m] += parseFloat(inv.investment_amount || 0);
          } else {
            monthlySum[m] = parseFloat(inv.investment_amount || 0);
          }
        });

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
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setAuthError(true);
          router.push("/login");
        } else {
          setRecentInvestments([]);
        }
      })
      .finally(() => setInvestmentsLoading(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0B0B] text-white">
        Loading...
      </div>
    );
  }

  const profileName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.full_name || user.name || "Investor"
    : "Investor";

  return (
    <DashboardLayout
      role="INVESTOR"
      header={
        <header className="w-full border-b border-[#2A2A2A] bg-[#0E0E0E]">
          <div className="flex items-center justify-between px-6 py-4 gap-2">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Filmee Logo"
                width={36}
                height={36}
                className="rounded-lg object-contain"
              />
              <div>
                <h1 className="text-xl font-bold leading-none text-white tracking-tight">
                  Investor Dashboard
                </h1>
                <p className="mt-1.5 text-xs text-zinc-400">
                  Welcome back, <span className="font-semibold text-zinc-300">{profileName}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 rounded-full border border-[#2A2A2A] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#1E1E1E] transition-colors">
                <Crown size={14} className="text-red-500" />
                <span>Professional</span>
              </button>

              <button
                onClick={() => router.push("/dashboard/investor/settings")}
                className="flex items-center gap-2 rounded-full border border-[#2A2A2A] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#1E1E1E] transition-colors"
              >
                <Settings size={14} className="text-red-500" />
                <span>Settings</span>
              </button>

              <button
                onClick={handleLogout}
                className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors px-2"
              >
                Logout
              </button>


            </div>
          </div>
        </header>
      }
    >
      <div className="p-6 md:p-8 space-y-6 md:space-y-8 bg-[#0B0B0B]">
        {/* Subheader */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Investment Overview
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">Track portfolio performance and project investments.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/dashboard/investor/analytics")}
              className="flex items-center gap-2 rounded-full border border-[#2A2A2A] px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:bg-[#1E1E1E] transition-colors"
            >
              <BarChart2 size={16} />
              <span>View Analytics</span>
            </button>
            <button
              onClick={() => router.push("/dashboard/investor/browse")}
              className="flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(229,9,20,0.4)]"
            >
              <Search size={16} />
              <span>Find Projects</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <button
            onClick={() => router.push("/dashboard/investor/analytics?tab=Revenue")}
            className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-5 flex flex-col justify-between hover:border-red-600/50 transition-all text-left w-full group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Total Invested</p>
              <div className="p-2 rounded-full bg-[#18C964]/10">
                <DollarSign size={16} className="text-[#18C964]" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-red-500 transition-colors">
                ${stats.totalInvested.toLocaleString()}
              </h3>
            </div>
          </button>

          <button
            onClick={() => router.push("/dashboard/investor/analytics?tab=Revenue")}
            className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-5 flex flex-col justify-between hover:border-red-600/50 transition-all text-left w-full group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Portfolio Value</p>
              <div className="p-2 rounded-full bg-blue-500/10">
                <TrendingUp size={16} className="text-blue-500" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-red-500 transition-colors">
                ${stats.portfolioValue.toLocaleString()}
              </h3>
            </div>
          </button>

          <button
            onClick={() => router.push("/dashboard/investor/analytics?tab=Performance")}
            className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-5 flex flex-col justify-between hover:border-red-600/50 transition-all text-left w-full group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Average ROI</p>
              <div className="p-2 rounded-full bg-yellow-500/10">
                <Star size={16} className="text-yellow-500" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-red-500 transition-colors">
                {stats.averageRoi}%
              </h3>
            </div>
          </button>

          <button
            onClick={() => router.push("/dashboard/investor/analytics?tab=Projects")}
            className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-5 flex flex-col justify-between hover:border-red-600/50 transition-all text-left w-full group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Active Projects</p>
              <div className="p-2 rounded-full bg-purple-500/10">
                <Eye size={16} className="text-purple-500" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-red-500 transition-colors">
                {stats.activeProjects}
              </h3>
            </div>
          </button>

          <button
            onClick={() => router.push("/dashboard/investor/analytics?tab=Projects")}
            className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-5 flex flex-col justify-between hover:border-red-600/50 transition-all text-left w-full group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Completed</p>
              <div className="p-2 rounded-full bg-red-500/10">
                <Users size={16} className="text-red-500" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-red-500 transition-colors">
                {stats.completedProjects}
              </h3>
            </div>
          </button>
        </div>

        {/* Subscription Banner */}
        <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-red-600/40 transition-all">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="h-12 w-12 rounded-2xl bg-[#1E1E1E] flex items-center justify-center text-red-500 shrink-0">
              <Crown size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">{subscription.planName}</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Renews {subscription.renewalDate}</p>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-[#2A2A2A]">
            <button
              onClick={() => router.push("/dashboard/investor/subscription")}
              className="flex items-center gap-2 rounded-full border border-[#2A2A2A] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#1E1E1E] transition-colors"
            >
              Manage Subscription
            </button>

            <div className="text-right">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white tracking-tight">{subscription.price}</span>
                <span className="text-xs text-zinc-400">/monthly</span>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#18C964] bg-[#18C964]/10 mt-1">
                {subscription.status}
              </span>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Portfolio Performance</h3>
              <span className="text-[#18C964] flex items-center gap-0.5">
                <ArrowUpRight size={18} />
              </span>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={portfolioHistory}>
                  <defs>
                    <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E50914" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#E50914" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                  <XAxis dataKey="month" stroke="#52525B" tick={{ fill: '#A1A1AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" stroke="#E50914" strokeWidth={3} fill="url(#portfolioGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Investment Distribution</h3>
              <span className="text-blue-500 flex items-center gap-0.5">
                <DollarSign size={18} />
              </span>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                  <XAxis dataKey="genre" stroke="#52525B" tick={{ fill: '#A1A1AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="#E50914" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Hot Projects This Week */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6">Hot Projects This Week</h3>

          {projectsLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6 animate-pulse">
                  <div className="h-40 w-full bg-zinc-800 rounded-xl mb-4" />
                  <div className="h-4 w-3/4 bg-zinc-800 rounded mb-2" />
                  <div className="h-3 w-1/2 bg-zinc-800 rounded mb-4" />
                </div>
              ))}
            </div>
          )}

          {!projectsLoading && hotProjects.length === 0 && (
            <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-8 text-center text-zinc-500">
              No projects available right now.
            </div>
          )}

          {!projectsLoading && hotProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hotProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] overflow-hidden hover:border-red-600/40 transition-all flex flex-col justify-between"
                >
                  <div className="relative h-44 w-full bg-zinc-900">
                    <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover opacity-80" />
                    <span className="absolute top-4 left-4 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600 text-white">
                      {project.status}
                    </span>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight">{project.title}</h4>
                      <p className="text-xs text-zinc-400 mt-1">{project.genre} • {project.timeline}</p>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-zinc-400">Funding Progress</span>
                        <span className="text-zinc-300">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-[#2A2A2A] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-red-600 h-full rounded-full" style={{ width: `${project.progress}%` }} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-[#2A2A2A] pt-4 text-xs">
                      <div>
                        <p className="uppercase tracking-wider text-zinc-500 font-medium">Target ROI</p>
                        <p className="text-sm font-bold text-white mt-1">{project.targetRoi}</p>
                      </div>
                      <div>
                        <p className="uppercase tracking-wider text-zinc-500 font-medium">Budget</p>
                        <p className="text-sm font-bold text-white mt-1">{project.budget}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => router.push(`/dashboard/investor/film/${project.id}`)}
                      className="w-full mt-2 rounded-full bg-red-600 hover:bg-red-700 text-xs font-bold uppercase tracking-wider py-2.5 text-white transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Investments */}
        <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6">
          <h3 className="text-lg font-bold text-white mb-6">Recent Investments</h3>

          {investmentsLoading && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 rounded-2xl bg-[#1A1A1A] animate-pulse" />
              ))}
            </div>
          )}

          {!investmentsLoading && recentInvestments.length === 0 && (
            <p className="text-sm text-zinc-500 text-center py-6">No investments yet. Browse projects to get started.</p>
          )}

          {!investmentsLoading && recentInvestments.length > 0 && (
            <div className="space-y-3">
              {recentInvestments.map((investment) => (
                <div
                  key={`${investment.id}-${investment.invested}`}
                  onClick={() => router.push(`/dashboard/investor/film/${investment.id}`)}
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-red-600/30 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-10 w-10 rounded-xl overflow-hidden bg-zinc-800 shrink-0">
                      <img src={investment.imageUrl} alt={investment.title} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{investment.title}</h4>
                      <p className="text-xs text-zinc-400 mt-0.5">{investment.phase}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Invested</p>
                    <p className="text-sm font-bold text-white mt-0.5">{investment.invested}</p>
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
