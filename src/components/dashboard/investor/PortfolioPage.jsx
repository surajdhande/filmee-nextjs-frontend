"use client";

import React, { useState, useEffect } from "react";
import { Loader2, FolderOpen } from "lucide-react";
import InvestorLayout from "./InvestorLayout";
import PortfolioCard from "./PortfolioCard";
import { getMyInvestments } from "@/services/investorService";

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        setLoading(true);
        const data = await getMyInvestments();
        setPortfolio(data || []);
      } catch (err) {
        console.error("Failed to load portfolio:", err);
        setError("Failed to load your investments. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchPortfolio();
  }, []);

  // Map API fields to PortfolioCard shape
  const mapped = portfolio.map((inv) => {
    const target = parseFloat(inv.funding_target) || 0;
    const raised = parseFloat(inv.funding_raised) || 0;
    const invested = parseFloat(inv.investment_amount) || 0;

    // Simplified ROI: compare investment amount vs share of funding raised
    const roiValue = target > 0 ? (((raised - target) / target) * 100).toFixed(1) : 0;
    const roiPositive = parseFloat(roiValue) >= 0;

    return {
      id: inv.project_id,
      title: inv.title,
      invested: `$${invested.toLocaleString()}`,
      currentValue: `$${invested.toLocaleString()}`, // no market value data yet
      roi: `${roiPositive ? "+" : ""}${roiValue}%`,
      roiPositive,
      status: inv.project_status?.replace(/_/g, " ") ?? "N/A",
      imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80",
    };
  });

  return (
    <InvestorLayout>
      <div className="px-8 py-8 bg-black min-h-screen">
        {/* Outer Card */}
        <div className="bg-[#171717] border border-zinc-800 rounded-3xl p-8">
          <h2 className="text-[22px] font-bold text-white tracking-tight mb-8">
            My Investment Portfolio
          </h2>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
              <Loader2 size={36} className="animate-spin mb-4 text-[#E50914]" />
              <p className="text-sm">Loading your portfolio…</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-20 text-red-400">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && mapped.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
              <FolderOpen size={40} className="mb-4 opacity-30" />
              <p className="text-sm">You haven&apos;t made any investments yet.</p>
            </div>
          )}

          {/* Cards */}
          {!loading && !error && mapped.length > 0 && (
            <div className="flex flex-wrap justify-between gap-9">
              {mapped.map((item) => (
                <PortfolioCard key={`${item.id}-${item.invested}`} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </InvestorLayout>
  );
}
