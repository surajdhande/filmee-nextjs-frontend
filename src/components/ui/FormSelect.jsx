export default function FormSelect({
  label,
  required = false,
  value,
  onChange,
  options = [],
  error,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-white">
        {label}
        {required && <span className="ml-1 text-[#E50914]">*</span>}
      </label>

      <select
        value={value}
        onChange={onChange}
        className={`h-12 w-full rounded-lg border border-[#303030] bg-[#1A1A1D] px-4 text-[15px] text-white text-white outline-none transition focus:border-[#E50914] ${
          error ? "border-red-500" : "border-[#2D2D2D]"
        }`}
      >
        <option value="">Select</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {error && (
        <span className="text-xs text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}