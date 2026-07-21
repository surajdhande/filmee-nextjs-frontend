"use client";

import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

export default function FileUpload({
  title,
  accept,
  file,
  onChange,
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        console.log(title, acceptedFiles[0]);
        onChange(acceptedFiles[0]);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`group flex h-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-[#151515] transition-all duration-200
      ${
        isDragActive
          ? "border-[#E50914] bg-[#1E1E1E]"
          : "border-[#303030] hover:border-[#E50914] hover:bg-[#191919]"
      }`}
    >
      <input {...getInputProps()} />

      <UploadCloud
        size={34}
        className={`mb-3 transition ${
          isDragActive
            ? "text-[#E50914]"
            : "text-[#A1A1AA] group-hover:text-[#E50914]"
        }`}
      />

      <p className="text-[15px] font-semibold text-white">
        {title}
      </p>

      <p className="mt-1 px-2 text-center text-sm text-[#9CA3AF]">
        {file
          ? file.name
          : isDragActive
          ? "Drop file here..."
          : "Drag & Drop or Click to Upload"}
      </p>
    </div>
  );
}