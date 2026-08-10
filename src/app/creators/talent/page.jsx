"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Film } from "lucide-react";

export default function HireTalentPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col font-sans select-none overflow-hidden">
      {/* Background glowing radial lights for premium design aesthetics */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-950/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] rounded-full bg-zinc-900/10 blur-3xl pointer-events-none" />

      {/* Custom Sticky Header */}
      <header className="fixed top-0 left-0 z-[999] w-full border-b border-zinc-900/50 bg-black/80 backdrop-blur-md">
        <div className="flex h-16 sm:h-20 w-full items-center justify-between px-4 sm:px-16">
          
          {/* Left Actions */}
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm font-black tracking-wider uppercase"
              aria-label="Go back"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">BACK</span>
            </button>
            
            {/* Divider */}
            <div className="hidden sm:block h-6 w-px bg-zinc-800 mx-4 sm:mx-6" />
            
            {/* FilmConnect branding */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <Film size={18} className="text-red-500 sm:w-[20px] sm:h-[20px]" />
              <span className="text-red-500 font-extrabold text-xs sm:text-sm sm:text-base tracking-widest uppercase">
                FILMCONNECT
              </span>
            </Link>
          </div>

          {/* Right Action */}
          <Link href="/signup">
            <button className="rounded-full bg-gradient-to-r from-red-700 to-red-500 px-4 py-2 text-[10px] sm:px-6 sm:py-2.5 sm:text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(220,38,38,0.45)] uppercase tracking-wider">
              Get Started
            </button>
          </Link>
          
        </div>
      </header>

      {/* Main content centered */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-28 pb-16 z-10">
        <div className="max-w-xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
            Hire Talent <span className="text-red-500">Page</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed">
            This page is under development. Please check back soon for updates.
          </p>
          <Link href="/">
            <button className="bg-gradient-to-r from-red-700 via-red-650 to-red-550 hover:from-red-650 hover:to-red-450 text-white px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-[0_0_25px_rgba(220,38,38,0.35)] hover:shadow-[0_0_35px_rgba(220,38,38,0.55)]">
              Back to Home
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
