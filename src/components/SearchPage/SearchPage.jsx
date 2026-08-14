"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Search, 
  TrendingUp, 
  Clock, 
  Film, 
  User, 
  LineChart 
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function SearchPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handlePillClick = (query) => {
    setSearchQuery(query);
  };

  const trendingSearches = [
    "Thriller projects",
    "Cinematographer roles",
    "Los Angeles productions",
    "Horror film investments",
    "Lead actor opportunities",
    "Documentary funding"
  ];

  const recentSearches = [
    "Science fiction films",
    "New York casting calls",
    "Film composer jobs",
    "Independent movie investments"
  ];

  const categories = [
    { name: "Projects", count: "500+", icon: Film },
    { name: "Talent", count: "2.5K", icon: User },
    { name: "Investments", count: "150+", icon: LineChart },
    { name: "Recent", count: "New", icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header Navbar */}
      <Navbar />

      {/* Main Section */}
      <main className="mx-auto max-w-5xl px-6 pt-32 md:px-10">
        
        {/* Back navigation and page title */}
        <div className="mb-8 flex items-start gap-5">
          <button
            onClick={() => router.back()}
            className="mt-2 text-zinc-400 hover:text-white transition-colors flex items-center justify-center"
            aria-label="Go back"
          >
            <ArrowLeft size={26} />
          </button>
          
          <div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Search <span className="text-red-600">Everything</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 font-medium max-w-2xl leading-relaxed">
              Find projects, talent, investment opportunities, and more across the entire FilmConnect platform.
            </p>
          </div>
        </div>

        {/* Search Input field */}
        <div className="relative w-full max-w-4xl mb-12">
          <Search size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for projects, talent, roles, or investments..."
            className="w-full bg-[#0d0d0e]/80 border border-zinc-800 rounded-full py-4 pl-14 pr-6 text-white placeholder-zinc-500 focus:outline-none focus:border-red-600/80 transition-colors shadow-[0_4px_30px_rgba(0,0,0,0.5)] text-[15px]"
          />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mb-16">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <div 
                key={idx}
                className="bg-[#0b0c10]/40 border border-zinc-800/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2 hover:border-zinc-700/80 hover:bg-[#121215]/60 hover:scale-[1.03] transition-all duration-300 cursor-pointer shadow-md group"
              >
                <div className="p-3 bg-red-950/10 rounded-full group-hover:bg-red-950/20 transition-colors">
                  <IconComponent size={28} className="text-red-500" />
                </div>
                <h3 className="text-base font-bold text-white tracking-wide mt-2">{cat.name}</h3>
                <p className="text-zinc-500 text-xs font-semibold">{cat.count}</p>
              </div>
            );
          })}
        </div>

        {/* Trending & Recent Searches */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mb-16">
          
          {/* Trending column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={20} className="text-red-500" />
              <h2 className="text-xl font-bold tracking-wide text-white">Trending Searches</h2>
            </div>
            
            <div className="flex flex-col gap-3">
              {trendingSearches.map((term, i) => (
                <div
                  key={i}
                  onClick={() => handlePillClick(term)}
                  className="bg-[#0b0c10]/40 border border-zinc-800/80 rounded-full py-3 px-6 flex items-center justify-between cursor-pointer hover:bg-[#121215]/60 hover:border-zinc-700/80 transition-all duration-200 group active:scale-[0.99]"
                >
                  <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors">
                    {term}
                  </span>
                  <Search size={16} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Clock size={20} className="text-red-500" />
              <h2 className="text-xl font-bold tracking-wide text-white">Recent Searches</h2>
            </div>

            <div className="flex flex-col gap-3">
              {recentSearches.map((term, i) => (
                <div
                  key={i}
                  onClick={() => handlePillClick(term)}
                  className="bg-[#0b0c10]/40 border border-zinc-800/80 rounded-full py-3 px-6 flex items-center justify-between cursor-pointer hover:bg-[#121215]/60 hover:border-zinc-700/80 transition-all duration-200 group active:scale-[0.99]"
                >
                  <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors">
                    {term}
                  </span>
                  <Search size={16} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Search Tips Bottom Card */}
        <div className="w-full max-w-4xl bg-[#0b0c10]/30 border border-zinc-800/80 rounded-2xl p-8 backdrop-blur-sm shadow-md">
          <h3 className="text-lg font-bold text-white tracking-wide mb-6">Search Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-sm leading-relaxed text-zinc-400">
              <span className="font-bold text-white block mb-1">Projects</span> 
              Search by genre, budget, or filmmaker name
            </div>
            <div className="text-sm leading-relaxed text-zinc-400">
              <span className="font-bold text-white block mb-1">Talent</span> 
              Find roles by location, skill, or project type
            </div>
            <div className="text-sm leading-relaxed text-zinc-400">
              <span className="font-bold text-white block mb-1">Investments</span> 
              Filter by ROI, risk level, or industry
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
