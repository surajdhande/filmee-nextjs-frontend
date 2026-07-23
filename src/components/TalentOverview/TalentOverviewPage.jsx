"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Search,
  Bell,
  Users,
  DollarSign,
  Star,
  Clock,
  MapPin,
  ChevronDown,
  Camera,
  Mic2,
  Music,
  Film,
  Palette,
  Pencil,
} from "lucide-react";
import Image from "next/image";

// ── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  { icon: Users,       value: "2,500+", label: "Active Roles" },
  { icon: DollarSign,  value: "$8M+",   label: "Total Payouts" },
  { icon: Star,        value: "15K+",   label: "Talent Members" },
  { icon: Clock,       value: "48hrs",  label: "Avg Response" },
];

const ROLES = [
  {
    id: 1,
    icon: Camera,
    title: "Lead Cinematographer",
    project: "The Last Frame",
    description: "Seeking experienced cinematographer for thriller film. RED camera experience required.",
    pay: "$15,000",
    duration: "8 weeks",
    location: "Los Angeles, CA",
    applied: 24,
    requirements: ["5+ years experience", "RED camera certified", "Own equipment preferred"],
    deadline: "Feb 15, 2025",
    priority: "High",
    priorityColor: "bg-red-600",
  },
  {
    id: 2,
    icon: Users,
    title: "Lead Actor (Male)",
    project: "Silent Echoes",
    description: "Seeking male lead actor (25-35) for dramatic indie film.",
    pay: "$25,000",
    duration: "10 weeks",
    location: "New York, NY",
    applied: 156,
    requirements: ["Theater background", "25-35 years old", "Previous film experience"],
    deadline: "Feb 20, 2025",
    priority: "Medium",
    priorityColor: "bg-yellow-500",
  },
  {
    id: 3,
    icon: Music,
    title: "Music Composer",
    project: "Neon Nights",
    description: "Creating atmospheric score for cyberpunk thriller.",
    pay: "$12,000",
    duration: "6 weeks",
    location: "Remote",
    applied: 43,
    requirements: ["Electronic music expertise", "Film scoring experience", "Synthesizer proficiency"],
    deadline: "Mar 1, 2025",
    priority: "Low",
    priorityColor: "bg-green-500",
  },
  {
    id: 4,
    icon: Pencil,
    title: "Film Editor",
    project: "Urban Legend",
    description: "Post-production editor for horror film. Avid experience required.",
    pay: "$18,000",
    duration: "12 weeks",
    location: "Atlanta, GA",
    applied: 67,
    requirements: ["Avid Media Composer", "Horror genre experience", "Color grading skills"],
    deadline: "Feb 10, 2025",
    priority: "High",
    priorityColor: "bg-red-600",
  },
  {
    id: 5,
    icon: Palette,
    title: "Production Designer",
    project: "Mountain Peak",
    description: "Creating authentic outdoor adventure film sets and locations.",
    pay: "$20,000",
    duration: "14 weeks",
    location: "Vancouver, BC",
    applied: 31,
    requirements: ["Outdoor set design", "Budget management", "Team leadership"],
    deadline: "Feb 25, 2025",
    priority: "Medium",
    priorityColor: "bg-yellow-500",
  },
  {
    id: 6,
    icon: Mic2,
    title: "Sound Designer",
    project: "Broken Silence",
    description: "Crafting immersive soundscapes and foley for a psychological drama. Pro Tools expertise essential.",
    pay: "$14,000",
    duration: "10 weeks",
    location: "Chicago, IL",
    applied: 38,
    requirements: ["Pro Tools certified", "Foley artistry", "Surround sound mixing"],
    deadline: "Mar 10, 2025",
    priority: "High",
    priorityColor: "bg-red-600",
  },
];

const ROLE_OPTIONS = ["All Roles", "Cinematographer", "Actor", "Composer", "Editor", "Designer", "Sound Designer"];
const LOCATION_OPTIONS = ["All Locations", "Los Angeles, CA", "New York, NY", "Atlanta, GA", "Vancouver, BC", "Chicago, IL", "Remote"];

// ── Component ────────────────────────────────────────────────────────────────

