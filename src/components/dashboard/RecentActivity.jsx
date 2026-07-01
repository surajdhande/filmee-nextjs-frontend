import React from "react";
import { Zap } from "lucide-react";

const activities = [
  {
    title: "New investment of $41,380 received",
    time: "4:55:21 PM",
  },
  {
    title: "New talent application received",
    time: "4:55:20 PM",
  },
  {
    title: "Project reached milestone: 1000+ views this hour",
    time: "4:55:19 PM",
  },
  {
    title: "Sarah Chen invested $25,000 in The Last Frame",
    time: "2 hours ago",
  },
  {
    title: "New cinematographer application for Urban Shadows",
    time: "4 hours ago",
  },
  {
    title: "Message from investor Michael Rodriguez",
    time: "1 day ago",
  },
];

const RecentActivity = () => {
  return (
    <section className="mt-10 rounded-3xl border border-[#2A2A2A] bg-[#171717] p-7">

      {/* Header */}

      <div className="mb-8 flex items-center gap-3">

        <h2 className="text-2xl font-bold text-white">
          Recent Activity
        </h2>

        <div className="flex items-center gap-1 rounded-full bg-green-600 px-3 py-1">

          <Zap size={14} className="text-white" />

          <span className="text-xs font-semibold text-white">
            Live
          </span>

        </div>

      </div>

      {/* Activity List */}

      <div className="space-y-8">

        {activities.map((activity, index) => (
          <div key={index} className="flex gap-5">

            <div className="mt-2 h-3 w-3 rounded-full bg-red-600" />

            <div>

              <h3 className="text-lg font-medium text-white">
                {activity.title}
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                {activity.time}
              </p>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default RecentActivity;