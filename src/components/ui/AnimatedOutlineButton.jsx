"use client";

export default function AnimatedOutlineButton({
  children,
  icon,
  onClick,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`
        group
        relative
        overflow-hidden
        rounded-full
        border
        border-[#E50914]
        bg-transparent
        px-6
        py-3
        transition-all
        duration-500
        ease-out
        hover:scale-[1.04]
        hover:shadow-[0_0_35px_rgba(229,9,20,0.35)]
        active:scale-95
        ${className}
      `}
    >
      {/* Animated Fill */}

      <span
        className="
          absolute
          inset-0
          origin-left
          scale-x-0
          rounded-full
          bg-gradient-to-r
          from-[#E50914]
          to-[#FF2E2E]
          transition-transform
          duration-500
          ease-out
          group-hover:scale-x-100
        "
      />

      {/* Content */}

      <span
        className="
          relative
          z-10
          flex
          items-center
          justify-center
          gap-2
          font-semibold
          uppercase
          tracking-wide
          text-[#E50914]
          transition-colors
          duration-500
          group-hover:text-white
        "
      >
        {icon}

        {children}
      </span>

    </button>
  );
}