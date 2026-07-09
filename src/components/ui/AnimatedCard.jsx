"use client";

export default function AnimatedCard({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-[#2A2A2A]
        bg-[#171717]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#E50914]
        hover:shadow-[0_0_35px_rgba(229,9,20,0.18)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}