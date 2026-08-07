"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Search,
  Bell,
  TrendingUp,
  DollarSign,
  Users,
  Star,
  ChevronDown,
  Play,
} from "lucide-react";
import Image from "next/image";

// ── Static Data ───────────────────────────────────────────────────────────────

const STATS = [
  { icon: TrendingUp, value: "500+",  label: "Active Projects" },
  { icon: DollarSign, value: "$50M+", label: "Total Funding" },
  { icon: Users,      value: "10K+",  label: "Investors" },
  { icon: Star,       value: "4.8",   label: "Avg Rating" },
];

const GENRES    = ["All Genres",  "Sci-Fi", "Thriller", "Horror", "Drama", "Action", "Documentary", "Romance", "Comedy"];
const BUDGETS   = ["All Budgets", "Under $50K", "$50K–$200K", "$200K–$500K", "$500K+"];

const PROJECTS = [
  {
    id: 1,
    title: "The Last Frame",
    genre: "Sci-Fi",
    budget: 250000,
    fundedPct: 78,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    size: "tall",   // spans 2 rows
  },
  {
    id: 2,
    title: "Silent Echoes",
    genre: "Thriller",
    budget: 180000,
    fundedPct: 55,
    image: "https://images.unsplash.com/photo-1512070679279-8988d32161be?auto=format&fit=crop&w=800&q=80",
    size: "tall",
  },
  {
    id: 3,
    title: "Neon Nights",
    genre: "Sci-Fi",
    budget: 320000,
    fundedPct: 91,
    image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=800&q=80",
    size: "normal",
  },
  {
    id: 4,
    title: "Urban Legend",
    genre: "Horror",
    budget: 95000,
    fundedPct: 43,
    image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=800&q=80",
    size: "normal",
  },
  {
    id: 5,
    title: "Mountain Peak",
    genre: "Thriller",
    budget: 210000,
    fundedPct: 67,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    size: "normal",
  },
  {
    id: 6,
    title: "Central Cinema",
    genre: "Drama",
    budget: 140000,
    fundedPct: 38,
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
    size: "normal",
  },
  {
    id: 7,
    title: "Crimson Dawn",
    genre: "Drama",
    budget: 175000,
    fundedPct: 82,
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
    size: "normal",
  },
  {
    id: 8,
    title: "Midnight Pulse",
    genre: "Action",
    budget: 450000,
    fundedPct: 61,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    size: "normal",
  },
  {
    id: 9,
    title: "The Real Story",
    genre: "Documentary",
    budget: 60000,
    fundedPct: 95,
    image: "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?auto=format&fit=crop&w=800&q=80",
    size: "normal",
  },
  {
    id: 10,
    title: "Forgotten Horizon",
    genre: "Romance",
    budget: 120000,
    fundedPct: 72,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    size: "normal",
  },
  {
    id: 11,
    title: "Steel & Shadows",
    genre: "Action",
    budget: 380000,
    fundedPct: 54,
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80",
    size: "normal",
  },
  {
    id: 12,
    title: "Voices Unheard",
    genre: "Documentary",
    budget: 85000,
    fundedPct: 88,
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
    size: "normal",
  },
];

const formatBudget = (n) => {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
};

