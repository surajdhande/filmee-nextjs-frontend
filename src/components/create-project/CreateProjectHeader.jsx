"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateProjectHeader({ currentStep }) {
  const router = useRouter();

  const progress = (currentStep / 4) * 100;

  return (
    <header className="w-full border-b border-[#2A2A2A] bg-[#161616]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">

        {/* Left */}
        <div className="flex items-start gap-4">

          <button
            onClick={() => router.back()}
            className="mt-1 text-white transition hover:text-[#E50914]"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-[22px] font-bold leading-none text-white">
              Create New Project
            </h1>

            <p className="mt-2 text-sm text-[#9CA3AF]">
              Step {currentStep} of 4
            </p>
          </div>

        </div>

        {/* Right */}
        <div className="w-40">
          <div className="h-1.5 rounded-full bg-[#3B1010]">
            <div
              className="h-full rounded-full bg-[#E50914] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

      </div>
    </header>
  );
}