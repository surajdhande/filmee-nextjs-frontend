"use client";

import React, { useState } from "react";
import {
  Crown,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  CreditCard,
  Download,
  Pencil,
  Trash2,
  Plus,
  Zap,
  Building2,
  Star,
} from "lucide-react";
import InvestorLayout from "./InvestorLayout";
import { useRouter } from "next/navigation";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const CURRENT_PLAN = {
  name: "Professional",
  subtitle: "Investor Plan",
  price: "$49",
  period: "monthly",
  nextBilling: "1/1/2025",
  daysUntilRenewal: -553,
  status: "Active",
};

const USAGE_STATS = [
  { label: "Portfolio Projects", used: 8, total: "∞", percent: 60 },
  { label: "Monthly Connections", used: 12, total: "∞", percent: 75 },
];

const PLAN_FEATURES = [
  "Advanced project discovery",
  "Detailed financial projections",
  "Direct filmmaker communication",
  "Portfolio management tools",
  "ROI analytics & reporting",
  "Video call scheduling",
  "Priority project notifications",
  "Due diligence document access",
  "Investment history tracking",
];

const BILLING_HISTORY = [
  { id: 1, plan: "Professional Plan", date: "12/1/2024", amount: "$49", status: "paid" },
  { id: 2, plan: "Professional Plan", date: "11/1/2024", amount: "$49", status: "paid" },
  { id: 3, plan: "Professional Plan", date: "10/1/2024", amount: "$49", status: "paid" },
];

const PAYMENT_METHODS = [
  { id: 1, type: "Visa", last4: "4242", expiry: "12/26", isDefault: true },
  { id: 2, type: "Mastercard", last4: "5555", expiry: "08/25", isDefault: false },
];

const PLANS = [
  {
    id: "explorer",
    name: "Explorer",
    price: "$0",
    period: "monthly",
    tagline: "Explore investment opportunities",
    isCurrent: false,
    isPopular: false,
    features: [
      "Browse all public projects",
      "Basic project analytics",
      "Connect with up to 5 filmmakers",
      "Community forum access",
      "Email support",
    ],
    extra: "+1 more features",
    cta: "START EXPLORING",
    ctaVariant: "outline",
  },
  {
    id: "professional",
    name: "Professional",
    price: "$49",
    period: "monthly",
    tagline: "For active investors seeking quality projects",
    isCurrent: true,
    isPopular: true,
    features: [
      "Advanced project discovery",
      "Detailed financial projections",
      "Direct filmmaker communication",
      "Portfolio management tools",
      "ROI analytics & reporting",
    ],
    extra: "+4 more features",
    cta: "CURRENT PLAN",
    ctaVariant: "current",
  },
  {
    id: "institutional",
    name: "Institutional",
    price: "$199",
    period: "monthly",
    tagline: "For investment firms and institutional investors",
    isCurrent: false,
    isPopular: false,
    features: [
      "Everything in Professional",
      "Multi-user team access",
      "Advanced market analytics",
      "Custom investment criteria",
      "White-label reporting",
    ],
    extra: "+5 more features",
    cta: "CONTACT SALES",
    ctaVariant: "solid",
  },
];

const TABS = ["Overview", "Billing History", "Payment Methods", "Change Plan"];

// ─── Sub-components ───────────────────────────────────────────────────────────

