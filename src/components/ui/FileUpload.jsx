"use client";

import { Upload } from "lucide-react";

export default function FileUpload({
  title,
  accept,
  file,
  onChange,
}) {
  return (
    <label className="group flex h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#303030] bg-[#151515] transition hover:border-[#E50914] hover:bg-[#191919]">

      <Upload
        size={34}
        className="mb-3 text-[#A1A1AA] transition group-hover:text-[#E50914]"
      />

      <p className="text-[15px] font-semibold text-white">
        {title}
      </p>

      <p className="mt-1 text-sm text-[#9CA3AF]">
        {file ? file.name : "Click to upload"}
      </p>

      <input
        hidden
        type="file"
        accept={accept}
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];

          if (!selectedFile) return;

          console.log(title, selectedFile);

          onChange(selectedFile);
        }}
      />
    </label>
  );
}