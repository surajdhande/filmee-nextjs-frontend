"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const weeklyViewsData = [
  { day: "Mon", views: 220 },
  { day: "Tue", views: 280 },
  { day: "Wed", views: 360 },
  { day: "Thu", views: 310 },
  { day: "Fri", views: 460 },
  { day: "Sat", views: 520 },
  { day: "Sun", views: 430 },
];

const investmentData = [
  { month: "Jan", amount: 15 },
  { month: "Feb", amount: 28 },
  { month: "Mar", amount: 40 },
  { month: "Apr", amount: 33 },
  { month: "May", amount: 48 },
  { month: "Jun", amount: 58 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-[#2A2A2A] bg-[#171717] px-3 py-2 shadow-lg">
        <p className="text-sm text-white font-semibold">
          {payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};

const ChartsSection = () => {
  return (
    <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">

      {/* Weekly Views */}

      <div className="rounded-3xl border border-[#262626] bg-[#171717] p-6">

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white">
            Weekly Views Trend
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Last 7 days
          </p>
        </div>

        <div className="h-[280px]">

          <ResponsiveContainer width="100%" height="100%">

            <AreaChart data={weeklyViewsData}>

              <defs>

                <linearGradient
                  id="viewsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#E50914"
                    stopOpacity={0.6}
                  />

                  <stop
                    offset="95%"
                    stopColor="#E50914"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#232323"
                vertical={false}
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#8b8b8b",
                  fontSize: 12,
                }}
              />

              <Tooltip
                content={<CustomTooltip />}
              />

              <Area
                type="monotone"
                dataKey="views"
                stroke="#E50914"
                strokeWidth={3}
                fill="url(#viewsGradient)"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Investment Flow */}

      <div className="rounded-3xl border border-[#262626] bg-[#171717] p-6">

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white">
            Investment Flow
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Last 6 months
          </p>
        </div>

        <div className="h-[280px]">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={investmentData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#232323"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#8b8b8b",
                  fontSize: 12,
                }}
              />

              <Tooltip
                content={<CustomTooltip />}
              />

              <Bar
                dataKey="amount"
                fill="#E50914"
                radius={[8, 8, 0, 0]}
                barSize={28}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </section>
  );
};

export default ChartsSection;