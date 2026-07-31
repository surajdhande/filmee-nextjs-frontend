"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowLeftRight } from "lucide-react";
import InvestorLayout from "./InvestorLayout";
import OfferCard from "./OfferCard";

const OFFERS_DATA = [
  {
    id: 1,
    projectTitle: "The Last Frame",
    director: "John Director",
    genre: "Thriller",
    submittedDate: "7/4/2026",
    offerAmount: "$75,000",
    equity: "5% equity",
    status: "Counter Received",
    statusColor: "yellow",
    counterMessage:
      "Filmmaker has sent a counter offer — your response is needed.",
    imageUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80",
  },
];

export default function MyOffersPage() {
  const router = useRouter();
  const [offers, setOffers] = useState(OFFERS_DATA);

  return (
    <InvestorLayout>
      <div className="p-8">
        {/* Header */}
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
            onClick={() => router.push("/dashboard/investor/browse")}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E50914] to-[#B3070F] px-5 py-2.5 text-[13px] font-bold uppercase tracking-wider text-white shadow-[0_0_14px_rgba(229,9,20,0.35)] hover:brightness-110 transition duration-200"
          >
            <Search size={14} />
            Browse Projects
          </button>
        </div>

        {/* Offers List */}
        <div className="mt-8 space-y-4">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}

          {offers.length === 0 && (
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
