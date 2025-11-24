"use client";

import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { projectsData } from "@/src/lib/projects-data";
import { Button } from "@/src/components/ui/button";
import { ProjectCarousel } from "@/src/components/projects/ProjectCarousel";
import { ProjectThumbnails } from "@/src/components/projects/ProjectThumbnail";
import { ProjectDetails } from "@/src/components/projects/ProjectDetails";
import { ProjectLinks } from "@/src/components/projects/ProjectLink";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function ProjectDetailsPage() {
  const params = useParams();
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  // ✅ Find project locally
  const project = projectsData.find(
    (p) => String(p.id) === String(params.id)
  );

  if (!project) return notFound();

  return (
    <motion.main
      className="flex-1 py-16 md:py-24 bg-gradient-to-b from-background to-muted/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        {/* Back button */}
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
            <Link href="/projects" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Link>
          </Button>
        </motion.div>

        {/* Project title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-primary/5 px-4 py-2 text-sm font-medium text-primary mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            Project Showcase
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            {project.name}
          </h1>
          {project.overview && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {project.overview}
            </p>
          )}
        </motion.div>

        {/* Image carousel */}
        {project.images && project.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <ProjectCarousel
              images={project.images}
              title={project.name}
              api={api}
              setApi={setApi}
              setCurrent={setCurrent}
            />
            {project.images.length > 1 && (
              <ProjectThumbnails
                images={project.images}
                title={project.name}
                api={api}
                current={current}
              />
            )}
          </motion.div>
        )}

        {/* Project content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-12"
        >
          <div className="md:col-span-2">
            <ProjectDetails
              longDescription={project.longDescription}
              technologies={project.Technology?.map((t) => t.name)}
            />
          </div>

          <div className="md:col-span-1">
            <ProjectLinks
              demoUrl={project.liveDemo || undefined}
              githubUrl={project.githubLink || undefined}
            />

            {/* Project metadata */}
            {(project.startDate || project.endDate || project.status) && (
              <motion.div
                className="p-6 rounded-2xl bg-card/80 backdrop-blur-md border border-border/50 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="font-semibold text-lg mb-4 text-foreground">
                  Project Info
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  {project.startDate && (
                    <div className="flex justify-between">
                      <span>Start Date:</span>
                      <span className="text-foreground">
                        {new Date(project.startDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {project.endDate && (
                    <div className="flex justify-between">
                      <span>End Date:</span>
                      <span className="text-foreground">
                        {new Date(project.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {project.status && (
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          project.status === "Completed"
                            ? "bg-green-500/10 text-green-500"
                            : project.status === "In Progress"
                            ? "bg-blue-500/10 text-blue-500"
                            : "bg-yellow-500/10 text-yellow-500"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
