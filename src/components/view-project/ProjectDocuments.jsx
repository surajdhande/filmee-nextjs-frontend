"use client";
import AnimatedCard from "@/components/ui/AnimatedCard";

import {
  Download,
  FileText,
} from "lucide-react";

export default function ProjectDocuments({
  project,
}) {
  const documents = [
    {
      title: "Pitch Deck",
      url: project.pitch_deck_url,
    },
    {
      title: "Lookbook",
      url: project.lookbook_url,
    },
  ];

  return (
    <AnimatedCard className="p-4 sm:p-6 md:p-8">

      <h2 className="text-2xl font-bold text-white">
        Documents
      </h2>

      <div className="mt-8 space-y-5">

        {documents.map((document) => (

          <button
            key={document.title}
            disabled={!document.url}
            className={`group flex w-full flex-col sm:flex-row items-start sm:items-center justify-between rounded-2xl border px-4 sm:px-6 py-4 sm:py-5 transition-all duration-300 gap-4 sm:gap-0 ${
              document.url
                ? "border-[#E50914] text-[#E50914] hover:bg-[#E50914] hover:text-white"
                : "cursor-not-allowed border-[#2A2A2A] bg-[#1F1F1F] text-gray-500"
            }`}
          >

            <div className="flex items-center gap-4">

              <FileText
                size={22}
                className={`transition-colors duration-300 ${
                  document.url
                    ? "group-hover:text-white"
                    : "text-gray-500"
                }`}
              />

              <div className="text-left">

                <p
                  className={`font-semibold uppercase transition-colors duration-300 ${
                    document.url
                      ? "group-hover:text-white"
                      : "text-gray-500"
                  }`}
                >
                  {document.title}
                </p>

                <p
                  className={`mt-1 text-sm transition-colors duration-300 ${
                    document.url
                      ? "text-gray-300 group-hover:text-white/80"
                      : "text-gray-500"
                  }`}
                >
                  {document.url
                    ? "Click to Download"
                    : "Not Uploaded Yet"}
                </p>

              </div>

            </div>

            {document.url ? (

              <Download
                size={22}
                className="transition-colors duration-300 group-hover:text-white self-end sm:self-auto"
              />

            ) : (

              <span className="rounded-full bg-[#2A2A2A] px-4 py-2 text-xs font-semibold uppercase text-gray-500 self-start sm:self-auto">
                Pending
              </span>

            )}

          </button>

        ))}

      </div>

    </AnimatedCard>
  );
}