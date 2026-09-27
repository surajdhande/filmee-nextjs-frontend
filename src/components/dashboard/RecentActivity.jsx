import React from "react";

const RecentActivity = ({ activities, loading }) => {
  const list = activities || [];

  return (
    <section className="mt-10 rounded-3xl border border-[#2A2A2A] bg-[#171717] p-7">

      <div className="mb-8 flex items-center gap-3">

        <h2 className="text-2xl font-bold text-white">
          Recent Activity
        </h2>

      </div>

      {loading && list.length === 0 ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 animate-pulse rounded-lg bg-[#1E1E1E]" />
          ))}
        </div>
      ) : null}

      {!loading && list.length === 0 ? (
        <p className="text-zinc-500">No recent activity yet.</p>
      ) : null}

      <div className="space-y-8">

        {list.map((activity, index) => (
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
