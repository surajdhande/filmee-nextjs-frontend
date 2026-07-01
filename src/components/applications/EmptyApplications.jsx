"use client";

import { UserCheck } from "lucide-react";

export default function EmptyApplications() {
  return (
    <div className="flex h-[290px] flex-col items-center justify-center rounded-3xl border border-[#2A2A2A] bg-[#171717]">

      <UserCheck
        size={64}
        className="mb-6 text-gray-500"
      />

      <h2 className="text-3xl font-bold text-white">
        No Applications Found
      </h2>

      <p className="mt-2 text-gray-400">
        No pending investor applications.
      </p>

    </div>
  );
}