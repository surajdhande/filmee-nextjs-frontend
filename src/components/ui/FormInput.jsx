export default function FormInput({
  label,
  required = false,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  prefix,
suffix,
multiline = false,
  rows = 5,
  maxLength,
  readOnly = false,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-white">
        {label}
        {required && <span className="ml-1 text-[#E50914]">*</span>}
      </label>

      <div className="relative">
        {prefix && !multiline && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {prefix}
          </span>
        )}

        {suffix && !multiline && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            {suffix}
        </span>
        )}

        {multiline ? (
          <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={rows}
            maxLength={maxLength}
            readOnly={readOnly}
            className={`w-full resize-none rounded-lg border border-[#303030] bg-[#1A1A1D] px-4 py-3 text-[15px] text-white placeholder:text-[#6B7280] outline-none transition-all duration-200 focus:border-[#E50914] ${
              error ? "border-red-500" : ""
            }`}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            readOnly={readOnly}
            className={`h-12 w-full rounded-lg border border-[#303030] bg-[#1A1A1D] ${
            prefix
                ? "pl-10 pr-4"
                : suffix
                ? "pl-4 pr-10"
                : "px-4"
            } text-[15px] text-white placeholder:text-[#6B7280] outline-none transition-all duration-200 focus:border-[#E50914] ${
              error ? "border-red-500" : ""
            }`}
          />
        )}
      </div>

      {error && (
        <span className="text-xs text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}