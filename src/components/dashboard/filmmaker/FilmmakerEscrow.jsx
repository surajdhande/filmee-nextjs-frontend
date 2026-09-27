"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FilmmakerLayout from "./FilmmakerLayout";
import {
  ArrowLeft,
  Shield,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { getMyEscrowTransactions } from "@/services/escrowService";
import { getApiErrorMessage } from "@/lib/apiClient";

export default function FilmmakerEscrow() {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getMyEscrowTransactions();
        setTransactions(data);
      } catch (err) {
        setError(getApiErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const renderHeader = () => (
    <div className="mb-6 md:mb-10 border-b border-[#262626] pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0">
        <button
          onClick={() => router.push("/dashboard/filmmaker")}
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white hover:text-red-500 transition-colors self-start sm:self-auto"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="hidden sm:block mx-6 md:mx-12 h-12 w-px bg-[#2A2A2A]" />
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

  const getStatusStyle = (status) => {
    const s = (status || "").toUpperCase();
    if (s === "COMPLETED" || s === "ACCEPTED") return "text-[#18C964] bg-[#18C964]/10";
    if (s === "CREATED" || s === "PENDING") return "text-[#F5A524] bg-[#F5A524]/10";
    if (s === "DECLINED") return "text-red-400 bg-red-500/10";
    return "text-zinc-400 bg-zinc-800";
  };

  const renderTable = () => (
    <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] overflow-hidden">
      <div className="p-6 border-b border-[#2A2A2A]">
        <h3 className="text-lg font-bold text-white">Escrow Accounts</h3>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#1A1A1A] text-zinc-400">
            <tr>
              <th className="px-6 py-4 font-medium">Project</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Escrow Status</th>
              <th className="px-6 py-4 font-medium">Investment</th>
              <th className="px-6 py-4 font-medium">Transaction ID</th>
            </tr>
          </thead>
          <tbody className="text-zinc-300 divide-y divide-[#2A2A2A]">
            {transactions.map((row) => (
              <tr key={row.escrow_transaction_id} className="hover:bg-[#1A1A1A] transition-colors">
                <td className="px-6 py-5 font-bold text-white">{row.title}</td>
                <td className="px-6 py-5 font-medium">
                  ${Number(row.amount).toLocaleString()} {row.currency}
                </td>
                <td className="px-6 py-5">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusStyle(row.escrow_status)}`}>
                    {row.escrow_status}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusStyle(row.investment_status)}`}>
                    {row.investment_status}
                  </span>
                </td>
                <td className="px-6 py-5 text-xs font-mono text-zinc-500 max-w-[140px] truncate">
                  {row.escrow_transaction_id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="px-6 py-4 text-xs text-zinc-500 border-t border-[#2A2A2A]">
        Milestone tracking will be added in a future release.
      </p>
    </div>
  );

  return (
    <FilmmakerLayout>
      <div className="bg-[#0B0B0B] text-white px-4 py-6 sm:px-6 md:px-8 md:py-10">
        {renderHeader()}
        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#E50914]" size={36} />
          </div>
        )}
        {error && !loading && (
          <p className="text-center text-red-400 py-12">{error}</p>
        )}
        {!loading && !error && transactions.length === 0 && renderEmptyState()}
        {!loading && !error && transactions.length > 0 && renderTable()}
      </div>
    </FilmmakerLayout>
  );
}
