"use client";

import React, { useState } from "react";
import { ArrowLeft, Crown, CheckCircle2, ShieldAlert, CreditCard, Download, Plus, Pencil, Trash2 } from "lucide-react";

export default function SubscriptionPage({ onBack }) {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for usage stats
  const usageStats = {
    appsUsed: 3,
    appsTotal: 5,
    profileViews: 127,
  };

  // Current Plan features
  const planFeatures = [
    "Basic profile creation",
    "Apply to up to 5 projects/month",
    "Basic portfolio showcase",
    "Community forum access",
    "Email support",
    "Project notifications",
  ];

  return (
    <main className="flex-1 overflow-y-auto px-8 py-8 space-y-8 bg-[#0a0a0a]">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-black text-zinc-400 hover:text-white uppercase tracking-wider transition-colors border border-zinc-800 rounded-full px-4 py-2 hover:bg-zinc-900"
          >
            <ArrowLeft size={14} />
            BACK
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-white tracking-tight">
                Subscription Management
              </h2>
              <span className="flex items-center gap-1 bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                <CheckCircle2 size={10} />
                Active
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Manage your plan, billing, and payment methods
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 border border-red-700/60 hover:border-red-650 hover:bg-red-950/20 text-red-500 text-xs font-black px-5 py-2.5 rounded-full transition-all duration-200 tracking-wider uppercase">
          VIEW ALL PLANS
          <span className="text-[10px]">↗</span>
        </button>
      </div>

      {/* ── Sub Navigation Tabs ────────────────────────────────────────────── */}
      <div className="bg-[#111] border border-zinc-900 rounded-xl p-1.5 flex gap-2">
        {["overview", "billing-history", "payment-methods", "change-plan"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 text-xs font-black uppercase tracking-wider rounded-lg transition-all duration-200 ${
                activeTab === tab
                  ? "bg-zinc-800/80 text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab.replace("-", " ")}
            </button>
          )
        )}
      </div>

      {/* ── Tab Content ────────────────────────────────────────────────────── */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Current Plan Card */}
            <div className="col-span-2 bg-[#141414] border border-zinc-800/70 rounded-2xl p-6 flex flex-col justify-between min-h-[220px]">
              <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">
                  Current Plan
                </p>
                <div className="flex justify-between items-start mt-4">
                  <div>
                    <h3 className="text-3xl font-black text-white">Free</h3>
                    <p className="text-xs text-zinc-400 font-semibold mt-1">
                      Talent Plan
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-white">
                      $0<span className="text-sm font-semibold text-zinc-500">/monthly</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-zinc-800/60 pt-4 mt-6">
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
                    Next billing date
                  </p>
                  <p className="text-white font-bold text-sm mt-1">1/1/2025</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
                    Days until renewal
                  </p>
                  <p className="text-red-500 font-bold text-sm mt-1">-557 days</p>
                </div>
              </div>

              <button className="w-full mt-6 flex items-center justify-center gap-2 border border-red-700/60 hover:bg-red-950/20 text-red-500 text-xs font-black py-3 rounded-xl transition-all duration-200 uppercase tracking-wider">
                <Crown size={14} className="text-red-500" />
                UPGRADE PLAN
              </button>
            </div>

            {/* Usage Stats Card */}
            <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-6 flex flex-col justify-between min-h-[220px]">
              <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">
                  Usage Stats
                </p>

                <div className="space-y-6 mt-6">
                  {/* Apps Limit */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-zinc-400">Applications This Month</span>
                      <span className="text-white">
                        {usageStats.appsUsed}/{usageStats.appsTotal}
                      </span>
                    </div>
                    <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-red-600 h-full rounded-full"
                        style={{
                          width: `${
                            (usageStats.appsUsed / usageStats.appsTotal) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Profile Views */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-zinc-400">Profile Views</span>
                      <span className="text-white">{usageStats.profileViews}</span>
                    </div>
                    <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-red-600 h-full rounded-full"
                        style={{ width: "85%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Plan Features */}
          <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-6">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">
              Current Plan Features
            </p>
            <p className="text-xs text-zinc-400 font-semibold mt-1">
              Features included in your Free plan
            </p>

            <div className="grid grid-cols-3 gap-y-4 gap-x-6 mt-6">
              {planFeatures.map((feature, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                  <span className="text-xs text-zinc-300 font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "billing-history" && (
        <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="text-lg font-black text-white">Billing History</h3>
            <p className="text-xs text-zinc-500 mt-1">Your past invoices and payments</p>
          </div>

          <div className="space-y-4">
            {[
              { id: 1, plan: "Free Plan", date: "12/1/2024", amount: "$29" },
              { id: 2, plan: "Free Plan", date: "11/1/2024", amount: "$29" },
              { id: 3, plan: "Free Plan", date: "10/1/2024", amount: "$29" },
            ].map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between border border-zinc-800/60 rounded-xl p-4 bg-[#111] hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-800/50 flex items-center justify-center text-red-500">
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">{invoice.plan}</h4>
                    <p className="text-xs text-zinc-500 mt-0.5">{invoice.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-black text-white">{invoice.amount}</p>
                    <span className="inline-block bg-green-500/10 text-green-400 border border-green-500/20 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider mt-1">
                      paid
                    </span>
                  </div>
                  <button className="p-2 border border-zinc-800 hover:bg-zinc-800 hover:text-white rounded-lg text-zinc-400 transition-all">
                    <Download size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "payment-methods" && (
        <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-white">Payment Methods</h3>
              <p className="text-xs text-zinc-500 mt-1">Manage your payment methods</p>
            </div>
            <button className="flex items-center gap-2 border border-red-700/60 hover:bg-red-955/20 text-red-500 text-xs font-black px-4 py-2.5 rounded-xl transition-all uppercase tracking-wider">
              <Plus size={14} className="text-red-500" />
              ADD METHOD
            </button>
          </div>

          <div className="space-y-4">
            {[
              { id: 1, type: "Visa", last4: "4242", expires: "12/26", isDefault: true },
              { id: 2, type: "Mastercard", last4: "5555", expires: "08/25", isDefault: false },
            ].map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between border border-zinc-800/60 rounded-xl p-4 bg-[#111] hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-800/50 flex items-center justify-center text-red-500">
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">
                      {method.type} •••• {method.last4}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs text-zinc-500">Expires {method.expires}</p>
                      {method.isDefault && (
                        <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 border border-zinc-800 hover:bg-zinc-800 hover:text-white rounded-lg text-zinc-400 transition-all">
                    <Pencil size={14} />
                  </button>
                  <button className="p-2 border border-zinc-800 hover:bg-zinc-800 hover:text-white rounded-lg text-zinc-400 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "change-plan" && (
        <div className="grid grid-cols-3 gap-6">
          {/* Free Plan Card */}
          <div className="bg-[#141414] border-2 border-red-650 rounded-2xl p-6 flex flex-col justify-between min-h-[480px] relative">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-black text-white">Free</h3>
                  <div className="flex items-baseline mt-1">
                    <span className="text-2xl font-black text-white">$0</span>
                    <span className="text-xs text-zinc-500 font-semibold">/monthly</span>
                  </div>
                </div>
                <span className="bg-emerald-600 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Current
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                Start building your profile and applying to projects
              </p>

              <div className="space-y-3 pt-4 border-t border-zinc-800/60">
                {[
                  "Basic profile creation",
                  "Apply to up to 5 projects/month",
                  "Basic portfolio showcase",
                  "Community forum access",
                  "Email support",
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
                    <span className="text-xs text-zinc-300 font-medium">{feat}</span>
                  </div>
                ))}
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider pt-1">
                  +1 more features
                </p>
              </div>
            </div>

            <button className="w-full mt-8 border border-zinc-800 text-zinc-650 text-xs font-black py-3.5 rounded-xl uppercase tracking-wider cursor-default">
              CURRENT PLAN
            </button>
          </div>

          {/* Professional Plan Card */}
          <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-6 flex flex-col justify-between min-h-[480px] relative hover:border-zinc-750 transition-colors">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-black text-white">Professional</h3>
                  <div className="flex items-baseline mt-1">
                    <span className="text-2xl font-black text-white">$19</span>
                    <span className="text-xs text-zinc-500 font-semibold">/monthly</span>
                  </div>
                </div>
                <span className="bg-red-600 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Popular
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                For working professionals seeking better opportunities
              </p>

              <div className="space-y-3 pt-4 border-t border-zinc-800/60">
                {[
                  "Enhanced profile with video reels",
                  "Unlimited project applications",
                  "Advanced portfolio tools",
                  "Featured profile placement",
                  "Direct messaging with filmmakers",
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
                    <span className="text-xs text-zinc-300 font-medium">{feat}</span>
                  </div>
                ))}
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider pt-1">
                  +4 more features
                </p>
              </div>
            </div>

            <button className="w-full mt-8 bg-red-650 hover:bg-red-500 text-white text-xs font-black py-3.5 rounded-xl uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(220,38,38,0.35)]">
              GO PROFESSIONAL
            </button>
          </div>

          {/* Premium Plan Card */}
          <div className="bg-[#141414] border border-zinc-800/70 rounded-2xl p-6 flex flex-col justify-between min-h-[480px] relative hover:border-zinc-750 transition-colors">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-black text-white">Premium</h3>
                  <div className="flex items-baseline mt-1">
                    <span className="text-2xl font-black text-white">$39</span>
                    <span className="text-xs text-zinc-500 font-semibold">/monthly</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                For established talent seeking premium opportunities
              </p>

              <div className="space-y-3 pt-4 border-t border-zinc-800/60">
                {[
                  "Everything in Professional",
                  "Priority application review",
                  "Exclusive high-budget project access",
                  "Personal brand management tools",
                  "Advanced analytics dashboard",
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
                    <span className="text-xs text-zinc-300 font-medium">{feat}</span>
                  </div>
                ))}
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider pt-1">
                  +5 more features
                </p>
              </div>
            </div>

            <button className="w-full mt-8 bg-red-655 hover:bg-red-500 text-white text-xs font-black py-3.5 rounded-xl uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(220,38,38,0.35)]">
              UPGRADE TO PREMIUM
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
