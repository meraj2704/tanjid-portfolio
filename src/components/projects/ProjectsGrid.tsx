import { ProjectCard } from "../project-card";

interface ProjectsGridProps {
  projects: any[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return projects.length > 0 ? (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          title={project.name}
          description={project.overview}
          imageUrl={project.thumbnail}
          demoUrl={project.liveDemo}
          githubUrl={project.githubLink}
          technologies={project.Technology.map((t: any) => t.name)}
        />
      ))}
    </div>
  ) : (
    <div className="text-center text-muted-foreground text-lg">
      No projects found matching your criteria.
    </div>
  );
}
