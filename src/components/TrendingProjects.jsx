"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { getProjects } from "@/services/projectService";

const formatCurrencyK = (value) => {
  if (value >= 1000) {
    return `₹${Math.floor(value / 1000)}K`;
  }
  return `₹${value}`;
};

const getDaysAgo = (dateString) => {
  if (!dateString) return "0 days ago";
  const diffTime = Math.abs(new Date() - new Date(dateString));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
};

const TrendingProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="bg-black px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-start justify-between">
          <div>
            <h2 className="text-5xl font-bold text-white">
              Trending Projects
            </h2>
            <p className="mt-3 text-lg text-zinc-400">
              Discover exciting film projects looking for funding and collaborators.
            </p>
          </div>
          <button className="text-sm font-semibold uppercase tracking-wider text-zinc-400 transition hover:text-white">
            View All
          </button>
        </div>

        {loading ? (
          <p className="text-zinc-400">Loading projects...</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects.map((project) => {
              const fundingPercentage =
                project.funding_target > 0
                  ? Math.round(
                      (project.funding_raised / project.funding_target) * 100
                    )
                  : 0;

              return (
                <div
                  key={project.project_id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 transition-all duration-300 hover:-translate-y-2 hover:border-red-600 hover:shadow-xl hover:shadow-red-600/20"
                >
                  <div className="overflow-hidden">
                    <img
                      src={
                        project.lookbook_url ||
                        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80"
                      }
                      alt={project.title}
                      className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    {/* Funding Section */}
                    <div className="mb-5 flex flex-col gap-1">
                      <span className="text-xs font-medium text-zinc-400">Funding Progress</span>
                      <span className="text-4xl font-bold text-white">{fundingPercentage}%</span>
                      
                      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                        <div
                          className="h-full rounded-full bg-red-600 transition-all duration-1000 ease-out"
                          style={{ width: `${fundingPercentage}%` }}
                        />
                      </div>

                      <div className="mt-2 flex items-center justify-between text-xs font-medium text-zinc-400">
                        <span className="text-white">{formatCurrencyK(project.funding_target)}</span>
                        <span>{fundingPercentage}% funded</span>
                        <span>{getDaysAgo(project.created_at)}</span>
                      </div>
                    </div>

                    {/* Project Information */}
                    <div className="mb-6 flex-1">
                      <h3 className="text-xl font-bold text-white line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm text-zinc-400 line-clamp-2">
                        {project.logline}
                      </p>
                    </div>

                    {/* Button */}
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-700 to-red-500 py-3 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110">
                      <Play className="h-4 w-4 fill-white" />
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingProjects;