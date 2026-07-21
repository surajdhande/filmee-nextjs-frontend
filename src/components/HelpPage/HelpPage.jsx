"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  BookOpen, 
  Search, 
  Smartphone, 
  MessageSquare, 
  Phone, 
  Mail, 
  ChevronRight,
  MessageCircle
} from "lucide-react";

export default function HelpPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      title: "Getting Started",
      desc: "Learn the basics of using FilmConnect",
      articles: "12 articles",
      icon: Smartphone,
      iconColor: "text-blue-400",
    },
    {
      title: "Project Management",
      desc: "Managing your film projects effectively",
      articles: "18 articles",
      icon: MessageSquare,
      iconColor: "text-emerald-400",
    },
    {
      title: "Funding & Investment",
      desc: "Understanding investment processes",
      articles: "15 articles",
      icon: Phone,
      iconColor: "text-purple-400",
    },
    {
      title: "Account & Billing",
      desc: "Account settings and billing information",
      articles: "8 articles",
      icon: Mail,
      iconColor: "text-amber-400",
    }
  ];

  const popularArticles = [
    "How to create your first project",
    "Understanding investment terms",
    "Building your project team",
    "Setting up payment methods",
    "Managing project timelines",
    "Communicating with investors"
  ];

  const contactSupport = [
    {
      title: "Live Chat",
      desc: "Get instant help from our support team",
      sub: "24/7 Available",
      icon: MessageCircle,
      btnText: "START CHAT"
    },
    {
      title: "Email Support",
      desc: "Send us a detailed message",
      sub: "Response in 24hrs",
      icon: Mail,
      btnText: "SEND EMAIL"
    },
    {
      title: "Phone Support",
      desc: "Speak directly with our team",
      sub: "Mon-Fri 9AM-6PM",
      icon: Phone,
      btnText: "CALL NOW"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050506] text-white pb-24">
      
      {/* Custom Sticky Header */}
      <header className="fixed top-0 left-0 z-[999] w-full border-b border-zinc-900 bg-black/95 backdrop-blur-md">
        <div className="flex h-20 w-full items-center justify-between px-6 sm:px-16">
          
          {/* Left Actions */}
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm font-black tracking-wider uppercase"
              aria-label="Go back"
            >
              <ArrowLeft size={16} />
              BACK
            </button>
            
            {/* Divider */}
            <div className="h-6 w-px bg-zinc-800 mx-4 sm:mx-6" />
            
            {/* Help Center Title */}
            <div className="flex items-center gap-2.5">
              <BookOpen size={20} className="text-red-500" />
              <span className="text-red-500 font-extrabold text-sm sm:text-base tracking-widest uppercase">
                HELP CENTER
              </span>
            </div>
          </div>

          {/* Right Action */}
          <Link href="/signup">
            <button className="rounded-full bg-gradient-to-r from-red-700 to-red-500 px-6 py-2.5 text-xs sm:text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(220,38,38,0.45)] uppercase tracking-wider">
              Get Started
            </button>
          </Link>
          
        </div>
      </header>

      {/* Main Section */}
      <main className="mx-auto max-w-7xl px-6 pt-36 md:px-16 lg:px-24">
        
        {/* Hero Section */}
        <div className="text-center mb-16 pt-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight mb-4">
            How can we <span className="text-red-500">help you?</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Find answers to your questions or get in touch with our support team
          </p>
          
          {/* Search bar */}
          <div className="relative w-full max-w-2xl mx-auto mt-8">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles..."
              className="w-full bg-[#0c0d10] border border-zinc-800 rounded-lg py-3.5 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/80 transition-colors shadow-lg text-[15px]"
            />
          </div>
        </div>

        {/* Browse by Category */}
        <div className="mb-24">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-12 tracking-wide">
            Browse by Category
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => {
              const IconComponent = cat.icon;
              return (
                <div
                  key={i}
                  className="bg-[#0b0c10]/40 border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-700/80 hover:bg-[#121215]/60 hover:scale-[1.02] cursor-pointer transition-all duration-300 shadow-md min-h-[190px] relative group"
                >
                  <div>
                    <IconComponent size={24} className={`${cat.iconColor} mb-4`} />
                    <h3 className="text-[17px] font-bold text-white mb-2 leading-snug tracking-wide group-hover:text-red-400 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-zinc-500 text-xs font-semibold">
                      {cat.articles}
                    </span>
                    <ChevronRight size={16} className="text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Popular Articles & Contact Support Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
          
          {/* Column 1: Popular Articles */}
          <div>
            <h2 className="text-2xl font-extrabold text-white mb-8 tracking-wide">
              Popular Articles
            </h2>
            
            <div className="flex flex-col gap-4">
              {popularArticles.map((article, i) => (
                <div
                  key={i}
                  className="bg-[#0b0c10]/40 border border-zinc-800/80 rounded-xl py-4 px-6 flex items-center justify-between cursor-pointer hover:bg-[#121215]/60 hover:border-zinc-700/80 transition-all duration-200 group active:scale-[0.99]"
                >
                  <span className="text-sm sm:text-[15px] font-semibold text-zinc-300 group-hover:text-white transition-colors leading-relaxed">
                    {article}
                  </span>
                  <ChevronRight size={16} className="text-zinc-500 group-hover:text-zinc-300 group-hover:translate-x-0.5 transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Contact Support */}
          <div>
            <h2 className="text-2xl font-extrabold text-white mb-8 tracking-wide">
              Contact Support
            </h2>
            
            <div className="flex flex-col gap-6">
              {contactSupport.map((card, i) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={i}
                    className="bg-[#0b0c10]/40 border border-zinc-800/80 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-zinc-700/80 transition-colors shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-red-950/10 rounded-xl mt-0.5">
                        <IconComponent size={24} className="text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white mb-1 tracking-wide">
                          {card.title}
                        </h3>
                        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-1">
                          {card.desc}
                        </p>
                        <span className="text-zinc-500 text-xs font-semibold">
                          {card.sub}
                        </span>
                      </div>
                    </div>
                    
                    <button className="sm:self-center border border-red-600/80 text-red-500 hover:bg-red-600 hover:text-white px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 self-start">
                      {card.btnText}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Still Need Help? Section */}
        <div className="border-t border-zinc-900 pt-16 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-3 tracking-wide">
            Still Need Help?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-8">
            Our support team is here to help you succeed with your film projects
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-red-700 to-red-500 px-8 py-3.5 text-xs sm:text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(220,38,38,0.45)] uppercase tracking-wider w-full sm:w-auto">
              <MessageSquare size={16} />
              CONTACT SUPPORT
            </button>
            
            <button className="flex items-center justify-center gap-2.5 rounded-full border border-red-650 px-8 py-3.5 text-xs sm:text-sm font-bold text-red-500 hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-105 w-full sm:w-auto uppercase tracking-wider">
              <BookOpen size={16} />
              BROWSE ALL ARTICLES
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
