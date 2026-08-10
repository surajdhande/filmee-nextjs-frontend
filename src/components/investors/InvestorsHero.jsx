"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InvestorsHero() {
  const router = useRouter();

  return (
    <section className="relative bg-black px-6 pt-32 pb-12 sm:px-16">
      {/* Subtle gradient overlay at top */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-red-950/10 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        {/* Back arrow + Heading */}
        <div className="flex items-start gap-4">
          <button
            onClick={() => router.back()}
            className="mt-2 rounded-full p-1 text-zinc-400 transition-colors duration-300 hover:text-white"
            aria-label="Go back"
          >
            <ArrowLeft size={28} />
          </button>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-white">Smart </span>
            <span className="text-red-600">Film Investments</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl pl-12 text-lg leading-relaxed text-zinc-400 sm:pl-14">
          Discover lucrative investment opportunities in the film industry.
          Partner with talented filmmakers and be part of the next cinematic
          success story.
        </p>
      </div>
    </section>
  );
}
