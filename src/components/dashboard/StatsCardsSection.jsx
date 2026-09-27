import React from "react";
import StatsCard from "./StatsCard";
import { Film, DollarSign, Eye, TrendingUp } from "lucide-react";
import { formatCompactNumber, formatCurrency } from "@/lib/formatDashboard";

const StatsCardsSection = ({ stats, loading }) => {
  if (loading && !stats) {
    return (
      <section className="mt-5 mb-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-[145px] animate-pulse rounded-[24px] border border-[#2A2A2A] bg-[#141414]"
            />
          ))}
        </div>
      </section>
    );
  }

  const s = stats || {
    total_projects: 0,
    total_raised: 0,
    total_views: 0,
    success_rate: 0,
    views_last_7_days: 0,
  };

  const viewsTrend =
    s.views_last_7_days > 0 ? `+${s.views_last_7_days}` : undefined;

  return (
    <section className="mt-5 mb-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Projects"
          value={String(s.total_projects)}
          icon={<Film className="h-5 w-5 text-zinc-400" />}
        />
        <StatsCard
          title="Total Raised"
          value={formatCurrency(s.total_raised)}
          icon={<DollarSign className="h-5 w-5 text-zinc-400" />}
        />
        <StatsCard
          title="Total Views"
          value={formatCompactNumber(s.total_views)}
          icon={<Eye className="h-5 w-5 text-zinc-400" />}
          trend={viewsTrend}
          trendLabel="last 7 days"
        />
        <StatsCard
          title="Success Rate"
          value={`${s.success_rate}%`}
          icon={<TrendingUp className="h-5 w-5 text-zinc-400" />}
        />
      </div>
    </section>
  );
};

export default StatsCardsSection;
