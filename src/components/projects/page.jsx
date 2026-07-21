"use client";

import TrendingProjects from "@/components/TrendingProjects";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-black">
      <TrendingProjects
        showAll
        title="All Projects"
        subtitle="Browse every film project currently available on Filmee."
        showViewAll={false}
      />
    </main>
  );
}