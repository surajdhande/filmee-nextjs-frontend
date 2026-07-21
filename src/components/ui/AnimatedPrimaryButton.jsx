"use client";

export default function AnimatedPrimaryButton({
  children,
  icon,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        group
        flex
        items-center
        justify-center
        gap-2
        rounded-full
        bg-gradient-to-r
        from-[#E50914]
        to-[#FF2E2E]
        px-6
        py-3
        font-semibold
        text-white
        transition-all
        duration-300
        hover:scale-[1.03]
        hover:brightness-110
        hover:shadow-[0_0_35px_rgba(229,9,20,0.45)]
        active:scale-95
        ${className}
      `}
    >
      {icon && (
        <span className="transition-transform duration-500 ease-out group-hover:rotate-6">
          {icon}
        </span>
      )}

      <span>
        {children}
      </span>
    </button>
  );
}