export default function TalentOverviewPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [locationFilter, setLocationFilter] = useState("All Locations");

  const filtered = ROLES.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.project.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchesRole =
      roleFilter === "All Roles" || r.title.toLowerCase().includes(roleFilter.toLowerCase());
    const matchesLocation =
      locationFilter === "All Locations" || r.location === locationFilter;
    return matchesSearch && matchesRole && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* ── Navbar ── */}
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
            <Link href="/" className="transition duration-300 hover:text-red-500">Home</Link>
            <Link href="/" className="transition duration-300 hover:text-red-500">Projects</Link>
            <Link href="/talent-overview" className="text-red-500">Talent</Link>
            <Link href="/" className="transition duration-300 hover:text-red-500">Investors</Link>
            <Link href="/" className="transition duration-300 hover:text-red-500">Pricing</Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <Link href="/search">
              <Search size={22} className="cursor-pointer text-white transition duration-300 hover:text-red-500" />
            </Link>
            <Link href="/notifications">
              <Bell size={22} className="cursor-pointer text-white transition duration-300 hover:text-red-500" />
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

      {/* ── Main Content ── */}
      <main className="pt-28 pb-20 px-16 max-w-7xl mx-auto">

        {/* ── Hero Section ── */}
        <div className="mb-10">
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-200 text-sm"
          >
            <ArrowLeft size={16} />
          </button>

          <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
            Find Your Next{" "}
            <span className="text-red-500">Creative Role</span>
          </h1>
          <p className="mt-4 max-w-xl text-zinc-400 leading-relaxed">
            Discover exciting opportunities to work with talented filmmakers on groundbreaking
            projects. From acting to technical roles, find your perfect match.
          </p>
        </div>

        {/* ── Search & Filters ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search roles, projects, or skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#141414] border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-red-600 transition-colors duration-200"
            />
          </div>

          {/* Role filter */}
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="appearance-none bg-[#141414] border border-zinc-800 rounded-xl px-5 py-3 pr-10 text-sm text-white outline-none focus:border-red-600 transition-colors duration-200 cursor-pointer"
            >
              {ROLE_OPTIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          </div>

          {/* Location filter */}
          <div className="relative">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="appearance-none bg-[#141414] border border-zinc-800 rounded-xl px-5 py-3 pr-10 text-sm text-white outline-none focus:border-red-600 transition-colors duration-200 cursor-pointer"
            >
              {LOCATION_OPTIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          </div>
        </div>

        {/* ── Stats Row ── */}
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

        {/* ── Role Cards Grid ── */}
        {filtered.length === 0 ? (
          <p className="text-center text-zinc-500 py-20">No roles match your search.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((role) => {
              const Icon = role.icon;
              return (
                <div
                  key={role.id}
                  className="bg-[#111111] border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4 hover:border-red-700 transition-colors duration-300"
                >
                  {/* Card header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Icon size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                      <h2 className="text-lg font-bold text-white">{role.title}</h2>
                    </div>
                    <span className={`${role.priorityColor} text-white text-xs font-bold px-3 py-1 rounded-full flex-shrink-0`}>
                      {role.priority}
                    </span>
                  </div>

                  {/* Project name */}
                  <p className="text-red-400 font-semibold text-sm -mt-2">{role.project}</p>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm leading-relaxed">{role.description}</p>

                  {/* Meta grid */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2 text-white">
                      <DollarSign size={14} className="text-red-500" />
                      <span className="font-semibold">{role.pay}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-300">
                      <Clock size={14} className="text-zinc-500" />
                      <span>{role.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-300">
                      <MapPin size={14} className="text-zinc-500" />
                      <span>{role.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-300">
                      <Users size={14} className="text-zinc-500" />
                      <span>{role.applied} applied</span>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <p className="text-xs font-semibold text-zinc-300 mb-2">Requirements:</p>
                    <div className="flex flex-wrap gap-2">
                      {role.requirements.map((req) => (
                        <span
                          key={req}
                          className="border border-zinc-700 text-zinc-300 text-xs px-3 py-1 rounded-full"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer: deadline + apply */}
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <p className="text-xs text-zinc-500">Deadline: {role.deadline}</p>
                    <button
                      onClick={() => router.push("/login")}
                      className="bg-gradient-to-r from-red-700 to-red-500 hover:brightness-110 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-200 hover:scale-105"
                    >
                      APPLY NOW
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
