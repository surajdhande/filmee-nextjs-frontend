"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function PortfolioCard({ item }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/dashboard/investor/film/${item.id}`)}
      className="w-[350px] bg-[#171717] border rounded-2xl overflow-hidden border-zinc-800 transition-all duration-300 cursor-pointer hover:-translate-y-0.5 hover:border-[#E50914]/30 hover:shadow-[0_4px_24px_rgba(229,9,20,0.08)]"
    >
      {/* Thumbnail */}
      <div className="h-[180px] w-full bg-[#171717] px-4 py-4 ">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="h-full w-full object-cover rounded-[15px]"
        />
      </div>

      {/* Info */}
      <div className="p-5 space-y-2">
        <h3 className="text-[15px] font-bold text-white">{item.title}</h3>

        <div className="space-y-1.5 mt-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500">Invested:</span>
            <span className="text-white font-medium">{item.invested}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500">Current Value:</span>
            <span className="text-white font-medium">{item.currentValue}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500">ROI:</span>
            <span
              className={`font-bold ${
                item.roiPositive ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {item.roi}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500">Status:</span>
            <span className="text-white font-medium">{item.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
