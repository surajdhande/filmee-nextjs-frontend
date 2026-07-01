export default function FormTextarea({
  label,
  required = false,
  placeholder,
  value,
  onChange,
  rows = 5,
  error,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-white">
        {label}
        {required && <span className="ml-1 text-[#E50914]">*</span>}
      </label>

      <textarea
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full resize-none rounded-lg border border-[#303030] bg-[#1A1A1D] px-4 py-3 text-[15px] text-white placeholder:text-[#6B7280] outline-none transition-all duration-200 focus:border-[#E50914] ${
          error ? "border-red-500" : "border-[#2D2D2D]"
        }`}
      />

      {error && (
        <span className="text-xs text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}