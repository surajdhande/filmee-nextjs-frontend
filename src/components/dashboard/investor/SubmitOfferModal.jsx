"use client";

import React, { useState, useEffect } from "react";
import { X, DollarSign, Percent, Info } from "lucide-react";

const VALUE_TAGS = [
  "Funding Only",
  "Producer Support",
  "Distribution Support",
  "Marketing Support",
  "OTT Connections",
  "Casting Network",
  "Mentorship",
  "Studio Access",
];

export default function SubmitOfferModal({ project, onClose }) {
  const remaining = parseInt(project.remaining.replace(/[^0-9]/g, ""), 10);

  const [investmentAmount, setInvestmentAmount] = useState(remaining);
  const [equityRequested, setEquityRequested] = useState(5);
  const [selectedTags, setSelectedTags] = useState([]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const amountHint =
    investmentAmount === remaining
      ? "Matches requested amount"
      : investmentAmount > remaining
      ? "Above requested amount"
      : "Below requested amount";

  const equityHint =
    equityRequested === 5
      ? "Matches offered equity"
      : equityRequested > 5
      ? "Above offered equity"
      : "Below offered equity";

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
        <div className="bg-[#0E0E0E] border border-[#2A2A2A] rounded-2xl w-full max-w-md p-10 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#E50914]/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#E50914]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Offer Submitted!</h2>
          <p className="text-zinc-400 text-sm mb-6">
            Your investment offer for <span className="text-white font-semibold">{project.title}</span> has been sent to the filmmaker. You'll be notified when they respond.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#E50914] to-[#B3070F] text-white font-bold uppercase tracking-wider hover:brightness-110 transition"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#0E0E0E] border border-[#2A2A2A] rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-[#1F1F1F]">
          <div>
            <h2 className="text-lg font-bold text-white leading-tight">
              Submit Investment Offer — {project.title}
            </h2>
            <p className="text-zinc-500 text-sm mt-1">
              Customise your offer terms and introduce yourself to the filmmaker.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition ml-4 mt-0.5 flex-shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 py-5 space-y-6 flex-1">
          {/* Project Details */}
          <div className="bg-[#161616] border border-[#222] rounded-xl p-4 space-y-2">
            <p className="text-sm font-bold text-white mb-3">Project Details</p>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="text-zinc-400">Genre: <span className="text-white font-semibold">{project.genre}</span></span>
              <span className="text-zinc-400">Stage: <span className="text-white font-semibold">{project.status}</span></span>
              <span className="text-zinc-400">Funding Required: <span className="text-white font-semibold">$250,000</span></span>
              <span className="text-zinc-400">Already Raised: <span className="text-white font-semibold">$150,000</span></span>
              <span className="text-zinc-400">Remaining: <span className="text-[#E50914] font-semibold">{project.remaining}</span></span>
              <span className="text-zinc-400">Equity Offered: <span className="text-white font-semibold">5%</span></span>
              <span className="text-zinc-400 col-span-2">Filmmaker: <span className="text-white font-semibold">{project.director}</span></span>
            </div>
          </div>

          {/* Investment Amount */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign size={15} className="text-[#E50914]" />
              <p className="text-sm font-bold text-white">Investment Amount</p>
            </div>
            <p className="text-zinc-400 text-sm">
              Filmmaker requested:{" "}
              <span className="text-white font-semibold">{project.remaining}</span>. You can offer more or less.
            </p>
            <div className="flex items-center bg-[#161616] border border-[#E50914]/60 rounded-lg px-4 py-3 gap-2 focus-within:border-[#E50914] transition">
              <span className="text-zinc-500 font-semibold">$</span>
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                className="bg-transparent text-white text-sm flex-1 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <p className="text-zinc-500 text-xs">{amountHint}</p>
          </div>

          {/* Equity Requested */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Percent size={15} className="text-[#E50914]" />
              <p className="text-sm font-bold text-white">Equity Requested</p>
            </div>
            <p className="text-zinc-400 text-sm">
              Filmmaker offers: <span className="text-white font-semibold">5%</span>. You can request a different percentage.
            </p>
            <div className="flex items-center bg-[#161616] border border-[#2A2A2A] rounded-lg px-4 py-3 gap-2 focus-within:border-[#E50914]/60 transition">
              <input
                type="number"
                value={equityRequested}
                onChange={(e) => setEquityRequested(Number(e.target.value))}
                min={0}
                max={100}
                className="bg-transparent text-white text-sm flex-1 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="text-zinc-500 font-semibold">%</span>
            </div>
            <p className="text-zinc-500 text-xs">{equityHint}</p>
          </div>

          {/* What do you bring */}
          <div className="space-y-3">
            <div>
              <p className="text-sm font-bold text-white">What do you bring? <span className="text-zinc-500 font-normal">(optional)</span></p>
              <p className="text-zinc-400 text-sm mt-0.5">Select all that apply to your offer.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {VALUE_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm border transition ${
                    selectedTags.includes(tag)
                      ? "bg-[#E50914]/20 border-[#E50914] text-white"
                      : "bg-[#161616] border-[#2A2A2A] text-zinc-400 hover:border-zinc-500"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <p className="text-sm font-bold text-white">
              Message to Filmmaker <span className="text-[#E50914]">*</span>
            </p>
            <textarea
              value={message}
              onChange={(e) => {
                if (e.target.value.length <= 500) setMessage(e.target.value);
              }}
              placeholder="Introduce yourself, explain why you're interested in the project, describe the value you bring — industry experience, distribution network, marketing support, mentorship, or any special terms."
              rows={5}
              className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#E50914]/50 resize-none transition"
            />
            <p className="text-zinc-600 text-xs">{message.length}/500 characters</p>
          </div>

          {/* Notice */}
          <div className="flex gap-3 bg-[#0D1A2A] border border-[#1A3A5C] rounded-xl px-4 py-3">
            <Info size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-zinc-400 text-xs leading-relaxed">
              All communication happens within Filmee. Do not share personal contact details — the platform protects both parties until a formal agreement is reached.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#1F1F1F]">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full border border-zinc-600 text-zinc-300 text-sm font-bold uppercase tracking-wider hover:bg-zinc-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!message.trim() || submitting}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E50914] to-[#B3070F] text-white text-sm font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(229,9,20,0.3)] hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {submitting ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Offer"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
