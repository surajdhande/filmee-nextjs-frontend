"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import InvestorLayout from "./InvestorLayout";
import BrowseProjectCard from "./BrowseProjectCard";

const BROWSE_PROJECTS_DATA = [
  {
    id: 1,
    title: "The Last Frame",
    director: "John Director",
    genre: "Thriller",
    timeline: "8 months",
    targetRoi: "25%",
    remaining: "$100,000",
    progress: 60,
    status: "Pre-Production",
    imageUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Silent Echoes",
    director: "Sarah Williams",
    genre: "Drama",
    timeline: "6 months",
    targetRoi: "22%",
    remaining: "$135,000",
    progress: 25,
    status: "Development",
    imageUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Neon Nights",
    director: "Mike Chen",
    genre: "Sci-Fi",
    timeline: "12 months",
    targetRoi: "30%",
    remaining: "$375,000",
    progress: 10,
    status: "Pre-Production",
    imageUrl:
      "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=900&q=80",
  },
];

export default function BrowseProjectsPage() {
  const [projects, setProjects] = useState(BROWSE_PROJECTS_DATA);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <InvestorLayout>
      <div className="p-8">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[22px] font-bold text-white tracking-tight">
            Browse Projects
          </h2>
          {/* Search */}
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-full pl-9 pr-4 py-2 text-[13px] text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50914]/50 w-[220px] transition duration-200"
            />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <BrowseProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </InvestorLayout>
  );
}
