"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FilmmakerLayout from "./FilmmakerLayout";
import { 
  ArrowLeft, Shield, CheckCircle2, Wallet, Lock, 
  Unlock, Clock, Download, ChevronRight, Activity, DollarSign
} from "lucide-react";

export default function FilmmakerEscrow() {
  const router = useRouter();

  // Toggle this variable to true to see the populated dashboard
  const hasEscrowAccounts = false;

  // =====================================================
  // Render: Header
  // =====================================================
  const renderHeader = () => (
  <div className="mb-6 md:mb-10 border-b border-[#262626] pb-6">

    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0">

      {/* Back Button */}
      <button
        onClick={() => router.push("/dashboard/filmmaker")}
        className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white hover:text-red-500 transition-colors self-start sm:self-auto"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Divider */}
      <div className="hidden sm:block mx-6 md:mx-12 h-12 w-px bg-[#2A2A2A]" />

      {/* Title */}
      <div className="mt-2 sm:mt-0">
        <h1 className="text-[18px] sm:text-[20px] font-bold text-white leading-tight">
          Escrow Management
        </h1>

        <p className="mt-1 text-xs sm:text-sm text-zinc-400">
          Manage your secured investments and project milestones
        </p>
      </div>

    </div>

  </div>
);

  // =====================================================
  // Render: Empty State
  // =====================================================
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center mt-4 w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-center h-24 w-24 rounded-full bg-red-600/10 mb-8">
        <Shield size={48} className="text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">No Escrow Accounts Yet</h2>
      <p className="text-zinc-400 text-center mb-12">
        Escrow accounts will appear here when investors fund your projects.
      </p>

      <div className="w-full rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-8">
        <h3 className="text-lg font-bold text-white mb-6">How Escrow Works</h3>
        <ul className="flex flex-col gap-5">
          {[
            "Investor funds are held securely until milestones complete",
            "Create milestones to receive payments",
            "Investors approve milestones to release funds",
            "Funds are transferred automatically after approval",
          ].map((point, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-[#18C964] shrink-0 mt-0.5" />
              <span className="text-sm text-zinc-300 font-medium leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // =====================================================
  // Render: Populated State
  // =====================================================
  const renderPopulatedState = () => {
    
    // Status colors helper
    const getStatusStyle = (status) => {
      switch(status) {
        case "Completed": return "text-[#18C964] bg-[#18C964]/10";
        case "Released": return "text-blue-500 bg-blue-500/10";
        case "In Progress": return "text-[#F5A524] bg-[#F5A524]/10";
        case "Pending": return "text-zinc-400 bg-zinc-800";
        default: return "text-white bg-zinc-800";
      }
    };

    // Mock Data
    const escrowAccounts = [
      { project: "Neon Nights", investor: "Visionary Media", amount: "$45,000", milestone: "Pre-production (2/4)", status: "In Progress", date: "Jan 15, 2024" },
      { project: "The Last Echo", investor: "Alpha Capital", amount: "$150,000", milestone: "Post-production (4/4)", status: "Completed", date: "Nov 02, 2023" },
      { project: "Silent Horizon", investor: "Indie Fund", amount: "$25,000", milestone: "Script Approval (1/4)", status: "Pending", date: "Feb 10, 2024" },
      { project: "Urban Myths", investor: "City Lights", amount: "$85,000", milestone: "Principal Photography (3/4)", status: "Released", date: "Dec 05, 2023" },
    ];

    return (
      <div className="flex flex-col gap-6">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Funds Held", value: "$215,000", icon: Lock, color: "text-red-500", bg: "bg-red-500/10" },
            { label: "Released Funds", value: "$90,000", icon: Unlock, color: "text-[#18C964]", bg: "bg-[#18C964]/10" },
            { label: "Pending Milestones", value: "4", icon: Clock, color: "text-[#F5A524]", bg: "bg-[#F5A524]/10" },
            { label: "Completed Projects", value: "1", icon: Shield, color: "text-blue-500", bg: "bg-blue-500/10" },
          ].map((stat, idx) => (
            <div key={idx} className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6">
              <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-medium text-zinc-400">{stat.label}</p>
                <div className={`p-2 rounded-full ${stat.bg}`}>
                  <stat.icon size={16} className={stat.color} />
                </div>
              </div>
              <p className="text-3xl font-bold text-white tracking-tight">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Escrow Accounts Table */}
        <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] overflow-hidden">
          <div className="p-6 border-b border-[#2A2A2A]">
            <h3 className="text-lg font-bold text-white">Escrow Accounts</h3>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#1A1A1A] text-zinc-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Project</th>
                  <th className="px-6 py-4 font-medium">Investor</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Milestone</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Created Date</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300 divide-y divide-[#2A2A2A]">
                {escrowAccounts.map((account, idx) => (
                  <tr key={idx} className="hover:bg-[#1A1A1A] transition-colors">
                    <td className="px-6 py-5 font-bold text-white">{account.project}</td>
                    <td className="px-6 py-5">{account.investor}</td>
                    <td className="px-6 py-5 font-medium">{account.amount}</td>
                    <td className="px-6 py-5">{account.milestone}</td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusStyle(account.status)}`}>
                        {account.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-zinc-400">{account.date}</td>
                    <td className="px-6 py-5 text-right">
                      <button className="inline-flex items-center justify-center p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-[#2A2A2A] transition-colors">
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Milestone Timeline Card & Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Milestone Timeline */}
          <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6">
            <h3 className="text-lg font-bold text-white mb-6">Milestone Progress (Neon Nights)</h3>
            <div className="relative pl-3">
              <div className="absolute left-6 top-4 bottom-4 w-px bg-[#2A2A2A]" />
              <div className="flex flex-col gap-6">
                {[
                  { step: "Milestone 1", title: "Script & Cast Approval", status: "Completed", date: "Jan 20, 2024", color: "text-[#18C964]", bg: "bg-[#18C964]/10", icon: CheckCircle2 },
                  { step: "Milestone 2", title: "Pre-production", status: "In Progress", date: "Pending", color: "text-[#F5A524]", bg: "bg-[#F5A524]/10", icon: Clock },
                  { step: "Milestone 3", title: "Principal Photography", status: "Locked", date: "-", color: "text-zinc-500", bg: "bg-zinc-800", icon: Lock },
                  { step: "Milestone 4", title: "Post-production & Delivery", status: "Locked", date: "-", color: "text-zinc-500", bg: "bg-zinc-800", icon: Lock },
                ].map((item, idx) => (
                  <div key={idx} className="relative flex items-start gap-6">
                    <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.bg}`}>
                      <item.icon size={18} className={item.color} />
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <p className="text-xs font-bold text-red-500 uppercase tracking-widest">{item.step}</p>
                          <h4 className="text-sm font-bold text-white mt-1">{item.title}</h4>
                        </div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6">
            <h3 className="text-lg font-bold text-white mb-6">Payment History</h3>
            <div className="flex flex-col gap-4">
              {[
                { title: "Milestone 1 Released", project: "Urban Myths", amount: "+$25,000", date: "Dec 05, 2023", icon: Wallet, color: "text-[#18C964]", bg: "bg-[#18C964]/10" },
                { title: "Funds Locked in Escrow", project: "Neon Nights", amount: "$45,000", date: "Jan 15, 2024", icon: Lock, color: "text-red-500", bg: "bg-red-500/10" },
                { title: "Milestone 4 Released", project: "The Last Echo", amount: "+$50,000", date: "Nov 02, 2023", icon: Wallet, color: "text-[#18C964]", bg: "bg-[#18C964]/10" },
              ].map((tx, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-4">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${tx.bg}`}>
                      <tx.icon size={18} className={tx.color} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{tx.title}</p>
                      <p className="text-xs text-zinc-400 mt-0.5">{tx.project} • {tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${tx.amount.startsWith('+') ? 'text-[#18C964]' : 'text-white'}`}>
                      {tx.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <FilmmakerLayout>
      <div className="bg-[#0B0B0B] text-white px-4 py-6 sm:px-6 md:px-8 md:py-10">
        {renderHeader()}
        {hasEscrowAccounts ? renderPopulatedState() : renderEmptyState()}
      </div>
    </FilmmakerLayout>
  );
}