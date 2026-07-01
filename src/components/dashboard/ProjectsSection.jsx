import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectsSection = () => {
  return (
    <section className="mt-10 space-y-6">

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Active Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">

        <ProjectCard
          image="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80"
          status="Funding"
          title="The Last Frame"
          genre="Thriller"
          raised={150000}
          target={250000}
          investors={12}
          applications={45}
          views={1250}
        />

        <ProjectCard
          image="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80"
          status="Pre-Production"
          title="Urban Shadows"
          genre="Drama"
          raised={180000}
          target={180000}
          investors={8}
          applications={32}
          views={890}
        />

      </div>

    </section>
  );
};

export default ProjectsSection;