const budgetInRange = (budget, filter) => {
  if (filter === "All Budgets")     return true;
  if (filter === "Under $50K")      return budget < 50_000;
  if (filter === "$50K–$200K")      return budget >= 50_000  && budget < 200_000;
  if (filter === "$200K–$500K")     return budget >= 200_000 && budget < 500_000;
  if (filter === "$500K+")          return budget >= 500_000;
  return true;
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProjectOverviewPage() {
  const router = useRouter();
  const [search, setSearch]         = useState("");
  const [genreFilter, setGenreFilter]   = useState("All Genres");
  const [budgetFilter, setBudgetFilter] = useState("All Budgets");
  const [hovered, setHovered]       = useState(null);

  const filtered = PROJECTS.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      p.title.toLowerCase().includes(q) ||
      p.genre.toLowerCase().includes(q);
    const matchGenre  = genreFilter  === "All Genres"   || p.genre === genreFilter;
    const matchBudget = budgetInRange(p.budget, budgetFilter);
    return matchSearch && matchGenre && matchBudget;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 z-[999] w-full border-b border-zinc-800 bg-black/95 backdrop-blur-md">
        <div className="flex h-20 w-full items-center justify-between px-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Filmee Logo" width={60} height={60} priority />
            <div className="text-3xl font-extrabold tracking-tight leading-none">
              <span className="text-white">Fil</span>
              <span className="text-red-500">m</span>
              <span className="text-white">ee</span>
            </div>
          </Link>

          {/* Nav links */}
          <div className="hidden lg:flex items-center gap-12 text-[15px] font-semibold text-white">
            <Link href="/"                className="transition duration-300 hover:text-red-500">Home</Link>
            <Link href="/project-overview" className="text-red-500">Projects</Link>
            <Link href="/talent-overview" className="transition duration-300 hover:text-red-500">Talent</Link>
            <Link href="/"                className="transition duration-300 hover:text-red-500">Investors</Link>
            <Link href="/"                className="transition duration-300 hover:text-red-500">Pricing</Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <Link href="/search">
              <Search size={22} className="cursor-pointer text-white transition duration-300 hover:text-red-500" />
            </Link>
            <Link href="/notifications">
              <Bell   size={22} className="cursor-pointer text-white transition duration-300 hover:text-red-500" />
            </Link>
            <Link href="/login">
              <button className="group relative overflow-hidden rounded-full border border-red-600 px-8 py-3 text-red-500 transition-all duration-300 hover:scale-105 text-sm font-semibold">
                <span className="absolute inset-0 -translate-x-full bg-red-600 transition-transform duration-300 group-hover:translate-x-0" />
                <span className="relative z-10 group-hover:text-white">SIGN IN</span>
              </button>
            </Link>
            <Link href="/signup">
              <button className="rounded-full bg-gradient-to-r from-red-700 to-red-500 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(229,9,20,0.5)]">
                JOIN NOW
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <main className="pt-28 pb-20 px-16 max-w-7xl mx-auto">

        {/* Hero */}
        <div className="mb-10">
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-200 text-sm"
          >
            <ArrowLeft size={16} />
          </button>

          <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
            Discover{" "}
            <span className="text-red-500">Amazing Projects</span>
          </h1>
          <p className="mt-4 max-w-xl text-zinc-400 leading-relaxed">
            Explore groundbreaking film projects from talented creators worldwide. Find your next
            investment opportunity or collaboration.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search projects, genres, or directors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#141414] border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-red-600 transition-colors duration-200"
            />
          </div>

          <div className="relative">
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="appearance-none bg-[#141414] border border-zinc-800 rounded-xl px-5 py-3 pr-10 text-sm text-white outline-none focus:border-red-600 transition-colors duration-200 cursor-pointer"
            >
              {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          </div>

          <div className="relative">
            <select
              value={budgetFilter}
              onChange={(e) => setBudgetFilter(e.target.value)}
              className="appearance-none bg-[#141414] border border-zinc-800 rounded-xl px-5 py-3 pr-10 text-sm text-white outline-none focus:border-red-600 transition-colors duration-200 cursor-pointer"
            >
              {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-14">
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex flex-col items-center gap-2">
                <Icon size={28} className="text-red-500" />
                <span className="text-2xl font-extrabold text-white">{s.value}</span>
                <span className="text-xs text-zinc-400">{s.label}</span>
              </div>
            );
          })}
        </div>

        {/* ── Project Grid ── */}
        {filtered.length === 0 ? (
          <p className="text-center text-zinc-500 py-20">No projects match your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((project) => (
              <div
                key={project.id}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                className="relative h-64 overflow-hidden rounded-2xl cursor-pointer group"
              >
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                {/* Top badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                    {project.fundedPct}% Funded
                  </span>
                  <span className="bg-black/70 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-zinc-700">
                    {project.genre}
                  </span>
                </div>

                {/* Hover overlay content */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${
                    hovered === project.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <p className="text-white font-bold text-base mb-2">{project.title}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-white text-sm font-semibold">
                      <DollarSign size={14} className="text-red-400" />
                      {formatBudget(project.budget)}
                    </div>
                    <button
                      onClick={() => router.push("/login?redirect=/dashboard/filmmaker/projects")}
                      className="bg-red-600 hover:bg-red-500 transition-colors duration-200 rounded-full p-2"
                    >
                      <Play size={14} className="fill-white text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
