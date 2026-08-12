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
  daysUntilRenewal: 30,
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
    cta: "Start Exploring",
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
    cta: "Current Plan",
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
    cta: "Contact Sales",
    ctaVariant: "solid",
  },
];

const TABS = ["Overview", "Billing History", "Payment Methods", "Change Plan"];

// ─── Sub-components ───────────────────────────────────────────────────────────

function UsageBar({ label, used, total, percent }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between text-xs text-zinc-400 mb-1.5 font-medium">
        <span>{label}</span>
        <span>
          {used}/{total}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-[#2A2A2A] overflow-hidden">
        <div
          className="h-full rounded-full bg-red-600"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Current Plan + Usage side-by-side */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Current Plan card */}
        <div className="flex-1 rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-4">
            Current Plan
          </p>

          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {CURRENT_PLAN.name}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">{CURRENT_PLAN.subtitle}</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-white tracking-tight">
                {CURRENT_PLAN.price}
              </span>
              <span className="text-xs text-zinc-400">/{CURRENT_PLAN.period}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                Next billing date
              </p>
              <p className="text-sm font-bold text-white">
                {CURRENT_PLAN.nextBilling}
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                Renewal
              </p>
              <p className="text-sm font-bold text-white">
                In {CURRENT_PLAN.daysUntilRenewal} days
              </p>
            </div>
          </div>

          {/* Membership section */}
          <div className="rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-5 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Crown size={16} className="text-red-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Membership Benefits
              </span>
            </div>
            <ul className="space-y-2">
              {["Priority deal flow access", "Dedicated account manager", "Quarterly investor reports", "Early access to new features"].map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-xs text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 rounded-full border border-red-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-red-500 hover:bg-red-600/10 transition-colors">
              <Zap size={14} />
              Upgrade Plan
            </button>
            <button className="px-6 rounded-full border border-[#2A2A2A] py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:bg-[#1E1E1E] hover:text-white transition-colors">
              Cancel
            </button>
          </div>
        </div>

        {/* Usage Stats card */}
        <div className="w-full lg:w-72 shrink-0 rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-6">
            Usage Stats
          </p>
          {USAGE_STATS.map((stat) => (
            <UsageBar key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      {/* Current Plan Features */}
      <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6">
        <h3 className="text-lg font-bold text-white mb-1">Current Plan Features</h3>
        <p className="text-xs text-zinc-400 mb-6">
          Features included in your Professional plan
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-6">
          {PLAN_FEATURES.map((feature) => (
            <div key={feature} className="flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-[#18C964] shrink-0" />
              <span className="text-xs text-zinc-300 font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BillingHistoryTab() {
  return (
    <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6">
      <h3 className="text-lg font-bold text-white mb-1">Billing History</h3>
      <p className="text-xs text-zinc-400 mb-6">Your past invoices and payments</p>

      <div className="space-y-3">
        {BILLING_HISTORY.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-5"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E1E1E]">
                <CreditCard size={18} className="text-red-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{item.plan}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{item.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-white">{item.amount}</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#18C964]/10 text-[#18C964]">
                {item.status}
              </span>
              <button className="text-zinc-400 hover:text-white transition-colors">
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
    <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Payment Methods</h3>
          <p className="text-xs text-zinc-400">Manage your connected credit cards and payment options</p>
        </div>
        <button className="flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-700 transition-colors">
          <Plus size={14} />
          Add Method
        </button>
      </div>

      <div className="space-y-3">
        {PAYMENT_METHODS.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-5"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E1E1E]">
                <CreditCard size={18} className="text-red-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-white">
                    {method.type} •••• {method.last4}
                  </p>
                  {method.isDefault && (
                    <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">Expires {method.expiry}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-zinc-400 hover:text-white transition-colors">
                <Pencil size={15} />
              </button>
              <button className="text-zinc-400 hover:text-red-500 transition-colors">
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {PLANS.map((plan) => (
        <div
          key={plan.id}
          className={`relative rounded-[24px] border p-6 flex flex-col justify-between bg-[#141414] ${
            plan.isCurrent
              ? "border-red-600 shadow-[0_0_20px_rgba(229,9,20,0.15)]"
              : "border-[#2A2A2A]"
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-lg font-bold text-white">{plan.name}</h3>
              {plan.isPopular && (
                <span className="rounded-full bg-red-600/20 border border-red-600/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-500">
                  Popular
                </span>
              )}
              {plan.isCurrent && (
                <span className="rounded-full bg-[#18C964]/20 border border-[#18C964]/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#18C964]">
                  Current
                </span>
              )}
            </div>

            <div className="mb-2">
              <span className="text-3xl font-bold text-white tracking-tight">{plan.price}</span>
              <span className="text-xs text-zinc-400">/{plan.period}</span>
            </div>
            <p className="text-xs text-zinc-400 mb-6">{plan.tagline}</p>

            <ul className="space-y-2.5 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
                  <CheckCircle2 size={16} className={plan.isCurrent ? "text-red-500 shrink-0" : "text-zinc-500 shrink-0"} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <button
            disabled={plan.ctaVariant === "current"}
            className={`w-full rounded-full py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
              plan.ctaVariant === "solid"
                ? "bg-red-600 text-white hover:bg-red-700"
                : plan.ctaVariant === "outline"
                ? "border border-[#2A2A2A] text-white hover:bg-[#1E1E1E]"
                : "border border-[#2A2A2A] text-zinc-500 cursor-not-allowed bg-[#1A1A1A]"
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
      <div className="px-4 py-6 sm:px-6 md:px-8 md:py-10 bg-[#0B0B0B] min-h-screen">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white hover:text-red-500 transition-colors self-start sm:self-auto"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <div className="h-8 w-px bg-[#2A2A2A] hidden sm:block" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Subscription Management
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Manage your plan, billing, and payment methods
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider bg-[#18C964]/10 text-[#18C964]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#18C964] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#18C964]" />
              </span>
              <span>Active</span>
            </div>

            <button className="flex items-center gap-2 rounded-full border border-[#2A2A2A] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#1E1E1E] transition-colors">
              <ArrowUpRight size={16} />
              <span>View All Plans</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 rounded-full border border-[#2A2A2A] bg-[#141414] p-1 flex overflow-x-auto whitespace-nowrap scrollbar-none">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 rounded-full py-2 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? "bg-red-600 text-white shadow-[0_0_12px_rgba(229,9,20,0.4)]"
                  : "text-zinc-400 hover:text-white"
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
