"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowLeftRight, Loader2 } from "lucide-react";
import InvestorLayout from "./InvestorLayout";
import OfferCard from "./OfferCard";
import {
  getMyInvestments,
  getMyNegotiationEvents,
} from "@/services/investorService";
import { projectMoney } from "@/lib/formatDashboard";

export default function MyOffersPage() {
  const router = useRouter();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOffers = useCallback(async () => {
    try {
      setLoading(true);
      const [projects, allEvents] = await Promise.all([
        getMyInvestments(),
        getMyNegotiationEvents().catch(() => []),
      ]);

      const eventsByInvestment = {};
      allEvents.forEach((ev) => {
        const id = ev.investment_id;
        if (!eventsByInvestment[id]) eventsByInvestment[id] = [];
        eventsByInvestment[id].push(ev);
      });

      const mappedOffers = (projects || []).map((p) => {
        let statusColor = "yellow";
        let statusText = "Pending";

        if (p.investment_status === "ACCEPTED") {
          statusColor = "green";
          statusText = "Accepted";
        } else if (p.investment_status === "DECLINED") {
          statusColor = "red";
          statusText = "Declined";
        } else if (p.investment_status === "UNDER_REVIEW") {
          statusColor = "yellow";
          statusText = "Under Review";
        } else if (p.investment_status === "PENDING") {
          statusColor = "yellow";
          statusText = "Pending";
        }

        const director = [p.filmmaker_first_name, p.filmmaker_last_name]
          .filter(Boolean)
          .join(" ") || "Filmmaker";

        const latest =
          p.latest_negotiation_message ||
          (statusText === "Declined"
            ? "Your investment offer was declined."
            : statusText === "Accepted"
            ? "Your investment offer was accepted!"
            : "Waiting for filmmaker response.");

        return {
          id: p.investment_id,
          projectId: p.project_id,
          projectTitle: p.title,
          director,
          genre: p.genre || "Film",
          submittedDate: new Date(p.created_at).toLocaleDateString(),
          offerAmount: projectMoney(p.investment_amount, p),
          status: statusText,
          statusColor,
          escrowStatus: p.escrow_status || null,
          counterMessage: latest,
          events: eventsByInvestment[p.investment_id] || [],
          imageUrl:
            p.lookbook_url ||
            "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80",
        };
      });

      setOffers(mappedOffers);
    } catch (error) {
      console.error("Failed to fetch offers:", error);
      setOffers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOffers();
  }, [loadOffers]);

  return (
    <InvestorLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-[28px] font-bold text-white tracking-tight">
              My Investment Offers
            </h2>
            <p className="text-s text-zinc-500 mt-1">
              Track negotiations with filmmakers
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/dashboard/investor/browse")}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E50914] to-[#B3070F] px-5 py-2.5 text-[13px] font-bold uppercase tracking-wider text-white shadow-[0_0_14px_rgba(229,9,20,0.35)] hover:brightness-110 transition duration-200"
          >
            <Search size={14} />
            Browse Projects
          </button>
        </div>

        <div className="mt-8 space-y-4">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
              <Loader2 size={36} className="animate-spin mb-4 text-[#E50914]" />
              <p className="text-sm">Loading your offers…</p>
            </div>
          )}

          {!loading && offers.length > 0 && offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} onUpdated={loadOffers} />
          ))}

          {!loading && offers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
              <ArrowLeftRight size={40} className="mb-4 opacity-30" />
              <p className="text-sm">No offers yet. Start by browsing projects.</p>
            </div>
          )}
        </div>
      </div>
    </InvestorLayout>
  );
}
