"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SubmitOfferModal from "./SubmitOfferModal";

export default function BrowseProjectCard({ project }) {
  const router = useRouter();
  const [showOfferModal, setShowOfferModal] = useState(false);

  return (
    <div className="bg-[#121212] border border-[#222] rounded-2xl overflow-hidden hover:-translate-y-0.5 hover:border-[#E50914]/30 transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative h-[180px] w-full bg-zinc-900">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="h-full w-full object-cover opacity-80"
        />
        {/* Status Badge */}
        <span
          className={`absolute top-3 left-3 bg-[#E50914] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wide`}
        >
          {project.status}
        </span>
      </div>

      {/* Info */}
      <div className="p-5 space-y-3">
        <div>
          <h3 className="text-[16px] pt-5 pb-1.5 font-bold text-white">{project.title}</h3>
          <p className="text-[14px] pt-0 pb-2.5 text-zinc-400 mt-0.5">
            by {project.director}
          </p>
          <p className="text-[14px] text-zinc-400 pb-1">
            {project.genre} • {project.timeline}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-zinc-800 h-[8px] rounded-full overflow-hidden">
          <div
            className="bg-[#E50914] h-full "
            style={{ width: `${project.progress}%` }}
          />
        </div>

        {/* ROI & Remaining */}
        <div className="flex items-center gap-30">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-zinc-500 pt-2">
              Target ROI
            </p>
            <p className="text-[13px] font-bold text-white">
              {project.targetRoi}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-zinc-500">
              Remaining
            </p>
            <p className="text-[13px] font-bold text-white">
              {project.remaining}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => router.push(`/dashboard/investor/film/${project.id}`)}
            className="flex-1 py-2.5 rounded-full border border-red-500 text-[15px] font-semibold uppercase tracking-wider text-red-500 hover:bg-zinc-800 transition duration-200"
          >
            View Details
          </button>
          <button
            onClick={() => router.push(`/dashboard/investor/film/${project.id}?apply=true`)}
            className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#E50914] to-[#B3070F] text-[15px] font-bold uppercase tracking-wider text-white shadow-[0_0_12px_rgba(229,9,20,0.35)] hover:brightness-110 transition duration-200">
            Submit Offer
          </button>
        </div>
      </div>

      {showOfferModal && (
        <SubmitOfferModal project={project} onClose={() => setShowOfferModal(false)} />
      )}
    </div>
  );
}
