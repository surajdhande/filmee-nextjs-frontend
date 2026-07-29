"use client";

import React, { useState, useEffect } from "react";
import { Search, Loader2, FolderOpen } from "lucide-react";
import InvestorLayout from "./InvestorLayout";
import BrowseProjectCard from "./BrowseProjectCard";
import { getProjects } from "@/services/projectService";

export default function BrowseProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data || []);
      } catch (err) {
        console.error("Failed to load projects:", err);
        setError("Failed to load projects. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // Map API fields to card-compatible shape
  const mapped = projects.map((p) => {
    const target = parseFloat(p.funding_target) || 0;
    const raised = parseFloat(p.funding_raised) || 0;
    const progress = target > 0 ? Math.round((raised / target) * 100) : 0;
    const remaining = target - raised;

    return {
      id: p.project_id,
      title: p.title,
      director: `${p.filmmaker_first_name ?? ""} ${p.filmmaker_last_name ?? ""}`.trim() || "—",
      genre: p.genre,
      timeline: p.production_timeline,
      targetRoi: p.expected_roi_percentage ? `${p.expected_roi_percentage}%` : "N/A",
      remaining: `$${remaining.toLocaleString()}`,
      progress,
      status: p.project_status?.replace(/_/g, " ") ?? "N/A",
      imageUrl: p.lookbook_url || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80",
    };
  });

  const filtered = mapped.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <InvestorLayout>
      <div className="p-4 lg:p-8">
        {/* Header Row */}
        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between sm:mb-8">
          <h2 className="text-[20px] font-bold text-white tracking-tight lg:text-[22px]">
            Browse Projects
          </h2>
          {/* Search */}
          <div className="relative w-full sm:w-auto">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-full pl-9 pr-4 py-2 text-[13px] text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50914]/50 sm:w-[220px] transition duration-200"
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 text-zinc-500">
            <Loader2 size={36} className="animate-spin mb-4 text-[#E50914]" />
            <p className="text-sm">Loading projects…</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-20 text-red-400">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <FolderOpen size={40} className="mb-4 opacity-30" />
            <p className="text-sm">
              {searchQuery ? "No projects match your search." : "No projects available yet."}
            </p>
          </div>
        )}

        {/* Cards Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <BrowseProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </InvestorLayout>
  );
}
