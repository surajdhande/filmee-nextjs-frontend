import React from "react";
import { Crown, Zap } from "lucide-react";

const SubscriptionCard = () => {
  return (
    <section className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-12">
      <div className="flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-6">

          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#1E1E1E]">
            <Crown className="h-10 w-10 text-red-500" />
          </div>

          <div>
            <h2 className="text-[32px] font-bold tracking-tight text-white">
              Professional Plan
            </h2>

            <p className="mt-1 text-[15px] text-zinc-400">
              7 days left in trial
            </p>

            <button className="mt-8 rounded-full border border-red-600 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-red-500 transition hover:bg-red-600/10">
              Manage Subscription
            </button>
          </div>

        </div>

        {/* Right */}
        <div className="flex flex-col items-end">

          <div className="flex items-baseline gap-1">
            <span className="text-[56px] font-bold leading-none text-white tracking-tight">
              $29
            </span>

            <span className="text-[20px] font-medium text-zinc-400">
              /monthly
            </span>
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-full bg-[#3B82F6] px-5 py-2.5">
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