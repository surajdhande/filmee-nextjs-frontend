"use client";

import { useRouter } from "next/navigation";
import AuthButton from "./AuthButton";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover scale-110"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

{/* Dark Overlay */}
<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

      {/* Content */}
      <div className="relative z-10 ml-24 max-w-4xl pt-24">

        <h1 className="max-w-3xl text-5xl font-bold leading-tight text-white lg:text-6xl">
          Where Film Dreams
          <br />
          <span className="text-red-600">
            Come to Life
          </span>
        </h1>

        <p className="mt-10 max-w-xl text-lg text-zinc-300">
          The ultimate platform connecting filmmakers,
          investors and talent. Fund your vision.
          Discover opportunities. Create cinematic magic.
        </p>

        <div className="mt-10 flex gap-6">
          <AuthButton>
            START CREATING
          </AuthButton>

          <AuthButton variant="outline">
            LEARN MORE
          </AuthButton>
        </div>

        {/* Stats */}

        <div className="mt-14 flex gap-20">

          <div>
            <span className="text-4xl font-bold">
              10K+
            </span>
            <span className="ml-2 text-zinc-400">
              Creators
            </span>
          </div>

          <div>
            <span className="text-4xl font-bold">
              $50M+
            </span>
            <span className="ml-2 text-zinc-400">
              Funded
            </span>
          </div>

          <div>
            <span className="text-4xl font-bold">
              500+
            </span>
            <span className="ml-2 text-zinc-400">
              Films
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}