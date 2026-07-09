"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Crown,
  Settings,
  Radio,
  BarChart2,
  Search,
  DollarSign,
  TrendingUp,
  Star,
  Eye,
  Users,
  ArrowUpRight,
  TrendingDown,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

import Image from "next/image";
import DashboardLayout from "./DashboardLayout";
import InvestorLayout from "./investor/InvestorLayout";

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

  // --- EASY BACKEND INTEGRATION STATE ---
  // You can replace these initial states with data fetched inside the useEffect block below.
  const [stats, setStats] = useState({
    totalInvested: 2500000,
    portfolioValue: 3198750,
    averageRoi: 18.5,
    activeProjects: 12,
    completedProjects: 8,
  });

  const [subscription, setSubscription] = useState({
    planName: "Professional Plan",
    renewalDate: "1/1/2025",
    price: "$49",
    status: "Active",
  });

  const [portfolioHistory, setPortfolioHistory] = useState([
    { month: "Feb", value: 1200000 },
    { month: "Mar", value: 1600000 },
    { month: "Apr", value: 2000000 },
    { month: "May", value: 2300000 },
    { month: "Jun", value: 2500000 },
  ]);

  const [distributionData, setDistributionData] = useState([
    { genre: "Drama", value: 85 },
    { genre: "Thriller", value: 70 },
    { genre: "Comedy", value: 45 },
    { genre: "Action", value: 42 },
    { genre: "Horror", value: 25 },
  ]);

  const [hotProjects, setHotProjects] = useState([
    {
      id: 1,
      title: "The Last Frame",
      genre: "Thriller",
      timeline: "8 months",
      progress: 60,
      targetRoi: "25%",
      budget: "$250,000",
      status: "Pre-Production",
      rating: 4.8,
      imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      title: "Silent Echoes",
      genre: "Drama",
      timeline: "6 months",
      progress: 25,
      targetRoi: "22%",
      budget: "$180,000",
      status: "Development",
      rating: 4.6,
      imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      title: "Neon Nights",
      genre: "Sci Fi",
      timeline: "12 months",
      progress: 25,
      targetRoi: "30%",
      budget: "$500,000",
      status: "Pre-Production",
      rating: 4.9,
      imageUrl: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=900&q=80",
    },
  ]);

  const [recentInvestments, setRecentInvestments] = useState([
    {
      id: 101,
      title: "Midnight Runner",
      phase: "Post-Production",
      invested: "$50,000",
      roi: "+24%",
      roiPositive: true,
      imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 102,
      title: "Ocean Deep",
      phase: "Distribution",
      invested: "$75,000",
      roi: "+18.7%",
      roiPositive: true,
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80",
    },
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser({
        full_name: "Mervin Consultant",
        email: "mervin@consultant.com",
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  const profileName = user?.full_name || user?.name || "Mervin Consultant";

  return (
    <DashboardLayout
      role="INVESTOR"
      header={
        <header className="w-full border-b border-[#262626] bg-[#0E0E0E]">
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
                <h1 className="text-[18px] font-bold leading-none text-white tracking-tight">
                  Investor Dashboard
                </h1>
                <p className="mt-1.5 text-xs text-zinc-400">
                  Welcome back, <span className="font-semibold text-zinc-300">{profileName}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-1.5 rounded-full border border-[#E50914]/50 px-4 py-1.5 hover:bg-[#E50914]/10 transition-all duration-300">
                <Crown size={13} className="text-[#E50914]" />
                <span className="text-[15px] font-bold uppercase tracking-wider text-[#E50914]">
                  Professional
                </span>
              </button>

              <button className="flex items-center gap-1.5 rounded-full border border-[#E50914]/50 px-4 py-1.5 hover:bg-[#E50914]/10 transition-all duration-300">
                <Settings size={13} className="text-[#E50914]"/>
                <span className="text-[15px] font-bold uppercase tracking-wider text-[#E50914]">
                  Settings
                </span>
              </button>

              <button
                onClick={handleLogout}
                className="text-s font-semibold text-zinc-400 hover:text-white transition duration-300 uppercase px-2"
              >
                LOGOUT
              </button>

              <div className="flex items-center gap-1.5 rounded-full bg-[#18C964] px-3 py-1.5 shadow-[0_0_12px_rgba(24,201,100,0.3)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                  Live
                </span>
              </div>
            </div>
          </div>
        </header>
      }
    >

      <div className="p-8 space-y-8 bg-[#0B0B0B]">
        {/* 2. Subheader Action Row */}
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-bold text-white tracking-wide">
            Investment Overview
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/dashboard/investor/analytics")}
              className="flex items-center gap-1.5 rounded-full border border-[#E50914]/50 px-4 py-1.5 text-[16px] hover:bg-[#E50914]/10 transition-all duration-300 text-[#E50914]"
            >
              <BarChart2 size={15} />
              View Analytics
            </button>
            <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E50914] to-[#FF2E2E] px-5 py-2.5 text-[16px] font-bold uppercase tracking-wider text-white shadow-[0_0_18px_rgba(229,9,20,0.45)] hover:brightness-110 transition-all duration-300">
              <Search size={15} />
              Find Projects
            </button>
          </div>
        </div>

        {/* 3. Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {/* Card 1: Total Invested */}
          <button
            onClick={() => router.push("/dashboard/investor/analytics?tab=Revenue")}
            className="bg-[#121212] border border-[#222] rounded-2xl p-5 flex items-center justify-between hover:border-[#E50914]/30 hover:shadow-[0_4px_20px_rgba(229,9,20,0.08)] hover:-translate-y-0.5 transition-all duration-300 text-left w-full"
          >
            <div>
              <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider">
                Total Invested
              </p>
              <h3 className="text-[22px] font-extrabold text-white mt-1.5">
                ${stats.totalInvested.toLocaleString()}
              </h3>
            </div>
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-green-500/10 text-green-500">
              <DollarSign size={20} />
            </div>
          </button>

          {/* Card 2: Portfolio Value */}
          <button
            onClick={() => router.push("/dashboard/investor/analytics?tab=Revenue")}
            className="bg-[#121212] border border-[#222] rounded-2xl p-5 flex items-center justify-between hover:border-[#E50914]/30 hover:shadow-[0_4px_20px_rgba(229,9,20,0.08)] hover:-translate-y-0.5 transition-all duration-300 text-left w-full"
          >
            <div>
              <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider">
                Portfolio Value
              </p>
              <h3 className="text-[22px] font-extrabold text-white mt-1.5">
                ${stats.portfolioValue.toLocaleString()}
              </h3>
            </div>
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <TrendingUp size={20} />
            </div>
          </button>

          {/* Card 3: Average ROI */}
          <button
            onClick={() => router.push("/dashboard/investor/analytics?tab=Performance")}
            className="bg-[#121212] border border-[#222] rounded-2xl p-5 flex items-center justify-between hover:border-[#E50914]/30 hover:shadow-[0_4px_20px_rgba(229,9,20,0.08)] hover:-translate-y-0.5 transition-all duration-300 text-left w-full"
          >
            <div>
              <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider">
                Average ROI
              </p>
              <h3 className="text-[22px] font-extrabold text-white mt-1.5">
                {stats.averageRoi}%
              </h3>
            </div>
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500">
              <Star size={18} fill="currentColor" />
            </div>
          </button>

          {/* Card 4: Active Projects */}
          <button
            onClick={() => router.push("/dashboard/investor/analytics?tab=Projects")}
            className="bg-[#121212] border border-[#222] rounded-2xl p-5 flex items-center justify-between hover:border-[#E50914]/30 hover:shadow-[0_4px_20px_rgba(229,9,20,0.08)] hover:-translate-y-0.5 transition-all duration-300 text-left w-full"
          >
            <div>
              <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider">
                Active Projects
              </p>
              <h3 className="text-[22px] font-extrabold text-white mt-1.5">
                {stats.activeProjects}
              </h3>
            </div>
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <Eye size={20} />
            </div>
          </button>

          {/* Card 5: Completed */}
          <button
            onClick={() => router.push("/dashboard/investor/analytics?tab=Projects")}
            className="bg-[#121212] border border-[#222] rounded-2xl p-5 flex items-center justify-between hover:border-[#E50914]/30 hover:shadow-[0_4px_20px_rgba(229,9,20,0.08)] hover:-translate-y-0.5 transition-all duration-300 text-left w-full"
          >
            <div>
              <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider">
                Completed
              </p>
              <h3 className="text-[22px] font-extrabold text-white mt-1.5">
                {stats.completedProjects}
              </h3>
            </div>
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500">
              <Users size={20} />
            </div>
          </button>
        </div>

        {/* 4. Professional Plan Banner */}
        <div className="bg-[#121212] border border-[#222] rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-zinc-800 transition duration-300">
          <div className="flex items-center gap-5 w-full md:w-auto">
            <div className="h-14 w-14 rounded-2xl bg-[#E50914]/10 border border-[#E50914]/20 flex items-center justify-center text-[#E50914] shrink-0">
              <Crown size={26} />
            </div>
            <div>
              <h4 className="text-[17px] font-bold text-white">
                {subscription.planName}
              </h4>
              <p className="text-sm text-zinc-500 mt-1">
                Renews {subscription.renewalDate}
              </p>
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

        {/* 5. Charts (Portfolio & Distribution) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Portfolio Performance Chart */}
          <div className="bg-[#121212] border border-[#222] rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[17px] font-bold text-white">
                  Portfolio Performance
                </h3>
              </div>
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
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#666", fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#E50914"
                    strokeWidth={3}
                    fill="url(#portfolioGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Investment Distribution Chart */}
          <div className="bg-[#121212] border border-[#222] rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[17px] font-bold text-white">
                  Investment Distribution
                </h3>
              </div>
              <span className="text-blue-400 flex items-center gap-0.5">
                <DollarSign size={18} />
              </span>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis
                    dataKey="genre"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#666", fontSize: 12 }}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill="#E50914"
                    radius={[6, 6, 0, 0]}
                    barSize={90}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 6. Hot Projects This Week */}
        <div>
          <h3 className="text-[18px] font-bold text-white mb-6">
            Hot Projects This Week
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hotProjects.map((project) => (
              <div
                key={project.id}
                className="bg-[#121212] border border-[#222] rounded-3xl overflow-hidden hover:-translate-y-1 hover:border-[#E50914]/30 hover:shadow-[0_8px_30px_rgb(229,9,20,0.06)] transition-all duration-300"
              >
                {/* Image Section */}
                <div className="relative h-48 w-full bg-zinc-900">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover opacity-80"
                  />
                  {/* Status Badge */}
                  <span className="absolute top-4 left-4 rounded-full bg-[#E50914] px-3 py-1 text-[10px] font-bold tracking-wider text-white">
                    {project.status}
                  </span>
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-4 flex items-center gap-1 rounded-sm bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs  text-white-500">
                    <Star size={12} fill="yellow" />
                    {project.rating}
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-[16px] font-bold text-white tracking-tight">
                      {project.title}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-1">
                      {project.genre} • {project.timeline}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-zinc-500">Progress</span>
                      <span className="text-zinc-300">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#E50914] h-full rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* ROI & Budget */}
                  <div className="grid grid-cols-2 gap-4 border-t border-zinc-800/60 pt-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                        Target ROI
                      </p>
                      <p className="text-[14px] font-bold text-white mt-1">
                        {project.targetRoi}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                        Budget
                      </p>
                      <p className="text-[14px] font-bold text-white mt-1">
                        {project.budget}
                      </p>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => router.push(`/dashboard/investor/film/${project.id}`)}
                    className="w-full mt-2 py-3 rounded-full bg-gradient-to-r from-[#E50914] to-[#B3070F] text-[15px]  uppercase tracking-wider text-white shadow-md hover:brightness-110 transition duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Recent Investments */}
        <div className="bg-[#121212] border border-[#222] rounded-3xl p-6">
          <h3 className="text-[17px]  text-white mb-6">
            Recent Investments
          </h3>

          <div className="space-y-4">
            {recentInvestments.map((investment) => (
              <div
                key={investment.id}
                onClick={() => router.push(`/dashboard/investor/film/${investment.id}`)}
                className="flex items-center justify-between p-4 rounded-2xl bg-[#1A1A1A] border border-transparent hover:border-zinc-800 cursor-pointer transition duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-zinc-800">
                    <img
                      src={investment.imageUrl}
                      alt={investment.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-white">
                      {investment.title}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {investment.phase}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8 text-right">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                      Invested
                    </p>
                    <p className="text-[14px]  text-white mt-0.5">
                      {investment.invested}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                      ROI
                    </p>
                    <p className="text-[14px] font-bold text-emerald-400 mt-0.5">
                      {investment.roi}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
