"use client";

import { ProjectsFilter } from "@/src/components/projects/ProjectsFilter";
import { ProjectsGrid } from "@/src/components/projects/ProjectsGrid";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { projectsData } from "@/src/lib/projects-data"; // ✅ local data
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );

  // ✅ Use local projects instead of API
  const projects = projectsData;

  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(
      (project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.overview.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.Technology?.some((t) =>
          t.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    if (selectedTechnologies.length > 0) {
      filtered = filtered.filter((project) =>
        selectedTechnologies.every((tech) =>
          project.Technology?.some((t) => t.name === tech)
        )
      );
    }

    return filtered;
  }, [searchTerm, selectedTechnologies, projects]);

  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((project) => {
      project.Technology?.forEach((tech) => {
        techSet.add(tech.name);
      });
    });
    return Array.from(techSet).sort();
  }, [projects]);

  return (
    <motion.main
      className="flex-1 py-16 md:py-24 bg-gradient-to-b from-background to-muted/20 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Button
            asChild
            variant="outline"
            className=" border-border/50 text-muted-foreground hover:border-accent-primary hover:text-accent-primary hover:bg-accent-primary/10 transition-all group rounded-lg"
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </Button>
        </motion.div>
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center rounded-full bg-primary/5 px-4 py-2 text-sm font-medium text-primary mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            Portfolio Collection
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            My Projects
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore my work and see how I bring ideas to life through code and
            design
          </p>
        </motion.div>

        {/* Projects Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <ProjectsFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedTechnologies={selectedTechnologies}
            setSelectedTechnologies={setSelectedTechnologies}
          />
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filteredProjects.length === 0 ? (
            <motion.div
              className="text-center p-12 rounded-2xl bg-muted/30 border border-border/50"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="text-muted-foreground mb-4">
                <Sparkles className="h-12 w-12 mx-auto opacity-50" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No projects found
              </h3>
              <p className="text-muted-foreground">
                {searchTerm || selectedTechnologies.length > 0
                  ? "Try adjusting your search or filter criteria."
                  : "No projects available at the moment."}
              </p>
              {(searchTerm || selectedTechnologies.length > 0) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedTechnologies([]);
                  }}
                  className="mt-4 text-accent-primary hover:text-accent-secondary transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </motion.div>
          ) : (
            <ProjectsGrid projects={filteredProjects} />
          )}
        </motion.div>

        {/* Results count */}
        <motion.div
          className="text-center mt-12 text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Showing {filteredProjects.length} of {projects.length} projects
          {(searchTerm || selectedTechnologies.length > 0) && " (filtered)"}
        </motion.div>
      </div>
    </motion.main>
  );
}
