"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function NotificationsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Navbar */}
      <Navbar />

      {/* Main Section */}
      <main className="mx-auto max-w-7xl px-6 pt-32 pb-20 md:px-16 lg:px-24">
        {/* Back navigation and page title */}
        <div className="mb-16 flex items-start gap-4">
          <button
            onClick={() => router.back()}
            className="mt-1 text-zinc-400 hover:text-white transition-colors flex items-center justify-center"
            aria-label="Go back"
          >
            <ArrowLeft size={22} />
          </button>
          
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Notifications
            </h1>
            <p className="mt-1.5 text-sm sm:text-base text-zinc-400 font-medium">
              Sign in to view your notifications
            </p>
          </div>
        </div>

        {/* Sign In Required card container */}
        <div className="flex items-center justify-center py-16">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#0d0d0e]/60 p-10 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col items-center text-center">
            
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-wide">
              Sign In Required
            </h2>
            
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
              Please sign in to view your notifications and stay updated with your project applications and messages.
            </p>

            <Link href="/login" className="w-full">
              <button className="w-full py-4 rounded-xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 hover:from-red-600 hover:via-red-500 hover:to-red-400 text-white font-bold uppercase tracking-wider text-xs md:text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(220,38,38,0.35)] hover:shadow-[0_0_30px_rgba(220,38,38,0.55)]">
                SIGN IN TO CONTINUE
              </button>
            </Link>
            
          </div>
        </div>
      </main>
    </div>
  );
}