function UsageBar({ label, used, total, percent }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between text-xs text-zinc-400 mb-1.5">
        <span>{label}</span>
        <span>
          {used}/{total}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-[#E50914]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-5">
      {/* Current Plan + Usage side-by-side */}
      <div className="flex gap-5">
        {/* Current Plan card */}
        <div className="flex-1 rounded-2xl border border-zinc-800 bg-[#141414] p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
            Current Plan
          </p>

          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-[22px] font-bold text-white">
                {CURRENT_PLAN.name}
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">{CURRENT_PLAN.subtitle}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-white">
                {CURRENT_PLAN.price}
              </span>
              <span className="text-xs text-zinc-500">/{CURRENT_PLAN.period}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1">
                Next billing date
              </p>
              <p className="text-sm font-semibold text-white">
                {CURRENT_PLAN.nextBilling}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1">
                Days until renewal
              </p>
              <p className="text-sm font-semibold text-white">
                {CURRENT_PLAN.daysUntilRenewal} days
              </p>
            </div>
          </div>

          {/* Membership section */}
          <div className="rounded-xl border border-zinc-700 bg-[#1a1a1a] p-4 mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Crown size={14} className="text-[#E50914]" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">
                Membership Benefits
              </span>
            </div>
            <ul className="space-y-1.5">
              {["Priority deal flow access", "Dedicated account manager", "Quarterly investor reports", "Early access to new features"].map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-xs text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 rounded-full border border-[#E50914] py-2.5 text-[12px] font-bold uppercase tracking-wider text-[#E50914] hover:bg-[#E50914]/10 transition duration-200">
              <Zap size={13} />
              Upgrade Plan
            </button>
            <button className="px-5 rounded-full border border-zinc-700 py-2.5 text-[12px] font-bold uppercase tracking-wider text-zinc-400 hover:border-zinc-500 hover:text-white transition duration-200">
              Cancel
            </button>
          </div>
        </div>

        {/* Usage Stats card */}
        <div className="w-64 shrink-0 rounded-2xl border border-zinc-800 bg-[#141414] p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-5">
            Usage Stats
          </p>
          {USAGE_STATS.map((stat) => (
            <UsageBar key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      {/* Current Plan Features */}
      <div className="rounded-2xl border border-zinc-800 bg-[#141414] p-6">
        <p className="text-sm font-bold text-white mb-1">Current Plan Features</p>
        <p className="text-xs text-zinc-500 mb-5">
          Features included in your Professional plan
        </p>
        <div className="grid grid-cols-3 gap-x-6 gap-y-3">
          {PLAN_FEATURES.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-green-500 shrink-0" />
              <span className="text-xs text-zinc-300">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BillingHistoryTab() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#141414] p-6">
      <p className="text-sm font-bold text-white mb-1">Billing History</p>
      <p className="text-xs text-zinc-500 mb-6">Your past invoices and payments</p>

      <div className="space-y-3">
        {BILLING_HISTORY.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl border border-zinc-800 bg-[#1a1a1a] px-5 py-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E50914]/10 border border-[#E50914]/20">
                <CreditCard size={16} className="text-[#E50914]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{item.plan}</p>
                <p className="text-xs text-zinc-500">{item.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-white">{item.amount}</span>
              <span className="rounded-full bg-green-500/15 px-3 py-0.5 text-[11px] font-bold text-green-400">
                {item.status}
              </span>
              <button className="text-zinc-500 hover:text-white transition duration-200">
                <Download size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentMethodsTab() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#141414] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-bold text-white mb-1">Payment Methods</p>
          <p className="text-xs text-zinc-500">Manage your payment methods</p>
        </div>
        <button className="flex items-center gap-2 rounded-full border border-[#E50914] px-4 py-2 text-[12px] font-bold uppercase tracking-wider text-[#E50914] hover:bg-[#E50914]/10 transition duration-200">
          <Plus size={13} />
          Add Method
        </button>
      </div>

      <div className="space-y-3">
        {PAYMENT_METHODS.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between rounded-xl border border-zinc-800 bg-[#1a1a1a] px-5 py-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E50914]/10 border border-[#E50914]/20">
                <CreditCard size={16} className="text-[#E50914]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white">
                    {method.type} •••• {method.last4}
                  </p>
                  {method.isDefault && (
                    <span className="rounded-full bg-[#E50914] px-2 py-0.5 text-[10px] font-bold text-white">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-500">Expires {method.expiry}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-zinc-500 hover:text-white transition duration-200">
                <Pencil size={15} />
              </button>
              <button className="text-zinc-500 hover:text-[#E50914] transition duration-200">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChangePlanTab() {
  return (
    <div className="grid grid-cols-3 gap-5">
      {PLANS.map((plan) => (
        <div
          key={plan.id}
          className={`relative rounded-2xl border p-6 flex flex-col ${
            plan.isCurrent
              ? "border-[#E50914] bg-[#1a0a0b]"
              : "border-zinc-800 bg-[#141414]"
          }`}
        >
          {/* Badges */}
          <div className="flex items-center gap-2 mb-3">
            <p className="text-base font-bold text-white">{plan.name}</p>
            {plan.isPopular && (
              <span className="rounded-full bg-[#E50914]/20 border border-[#E50914]/40 px-2 py-0.5 text-[10px] font-bold text-[#E50914]">
                Popular
              </span>
            )}
            {plan.isCurrent && (
              <span className="rounded-full bg-green-500/20 border border-green-500/40 px-2 py-0.5 text-[10px] font-bold text-green-400">
                Current
              </span>
            )}
          </div>

          <div className="mb-1">
            <span className="text-2xl font-bold text-white">{plan.price}</span>
            <span className="text-xs text-zinc-500">/{plan.period}</span>
          </div>
          <p className="text-xs text-zinc-500 mb-5">{plan.tagline}</p>

          <ul className="space-y-2 mb-4 flex-1">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-zinc-300">
                <CheckCircle2 size={13} className="text-green-500 shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>

          {plan.extra && (
            <p className="text-xs text-zinc-500 mb-5">{plan.extra}</p>
          )}

          <button
            disabled={plan.ctaVariant === "current"}
            className={`w-full rounded-full py-2.5 text-[12px] font-bold uppercase tracking-wider transition duration-200 ${
              plan.ctaVariant === "solid"
                ? "bg-gradient-to-r from-[#E50914] to-[#B3070F] text-white hover:brightness-110"
                : plan.ctaVariant === "outline"
                ? "border border-[#E50914] text-[#E50914] hover:bg-[#E50914]/10"
                : "border border-zinc-700 text-zinc-500 cursor-not-allowed"
            }`}
          >
            {plan.cta}
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SubscriptionPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <InvestorLayout>
      <div className="px-8 py-8 bg-black min-h-screen">

        {/* Page header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition duration-200"
            >
              <ArrowLeft size={14} />
              BACK
            </button>
            <div className="w-px h-5 bg-zinc-700" />
            <div>
              <h2 className="text-[22px] font-bold text-white tracking-tight">
                Subscription Management
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Manage your plan, billing, and payment methods
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Active badge */}
            <div className="flex items-center gap-1.5 rounded-full bg-green-500/15 border border-green-500/30 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-green-400">
                Active
              </span>
            </div>

            <button className="flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider text-zinc-300 hover:border-zinc-500 hover:text-white transition duration-200">
              <ArrowUpRight size={13} />
              View All Plans
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 rounded-xl border border-zinc-800 bg-[#141414] p-1 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 rounded-lg py-2 text-[12px] font-bold uppercase tracking-wider transition duration-200 ${
                activeTab === tab
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "Overview" && <OverviewTab />}
        {activeTab === "Billing History" && <BillingHistoryTab />}
        {activeTab === "Payment Methods" && <PaymentMethodsTab />}
        {activeTab === "Change Plan" && <ChangePlanTab />}
      </div>
    </InvestorLayout>
  );
}
