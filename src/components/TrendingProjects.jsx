"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

const TrendingProjects = ({
  showAll = false,
  title = "Trending Projects",
  subtitle = "Discover exciting film projects looking for funding and collaborators.",
  showViewAll = true,
}) => {
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
    <section className="bg-black px-6 py-20">
      <div className="mx-auto max-w-7xl">

        <div className="mb-12 flex items-start justify-between gap-4">

          <div>

            <h2 className="text-5xl font-bold text-white">
              {title}
            </h2>

            <p className="mt-3 text-lg text-zinc-400">
              {subtitle}
            </p>

          </div>

          {showViewAll && (
            <Link
              href="/project-overview"
              className="shrink-0 whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-zinc-400 transition hover:text-white sm:text-sm"
            >
              <span>VIEW ALL</span>
            </Link>
          )}

        </div>

        {loading ? (
          <p className="text-zinc-400">
            Loading projects...
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {(showAll ? projects : projects.slice(0, 4)).map((project) => {
              const fundingPercentage =
                project.funding_target > 0
                  ? Math.round(
                      (project.funding_raised / project.funding_target) * 100
                    )
                  : 0;

              return (
                <div
                  key={project.project_id}
                  onClick={() => {
                  alert("CARD CLICKED");
                  router.push("/login");
                }}
                  className="group flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 transition-all duration-300 hover:-translate-y-2 hover:border-red-600 hover:shadow-xl hover:shadow-red-600/20"
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

                    <div className="mb-5 flex flex-col gap-1">

                      <span className="text-xs font-medium text-zinc-400">
                        Funding Progress
                      </span>

                      <span className="text-4xl font-bold text-white">
                        {fundingPercentage}%
                      </span>

                      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">

                        <div
                          className="h-full rounded-full bg-red-600 transition-all duration-1000 ease-out"
                          style={{
                            width: `${fundingPercentage}%`,
                          }}
                        />

                      </div>

                      <div className="mt-2 flex items-center justify-between text-xs font-medium text-zinc-400">

                        <span className="text-white">
                          {formatCurrencyK(project.funding_target)}
                        </span>

                        <span>
                          {fundingPercentage}% funded
                        </span>

                        <span>
                          {getDaysAgo(project.created_at)}
                        </span>

                      </div>

                    </div>

                    <div className="mb-6 flex-1">

                      <h3 className="line-clamp-1 text-xl font-bold text-white">
                        {project.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
                        {project.logline}
                      </p>

                    </div>

                   <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("BUTTON CLICKED");
                      router.push("/login");
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-700 to-red-500 py-3 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110"
                  >
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