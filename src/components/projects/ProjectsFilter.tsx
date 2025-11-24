"use client";

import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useFetchData } from "@/src/hooks/useApi";

interface ProjectsFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedTechnologies: string[];
  setSelectedTechnologies: (
    tech: string[] | ((prev: string[]) => string[])
  ) => void;
}

export function ProjectsFilter({
  searchTerm,
  setSearchTerm,
  selectedTechnologies,
  setSelectedTechnologies,
}: ProjectsFilterProps) {
  const { data: technologies = [], isLoading } = useFetchData(
    ["technologies"],
    "/api/technology"
  );

  const handleTechnologyToggle = (tech: string) => {
    setSelectedTechnologies((prev: string[]) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  return (
    <div className="mb-12 space-y-6">
      <Input
        type="text"
        placeholder="Search projects by title or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-xl mx-auto block bg-card border-border text-foreground placeholder:text-muted-foreground"
      />
      {/* <div className="flex flex-wrap justify-center gap-3">
        {isLoading ? (
          <p>Loading filters...</p>
        ) : (
          technologies.map((tech: any) => (
            <Badge
              key={tech.id}
              variant={
                selectedTechnologies.includes(tech.name) ? "default" : "outline"
              }
              className={`cursor-pointer px-4 py-2 text-sm font-medium transition-colors ${
                selectedTechnologies.includes(tech.name)
                  ? "bg-accent-primary text-accent-primary-foreground hover:bg-accent-secondary"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
              onClick={() => handleTechnologyToggle(tech.name)}
            >
              {tech.name}
            </Badge>
          ))
        )}
        {selectedTechnologies.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedTechnologies([])}
            className="text-muted-foreground hover:text-accent-primary"
          >
            Clear Filters
          </Button>
        )}
      </div> */}
    </div>
  );
}
