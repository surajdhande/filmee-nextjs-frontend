"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, MessageSquare, ExternalLink } from "lucide-react";
import { postInvestmentOfferEvent } from "@/services/investorService";
import { getApiErrorMessage } from "@/lib/apiClient";

const STATUS_BADGE = {
  Pending: "bg-zinc-700 text-zinc-300",
  "Under Review": "bg-zinc-700 text-zinc-300",
  Accepted: "bg-emerald-600 text-white",
  Declined: "bg-red-700 text-white",
  Rejected: "bg-red-700 text-white",
};

const COUNTER_BG = {
  yellow: "bg-[#2A2200] border border-[#F59E0B]/30 text-[#F59E0B]",
  green: "bg-emerald-900/30 border border-emerald-500/30 text-emerald-400",
  red: "bg-red-900/20 border border-red-500/30 text-red-400",
  default: "bg-[#1E1E1E] border border-zinc-700 text-zinc-400",
};

export default function OfferCard({ offer, onUpdated }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const badgeClass = STATUS_BADGE[offer.status] || "bg-zinc-700 text-zinc-300";
  const counterClass = COUNTER_BG[offer.statusColor] || COUNTER_BG.default;
  const canNegotiate =
    offer.status === "Pending" || offer.status === "Under Review";

  async function handleSendNote(e) {
    e.preventDefault();
    if (!message.trim()) return;
    setSending(true);
    setError(null);
    try {
      await postInvestmentOfferEvent(offer.id, {
        message: message.trim(),
        proposed_amount: amount ? parseFloat(amount) : undefined,
      });
      setMessage("");
      setAmount("");
      onUpdated?.();
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="bg-[#121212] rounded-2xl p-5 border border-[#F59E0B]/30 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="h-[90px] w-[120px] rounded-xl overflow-hidden bg-zinc-900 shrink-0">
          <img
            src={offer.imageUrl}
            alt={offer.projectTitle}
            className="h-full w-full object-cover opacity-80"
          />
        </div>

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
              {offer.escrowStatus && (
                <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">
                  Escrow: {offer.escrowStatus}
                </p>
              )}
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                Your Offer
              </p>
              <p className="text-[24px] font-extrabold text-red-600 leading-tight">
                {offer.offerAmount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {offer.counterMessage && (
        <div
          className={`mt-4 flex items-center gap-2 rounded-full px-4 py-3 text-[13px] font-medium ${counterClass}`}
        >
          <ShieldCheck size={14} className="shrink-0" />
          <span>{offer.counterMessage}</span>
        </div>
      )}

      {offer.events && offer.events.length > 0 && (
        <ul className="mt-4 space-y-2 border-t border-zinc-800 pt-4">
          {offer.events.slice(-4).map((ev) => (
            <li key={ev.event_id} className="text-xs text-zinc-400">
              <span className="text-zinc-500">
                {ev.first_name} {ev.last_name} ·{" "}
                {new Date(ev.created_at).toLocaleString()}
              </span>
              <p className="text-zinc-300 mt-0.5">{ev.message}</p>
              {ev.proposed_amount != null && (
                <p className="text-red-400 font-semibold">
                  Proposed: ${Number(ev.proposed_amount).toLocaleString()}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}

      {canNegotiate && (
        <form onSubmit={handleSendNote} className="mt-4 space-y-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a note or counter-offer message for the filmmaker…"
            className="w-full rounded-xl border border-zinc-800 bg-[#0d0d0d] px-3 py-2 text-sm text-white min-h-[72px]"
          />
          <input
            type="number"
            min="0"
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Optional counter amount (USD)"
            className="w-full rounded-xl border border-zinc-800 bg-[#0d0d0d] px-3 py-2 text-sm text-white"
          />
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={sending || !message.trim()}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#E50914] text-white text-xs font-bold uppercase tracking-wider disabled:opacity-50"
          >
            <MessageSquare size={14} />
            {sending ? "Sending…" : "Send negotiation note"}
          </button>
        </form>
      )}

      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() =>
            offer.projectId &&
            router.push(`/dashboard/investor/film/${offer.projectId}`)
          }
          className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white"
        >
          <ExternalLink size={12} />
          View project
        </button>
        <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${badgeClass}`}>
          {offer.status}
        </span>
      </div>
    </div>
  );
}
