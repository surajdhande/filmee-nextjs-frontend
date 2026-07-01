import React from "react";
import { ArrowUpRight } from "lucide-react";

const StatsCard = ({
  title,
  value,
  icon,
  trend,
  trendLabel,
}) => {
  return (
    <div className="group rounded-2xl border border-[#262626] bg-[#171717] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:shadow-[0_0_25px_rgba(229,9,20,0.12)]">
      
      {/* Top */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-red-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold tracking-tight text-white">
            {value}
          </h3>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#202020] text-red-500">
          {icon}
        </div>
      </div>

      {/* Bottom */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1">
          <ArrowUpRight size={14} className="text-emerald-400" />

          <span className="text-xs font-semibold text-emerald-400">
            {trend}
          </span>
        </div>

        <span className="text-xs text-zinc-500">
          {trendLabel}
        </span>
      </div>
    </div>
  );
};

export default StatsCard;