"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Search,
  Bell,
  Zap,
  Star,
  Users,
  Shield,
  Globe,
  Check,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";

// ── Pricing Data ──────────────────────────────────────────────────────────────

const TABS = [
  { key: "filmmaker", label: "Filmmakers", icon: Zap },
  { key: "investor",  label: "Investors",  icon: Star },
  { key: "talent",    label: "Talent",     icon: Users },
];

const PLANS = {
  filmmaker: {
    heading: "Filmmaker Plans",
    sub: "Bring your creative vision to life with the right tools and connections",
    cards: [
      {
        name: "Starter",
        desc: "Perfect for aspiring filmmakers getting started",
        monthly: 0,
        yearly: 0,
        cta: "GET STARTED FREE",
        ctaStyle: "outline",
        popular: false,
        features: [
          "Create up to 2 projects",
          "Basic project management tools",
          "Connect with up to 10 talent",
          "Community forum access",
          "Email support",
          "Project analytics (basic)",
        ],
      },
      {
        name: "Professional",
        desc: "For serious filmmakers managing multiple projects",
        monthly: 29,
        yearly: 23,
        cta: "START PRO TRIAL",
        ctaStyle: "filled",
        popular: true,
        features: [
          "Unlimited projects",
          "Advanced project management",
          "Connect with unlimited talent",
          "Investor pitch deck builder",
          "Video conferencing integration",
          "Advanced analytics & insights",
          "Priority support",
          "Custom branding options",
          "Script collaboration tools",
        ],
      },
      {
        name: "Studio",
        desc: "Enterprise-grade tools for production companies",
        monthly: 99,
        yearly: 79,
        cta: "CONTACT SALES",
        ctaStyle: "outline",
        popular: false,
        features: [
          "Everything in Professional",
          "Team collaboration (up to 50 members)",
          "Multi-project portfolio management",
          "Advanced investor relations tools",
          "White-label platform options",
          "API access",
          "Dedicated account manager",
          "Custom integrations",
          "Advanced security features",
          "24/7 phone support",
        ],
      },
    ],
  },
  investor: {
    heading: "Investor Plans",
    sub: "Discover and fund the most promising film projects worldwide",
    cards: [
      {
        name: "Starter",
        desc: "Perfect for first-time film investors",
        monthly: 0,
        yearly: 0,
        cta: "GET STARTED FREE",
        ctaStyle: "outline",
        popular: false,
        features: [
          "Browse up to 20 projects",
          "Basic due diligence tools",
          "Portfolio tracking (up to 3)",
          "Community forum access",
          "Email support",
        ],
      },
      {
        name: "Growth",
        desc: "For active investors building a film portfolio",
        monthly: 49,
        yearly: 39,
        cta: "START GROWTH TRIAL",
        ctaStyle: "filled",
        popular: true,
        features: [
          "Unlimited project browsing",
          "Advanced due diligence tools",
          "Full portfolio management",
          "Deal flow notifications",
          "Investor network access",
          "ROI analytics dashboard",
          "Priority support",
        ],
      },
      {
        name: "Institutional",
        desc: "For funds and institutional investors",
        monthly: 199,
        yearly: 159,
        cta: "CONTACT SALES",
        ctaStyle: "outline",
        popular: false,
        features: [
          "Everything in Growth",
          "White-glove deal sourcing",
          "Co-investment opportunities",
          "Dedicated relationship manager",
          "Custom reporting & exports",
          "API & data integrations",
          "Legal & compliance support",
          "24/7 priority support",
        ],
      },
    ],
  },
  talent: {
    heading: "Talent Plans",
    sub: "Showcase your skills and land your next creative role",
    cards: [
      {
        name: "Basic",
        desc: "For emerging talent building their portfolio",
        monthly: 0,
        yearly: 0,
        cta: "JOIN FOR FREE",
        ctaStyle: "outline",
        popular: false,
        features: [
          "Create a talent profile",
          "Apply to up to 5 roles/month",
          "Portfolio (up to 3 pieces)",
          "Community access",
          "Email support",
        ],
      },
      {
        name: "Pro",
        desc: "For working professionals seeking top roles",
        monthly: 19,
        yearly: 15,
        cta: "START PRO TRIAL",
        ctaStyle: "filled",
        popular: true,
        features: [
          "Unlimited role applications",
          "Featured profile placement",
          "Unlimited portfolio uploads",
          "Direct filmmaker messaging",
          "Audition call notifications",
          "Skills badge verification",
          "Priority support",
        ],
      },
      {
        name: "Agency",
        desc: "For talent agencies managing multiple clients",
        monthly: 79,
        yearly: 63,
        cta: "CONTACT SALES",
        ctaStyle: "outline",
        popular: false,
        features: [
          "Everything in Pro",
          "Manage up to 50 talent profiles",
          "Agency branding & page",
          "Bulk application tools",
          "Analytics for all clients",
          "Dedicated account manager",
          "Custom integrations",
        ],
      },
    ],
  },
};

