import { TrendingUp, DollarSign, Users, Star } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "28%",
    label: "Avg ROI",
  },
  {
    icon: DollarSign,
    value: "$50M+",
    label: "Total Invested",
  },
  {
    icon: Users,
    value: "5K+",
    label: "Active Investors",
  },
  {
    icon: Star,
    value: "94%",
    label: "Success Rate",
  },
];

export default function InvestorsStats() {
  return (
    <section className="relative overflow-hidden bg-black px-6 pt-6 pb-2 sm:px-16">
      {/* Blue glow ray/gradient in background */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-72 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="relative">
              {/* gradient behind the card */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl -z-10 blur-md"
                style={{
                  background:
                    "linear-gradient(135deg, rgb(16,24,40) 0%, rgb(220,38,38,0.35) 100%)",
                }}
              />
              <div
                className="flex flex-col items-center rounded-2xl border border-zinc-900 px-6 py-8 text-center"
                style={{ backgroundColor: "rgb(16, 24, 40)" }}
              >
                <stat.icon
                  size={28}
                  className="mb-4 text-red-500"
                />
                <span className="text-3xl font-extrabold text-red-500 lg:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-sm text-zinc-400">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
