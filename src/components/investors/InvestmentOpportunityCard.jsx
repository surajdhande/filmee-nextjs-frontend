"use client";

import Link from "next/link";
import { MapPin, Star } from "lucide-react";

const riskColorMap = {
  green: "bg-green-600",
  blue: "bg-blue-600",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
};

const phaseColorMap = {
  green: "bg-green-600",
  blue: "bg-blue-600",
  yellow: "bg-yellow-500",
  orange: "bg-orange-500",
};

export default function InvestmentOpportunityCard({ opportunity }) {
  const filmId =
    opportunity?.project_id ||
    opportunity?.id ||
    opportunity?._id ||
    opportunity?.filmId ||
    "1";

  const {
    title,
    genre,
    director,
    phase,
    risk,
    riskColor,
    phaseColor,
    image,
    description,
    targetROI,
    timeline,
    minInvestment,
    investorsCount,
    fundingRaised,
    fundingTarget,
    highlights,
    location,
    rating,
  } = opportunity || {};

  const fundingPercentage =
    fundingTarget > 0 ? Math.round((fundingRaised / fundingTarget) * 100) : 0;

  const formatCurrency = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${Math.floor(value / 1000).toLocaleString()},000`;
    return `$${(value || 0).toLocaleString()}`;
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 transition-all duration-300 hover:border-zinc-600">
      {/* Image with badges */}
      <div className="relative h-52 overflow-hidden sm:h-56">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Dark gradient overlay at bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

        {/* Phase & Risk badges */}
        <div className="absolute left-4 top-4 flex gap-2">
          <span
            className={`rounded-md px-3 py-1 text-xs font-bold text-white ${phaseColorMap[phaseColor] || "bg-green-600"}`}
          >
            {phase}
          </span>
          <span
            className={`rounded-md px-3 py-1 text-xs font-bold text-white ${riskColorMap[riskColor] || "bg-yellow-500"}`}
          >
            {risk}
          </span>
        </div>

        {/* Title & Genre overlaid on image bottom */}
        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="text-xl font-bold text-white sm:text-2xl">{title}</h3>
          <p className="mt-1 text-sm text-red-500">
            {genre} • {director}
          </p>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col px-5 py-5">
        {/* Description */}
        <p className="text-sm leading-relaxed text-zinc-400">{description}</p>

        {/* Stats grid */}
        <div className="mt-5 grid grid-cols-2 gap-y-4">
          <div>
            <span className="text-xs text-zinc-500">Target ROI</span>
            <p className="text-lg font-bold text-green-500">{targetROI}</p>
          </div>
          <div>
            <span className="text-xs text-zinc-500">Timeline</span>
            <p className="text-lg font-bold text-white">{timeline}</p>
          </div>
          <div>
            <span className="text-xs text-zinc-500">Min. Investment</span>
            <p className="text-lg font-bold text-white">{minInvestment}</p>
          </div>
          <div>
            <span className="text-xs text-zinc-500">Investors</span>
            <p className="text-lg font-bold text-white">{investorsCount}</p>
          </div>
        </div>

        {/* Funding progress */}
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500">Funding Progress</span>
            <span className="text-xs text-zinc-400">
              {formatCurrency(fundingRaised)} / {formatCurrency(fundingTarget)}
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-red-800 to-red-500 transition-all duration-1000 ease-out"
              style={{ width: `${fundingPercentage}%` }}
            />
          </div>
          <p className="mt-1 text-right text-xs text-zinc-500">
            {fundingPercentage}% funded
          </p>
        </div>

        {/* Key highlights */}
        {highlights && highlights.length > 0 && (
          <div className="mt-5">
            <span className="text-xs font-semibold italic text-zinc-300">
              Key Highlights:
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {highlights.map((tag, index) => (
                <span
                  key={typeof tag === "string" ? `${tag}-${index}` : index}
                  className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Location & Rating */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm text-zinc-400">
            <MapPin size={14} />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-zinc-400">
            <Star size={14} className="border-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex flex-col gap-3 sm:grid sm:grid-cols-2">
          <Link
            href="/login?redirect=/dashboard/investor/browse"
            className="flex items-center justify-center rounded-full bg-gradient-to-r from-red-700 to-red-500 py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-red-600/30"
          >
            Invest Now
          </Link>
          <Link
            href={`/dashboard/investor/film/${filmId}`}
            className="flex items-center justify-center rounded-full border border-red-700 py-3 text-center text-sm font-bold uppercase tracking-wide text-red-600 transition-all duration-300 hover:bg-red-600 hover:text-white"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
