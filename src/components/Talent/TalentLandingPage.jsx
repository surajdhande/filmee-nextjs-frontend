"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  User, 
  Star, 
  Briefcase, 
  Users, 
  Award, 
  Clock, 
  Heart, 
  Search, 
  Bell, 
  Image as ImageIcon, 
  Music, 
  Camera, 
  Film, 
  Palette, 
  Sparkles, 
  HelpCircle,
  MessageSquare,
  Globe
} from 'lucide-react';
import Dashboard from "@/components/Talent/Dashboard";

export default function TalentLandingPage() {
  const [showDashboard, setShowDashboard] = useState(false);
  const router = useRouter();

  const handleBrowseTalent = () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      if (token && user?.role === 'TALENT') {
        router.push('/talent/dashboard');
      } else {
        router.push('/signup?role=TALENT');
      }
    } catch {
      router.push('/signup?role=TALENT');
    }
  };

  // If the user clicks "BUILD YOUR PROFILE" or "BUILD PORTFOLIO", 
  // render the interactive internal dashboard component.
  if (showDashboard) {
    return (
      <div className="relative min-h-screen bg-black text-white">
        {/* Floating Back-to-Landing button inside internal Dashboard view */}
        <button 
          onClick={() => setShowDashboard(false)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-red-650 to-rose-750 hover:from-red-550 hover:to-rose-650 text-white font-extrabold text-xs px-5 py-3 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.5)] flex items-center gap-2 uppercase tracking-wider transition-all duration-300 hover:scale-105"
        >
          <ArrowLeft size={14} /> Back to Portal Home
        </button>
        <Dashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-neutral-200 font-sans selection:bg-red-500/30 selection:text-white antialiased pb-24">
      {/* Background glowing radial lights for visual depth */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-950/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] rounded-full bg-red-950/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[700px] h-[700px] rounded-full bg-blue-950/5 blur-3xl pointer-events-none" />

      {/* 1. Global Navigation Header */}
      <header className="relative w-full h-20 bg-black/80 backdrop-blur-md border-b border-neutral-900 flex items-center justify-between px-6 md:px-12 z-40">
        {/* Logo */}
        <Link href="/" className="flex items-center select-none">
          <div className="bg-[#0b0c10] border border-neutral-850 px-3.5 py-1.5 rounded-lg flex flex-col items-center justify-center leading-none hover:border-neutral-750 transition-colors">
            <span className="text-[6.5px] tracking-[0.25em] font-extrabold text-neutral-400">THE</span>
            <span className="text-[11px] tracking-[0.1em] font-black text-white">FILMEE</span>
            <span className="text-[8px] tracking-[0.15em] font-bold text-red-500">GRID</span>
          </div>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center space-x-5">
          <Link href="/search">
            <button className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900/50 transition-all">
              <Search size={20} />
            </button>
          </Link>
          
          <Link href="/notifications">
            <button className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900/50 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-red-500" />
            </button>
          </Link>

          <button className="hidden sm:inline-block border border-red-950/80 hover:border-red-655 bg-transparent text-red-500 text-[11px] font-bold px-6 py-2.5 rounded-full uppercase tracking-wider transition-all duration-300 hover:bg-red-950/10">
            Sign In
          </button>

          <button className="bg-gradient-to-r from-red-600 to-rose-750 hover:from-red-500 hover:to-rose-650 text-white text-[11px] font-bold px-6 py-2.5 rounded-full uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.45)] hover:shadow-[0_0_25px_rgba(220,38,38,0.65)] hover:scale-[1.02]">
            Join Now
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative max-w-6xl mx-auto px-6 pt-10 z-30">
        
        {/* Back navigation */}
        <Link href="/" className="inline-flex items-center text-xs font-bold text-neutral-400 hover:text-white uppercase tracking-wider mb-10 transition-colors gap-2 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* 2. Hero Section: For Talent */}
        <section className="flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-16">
          {/* Large purple Icon */}
          <div className="flex-shrink-0 p-4 bg-purple-950/15 border border-purple-900/30 rounded-3xl text-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.08)]">
            <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>

          <div className="flex-1">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none">
              For <span className="bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">Talent</span>
            </h1>
            
            <p className="text-neutral-400 text-sm md:text-[17px] max-w-3xl mt-4 leading-relaxed">
              Showcase your skills, connect with filmmakers, and land your next role in the film industry with our professional platform.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2.5 mt-6">
              <div className="border border-purple-950 bg-purple-950/10 text-purple-400 px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
                <User size={13} />
                Portfolio Builder
              </div>
              <div className="border border-blue-950 bg-blue-950/10 text-blue-400 px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
                <Briefcase size={13} />
                Job Matching
              </div>
              <div className="border border-green-950 bg-green-950/10 text-green-400 px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
                <Users size={13} />
                Industry Network
              </div>
              <div className="border border-red-950 bg-red-950/10 text-red-400 px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
                <Award size={13} />
                Career Growth
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button 
                onClick={() => setShowDashboard(true)}
                className="bg-gradient-to-r from-red-650 to-rose-750 hover:from-red-550 hover:to-rose-650 text-white px-8 py-3.5 rounded-full text-xs font-black tracking-wider flex items-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] hover:scale-[1.02]"
              >
                <User size={14} />
                BUILD YOUR PROFILE
              </button>

              <button 
                onClick={handleBrowseTalent}
                className="border border-red-950 bg-neutral-950/50 hover:border-red-650 hover:bg-neutral-900/20 text-red-500 px-8 py-3.5 rounded-full text-xs font-black tracking-wider flex items-center gap-2 transition-all duration-300 hover:scale-[1.02]"
              >
                <Star size={14} />
                BROWSE TALENT
              </button>
            </div>
          </div>
        </section>

        {/* 3. Featured Professional Section */}
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight mb-5">
            Featured Professional
          </h2>
          
          <div className="relative w-full aspect-[2.1/1] sm:aspect-[2.5/1] md:aspect-[3.2/1] rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl group select-none">
            {/* Background photo of professional woman next to board */}
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80" 
              alt="Featured professional - Sarah Chen"
              className="absolute inset-0 w-full h-full object-cover object-top opacity-90 group-hover:scale-[1.01] transition-transform duration-700"
            />
            {/* Dark gradient blur covering left side for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 via-45% to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            
            {/* Overlay Text content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 z-10 max-w-xl">
              <span className="bg-red-600 text-white text-[9px] md:text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider w-fit mb-3">
                Featured Talent
              </span>
              
              <h3 className="text-lg md:text-2xl font-black text-white leading-tight mb-2">
                Emmy-Nominated Cinematographer Available
              </h3>
              
              <p className="text-neutral-400 text-xs md:text-xs leading-relaxed max-w-md">
                Sarah Chen, award-winning DP with 15+ years experience, now accepting new projects for Q2 2025.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Professional Career Tools Section */}
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight mb-5">
            Professional Career Tools
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tool Card 1 (Red Glow border) */}
            <div className="relative flex flex-col bg-[#0d0d0d] border border-red-650/30 rounded-3xl overflow-hidden shadow-[0_0_20px_rgba(220,38,38,0.15)] group transition-all duration-300">
              
              {/* Featured Badge */}
              <div className="absolute top-4 left-4 bg-red-600 text-white text-[9px] font-black px-2.5 py-0.5 rounded-md flex items-center gap-1 z-10 uppercase tracking-wider">
                <Star size={10} fill="currentColor" /> FEATURED
              </div>

              {/* Card Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" 
                  alt="Portfolio builder demo" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="bg-neutral-900 border border-neutral-800 text-neutral-400 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider w-fit">
                    Portfolio
                  </span>

                  <h3 className="text-lg font-black text-white tracking-tight mt-3 mb-2">
                    Professional Portfolio Builder
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Create stunning portfolios with video reels, photo galleries, and interactive elements.
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    <span className="bg-neutral-950 border border-neutral-900 text-neutral-350 text-[9px] font-bold px-2 py-0.5 rounded">
                      Video Reels
                    </span>
                    <span className="bg-neutral-950 border border-neutral-900 text-neutral-350 text-[9px] font-bold px-2 py-0.5 rounded">
                      Photo Galleries
                    </span>
                    <span className="bg-neutral-950 border border-neutral-900 text-neutral-350 text-[9px] font-bold px-2 py-0.5 rounded">
                      Interactive
                    </span>
                  </div>
                </div>

                {/* Footer and Button */}
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 mt-6 pt-4 border-t border-neutral-900/60">
                    <span className="flex items-center gap-1.5">
                      <Users size={13} className="text-neutral-500" />
                      95% hire rate
                    </span>
                    <span className="flex items-center gap-1 text-yellow-500">
                      <Star size={13} fill="currentColor" />
                      4.9
                    </span>
                  </div>

                  <button 
                    onClick={() => setShowDashboard(true)}
                    className="w-full bg-gradient-to-r from-red-650 to-rose-750 hover:from-red-550 hover:to-rose-650 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-2 mt-4 transition-all duration-300 hover:scale-[1.01]"
                  >
                    <User size={13} />
                    BUILD PORTFOLIO
                  </button>
                </div>
              </div>
            </div>

            {/* Tool Card 2 */}
            <div className="flex flex-col bg-[#0d0d0d] border border-neutral-900 rounded-3xl overflow-hidden group transition-all duration-300 hover:border-neutral-850">
              
              {/* Card Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" 
                  alt="Job matching demo" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="bg-neutral-900 border border-neutral-800 text-neutral-400 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider w-fit">
                    Opportunities
                  </span>

                  <h3 className="text-lg font-black text-white tracking-tight mt-3 mb-2">
                    Smart Job Matching
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Get matched with relevant projects based on your skills, experience, and artistic profile.
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    <span className="bg-neutral-950 border border-neutral-900 text-neutral-350 text-[9px] font-bold px-2 py-0.5 rounded">
                      AI Matching
                    </span>
                    <span className="bg-neutral-950 border border-neutral-900 text-neutral-350 text-[9px] font-bold px-2 py-0.5 rounded">
                      Skill-Based
                    </span>
                    <span className="bg-neutral-950 border border-neutral-900 text-neutral-350 text-[9px] font-bold px-2 py-0.5 rounded">
                      Location Aware
                    </span>
                  </div>
                </div>

                {/* Footer and Button */}
                <div>
                  <div className="flex flex-col gap-1.5 text-xs text-neutral-400 mt-6 pt-4 border-t border-neutral-900/60">
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={13} className="text-neutral-500" />
                      500+ active jobs
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-neutral-500" />
                      2x faster matching
                    </span>
                  </div>

                  <button 
                    onClick={() => setShowDashboard(true)}
                    className="w-full bg-gradient-to-r from-red-650 to-rose-750 hover:from-red-555 hover:to-rose-655 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-2 mt-4 transition-all duration-300 hover:scale-[1.01]"
                  >
                    <Briefcase size={13} />
                    FIND JOBS
                  </button>
                </div>
              </div>
            </div>

            {/* Tool Card 3 */}
            <div className="flex flex-col bg-[#0d0d0d] border border-neutral-900 rounded-3xl overflow-hidden group transition-all duration-300 hover:border-neutral-850">
              
              {/* Placeholder Card Image (as shown in screenshot) */}
              <div className="w-full aspect-[16/10] bg-gradient-to-b from-neutral-850 to-neutral-950 flex items-center justify-center border-b border-neutral-900 relative">
                <ImageIcon size={36} className="text-neutral-600 opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="bg-neutral-900 border border-neutral-800 text-neutral-400 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider w-fit">
                    Network
                  </span>

                  <h3 className="text-lg font-black text-white tracking-tight mt-3 mb-2">
                    Industry Networking
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Connect directly with filmmakers, casting directors, and other industry professionals.
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    <span className="bg-neutral-950 border border-neutral-900 text-neutral-350 text-[9px] font-bold px-2 py-0.5 rounded">
                      Direct Contact
                    </span>
                    <span className="bg-neutral-950 border border-neutral-900 text-neutral-350 text-[9px] font-bold px-2 py-0.5 rounded">
                      Industry Pros
                    </span>
                    <span className="bg-neutral-950 border border-neutral-900 text-neutral-350 text-[9px] font-bold px-2 py-0.5 rounded">
                      Verified Profiles
                    </span>
                  </div>
                </div>

                {/* Footer and Button */}
                <div>
                  <div className="flex flex-col gap-1.5 text-xs text-neutral-400 mt-6 pt-4 border-t border-neutral-900/60">
                    <span className="flex items-center gap-1.5">
                      <Users size={13} className="text-neutral-500" />
                      25k+ professionals
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Heart size={13} className="text-neutral-500" />
                      90% response rate
                    </span>
                  </div>

                  <button 
                    onClick={() => setShowDashboard(true)}
                    className="w-full bg-gradient-to-r from-red-650 to-rose-750 hover:from-red-555 hover:to-rose-655 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-2 mt-4 transition-all duration-300 hover:scale-[1.01]"
                  >
                    <User size={13} />
                    START NETWORKING
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Talent Categories Section */}
        <section>
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight mb-5">
            Talent Categories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Category Card 1 (Acting - Placeholder Image) */}
            <div className="flex flex-col bg-[#0d0d0d] border border-neutral-900 rounded-3xl overflow-hidden group transition-all duration-300 hover:border-neutral-850">
              <div className="w-full aspect-[16/10] bg-gradient-to-b from-neutral-850 to-neutral-950 flex items-center justify-center border-b border-neutral-900 relative">
                <ImageIcon size={36} className="text-neutral-600 opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="bg-neutral-900 border border-neutral-800 text-neutral-400 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider w-fit">
                    Acting
                  </span>
                  <h3 className="text-lg font-black text-white tracking-tight mt-3 mb-2">
                    Actors & Performers
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Leading roles, supporting cast, extras, and specialized performers across all genres.
                  </p>
                </div>
                <div>
                  <div className="flex items-center text-xs text-neutral-400 mt-6 pt-4 border-t border-neutral-900/60">
                    <span className="flex items-center gap-1.5">
                      <Star size={13} className="text-neutral-500" />
                      5k+ active
                    </span>
                  </div>
                  <button 
                    onClick={() => setShowDashboard(true)}
                    className="w-full bg-gradient-to-r from-red-650 to-rose-755 hover:from-red-550 hover:to-rose-650 text-white py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider mt-4 transition-all duration-300 hover:scale-[1.01]"
                  >
                    BROWSE
                  </button>
                </div>
              </div>
            </div>

            {/* Category Card 2 (Direction) */}
            <div className="flex flex-col bg-[#0d0d0d] border border-neutral-900 rounded-3xl overflow-hidden group transition-all duration-300 hover:border-neutral-850">
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80" 
                  alt="Direction category demo" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="bg-neutral-900 border border-neutral-800 text-neutral-400 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider w-fit">
                    Direction
                  </span>
                  <h3 className="text-lg font-black text-white tracking-tight mt-3 mb-2">
                    Directors & Producers
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Experienced directors, assistant directors, and producers for projects of all scales.
                  </p>
                </div>
                <div>
                  <div className="flex items-center text-xs text-neutral-400 mt-6 pt-4 border-t border-neutral-900/60">
                    <span className="flex items-center gap-1.5">
                      <Camera size={13} className="text-neutral-500" />
                      1.2k+ pros
                    </span>
                  </div>
                  <button 
                    onClick={() => setShowDashboard(true)}
                    className="w-full bg-gradient-to-r from-red-650 to-rose-755 hover:from-red-550 hover:to-rose-650 text-white py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider mt-4 transition-all duration-300 hover:scale-[1.01]"
                  >
                    BROWSE
                  </button>
                </div>
              </div>
            </div>

            {/* Category Card 3 (Camera) */}
            <div className="flex flex-col bg-[#0d0d0d] border border-neutral-900 rounded-3xl overflow-hidden group transition-all duration-300 hover:border-neutral-850">
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                <img 
                  src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80" 
                  alt="Cinematography category demo" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="bg-neutral-900 border border-neutral-800 text-neutral-400 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider w-fit">
                    Camera
                  </span>
                  <h3 className="text-lg font-black text-white tracking-tight mt-3 mb-2">
                    Cinematographers
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    DPs, camera operators, gaffers, and lighting specialists with professional equipment.
                  </p>
                </div>
                <div>
                  <div className="flex items-center text-xs text-neutral-400 mt-6 pt-4 border-t border-neutral-900/60">
                    <span className="flex items-center gap-1.5">
                      <Camera size={13} className="text-neutral-500" />
                      800+ experts
                    </span>
                  </div>
                  <button 
                    onClick={() => setShowDashboard(true)}
                    className="w-full bg-gradient-to-r from-red-655 to-rose-755 hover:from-red-550 hover:to-rose-650 text-white py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider mt-4 transition-all duration-300 hover:scale-[1.01]"
                  >
                    BROWSE
                  </button>
                </div>
              </div>
            </div>

            {/* Category Card 4 (Audio) */}
            <div className="flex flex-col bg-[#0d0d0d] border border-neutral-900 rounded-3xl overflow-hidden group transition-all duration-300 hover:border-neutral-850">
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                <img 
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80" 
                  alt="Audio category demo" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="bg-neutral-900 border border-neutral-800 text-neutral-400 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider w-fit">
                    Audio
                  </span>
                  <h3 className="text-lg font-black text-white tracking-tight mt-3 mb-2">
                    Audio & Music
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Sound engineers, composers, music supervisors, and audio post-production experts.
                  </p>
                </div>
                <div>
                  <div className="flex items-center text-xs text-neutral-400 mt-6 pt-4 border-t border-neutral-900/60">
                    <span className="flex items-center gap-1.5">
                      <Music size={13} className="text-neutral-500" />
                      600+ professionals
                    </span>
                  </div>
                  <button 
                    onClick={() => setShowDashboard(true)}
                    className="w-full bg-gradient-to-r from-red-655 to-rose-755 hover:from-red-550 hover:to-rose-650 text-white py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider mt-4 transition-all duration-300 hover:scale-[1.01]"
                  >
                    BROWSE
                  </button>
                </div>
              </div>
            </div>

            {/* Category Card 5 (Post) */}
            <div className="flex flex-col bg-[#0d0d0d] border border-neutral-900 rounded-3xl overflow-hidden group transition-all duration-300 hover:border-neutral-850">
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                <img 
                  src="https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=600&q=80" 
                  alt="Post production category demo" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="bg-neutral-900 border border-neutral-800 text-neutral-400 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider w-fit">
                    Post
                  </span>
                  <h3 className="text-lg font-black text-white tracking-tight mt-3 mb-2">
                    Post-Production
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Editors, colorists, VFX artists, and motion graphics designers.
                  </p>
                </div>
                <div>
                  <div className="flex items-center text-xs text-neutral-400 mt-6 pt-4 border-t border-neutral-900/60">
                    <span className="flex items-center gap-1.5">
                      <Film size={13} className="text-neutral-500" />
                      900+ specialists
                    </span>
                  </div>
                  <button 
                    onClick={() => setShowDashboard(true)}
                    className="w-full bg-gradient-to-r from-red-655 to-rose-755 hover:from-red-550 hover:to-rose-650 text-white py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider mt-4 transition-all duration-300 hover:scale-[1.01]"
                  >
                    BROWSE
                  </button>
                </div>
              </div>
            </div>

            {/* Category Card 6 (Design) */}
            <div className="flex flex-col bg-[#0d0d0d] border border-neutral-900 rounded-3xl overflow-hidden group transition-all duration-300 hover:border-neutral-850">
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                <img 
                  src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80" 
                  alt="Art and design category demo" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="bg-neutral-900 border border-neutral-800 text-neutral-400 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider w-fit">
                    Design
                  </span>
                  <h3 className="text-lg font-black text-white tracking-tight mt-3 mb-2">
                    Art & Design
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Production designers, costume designers, makeup artists, and set decorators.
                  </p>
                </div>
                <div>
                  <div className="flex items-center text-xs text-neutral-400 mt-6 pt-4 border-t border-neutral-900/60">
                    <span className="flex items-center gap-1.5">
                      <Palette size={13} className="text-neutral-500" />
                      700+ artists
                    </span>
                  </div>
                  <button 
                    onClick={() => setShowDashboard(true)}
                    className="w-full bg-gradient-to-r from-red-655 to-rose-755 hover:from-red-550 hover:to-rose-650 text-white py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider mt-4 transition-all duration-300 hover:scale-[1.01]"
                  >
                    BROWSE
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 6. Career Success Metrics Section */}
        <section className="mb-20 mt-28 text-center relative z-25">
          <h2 className="text-xl md:text-3xl font-black text-white tracking-tight mb-2">
            Career Success Metrics
          </h2>
          <p className="text-neutral-400 text-xs md:text-sm mb-12">
            Our platform helps talent achieve their career goals faster.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Metric 1 */}
            <div className="bg-[#0c0c0c] border border-neutral-900 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <div className="text-purple-500 mb-3 bg-purple-950/20 p-3 rounded-full border border-purple-900/30">
                <Users size={20} />
              </div>
              <span className="text-2xl md:text-3xl font-black text-white">25k+</span>
              <span className="text-[10px] md:text-xs text-neutral-500 font-bold uppercase tracking-wider mt-1.5">
                Active Professionals
              </span>
            </div>

            {/* Metric 2 */}
            <div className="bg-[#0c0c0c] border border-neutral-900 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <div className="text-purple-500 mb-3 bg-purple-950/20 p-3 rounded-full border border-purple-900/30">
                <Briefcase size={20} />
              </div>
              <span className="text-2xl md:text-3xl font-black text-white">95%</span>
              <span className="text-[10px] md:text-xs text-neutral-500 font-bold uppercase tracking-wider mt-1.5">
                Hire Rate
              </span>
            </div>

            {/* Metric 3 */}
            <div className="bg-[#0c0c0c] border border-neutral-900 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <div className="text-purple-500 mb-3 bg-purple-950/20 p-3 rounded-full border border-purple-900/30">
                <Star size={20} />
              </div>
              <span className="text-2xl md:text-3xl font-black text-white">4.9</span>
              <span className="text-[10px] md:text-xs text-neutral-500 font-bold uppercase tracking-wider mt-1.5">
                Average Rating
              </span>
            </div>

            {/* Metric 4 */}
            <div className="bg-[#0c0c0c] border border-neutral-900 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <div className="text-purple-500 mb-3 bg-purple-950/20 p-3 rounded-full border border-purple-900/30">
                <Award size={20} />
              </div>
              <span className="text-2xl md:text-3xl font-black text-white">500+</span>
              <span className="text-[10px] md:text-xs text-neutral-500 font-bold uppercase tracking-wider mt-1.5">
                Award Winners
              </span>
            </div>
          </div>
        </section>

        {/* 7. CTA Banner Section */}
        <section className="mt-28 mb-16 text-center relative z-25">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
            Take Your Career to the Next Level
          </h2>
          <p className="text-neutral-400 text-xs md:text-[13px] mb-8 max-w-xl mx-auto leading-relaxed">
            Join thousands of professionals who have advanced their careers through our platform.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => setShowDashboard(true)}
              className="bg-gradient-to-r from-red-650 to-rose-755 hover:from-red-550 hover:to-rose-650 text-white px-8 py-3.5 rounded-full text-xs font-black tracking-wider flex items-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] hover:scale-[1.02]"
            >
              <User size={14} />
              CREATE PROFILE
            </button>

            <button 
              onClick={() => setShowDashboard(true)}
              className="border border-red-950/80 bg-neutral-950/50 hover:border-red-650 hover:bg-neutral-900/20 text-red-500 px-8 py-3.5 rounded-full text-xs font-black tracking-wider flex items-center gap-2 transition-all duration-300 hover:scale-[1.02]"
            >
              <Globe size={14} />
              FIND OPPORTUNITIES
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}
