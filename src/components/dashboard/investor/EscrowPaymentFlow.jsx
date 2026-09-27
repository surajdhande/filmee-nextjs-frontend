"use client";

import React from "react";
import {
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  X,
} from "lucide-react";

export default function EscrowPaymentFlow({
  film,
  investmentAmount,
  escrowInfo,
  onClose,
}) {
  const amount = Number(investmentAmount) || 0;
  const checkoutUrl = escrowInfo?.checkout_url;
  const escrowTxId = escrowInfo?.escrow_transaction_id;
  const escrowStatus = escrowInfo?.escrow_status || "CREATED";
  const devMode = escrowInfo?.dev_mode;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-lg bg-[#111] border border-[#2a2a2a] rounded-3xl p-7 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-full bg-[#E50914]/15 flex items-center justify-center">
            <ShieldCheck size={22} className="text-[#E50914]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Escrow Created</h2>
            <p className="text-zinc-400 text-sm">
              Your investment application for {film?.title} is secured via Escrow.
            </p>
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2a2a2a] rounded-2xl p-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-500">Investment amount</span>
            <span className="text-white font-semibold">
              ${amount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Escrow status</span>
            <span className="text-[#E50914] font-bold uppercase text-xs tracking-wider">
              {escrowStatus}
            </span>
          </div>
          {escrowTxId && (
            <div className="flex justify-between gap-4">
              <span className="text-zinc-500 shrink-0">Transaction ID</span>
              <span className="text-zinc-300 text-xs font-mono text-right break-all">
                {escrowTxId}
              </span>
            </div>
          )}
          {devMode && (
            <p className="text-xs text-amber-500/90 pt-1">
              Dev mode: Escrow.com credentials are not configured. A local escrow record was created for testing.
            </p>
          )}
        </div>

        <p className="text-zinc-400 text-sm mt-5 leading-relaxed">
          Complete payment on Escrow.com when a checkout link is available.
          The filmmaker will review your application; funding counts toward the project once they accept.
          Binding investment agreements are not generated in-app until legal review is complete.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          {checkoutUrl && (
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-gradient-to-r from-[#E50914] to-[#B3070F] text-white font-bold uppercase tracking-wider text-sm hover:brightness-110 transition"
            >
              <ExternalLink size={16} />
              Open Escrow Checkout
            </a>
          )}
          <button
            type="button"
            onClick={onClose}
            className={`flex items-center justify-center gap-2 py-3.5 rounded-full border border-zinc-700 text-zinc-300 font-bold uppercase tracking-wider text-sm hover:bg-zinc-800 transition ${
              checkoutUrl ? "flex-1" : "w-full"
            }`}
          >
            <ArrowLeft size={16} />
            Back to Project
          </button>
        </div>
      </div>
    </div>
  );
}
