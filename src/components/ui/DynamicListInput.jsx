"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";

export default function DynamicListInput({
  label,
  placeholder,
  items,
  onChange,
}) {
  const [input, setInput] = useState("");

  const addItem = () => {
    const value = input.trim();

    if (!value) return;

    onChange([...items, value]);
    setInput("");
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white">
        {label}
      </label>

      {/* Input + Add Button */}
      <div className="flex items-center gap-1.5">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="h-11 flex-1 rounded-lg border border-[#303030] bg-[#1A1A1D] px-4 text-[15px] text-white placeholder:text-[#6B7280] outline-none focus:border-[#E50914]"
        />

        <button
          type="button"
          onClick={addItem}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E50914] shadow-[0_0_18px_rgba(229,9,20,0.45)] transition hover:brightness-110"
        >
          <Plus size={18} color="white" />
        </button>
      </div>

      {/* Added Items */}
      {items.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-1.5 rounded-full bg-[#232323] px-3 py-1.5 text-sm text-white"
            >
              <span>{item}</span>

              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-gray-400 transition hover:text-red-500"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}