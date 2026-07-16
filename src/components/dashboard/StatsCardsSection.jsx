import React from "react";
import StatsCard from "./StatsCard";
import { Film, DollarSign, Eye, TrendingUp } from "lucide-react";

const StatsCardsSection = () => {
  return (
    <section className="mt-5 mb-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Projects"
          value="12"
          icon={<Film className="h-5 w-5 text-zinc-400" />}
          trend="+2"
          trendLabel="this month"
        />
        <StatsCard
          title="Total Raised"
          value="₹4.5M"
          icon={<DollarSign className="h-5 w-5 text-zinc-400" />}
          trend="+15%"
          trendLabel="this month"
        />
        <StatsCard
          title="Total Views"
          value="84.2K"
          icon={<Eye className="h-5 w-5 text-zinc-400" />}
          trend="+8%"
          trendLabel="this month"
        />
        <StatsCard
          title="Success Rate"
          value="92%"
          icon={<TrendingUp className="h-5 w-5 text-zinc-400" />}
          trend="+4%"
          trendLabel="this month"
        />
      </div>
    </section>
  );
};

export default StatsCardsSection;