const WHY_CARDS = [
  {
    icon: Shield,
    title: "Secure & Trusted",
    desc: "Enterprise-grade security with end-to-end encryption to protect your projects and investments.",
  },
  {
    icon: Globe,
    title: "Global Network",
    desc: "Connect with filmmakers, investors, and talent from around the world in our thriving community.",
  },
  {
    icon: Zap,
    title: "Powerful Tools",
    desc: "Advanced project management, analytics, and collaboration tools designed for the film industry.",
  },
];

const FAQS = [
  {
    q: "Can I change my plan at any time?",
    a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.",
  },
  {
    q: "Is there a free trial available?",
    a: "Absolutely. All paid plans come with a 14-day free trial — no credit card required. You can cancel anytime before the trial ends.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and bank transfers for annual enterprise plans.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes. There are no long-term contracts. Cancel at any time from your account settings, and you won't be charged again.",
  },
  {
    q: "Do you offer discounts for annual billing?",
    a: "Yes! Annual billing saves you up to 20% compared to monthly billing. Pricing shown under the 'Yearly' toggle reflects the discounted rate.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. We use AES-256 encryption, SOC 2 compliant infrastructure, and never sell your data to third parties.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const router = useRouter();
  const [yearly, setYearly]       = useState(false);
  const [activeTab, setActiveTab] = useState("filmmaker");
  const [openFaq, setOpenFaq]     = useState(null);

  const plan = PLANS[activeTab];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 z-[999] w-full bg-black/95 backdrop-blur-md border-b border-zinc-800">
        <div className="flex h-16 items-center justify-between px-3 sm:px-10">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors text-xs sm:text-sm font-semibold"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">BACK</span>
          </button>
          <span className="text-white font-semibold text-sm sm:text-base">Pricing Plans</span>
          <div className="w-8 sm:w-20" />
        </div>
      </div>

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <main className="pt-24 pb-24 px-4 sm:px-6 max-w-5xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Choose Your{" "}
            <span className="text-red-500">FilmConnect</span>{" "}
            Plan
          </h1>
          <p className="text-zinc-400 text-xs sm:text-base max-w-lg mx-auto leading-relaxed">
            Whether you&apos;re a filmmaker, investor, or talent, we have the perfect plan to help you
            succeed in the film industry.
          </p>
        </div>

        {/* Monthly / Yearly toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span
            className={`text-xs sm:text-sm font-semibold transition-colors ${
              !yearly ? "text-white" : "text-zinc-500"
            }`}
          >
            Monthly
          </span>

          <button
            type="button"
            onClick={() => setYearly((prev) => !prev)}
            className={`relative w-12 h-6 sm:w-14 sm:h-7 rounded-full transition-all duration-300 ${
              yearly ? "bg-red-600" : "bg-zinc-700"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                yearly ? "translate-x-6 sm:translate-x-7" : "translate-x-0"
              }`}
            />
          </button>

          <span
            className={`text-xs sm:text-sm font-semibold transition-colors ${
              yearly ? "text-white" : "text-zinc-500"
            }`}
          >
            Yearly
          </span>

          {yearly && (
            <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] sm:text-xs font-bold text-white">
              Save 20%
            </span>
          )}
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-[#141414] border border-zinc-800 rounded-full p-1 gap-1 max-w-full overflow-x-auto scrollbar-none">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-shrink-0 flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab.key
                      ? "bg-white text-black"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Icon size={12} className="sm:w-[14px] sm:h-[14px]" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section heading */}
        <div className="text-center mb-8">
          <h2 className="text-lg sm:text-2xl font-bold text-white">{plan.heading}</h2>
          <p className="text-zinc-400 text-[11px] sm:text-sm mt-1">{plan.sub}</p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {plan.cards.map((card) => (
            <div
              key={card.name}
              className={`relative flex flex-col rounded-2xl p-4 sm:p-6 bg-[#111111] transition-all duration-300 ${
                card.popular
                  ? "border-2 border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.2)]"
                  : "border border-zinc-800 hover:border-zinc-600"
              }`}
            >
              {/* Most Popular badge */}
              {card.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-red-600 text-white text-[10px] sm:text-xs font-bold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Icon + name */}
              <div className="flex flex-col items-center text-center mb-4 gap-2">
                <Zap size={24} className="text-white sm:w-[26px] sm:h-[26px]" />
                <h3 className="text-lg sm:text-xl font-bold text-white">{card.name}</h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{card.desc}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <span className="text-3xl sm:text-4xl font-extrabold text-white">
                  ${yearly ? card.yearly : card.monthly}
                </span>
                <span className="text-zinc-400 text-xs sm:text-sm"> /mo</span>
              </div>

              {/* CTA button */}
              {card.ctaStyle === "filled" ? (
                <button
                  onClick={() => router.push("/signup")}
                  className="w-full bg-gradient-to-r from-red-700 to-red-500 hover:brightness-110 text-white font-bold py-2.5 sm:py-3 rounded-full transition-all duration-200 hover:scale-105 text-xs sm:text-sm mb-6"
                >
                  {card.cta}
                </button>
              ) : (
                <button
                  onClick={() => router.push("/signup")}
                  className="w-full border border-red-600 text-red-500 hover:bg-red-600 hover:text-white font-bold py-2.5 sm:py-3 rounded-full transition-all duration-200 text-xs sm:text-sm mb-6"
                >
                  {card.cta}
                </button>
              )}

              {/* Features */}
              <ul className="flex flex-col gap-3">
                {card.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                    <Check size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Why Choose FilmConnect ── */}
        <div className="mb-20">
          <h2 className="text-lg sm:text-2xl font-bold text-center text-white mb-8">
            Why Choose FilmConnect?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CARDS.map((w) => {
              const Icon = w.icon;
              return (
                <div
                  key={w.title}
                  className="bg-[#111111] border border-zinc-800 rounded-2xl p-5 sm:p-8 flex flex-col items-center text-center gap-4 hover:border-zinc-600 transition-colors duration-200"
                >
                  <Icon size={30} className="text-red-500 sm:w-[36px] sm:h-[36px]" />
                  <h3 className="text-base sm:text-lg font-bold text-white">{w.title}</h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="mb-20">
          <h2 className="text-lg sm:text-2xl font-bold text-center text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col divide-y divide-zinc-800">
            {FAQS.map((faq, i) => (
              <div key={i} className="py-4 sm:py-5">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between text-left text-white font-semibold text-xs sm:text-sm hover:text-red-400 transition-colors duration-200 gap-3"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`flex-shrink-0 text-zinc-500 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <p className="mt-3 text-zinc-400 text-xs sm:text-sm leading-relaxed pr-8">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA Banner ── */}
        <div className="rounded-2xl bg-gradient-to-br from-[#2a0a0a] to-[#1a0505] border border-red-900/40 p-5 sm:p-12 flex flex-col items-center text-center gap-5">
          <h2 className="text-lg sm:text-2xl font-bold text-white">Ready to Get Started?</h2>
          <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
            Join thousands of filmmakers, investors, and talent already using FilmConnect to create
            amazing projects.
          </p>
          <button
            onClick={() => router.push("/signup")}
            className="w-full max-w-lg bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] text-sm tracking-widest uppercase"
          >
            Start Your Free Trial
          </button>
          <p className="text-zinc-600 text-xs">No credit card required • 14-day free trial</p>
        </div>

      </main>
    </div>
  );
}
