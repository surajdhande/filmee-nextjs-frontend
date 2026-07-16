import React from "react";
import { Crown, Zap } from "lucide-react";

const SubscriptionCard = () => {
  return (
    <section className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6">
      <div className="flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1E1E1E]">
            <Crown className="h-7 w-7 text-red-500" />
          </div>

          <div>
            <h2 className="text-[20px] font-bold tracking-tight text-white">
              Professional Plan
            </h2>

            <p className="mt-1 text-[13px] text-zinc-400">
              7 days left in trial
            </p>

            <button className="mt-5 rounded-full border border-red-600 px-5 py-2 text-sm font-bold uppercase tracking-widest text-red-500 transition hover:bg-red-600/10">
              Manage Subscription
            </button>
          </div>

        </div>

        {/* Right */}
        <div className="flex flex-col items-end">

          <div className="flex items-baseline gap-1">
            <span className="text-[36px] font-bold leading-none text-white tracking-tight">
              $29
            </span>

            <span className="text-[16px] font-medium text-zinc-400">
              /monthly
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-full bg-[#3B82F6] px-4 py-2">
            <Zap size={16} className="text-white fill-white" />

            <span className="text-[13px] font-bold uppercase tracking-wider text-white">
              Trial
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SubscriptionCard;