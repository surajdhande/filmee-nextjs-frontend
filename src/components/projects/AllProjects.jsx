"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Search, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

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

export default function AllProjects() {
  const router = useRouter();

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
    <section className="min-h-screen bg-black px-6 py-20">
        <div className="mx-auto max-w-7xl">

        <h1 className="text-5xl font-bold text-white">
            Discover <span className="text-red-600">Amazing Projects</span>
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-zinc-400">
            Explore groundbreaking film projects from talented creators
            worldwide. Find your next investment opportunity or collaboration.
        </p>

        </div>
        {/* Statistics */}
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center">
            <h3 className="text-3xl font-bold text-white">500+</h3>
            <p className="mt-2 text-sm text-zinc-400">
            Active Projects
            </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center">
            <h3 className="text-3xl font-bold text-white">₹50M+</h3>
            <p className="mt-2 text-sm text-zinc-400">
            Funding Raised
            </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center">
            <h3 className="text-3xl font-bold text-white">10K+</h3>
            <p className="mt-2 text-sm text-zinc-400">
            Creators
            </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center">
            <h3 className="text-3xl font-bold text-white">4.8</h3>
            <p className="mt-2 text-sm text-zinc-400">
            Average Rating
            </p>
        </div>

        </div>
        {/* Projects Grid */}
        <div className="mt-16">

        {loading ? (
            <p className="text-center text-zinc-400">
            Loading projects...
            </p>
        ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

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
                    className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:-translate-y-2 hover:border-red-600"
                >
                    <img
                    src={
                        project.lookbook_url ||
                        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80"
                    }
                    alt={project.title}
                    className="h-60 w-full object-cover"
                    />

                    <div className="p-6">

                    <h3 className="text-2xl font-bold text-white">
                        {project.title}
                    </h3>

                    <p className="mt-3 line-clamp-2 text-zinc-400">
                        {project.logline}
                    </p>

                    <div className="mt-6 flex items-center justify-between">

                        <span className="rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white">
                        {fundingPercentage}% Funded
                        </span>

                        <span className="text-sm text-zinc-400">
                        {getDaysAgo(project.created_at)}
                        </span>

                    </div>

                    </div>
                </div>
                );
            })}

            </div>
        )}

        </div>
    </section>
    );
}