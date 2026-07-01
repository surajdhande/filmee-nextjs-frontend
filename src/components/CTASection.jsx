"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const CTASection = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-black px-6 py-24 sm:py-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        {/* Heading */}
        <h2
          className={`text-5xl font-extrabold tracking-tight transition-opacity duration-1000 ease-out sm:text-6xl lg:text-7xl ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="block text-white">Ready to Make</span>
          <span className="block text-red-600">Cinematic History?</span>
        </h2>

        {/* Description */}
        <p
          className={`mt-6 max-w-2xl text-xl leading-8 text-zinc-400 transition-opacity delay-300 duration-1000 ease-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Join the platform where dreams become blockbusters. Your story deserves to be told.
        </p>

        {/* Buttons */}
        <div
          className={`mt-10 flex w-full flex-col items-center justify-center gap-6 transition-all delay-500 duration-1000 ease-out sm:w-auto sm:flex-row ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <button
            onClick={() => router.push("/signup")}
            className="w-full rounded-full bg-gradient-to-r from-red-700 to-red-500 px-8 py-4 text-sm font-bold tracking-wider text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] transition hover:brightness-110 sm:w-auto"
          >
            START YOUR JOURNEY
          </button>

          <button className="w-full rounded-full border-2 border-red-600 bg-transparent px-8 py-4 text-sm font-bold tracking-wider text-red-600 transition hover:bg-red-600 hover:text-white sm:w-auto">
            WATCH DEMO
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
