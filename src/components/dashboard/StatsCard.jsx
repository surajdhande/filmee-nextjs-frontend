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
    <div className="group flex h-[145px] flex-col justify-between rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:shadow-[0_0_25px_rgba(229,9,20,0.12)]">
      
      {/* Top */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-[13px] font-medium text-zinc-400">
            {title}
          </p>

          <h3 className="mt-2 text-[30px] font-bold tracking-tight text-white leading-none">
            {value}
          </h3>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1E1E1E] text-red-500">
          {React.cloneElement(icon, { size: 22 })}
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