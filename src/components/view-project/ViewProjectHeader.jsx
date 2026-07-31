"use client";

import { ArrowLeft, SquarePen, Share2 } from "lucide-react";
import AnimatedOutlineButton from "@/components/ui/AnimatedOutlineButton";
import AnimatedPrimaryButton from "@/components/ui/AnimatedPrimaryButton";
import { useRouter } from "next/navigation";

export default function ViewProjectHeader() {
  const router = useRouter();

  return (
    <header className="border-b border-[#2A2A2A] bg-[#111111]">

      <div className="mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-5">

        {/* Back Button */}

        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 rounded-full px-4 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-[#1A1A1A] hover:text-[#E50914] hover:shadow-[0_0_20px_rgba(229,9,20,0.25)]"
        >
          <ArrowLeft
            size={20}
            className="transition-all duration-300 group-hover:-translate-x-1"
          />

          <span className="font-medium">
            Back
          </span>
        </button>

        {/* Action Buttons */}

        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center sm:justify-end">

          {/* Share */}

          <AnimatedOutlineButton
            icon={<Share2 size={18} />}
            className="flex-1 sm:flex-none justify-center"
          >
            Share
          </AnimatedOutlineButton>

          {/* Edit */}

          <AnimatedPrimaryButton
            icon={<SquarePen size={18} />}
            className="flex-1 sm:flex-none justify-center"
          >
            Edit Project
          </AnimatedPrimaryButton>

        </div>

      </div>

    </header>
  );
}