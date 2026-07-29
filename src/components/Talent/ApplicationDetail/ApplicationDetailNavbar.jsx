"use client";

import { ArrowLeft, Share2, Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ApplicationDetailNavbar() {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-zinc-900/80">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-widest hover:text-zinc-300 transition-colors cursor-pointer"
      >
        <ArrowLeft size={14} strokeWidth={2.5} />
        <span className="hidden xs:inline">Back to Dashboard</span>
        <span className="xs:hidden">Back</span>
      </button>

      {/* Share + Save */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button className="flex items-center gap-1.5 sm:gap-2 border border-red-700 text-white hover:bg-red-950/20 text-[10px] sm:text-[11px] font-black px-3 sm:px-5 py-1.5 sm:py-2 rounded-full uppercase tracking-wider transition-all duration-200 cursor-pointer">
          <Share2 size={12} strokeWidth={2.5} />
          <span className="hidden sm:inline">SHARE</span>
        </button>
        <button className="flex items-center gap-1.5 sm:gap-2 border border-red-700 text-white hover:bg-red-950/20 text-[10px] sm:text-[11px] font-black px-3 sm:px-5 py-1.5 sm:py-2 rounded-full uppercase tracking-wider transition-all duration-200 cursor-pointer">
          <Bookmark size={12} strokeWidth={2.5} />
          <span className="hidden sm:inline">SAVE</span>
        </button>
      </div>
    </div>
  );
}
