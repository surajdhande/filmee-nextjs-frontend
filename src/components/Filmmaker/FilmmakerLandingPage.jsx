"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Search,
  Bell,
  Film,
  TrendingUp,
  Users,
  Clapperboard,
  BarChart3,
  MessageSquare,
  Shield,
} from "lucide-react";

const STATS = [
  { icon: Film, value: "1,200+", label: "Active Projects" },
  { icon: TrendingUp, value: "$42M+", label: "Capital Raised" },
  { icon: Users, value: "8K+", label: "Talent Network" },
  { icon: BarChart3, value: "92%", label: "Pitch Success" },
];

const FEATURES = [
  {
    icon: Clapperboard,
    title: "Build Compelling Pitches",
    description:
      "Upload decks, trailers, and story materials so investors understand your vision at a glance.",
  },
  {
    icon: TrendingUp,
    title: "Track Funding Progress",
    description:
      "Monitor offers, escrow milestones, and investor interest from a single filmmaker dashboard.",
  },
  {
    icon: Users,
    title: "Hire World-Class Talent",
    description:
      "Post roles, review applications, and message crew members without leaving the platform.",
  },
  {
    icon: MessageSquare,
    title: "Collaborate in Real Time",
    description:
      "Keep investors and talent aligned with built-in messaging and project updates.",
  },
  {
    icon: Shield,
    title: "Secure Escrow Payments",
    description:
      "Release funds through milestone-based escrow so every party stays protected.",
  },
  {
    icon: BarChart3,
    title: "Production Analytics",
    description:
      "See views, applications, and funding trends to refine your pitch and outreach.",
  },
];

function filmmakerDashboardPath() {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (token && user?.role === "FILMMAKER") {
      return "/dashboard/filmmaker";
    }
  } catch {
    /* ignore */
  }
  return "/signup?role=FILMMAKER";
}

export default function FilmmakerLandingPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredFeatures = FEATURES.filter(
    (f) =>
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.description.toLowerCase().includes(search.toLowerCase()),
  );

  const handleGetStarted = () => {
    router.push(filmmakerDashboardPath());
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="fixed top-0 left-0 z-[999] w-full border-b border-zinc-800 bg-black/95 backdrop-blur-md">
        <div className="flex h-16 sm:h-20 w-full items-center justify-between px-4 sm:px-8 lg:px-16">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/logo.png"
              alt="Filmee Logo"
              width={40}
              height={40}
              className="sm:h-[60px] sm:w-[60px]"
              priority
            />
            <div className="text-xl font-extrabold leading-none tracking-tight sm:text-3xl">
              <span className="text-white">Fil</span>
              <span className="text-red-500">m</span>
              <span className="text-white">ee</span>
            </div>
          </Link>

          <div className="hidden items-center gap-12 text-[15px] font-semibold text-white lg:flex">
            <Link href="/" className="transition duration-300 hover:text-red-500">
              Home
            </Link>
            <Link href="/project-overview" className="transition duration-300 hover:text-red-500">
              Projects
            </Link>
            <Link href="/filmmaker" className="text-red-500">
              Filmmakers
            </Link>
            <Link href="/investors" className="transition duration-300 hover:text-red-500">
              Investors
            </Link>
            <Link href="/pricing" className="transition duration-300 hover:text-red-500">
              Pricing
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/search">
              <Search
                size={20}
                className="cursor-pointer text-white transition duration-300 hover:text-red-500"
              />
            </Link>
            <Link href="/notifications">
              <Bell
                size={20}
                className="cursor-pointer text-white transition duration-300 hover:text-red-500"
              />
            </Link>
            <Link href="/login">
              <button
                type="button"
                className="group relative overflow-hidden rounded-full border border-red-600 px-4 py-2 text-xs font-semibold text-red-500 transition-all duration-300 hover:scale-105 sm:px-8 sm:py-3 sm:text-sm"
              >
                <span className="absolute inset-0 -translate-x-full bg-red-600 transition-transform duration-300 group-hover:translate-x-0" />
                <span className="relative z-10 group-hover:text-white">SIGN IN</span>
              </button>
            </Link>
            <button
              type="button"
              onClick={handleGetStarted}
              className="hidden rounded-full bg-gradient-to-r from-red-700 to-red-500 px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(229,9,20,0.5)] sm:block sm:px-8 sm:py-3 sm:text-sm"
            >
              GET STARTED
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 lg:px-16">
        <div className="mb-10">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-sm text-zinc-400 transition-colors duration-200 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Bring Your Film{" "}
            <span className="text-red-500">To Life</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Pitch projects, connect with investors, search for talent, and use professional
            production tools to turn your story into reality on Filmee.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={handleGetStarted}
              className="rounded-full bg-gradient-to-r from-red-700 to-red-500 px-8 py-3 text-sm font-bold text-white transition-all duration-200 hover:scale-105 hover:brightness-110"
            >
              Start as Filmmaker
            </button>
            <Link
              href="/create-project"
              className="rounded-full border border-zinc-700 px-8 py-3 text-sm font-semibold text-white transition-colors hover:border-red-600 hover:text-red-400"
            >
              Create a Project
            </Link>
          </div>
        </div>

        <div className="relative mb-10 flex-1">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="text"
            placeholder="Search filmmaker tools and features..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-[#141414] py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-colors duration-200 focus:border-red-600"
          />
        </div>

        <div className="mb-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex flex-col items-center gap-2 text-center">
                <Icon size={28} className="text-red-500" />
                <span className="text-xl font-extrabold text-white sm:text-2xl">{s.value}</span>
                <span className="text-[10px] text-zinc-400 sm:text-xs">{s.label}</span>
              </div>
            );
          })}
        </div>

        {filteredFeatures.length === 0 ? (
          <p className="py-20 text-center text-zinc-500">No features match your search.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-[#111111] p-6 transition-colors duration-300 hover:border-red-800"
                >
                  <Icon size={22} className="text-red-500" />
                  <h2 className="text-lg font-bold text-white">{feature.title}</h2>
                  <p className="text-sm leading-relaxed text-zinc-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
