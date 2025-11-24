"use client";

import { Badge } from "../ui/badge";

interface ProjectDetailsProps {
  longDescription: string;
  technologies: string[];
}

export function ProjectDetails({
  longDescription,
  technologies,
}: ProjectDetailsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Overview</h2>
      <p className="text-muted-foreground leading-relaxed">{longDescription}</p>

      <h2 className="text-2xl font-bold mt-8">Technologies Used</h2>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <Badge
            key={tech}
            variant="secondary"
            className="bg-muted text-muted-foreground"
          >
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  );
}
