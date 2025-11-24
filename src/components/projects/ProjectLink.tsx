"use client";

import Link from "next/link";
import { Github, LinkIcon } from "lucide-react";
import { Button } from "../ui/button";

interface ProjectLinksProps {
  demoUrl?: string;
  githubUrl?: string;
}

export function ProjectLinks({ demoUrl, githubUrl }: ProjectLinksProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Project Links</h2>
      <div className="flex flex-col gap-4">
        {demoUrl && (
          <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
            <Button className="w-full relative overflow-hidden bg-gradient-to-r from-[#12f7d6] to-[#4f46e5] text-accent-primary-foreground hover:from-[#00e0c0] hover:to-[#3e35d1] transition-all duration-300 transform hover:scale-105">
              <LinkIcon className="h-4 w-4 mr-2" /> View Live Demo
            </Button>
          </Link>
        )}
        {githubUrl && (
          <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="w-full border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-accent-primary-foreground transition-colors transform hover:scale-105"
            >
              <Github className="h-4 w-4 mr-2" /> View GitHub Repo
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
