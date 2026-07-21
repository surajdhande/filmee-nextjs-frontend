"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Film,
  Clapperboard,
  Users,
  CalendarDays,
  DollarSign,
  UsersRound,
  Megaphone,
} from "lucide-react";

// ── Data ─────────────────────────────────────────────────────────────────────

const PROJECT_TYPES = [
  {
    id: "feature",
    icon: Film,
    label: "Feature Film",
    description: "Full-length theatrical releases",
    minBudget: "$100K+",
    timeline: "12-24 months",
    popular: true,
  },
  {
    id: "short",
    icon: Clapperboard,
    label: "Short Film",
    description: "Creative storytelling in under 40 minutes",
    minBudget: "$5K+",
    timeline: "2-6 months",
    popular: false,
  },
  {
    id: "documentary",
    icon: Users,
    label: "Documentary",
    description: "Non-fiction storytelling",
    minBudget: "$25K+",
    timeline: "6-18 months",
    popular: true,
  },
  {
    id: "webseries",
    icon: CalendarDays,
    label: "Web Series",
    description: "Episodic content for streaming",
    minBudget: "$10K+",
    timeline: "3-12 months",
    popular: false,
  },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Project Setup",
    description: "Define your project type, genre, and basic information",
  },
  {
    step: 2,
    title: "Budget Planning",
    description: "Create detailed budget breakdowns and funding goals",
  },
  {
    step: 3,
    title: "Team Building",
    description: "Find and connect with talented crew members",
  },
  {
    step: 4,
    title: "Launch Campaign",
    description: "Go live and start attracting investors and talent",
  },
];

const FEATURES = [
  {
    icon: DollarSign,
    title: "Budget Management",
    description:
      "Advanced budgeting tools with line-item tracking, expense monitoring, and financial reporting.",
  },
  {
    icon: UsersRound,
    title: "Team Collaboration",
    description:
      "Built-in communication tools, file sharing, and project management features for seamless collaboration.",
  },
  {
    icon: CalendarDays,
    title: "Production Scheduling",
    description:
      "Professional scheduling tools with calendar integration, milestone tracking, and deadline management.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function CreateProjectOverviewPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 z-[999] w-full border-b border-zinc-800 bg-black/95 backdrop-blur-md">
        <div className="flex h-16 w-full items-center justify-between px-8">
          {/* Back + Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm text-zinc-400 transition-colors duration-200 hover:text-white"
            >
              <ArrowLeft size={16} />
              <span className="font-medium">BACK</span>
            </button>

            <Link href="/" className="flex items-center gap-2">
              <Film size={22} className="text-red-600" />
              <span className="text-lg font-extrabold tracking-tight text-white">
                FILMCONNECT
              </span>
            </Link>
          </div>

          {/* CTA */}
          <Link href="/dashboard/filmmaker/create-project">
            <button className="rounded-full bg-gradient-to-r from-red-700 to-red-500 px-6 py-2.5 text-sm font-bold tracking-wider text-white shadow-[0_0_18px_rgba(220,38,38,0.35)] transition-all duration-300 hover:brightness-110 hover:scale-105">
              GET STARTED
            </button>
          </Link>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="flex min-h-[420px] flex-col items-center justify-center bg-black px-6 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          <span className="text-white">Create Your </span>
          <span className="text-red-500">Film Project</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
          Turn your vision into reality. Connect with investors, find talented crew members, and
          bring your story to the world through our comprehensive project creation platform.
        </p>

        <Link href="/dashboard/filmmaker/create-project" className="mt-8">
          <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-red-700 to-red-500 px-8 py-4 text-sm font-bold tracking-widest text-white shadow-[0_0_24px_rgba(220,38,38,0.4)] transition-all duration-300 hover:brightness-110 hover:scale-105">
            <Plus size={18} />
            START NEW PROJECT
          </button>
        </Link>
      </section>

      {/* ── Choose Project Type ── */}
      <section className="bg-[#0d0d0d] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-extrabold text-white">
            Choose Your Project Type
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROJECT_TYPES.map(({ id, icon: Icon, label, description, minBudget, timeline, popular }) => (
              <div
                key={id}
                className="relative flex flex-col gap-3 rounded-2xl border border-zinc-700 bg-[#141820] p-6 transition-all duration-300 hover:border-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.15)]"
              >
                {popular && (
                  <span className="absolute right-4 top-4 rounded-full bg-red-600 px-3 py-0.5 text-[11px] font-bold text-white tracking-wider">
                    Popular
                  </span>
                )}

                <Icon size={28} className="text-red-500" />

                <div>
                  <h3 className="text-base font-bold text-white">{label}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-400">{description}</p>
                </div>

                <div className="mt-auto space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Min Budget:</span>
                    <span className="font-semibold text-white">{minBudget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Timeline:</span>
                    <span className="font-semibold text-red-400">{timeline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-black px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-extrabold text-white">How It Works</h2>
          <p className="mt-3 text-sm text-red-500 font-medium tracking-wide">
            From concept to completion in four simple steps
          </p>

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map(({ step, title, description }) => (
              <div key={step} className="flex flex-col items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-xl font-extrabold text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                  {step}
                </div>
                <h3 className="text-base font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Powerful Features ── */}
      <section className="bg-[#0d0d0d] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-extrabold text-white">
            Powerful Features
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col gap-4 rounded-2xl border border-zinc-700 bg-[#141820] p-6 transition-all duration-300 hover:border-red-700"
              >
                <Icon size={26} className="text-red-500" />
                <div>
                  <h3 className="text-sm font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ready CTA ── */}
      <section className="bg-black px-6 py-24 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-4xl font-extrabold text-white">
            Ready to Create Your Project?
          </h2>
          <p className="mt-5 text-base leading-7 text-zinc-400">
            Join thousands of filmmakers who have successfully funded and produced their projects through FilmConnect.
          </p>

          <Link href="/dashboard/filmmaker/create-project" className="mt-10 inline-block">
            <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-red-700 to-red-500 px-10 py-4 text-sm font-bold tracking-widest text-white shadow-[0_0_24px_rgba(220,38,38,0.4)] transition-all duration-300 hover:brightness-110 hover:scale-105">
              <Plus size={18} />
              START CREATING NOW
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
