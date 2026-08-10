"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Search,
  Bell,
  Camera,
  Video,
  DollarSign,
  Users,
  Sparkles,
  Play,
  Award,
  Bookmark,
  Share2,
  Cpu,
  Calendar,
  FileText,
  Star,
  Plus,
  Globe,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FilmmakerLandingPage() {
  const router = useRouter();
  const [savedItems, setSavedItems] = useState({});

  const toggleSave = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = (title, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({ title, url: window.location.href });
    } else {
      alert(`Share link for: ${title}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-350 font-sans selection:bg-red-500/30 selection:text-white antialiased">
      {/* Background glowing radial lights for premium design aesthetics */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-red-950/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] rounded-full bg-zinc-900/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[700px] h-[700px] rounded-full bg-red-950/5 blur-3xl pointer-events-none" />

      {/* Navbar Header */}
      <Navbar />

      {/* Main Container */}
      <main className="relative max-w-7xl mx-auto px-6 md:px-16 pt-32 pb-24 z-30">

        {/* Back navigation */}
        <Link
          href="/"
          className="inline-flex items-center text-xs font-bold text-zinc-400 hover:text-white uppercase tracking-wider mb-8 transition-colors gap-2 group"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Home
        </Link>

        {/* Hero Section: For Filmmakers */}
        <section className="flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-20">
          {/* Camera Icon in styled box */}
          <div className="flex-shrink-0 p-5 bg-red-950/15 border border-red-900/30 rounded-3xl text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.08)]">
            <Camera size={48} className="stroke-[1.5]" />
          </div>

          <div className="flex-1">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none">
              For <span className="text-red-500">Filmmakers</span>
            </h1>

            <p className="text-zinc-400 text-sm md:text-lg max-w-3xl mt-4 leading-relaxed">
              Turn your creative vision into reality with our comprehensive platform designed for independent filmmakers and production companies.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2.5 mt-6">
              <div className="border border-red-950 bg-red-950/10 text-red-500 px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
                <Video size={13} />
                Project Development
              </div>
              <div className="border border-green-950 bg-green-950/10 text-green-500 px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
                <DollarSign size={13} />
                Funding Support
              </div>
              <div className="border border-blue-950 bg-blue-950/10 text-blue-500 px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
                <Users size={13} />
                Talent Network
              </div>
              <div className="border border-purple-950 bg-purple-950/10 text-purple-400 px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
                <Sparkles size={13} />
                AI-Powered Tools
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={() => router.push("/create-project")}
                className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 hover:from-red-650 hover:to-red-450 text-white px-8 py-3.5 rounded-full text-xs font-black tracking-wider flex items-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:scale-[1.02]"
              >
                <Play size={14} className="fill-white" />
                START YOUR PROJECT
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("success-story-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="border border-red-950 bg-zinc-950/50 hover:border-red-600 hover:bg-zinc-900/20 text-red-500 hover:text-white px-8 py-3.5 rounded-full text-xs font-black tracking-wider flex items-center gap-2 transition-all duration-300 hover:scale-[1.02]"
              >
                <Award size={14} />
                VIEW SUCCESS STORIES
              </button>
            </div>
          </div>
        </section>

        {/* Featured Success Story */}
        <section id="success-story-section" className="mb-20">
          <h2 className="text-2xl font-black text-white tracking-tight mb-6">
            Featured Success Story
          </h2>

          <div className="relative w-full aspect-[2.1/1] sm:aspect-[2.5/1] md:aspect-[3.2/1] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl group select-none">
            {/* Background image of filmmakers on set */}
            <img
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80"
              alt="Featured Success Story - Midnight Runner"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-80 group-hover:scale-[1.01] transition-transform duration-700"
            />
            {/* Dark gradient blur covering left side for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 via-50% to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

            {/* Top Right Save & Share buttons */}
            <div className="absolute top-6 right-6 flex items-center gap-2.5 z-20">
              <button
                onClick={(e) => toggleSave("featured_success", e)}
                className={`p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 ${savedItems["featured_success"]
                  ? "bg-red-600 border-red-600 text-white"
                  : "bg-black/40 border-zinc-800 text-zinc-300 hover:text-white hover:bg-black/60"
                  }`}
              >
                <Bookmark size={15} className={savedItems["featured_success"] ? "fill-white" : ""} />
              </button>
              <button
                onClick={(e) => handleShare('"Midnight Runner" Success Story', e)}
                className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-zinc-800 text-zinc-300 hover:text-white hover:bg-black/60 transition-all duration-300"
              >
                <Share2 size={15} />
              </button>
            </div>

            {/* Overlay Text content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 z-10 max-w-2xl">
              <span className="bg-red-600 text-white text-[9px] md:text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider w-fit mb-3">
                Success Story
              </span>

              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                "Midnight Runner" - From Pitch to Production
              </h3>

              <p className="text-zinc-400 text-xs md:text-sm mt-2 leading-relaxed">
                How Alex Thompson secured $2M in funding and assembled an award-winning cast through our platform.
              </p>
            </div>
          </div>
        </section>

        {/* Everything You Need to Make Films */}
        <section className="mb-20">
          <h2 className="text-3xl font-black text-white tracking-tight mb-8">
            Everything You Need to Make Films
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {/* Card 1: Project Pitch Builder */}
            <div className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 transition-all duration-300 hover:border-red-600 hover:-translate-y-1">
              <div className="relative overflow-hidden h-56">
                <img
                  src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80"
                  alt="Project Pitch Builder"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  ★ FEATURED
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    Tools
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  Project Pitch Builder
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed mb-4 flex-1">
                  Create compelling visual pitches with our AI-powered presentation tools and templates designed for independent filmmakers.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  <span className="bg-zinc-900/60 text-zinc-300 text-[10px] px-2 py-0.5 rounded border border-zinc-800/80">AI-Powered</span>
                  <span className="bg-zinc-900/60 text-zinc-300 text-[10px] px-2 py-0.5 rounded border border-zinc-800/80">Templates</span>
                  <span className="bg-zinc-900/60 text-zinc-300 text-[10px] px-2 py-0.5 rounded border border-zinc-800/80">Visual</span>
                </div>

                {/* Sub info */}
                <div className="flex items-center justify-between text-xs text-zinc-500 mb-6 font-medium">
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    2.5k+ users
                  </span>
                  <span className="flex items-center gap-1 text-red-500 font-semibold">
                    <Star size={12} className="fill-red-500 stroke-red-500" />
                    4.8 rating
                  </span>
                </div>

                <button
                  onClick={() => router.push("/create-project")}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 py-3 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110"
                >
                  <Play size={14} className="fill-white" />
                  TRY NOW
                </button>
              </div>
            </div>

            {/* Card 2: Funding Opportunities */}
            <div className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 transition-all duration-300 hover:border-red-600 hover:-translate-y-1">
              <div className="relative overflow-hidden h-56">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80"
                  alt="Funding Opportunities"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    Funding
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  Funding Opportunities
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed mb-4 flex-1">
                  Connect with verified investors and explore funding options tailored to your project's genre and budget.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  <span className="bg-zinc-900/60 text-zinc-300 text-[10px] px-2 py-0.5 rounded border border-zinc-800/80">Verified Investors</span>
                  <span className="bg-zinc-900/60 text-zinc-300 text-[10px] px-2 py-0.5 rounded border border-zinc-800/80">Budget Matching</span>
                  <span className="bg-zinc-900/60 text-zinc-300 text-[10px] px-2 py-0.5 rounded border border-zinc-800/80">Genre-Based</span>
                </div>

                {/* Sub info */}
                <div className="flex items-center justify-between text-xs text-zinc-500 mb-6 font-medium">
                  <span className="flex items-center gap-1">
                    <DollarSign size={12} />
                    $50M+ funded
                  </span>
                  <span className="flex items-center gap-1 text-green-500 font-semibold">
                    85% success rate
                  </span>
                </div>

                <button
                  onClick={() => router.push("/project-overview")}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 py-3 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110"
                >
                  <DollarSign size={14} />
                  BROWSE FUNDING
                </button>
              </div>
            </div>

            {/* Card 3: Talent Marketplace */}
            <div className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 transition-all duration-300 hover:border-red-600 hover:-translate-y-1">
              <div className="relative overflow-hidden h-56">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80"
                  alt="Talent Marketplace"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    Talent
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  Talent Marketplace
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed mb-4 flex-1">
                  Find and hire experienced cast and crew members from our curated network of film professionals.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  <span className="bg-zinc-900/60 text-zinc-300 text-[10px] px-2 py-0.5 rounded border border-zinc-800/80">Verified Professionals</span>
                  <span className="bg-zinc-900/60 text-zinc-300 text-[10px] px-2 py-0.5 rounded border border-zinc-800/80">Portfolio Reviews</span>
                  <span className="bg-zinc-900/60 text-zinc-300 text-[10px] px-2 py-0.5 rounded border border-zinc-800/80">Direct Contact</span>
                </div>

                {/* Sub info */}
                <div className="flex items-center justify-between text-xs text-zinc-500 mb-6 font-medium">
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    15k+ professionals
                  </span>
                  <span className="flex items-center gap-1 text-red-500 font-semibold">
                    90% hire rate
                  </span>
                </div>

                <button
                  onClick={() => router.push("/talent-overview")}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 py-3 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110"
                >
                  <Users size={14} />
                  FIND TALENT
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Professional Production Tools */}
        <section className="mb-20">
          <h2 className="text-3xl font-black text-white tracking-tight mb-8">
            Professional Production Tools
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* Card 1: Script Analysis AI */}
            <div className="group flex flex-col bg-zinc-950 rounded-2xl border border-zinc-900 overflow-hidden transition-all duration-300 hover:border-red-600">
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80"
                  alt="Script Analysis AI"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded uppercase">
                  New
                </span>
                {/* Overlay buttons */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={(e) => toggleSave("script_ai", e)}
                    className={`p-1.5 rounded-full backdrop-blur-md transition-all ${savedItems["script_ai"] ? "bg-red-600 text-white" : "bg-black/55 text-zinc-300 hover:text-white"
                      }`}
                  >
                    <Bookmark size={11} className={savedItems["script_ai"] ? "fill-white" : ""} />
                  </button>
                  <button
                    onClick={(e) => handleShare("Script Analysis AI Tool", e)}
                    className="p-1.5 rounded-full bg-black/55 backdrop-blur-md text-zinc-300 hover:text-white transition-all"
                  >
                    <Share2 size={11} />
                  </button>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  AI Tools
                </span>
                <h4 className="text-lg font-bold text-white mb-2 leading-snug">
                  Script Analysis AI
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6 flex-1">
                  Get AI-powered feedback on your screenplay structure, character...
                </p>
                <button
                  onClick={() => router.push("/login")}
                  className="w-full bg-gradient-to-r from-red-750 to-red-550 hover:brightness-110 text-white py-2 px-4 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300"
                >
                  ANALYZE SCRIPT
                </button>
              </div>
            </div>

            {/* Card 2: Budget Calculator */}
            <div className="group flex flex-col bg-zinc-950 rounded-2xl border border-zinc-900 overflow-hidden transition-all duration-300 hover:border-red-600">
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80"
                  alt="Budget Calculator"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay buttons */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={(e) => toggleSave("budget_calc", e)}
                    className={`p-1.5 rounded-full backdrop-blur-md transition-all ${savedItems["budget_calc"] ? "bg-red-600 text-white" : "bg-black/55 text-zinc-300 hover:text-white"
                      }`}
                  >
                    <Bookmark size={11} className={savedItems["budget_calc"] ? "fill-white" : ""} />
                  </button>
                  <button
                    onClick={(e) => handleShare("Budget Calculator Tool", e)}
                    className="p-1.5 rounded-full bg-black/55 backdrop-blur-md text-zinc-300 hover:text-white transition-all"
                  >
                    <Share2 size={11} />
                  </button>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  Planning
                </span>
                <h4 className="text-lg font-bold text-white mb-2 leading-snug">
                  Budget Calculator
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6 flex-1">
                  Professional budgeting tools with industry-standard line items and cost...
                </p>
                <button
                  onClick={() => router.push("/login")}
                  className="w-full bg-gradient-to-r from-red-750 to-red-550 hover:brightness-110 text-white py-2 px-4 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300"
                >
                  CALCULATE BUDGET
                </button>
              </div>
            </div>

            {/* Card 3: Production Calendar */}
            <div className="group flex flex-col bg-zinc-950 rounded-2xl border border-zinc-900 overflow-hidden transition-all duration-300 hover:border-red-600">
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80"
                  alt="Production Calendar"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay buttons */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={(e) => toggleSave("prod_calendar", e)}
                    className={`p-1.5 rounded-full backdrop-blur-md transition-all ${savedItems["prod_calendar"] ? "bg-red-600 text-white" : "bg-black/55 text-zinc-300 hover:text-white"
                      }`}
                  >
                    <Bookmark size={11} className={savedItems["prod_calendar"] ? "fill-white" : ""} />
                  </button>
                  <button
                    onClick={(e) => handleShare("Production Calendar Tool", e)}
                    className="p-1.5 rounded-full bg-black/55 backdrop-blur-md text-zinc-300 hover:text-white transition-all"
                  >
                    <Share2 size={11} />
                  </button>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  Management
                </span>
                <h4 className="text-lg font-bold text-white mb-2 leading-snug">
                  Production Calendar
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6 flex-1">
                  Schedule shoots, manage crew availability, and track production...
                </p>
                <button
                  onClick={() => router.push("/login")}
                  className="w-full bg-gradient-to-r from-red-750 to-red-550 hover:brightness-110 text-white py-2 px-4 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300"
                >
                  PLAN SCHEDULE
                </button>
              </div>
            </div>

            {/* Card 4: Legal Templates */}
            <div className="group flex flex-col bg-zinc-950 rounded-2xl border border-zinc-900 overflow-hidden transition-all duration-300 hover:border-red-600">
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80"
                  alt="Legal Templates"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay buttons */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={(e) => toggleSave("legal_temps", e)}
                    className={`p-1.5 rounded-full backdrop-blur-md transition-all ${savedItems["legal_temps"] ? "bg-red-600 text-white" : "bg-black/55 text-zinc-300 hover:text-white"
                      }`}
                  >
                    <Bookmark size={11} className={savedItems["legal_temps"] ? "fill-white" : ""} />
                  </button>
                  <button
                    onClick={(e) => handleShare("Legal Templates", e)}
                    className="p-1.5 rounded-full bg-black/55 backdrop-blur-md text-zinc-300 hover:text-white transition-all"
                  >
                    <Share2 size={11} />
                  </button>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  Legal
                </span>
                <h4 className="text-lg font-bold text-white mb-2 leading-snug">
                  Legal Templates
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6 flex-1">
                  Access contracts, release forms, and legal documents specific to film production.
                </p>
                <button
                  onClick={() => router.push("/login")}
                  className="w-full bg-gradient-to-r from-red-750 to-red-550 hover:brightness-110 text-white py-2 px-4 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300"
                >
                  BROWSE TEMPLATES
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Ready to Bring Your Vision to Life CTA section */}
        <section className="bg-gradient-to-r from-red-950/20 via-zinc-950/50 to-red-950/20 border border-zinc-900 rounded-[2.5rem] py-16 px-6 text-center select-none shadow-xl">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Ready to Bring Your Vision to Life?
          </h2>

          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            Join thousands of filmmakers who have successfully funded and produced their projects through our platform.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => router.push("/create-project")}
              className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 hover:from-red-650 hover:to-red-450 text-white px-8 py-4 rounded-full text-xs font-black tracking-wider flex items-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:scale-[1.02]"
            >
              <Camera size={14} className="stroke-[2.5]" />
              CREATE YOUR PROJECT
            </button>

            <button
              onClick={() => router.push("/project-overview")}
              className="border border-red-950 bg-transparent hover:border-red-600 hover:bg-zinc-900/20 text-red-500 hover:text-white px-8 py-4 rounded-full text-xs font-black tracking-wider flex items-center gap-2 transition-all duration-300 hover:scale-[1.02]"
            >
              <Globe size={14} />
              EXPLORE PROJECTS
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
