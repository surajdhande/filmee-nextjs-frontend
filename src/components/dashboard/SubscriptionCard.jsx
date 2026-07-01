import React from "react";
import { Crown, Zap } from "lucide-react";

const SubscriptionCard = () => {
  return (
    <section className="rounded-3xl border border-[#2A2A2A] bg-[#171717] p-7">
      <div className="flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-5">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#222222]">
            <Crown className="h-8 w-8 text-red-500" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Professional Plan
            </h2>

            <p className="mt-1 text-zinc-400">
              7 days left in trial
            </p>

            <button className="mt-6 rounded-full border border-red-600 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-red-500 transition hover:bg-red-600/10">
              Manage Subscription
            </button>
          </div>

        </div>

        {/* Right */}

        <div className="flex flex-col items-end">

          <div>
            <span className="text-5xl font-bold text-white">
              $29
            </span>

            <span className="text-xl text-zinc-400">
              /monthly
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2">
            <Zap size={15} className="text-white" />

            <span className="text-sm font-semibold text-white">
              Trial
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SubscriptionCard;