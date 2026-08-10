export default function AuthButton({
  children,
  variant = "primary",
  onClick,
  className = "",
}) {
  if (variant === "outline") {
    return (
      <button
        onClick={onClick}
        className={`group relative overflow-hidden rounded-full border border-red-600 px-10 py-4 text-red-500 transition-all duration-300 hover:scale-105 ${className}`}
      >
        <span className="absolute inset-0 -translate-x-full bg-red-600 transition-transform duration-300 group-hover:translate-x-0" />

        <span className="relative z-10 group-hover:text-white">
          {children}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`rounded-full bg-gradient-to-r from-red-700 to-red-500 px-10 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(229,9,20,0.5)] ${className}`}
    >
      {children}
    </button>
  );
}