"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Crown, Download, CreditCard, Plus, Trash2 } from "lucide-react";

export default function FilmmakerSubscription() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");

  // =====================================================
  // Render: Header
  // =====================================================
  const renderHeader = () => (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
      <div className="flex items-center gap-6">
        <button
          onClick={() => router.push("/dashboard/filmmaker")}
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white hover:text-red-500 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="h-8 w-px bg-[#2A2A2A] hidden md:block" />
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Subscription Management</h1>
          <p className="mt-1 text-sm text-zinc-400">Manage your plan, billing, and payment methods</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full bg-blue-600 px-3 py-1.5">
          <ZapIcon />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Trial</span>
        </div>
        <button className="flex items-center gap-2 rounded-full border border-red-600/70 px-5 py-2 text-red-500 transition hover:bg-red-600/10 hover:shadow-[0_0_15px_rgba(229,9,20,0.2)]">
          <ArrowUpRight size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">View All Plans</span>
        </button>
      </div>
    </div>
  );

  // Helper Zap Icon for the Trial badge
  const ZapIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );

  // =====================================================
  // Render: Tabs
  // =====================================================
  const renderTabs = () => {
    const tabs = ["Overview", "Billing History", "Payment Methods", "Change Plan"];
    return (
      <div className="mb-6 rounded-full border border-[#2A2A2A] bg-[#141414] p-1 flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative flex-1 rounded-full py-2 text-sm font-semibold transition-all ${
              activeTab === tab
                ? "text-white bg-[#1E1E1E]"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-1/2 h-[1px] w-1/2 -translate-x-1/2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(229,9,20,0.8)]" />
            )}
          </button>
        ))}
      </div>
    );
  };

  // =====================================================
  // Render: Overview Section
  // =====================================================
  const renderOverview = () => (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Current Plan Card */}
        <div className="lg:col-span-2 flex flex-col rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6 relative">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm font-medium text-zinc-400 mb-4">Current Plan</p>
              <h2 className="text-3xl font-bold text-white leading-none">Professional</h2>
              <p className="mt-2 text-sm text-zinc-400">Filmmaker Plan</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white mb-4">
                7 days left
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-bold text-white tracking-tight">$29</span>
                <span className="text-sm text-zinc-400">/monthly</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-zinc-400">Trial Progress</span>
              <span className="text-white font-medium">7/14 days used</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[#2A2A2A] overflow-hidden flex">
              <div className="h-full w-1/2 bg-red-600 shadow-[0_0_10px_rgba(229,9,20,0.5)]" />
            </div>
          </div>

          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-sm text-zinc-400 mb-1">Next billing date</p>
              <p className="text-base font-bold text-white">12/31/2024</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-zinc-400 mb-1">Days until renewal</p>
              <p className="text-base font-bold text-white">-562 days</p>
            </div>
          </div>

          <div className="flex gap-4 mt-auto">
            <button className="flex-1 flex items-center justify-center gap-2 rounded-full border border-red-600/70 py-2.5 text-sm font-bold uppercase tracking-widest text-red-500 transition hover:bg-red-600/10 hover:shadow-[0_0_15px_rgba(229,9,20,0.2)]">
              <Crown size={16} />
              Upgrade Plan
            </button>
            <button className="px-8 flex items-center justify-center rounded-full border border-[#2A2A2A] py-2.5 text-sm font-bold uppercase tracking-widest text-zinc-400 transition hover:bg-[#1E1E1E] hover:text-white">
              Cancel
            </button>
          </div>
        </div>

        {/* Usage Stats Card */}
        <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6">
          <p className="text-lg font-bold text-white mb-6">Usage Stats</p>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-zinc-400">Projects Created</span>
              <span className="text-white font-medium">2/∞</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[#2A2A2A] overflow-hidden">
              <div className="h-full w-[15%] bg-red-600 shadow-[0_0_10px_rgba(229,9,20,0.5)]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-zinc-400">Team Members</span>
              <span className="text-white font-medium">5/50</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[#2A2A2A] overflow-hidden">
              <div className="h-full w-[10%] bg-red-600 shadow-[0_0_10px_rgba(229,9,20,0.5)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Current Plan Features */}
      <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6">
        <h3 className="text-lg font-bold text-white">Current Plan Features</h3>
        <p className="text-sm text-zinc-400 mb-6 mt-1">Features included in your Professional plan</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-4">
          {[
            "Unlimited projects",
            "Advanced project management",
            "Connect with unlimited talent",
            "Investor pitch deck builder",
            "Video conferencing integration",
            "Advanced analytics & insights",
            "Priority support",
            "Custom branding options",
            "Script collaboration tools",
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <CheckCircle2 size={16} className="text-[#18C964]" />
              <span className="text-sm text-zinc-300 font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // =====================================================
  // Render: Billing History
  // =====================================================
  const renderBillingHistory = () => (
    <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] overflow-hidden">
      <div className="p-6 border-b border-[#2A2A2A]">
        <h3 className="text-lg font-bold text-white">Billing History</h3>
        <p className="text-sm text-zinc-400 mt-1">View and download your previous invoices.</p>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#1A1A1A] text-zinc-400">
            <tr>
              <th className="px-6 py-3 font-medium">Invoice ID</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Amount</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-zinc-300 divide-y divide-[#2A2A2A]">
            {[
              { id: "INV-2024-001", date: "Jan 1, 2024", amount: "$29.00", status: "Paid" },
              { id: "INV-2023-012", date: "Dec 1, 2023", amount: "$29.00", status: "Paid" },
              { id: "INV-2023-011", date: "Nov 1, 2023", amount: "$29.00", status: "Paid" },
            ].map((invoice, idx) => (
              <tr key={idx} className="hover:bg-[#1A1A1A] transition-colors">
                <td className="px-6 py-4 font-medium">{invoice.id}</td>
                <td className="px-6 py-4">{invoice.date}</td>
                <td className="px-6 py-4">{invoice.amount}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#18C964]/10 px-2.5 py-1 text-xs font-semibold text-[#18C964]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#18C964]" />
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="inline-flex items-center justify-center p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-[#2A2A2A] transition-colors">
                    <Download size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // =====================================================
  // Render: Payment Methods
  // =====================================================
  const renderPaymentMethods = () => (
    <div className="flex flex-col gap-4">
      <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">Saved Payment Methods</h3>
            <p className="text-sm text-zinc-400 mt-1">Manage your connected credit cards and payment options.</p>
          </div>
          <button className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold uppercase tracking-wider text-black transition hover:bg-zinc-200">
            <Plus size={16} />
            Add Method
          </button>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-16 items-center justify-center rounded-xl bg-[#222]">
              <CreditCard size={24} className="text-zinc-400" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <p className="text-sm font-bold text-white">•••• •••• •••• 4242</p>
                <span className="rounded-full bg-blue-600/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-500">
                  Default
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">Expires 12/25</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-red-500 transition-colors">
            <Trash2 size={16} />
            Remove
          </button>
        </div>
      </div>
    </div>
  );

  // =====================================================
  // Render: Change Plan
  // =====================================================
  const renderChangePlan = () => {
    const plans = [
      {
        name: "Starter",
        price: "$0",
        description: "Perfect for new filmmakers starting out.",
        features: ["1 Active Project", "Basic Profile", "Community Access"],
        isCurrent: false,
      },
      {
        name: "Professional",
        price: "$29",
        description: "Everything you need to produce your film.",
        features: ["Unlimited Projects", "Pitch Deck Builder", "Priority Support"],
        isCurrent: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "For established studios and large teams.",
        features: ["Custom Branding", "Dedicated Manager", "API Access"],
        isCurrent: false,
      },
    ];

    return (
      <div>
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white">Choose your plan</h2>
          <p className="mt-2 text-sm text-zinc-400">Unlock the full potential of Filmee with our premium features.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col rounded-[24px] border bg-[#141414] p-6 ${
                plan.isCurrent
                  ? "border-red-600 shadow-[0_0_20px_rgba(229,9,20,0.15)]"
                  : "border-[#2A2A2A]"
              }`}
            >
              {plan.isCurrent && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-red-600 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-[0_0_10px_rgba(229,9,20,0.5)]">
                  Current Plan
                </div>
              )}
              
              <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-sm text-zinc-400 mb-6 flex-1">{plan.description}</p>
              
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-white leading-none tracking-tight">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-sm text-zinc-400">/monthly</span>}
              </div>
              
              <ul className="flex flex-col gap-3 mb-6">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className={plan.isCurrent ? "text-red-500" : "text-zinc-500"} />
                    <span className="text-sm text-zinc-300 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                className={`mt-auto w-full rounded-full py-2.5 text-sm font-bold uppercase tracking-widest transition-all ${
                  plan.isCurrent
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : plan.name === "Enterprise"
                    ? "bg-white text-black hover:bg-zinc-200"
                    : "border border-[#2A2A2A] text-white hover:bg-[#1E1E1E]"
                }`}
              >
                {plan.isCurrent ? "Current Plan" : plan.name === "Enterprise" ? "Contact Sales" : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white px-6 py-8 md:px-8 md:py-10">
      {renderHeader()}
      {renderTabs()}
      
      <div className="mt-4">
        {activeTab === "Overview" && renderOverview()}
        {activeTab === "Billing History" && renderBillingHistory()}
        {activeTab === "Payment Methods" && renderPaymentMethods()}
        {activeTab === "Change Plan" && renderChangePlan()}
      </div>
    </div>
  );
}