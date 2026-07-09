"use client";

import React, { useState } from "react";
import InvestorLayout from "./InvestorLayout";
import PortfolioCard from "./PortfolioCard";

const PORTFOLIO_DATA = [
  {
    id: 1,
    title: "Midnight Runner",
    invested: "$50,000",
    currentValue: "$62,000",
    roi: "+24%",
    roiPositive: true,
    status: "Post-Production",
    imageUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Ocean Deep",
    invested: "$75,000",
    currentValue: "$89,000",
    roi: "+18.7%",
    roiPositive: true,
    status: "Distribution",
    imageUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Midnight Runner",
    invested: "$50,000",
    currentValue: "$62,000",
    roi: "+24%",
    roiPositive: true,
    status: "Post-Production",
    imageUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "Midnight Runner",
    invested: "$50,000",
    currentValue: "$62,000",
    roi: "+24%",
    roiPositive: true,
    status: "Post-Production",
    imageUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80",
  },
];

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState(PORTFOLIO_DATA);

  return (
    <InvestorLayout>
      <div className="px-8 py-8 bg-black min-h-screen">

        {/* Outer Card */}
        <div className="bg-[#171717] border border-zinc-800 rounded-3xl p-8">
          <h2 className="text-[22px] font-bold text-white tracking-tight mb-8">
            My Investment Portfolio
          </h2>

          <div className="flex flex-wrap justify-between gap-9">
            {portfolio.map((item) => (
              <PortfolioCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>
    </InvestorLayout>
  );
}
