
"use client";

import { useState } from "react";

const statuses = [
  "All",
  "Pending",
  "Negotiating",
  "Agreed",
  "Declined",
];

export default function ApplicationsFilters() {
  const [activeStatus, setActiveStatus] = useState("All");
  return (
    <div className="rounded-3xl border border-[#2A2A2A] bg-[#171717] p-5">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

        <div className="flex-1">

          <p className="mb-3 text-sm font-semibold text-gray-400">
            Filter by Status
          </p>

          <div className="flex rounded-full bg-[#202020] p-1">

            {statuses.map((status, index) => (

              <button
            key={status}
            onClick={() => setActiveStatus(status)}
            className={`flex-1 rounded-full px-5 py-3 text-sm font-semibold transition ${
                activeStatus === status
                ? "bg-[#111111] text-white"
                : "text-white hover:bg-[#2A2A2A]"
            }`}
            >
            {status} (0)
            </button>

            ))}

          </div>

        </div>

        <div className="w-full lg:w-60">

          <p className="mb-3 text-sm font-semibold text-gray-400">
            Filter by Project
          </p>

          <select className="h-12 w-full rounded-2xl border border-[#303030] bg-[#1A1A1D] px-3.5 text-white outline-none">

            <option>All Projects</option>

          </select>

        </div>

      </div>

    </div>
  );
}