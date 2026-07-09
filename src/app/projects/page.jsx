"use client";

import TrendingProjects from "@/components/TrendingProjects";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-black">
      <TrendingProjects
        showAll={true}
        showViewAll={false}
        title="All Projects"
        subtitle="Browse all film projects on Filmee."
      />
    </main>
  );
}