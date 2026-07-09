"use client";

import React, { useState } from "react";
import { ArrowLeftRight, ChevronUp, ChevronDown, CheckCircle, XCircle, ShieldCheck } from "lucide-react";

const STATUS_BADGE = {
  "Counter Received": "bg-[#F59E0B] text-black",
  Pending: "bg-zinc-700 text-zinc-300",
  Accepted: "bg-emerald-600 text-white",
  Agreed: "bg-emerald-600 text-white",
  Rejected: "bg-red-700 text-white",
};

const COUNTER_BG = {
  yellow: "bg-[#2A2200] border border-[#F59E0B]/30 text-[#F59E0B]",
  green: "bg-emerald-900/30 border border-emerald-500/30 text-emerald-400",
  red: "bg-red-900/20 border border-red-500/30 text-red-400",
  default: "bg-[#1E1E1E] border border-zinc-700 text-zinc-400",
};

// ── Counter Offer Form ────────────────────────────────────────────────────────
function CounterOfferForm({ offer, onCancel, onSend }) {
  const [amount, setAmount] = useState(offer.offerAmount.replace(/[^0-9]/g, ""));
  const [equity, setEquity] = useState(offer.equity.replace(/[^0-9.]/g, ""));
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSend({ amount, equity, message });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 bg-[#0E0E0E] border border-[#2a2a2a] rounded-2xl p-5 space-y-4"
    >
      <h4 className="text-[14px] font-bold text-white flex items-center gap-2">
        <ArrowLeftRight size={14} className="text-[#E50914]" />
        Send Counter Offer
      </h4>

      <div className="grid grid-cols-2 gap-4">
        {/* Counter Amount */}
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
            $ Counter Amount
          </label>
          <div className="flex items-center bg-[#1a1a1a] border border-[#333] rounded-xl px-3 py-2.5">
            <span className="text-zinc-500 text-sm mr-2">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder-zinc-600"
              placeholder="75000"
            />
          </div>
        </div>

        {/* Counter Equity */}
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
            % Counter Equity
          </label>
          <div className="flex items-center bg-[#1a1a1a] border border-[#333] rounded-xl px-3 py-2.5">
            <input
              type="number"
              value={equity}
              onChange={(e) => setEquity(e.target.value)}
              required
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder-zinc-600"
              placeholder="5"
            />
            <span className="text-zinc-500 text-sm ml-2">%</span>
          </div>
        </div>
      </div>

      {/* Counter Message */}
      <div>
        <label className="block text-xs font-semibold text-zinc-400 mb-1.5 flex items-center gap-1">
          Counter Message
        </label>
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Explain your counter terms..."
          className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-3 py-2.5 text-white text-sm outline-none placeholder-zinc-600 resize-none focus:border-[#E50914]/50 transition-colors"
        />
      </div>

      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-full border border-zinc-700 text-zinc-300 text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E50914] to-[#B3070F] text-white text-xs font-bold uppercase tracking-wider shadow-[0_4px_14px_rgba(229,9,20,0.3)] hover:brightness-110 transition"
        >
          Send Counter Offer
        </button>
      </div>
    </form>
  );
}

// ── Negotiation Timeline ──────────────────────────────────────────────────────
function NegotiationTimeline({ rounds }) {
  return (
    <div className="mt-4">
      <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
        Negotiation Timeline
      </p>
      <div className="space-y-4">
        {rounds.map((round, i) => {
          const isInvestor = round.type === "investor";
          const isAgreement = round.type === "agreement";
          const dotColor = isAgreement
            ? "bg-emerald-500"
            : isInvestor
            ? "bg-blue-500"
            : "bg-red-500";
          const labelColor = isAgreement
            ? "text-emerald-400"
            : isInvestor
            ? "text-blue-400"
            : "text-red-400";
          const label = isAgreement
            ? "Agreement Reached"
            : isInvestor
            ? "Investor Offer"
            : "Filmmaker Counter";

          return (
            <div key={i} className="flex gap-3">
              {/* Dot */}
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full mt-1 shrink-0 ${dotColor}`} />
                {i < rounds.length - 1 && (
                  <div className="w-px flex-1 bg-zinc-700 mt-1" />
                )}
              </div>
              {/* Content */}
              <div className="flex-1 pb-2">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`text-[12px] font-bold ${labelColor}`}>
                    {label}{" "}
                    {!isAgreement && (
                      <span className="text-zinc-500 font-normal text-[11px]">
                        Round {round.round}
                      </span>
                    )}
                  </span>
                  <span className="text-[11px] text-zinc-500">{round.date}</span>
                </div>
                {!isAgreement && (
                  <p className="text-[13px] font-semibold text-white mb-1">
                    <span className="font-extrabold">{round.amount}</span>{" "}
                    <span className="text-zinc-400">for</span>{" "}
                    <span className="font-extrabold">{round.equity}</span>
                  </p>
                )}
                {isAgreement && (
                  <p className="text-[13px] font-semibold text-zinc-300">
                    {round.amount} for {round.equity}
                  </p>
                )}
                {round.message && (
                  <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                    {round.message}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Agreement Ready Panel ─────────────────────────────────────────────────────
function AgreementPanel({ offer }) {
  return (
    <div className="mt-4 bg-[#0a1f0a] border border-emerald-600/40 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck size={18} className="text-emerald-400" />
        <span className="text-[15px] font-bold text-emerald-400">Agreement Ready</span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <p className="text-xs text-zinc-500 mb-1">Final Amount</p>
          <p className="text-[22px] font-extrabold text-white">{offer.offerAmount}</p>
        </div>
        <div>
          <p className="text-xs text-zinc-500 mb-1">Final Equity</p>
          <p className="text-[22px] font-extrabold text-white">
            {offer.equity.replace(" equity", "")}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 border border-[#E50914]/50 text-[#E50914] text-xs font-bold uppercase tracking-wider py-3 rounded-full hover:bg-[#E50914]/10 transition">
          Generate Agreement
        </button>
        <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#E50914] to-[#B3070F] text-white text-xs font-bold uppercase tracking-wider py-3 rounded-full shadow-[0_4px_14px_rgba(229,9,20,0.3)] hover:brightness-110 transition">
          <ShieldCheck size={13} />
          Proceed to Escrow
        </button>
      </div>
    </div>
  );
}

// ── Main OfferCard ─────────────────────────────────────────────────────────────
export default function OfferCard({ offer: initialOffer }) {
  const [offer, setOffer] = useState(initialOffer);
  const [expanded, setExpanded] = useState(false);
  const [showCounterForm, setShowCounterForm] = useState(false);

  const badgeClass = STATUS_BADGE[offer.status] || "bg-zinc-700 text-zinc-300";
  const counterClass = COUNTER_BG[offer.statusColor] || COUNTER_BG.default;

  // Sample negotiation rounds — replace with real API data
  const [rounds, setRounds] = useState(
    offer.rounds || [
      {
        type: "investor",
        round: 1,
        amount: offer.offerAmount,
        equity: "8% equity",
        date: "7/5/2026 06:25 PM",
        message:
          "I have funded 3 successful dramas and can help secure OTT distribution across South Asia. I bring a casting network of 200+ verified actors.",
      },
      {
        type: "filmmaker",
        round: 2,
        amount: offer.offerAmount,
        equity: offer.equity,
        date: "7/6/2026 06:25 PM",
        message:
          "Thank you for your offer. The OTT connections are very valuable. However 8% equity is above our cap. Would you consider 5% given the distribution support you bring?",
      },
    ]
  );

  function handleAccept() {
    setRounds((prev) => [
      ...prev,
      {
        type: "agreement",
        amount: offer.offerAmount,
        equity: offer.equity,
        date: new Date().toLocaleString(),
        message: null,
      },
    ]);
    setOffer((prev) => ({
      ...prev,
      status: "Agreed",
      statusColor: "green",
      counterMessage: null,
    }));
    setShowCounterForm(false);
  }

  function handleReject() {
    setOffer((prev) => ({
      ...prev,
      status: "Rejected",
      statusColor: "red",
      counterMessage: null,
    }));
    setShowCounterForm(false);
    setExpanded(false);
  }

  function handleSendCounter({ amount, equity, message }) {
    const newRound = {
      type: "investor",
      round: rounds.length + 1,
      amount: `$${Number(amount).toLocaleString()}`,
      equity: `${equity}% equity`,
      date: new Date().toLocaleString(),
      message,
    };
    setRounds((prev) => [...prev, newRound]);
    setOffer((prev) => ({
      ...prev,
      offerAmount: `$${Number(amount).toLocaleString()}`,
      equity: `${equity}% equity`,
      status: "Counter Sent",
      statusColor: "default",
      counterMessage: null,
    }));
    setShowCounterForm(false);
  }

  const isAgreed = offer.status === "Agreed";
  const isRejected = offer.status === "Rejected";
  const isActive = !isAgreed && !isRejected;
  const hasCounterReceived = offer.status === "Counter Received";

  return (
    <div
      className={`bg-[#121212] rounded-2xl p-5 transition-all duration-300 ${
        isRejected
          ? "border border-red-700/40"
          : isAgreed
          ? "border border-emerald-600/40"
          : "border border-[#F59E0B]/30"
      }`}
    >
      {/* Top Row */}
      <div className="flex items-start gap-4">
        {/* Thumbnail */}
        <div className="h-[90px] w-[120px] rounded-xl overflow-hidden bg-zinc-900 shrink-0">
          <img
            src={offer.imageUrl}
            alt={offer.projectTitle}
            className="h-full w-full object-cover opacity-80"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-[15px] font-bold text-white">
                {offer.projectTitle}
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                {offer.director} · {offer.genre}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                Submitted {offer.submittedDate}
              </p>
            </div>
            {/* Offer amount */}
            <div className="text-right shrink-0">
              <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                Your Offer
              </p>
              <p className="text-[24px] font-extrabold text-red-600 leading-tight">
                {offer.offerAmount}
              </p>
              <p className="text-xs text-zinc-500">{offer.equity}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Counter Message Banner */}
      {offer.counterMessage && (
        <div
          className={`mt-4 flex items-center gap-2 rounded-full px-4 py-3 text-[13px] font-medium ${counterClass}`}
        >
          <ArrowLeftRight size={14} className="shrink-0" />
          <span>{offer.counterMessage}</span>
        </div>
      )}

      {/* Footer Row */}
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => {
            setExpanded((v) => !v);
            setShowCounterForm(false);
          }}
          className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#E50914] hover:underline transition duration-200"
        >
          {expanded ? (
            <>
              Hide Timeline <ChevronUp size={14} />
            </>
          ) : (
            <>
              View Negotiation <ChevronDown size={14} />
            </>
          )}
        </button>
        <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${badgeClass}`}>
          {offer.status}
        </span>
      </div>

      {/* ── Expanded Negotiation Panel ── */}
      {expanded && (
        <div className="mt-4 border-t border-zinc-800 pt-4">

          {/* Agreement Ready (when agreed) */}
          {isAgreed && <AgreementPanel offer={offer} />}

          {/* Negotiation Timeline */}
          <NegotiationTimeline rounds={rounds} />

          {/* Action Buttons — only shown while negotiation is active */}
          {isActive && !showCounterForm && (
            <div className="mt-5 flex items-center gap-3 flex-wrap">
              <button
                onClick={handleAccept}
                className="flex items-center gap-2 bg-gradient-to-r from-[#E50914] to-[#B3070F] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-[0_4px_14px_rgba(229,9,20,0.3)] hover:brightness-110 transition"
              >
                <CheckCircle size={14} />
                Accept Offer
              </button>
              <button
                onClick={() => setShowCounterForm(true)}
                className="flex items-center gap-2 border border-zinc-600 text-zinc-300 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-zinc-800 transition"
              >
                <ArrowLeftRight size={14} />
                Counter Offer
              </button>
              <button
                onClick={handleReject}
                className="flex items-center gap-2 border border-zinc-700 text-zinc-400 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-zinc-800 hover:text-red-400 hover:border-red-700 transition"
              >
                <XCircle size={14} />
                Decline
              </button>
            </div>
          )}

          {/* Counter Offer Form */}
          {isActive && showCounterForm && (
            <CounterOfferForm
              offer={offer}
              onCancel={() => setShowCounterForm(false)}
              onSend={handleSendCounter}
            />
          )}
        </div>
      )}
    </div>
  );
}
