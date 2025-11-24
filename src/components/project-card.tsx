import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink, ArrowRight, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useRef } from "react";

interface ProjectCardProps {
  id: string | number;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl?: string | null;
  githubUrl?: string | null;
  technologies: string[] | undefined | null;
}

export function ProjectCard({
  id,
  title,
  description,
  imageUrl,
  demoUrl,
  githubUrl,
  technologies,
}: ProjectCardProps) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for image
  const y = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, type: "spring" }}
      className="h-full"
    >
      <motion.div
        whileHover={{
          y: -12,
          transition: { type: "spring", stiffness: 300, damping: 15 },
        }}
        className="h-full"
      >
        <Card className="group relative bg-card/80 backdrop-blur-md border border-border/50 flex flex-col h-full overflow-hidden transition-all duration-300 hover:border-accent-primary/50 hover:shadow-xl rounded-2xl">
          {/* Gradient accent border on hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

          {/* Image container with parallax effect */}
          <motion.div
            className="overflow-hidden relative"
            style={{ y }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={imageUrl || "/placeholder.svg"}
              width={400}
              height={250}
              alt={`Screenshot of ${title}`}
              className="w-full h-48 object-cover object-top transition-transform duration-700 group-hover:scale-110"
              priority
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Featured badge */}
            <div className="absolute top-3 left-3">
              <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles className="h-3 w-3 mr-1" />
                Featured
              </div>
            </div>
          </motion.div>

          <CardHeader className="relative z-20 p-6 pb-4">
            <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 group-hover:from-accent-primary group-hover:to-accent-secondary transition-all duration-500">
              {title}
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2 line-clamp-2">
              {description}
            </CardDescription>
          </CardHeader>

          <CardContent className="relative z-20 flex-grow flex flex-col justify-end p-6 pt-0">
            {/* Technologies */}
            <motion.div
              className="flex flex-wrap gap-2 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {technologies?.slice(0, 4).map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-background/80 backdrop-blur-sm border border-border/50 text-muted-foreground text-xs hover:bg-accent-primary/20 hover:text-accent-primary hover:border-accent-primary/30 transition-all duration-300 group-hover:translate-y-0.5"
                >
                  {tech}
                </Badge>
              ))}
              {technologies && technologies.length > 4 && (
                <Badge
                  variant="outline"
                  className="text-xs bg-background/50"
                >
                  +{technologies.length - 4}
                </Badge>
              )}
            </motion.div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-auto pt-4 border-t border-border/30">
              <Link href={`/projects/${id}`} className="flex-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-accent-primary/30 text-accent-primary hover:bg-accent-primary/10 hover:border-accent-primary hover:shadow-[0_0_15px_rgba(18,247,214,0.2)] transition-all group/details rounded-lg"
                >
                  Details
                  <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover/details:translate-x-1" />
                </Button>
              </Link>

              {demoUrl && (
                <Link
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="sm"
                    className="h-10 w-10 p-0 text-muted-foreground hover:text-accent-primary hover:bg-accent-primary/10 transition-all group/demo rounded-lg border border-border/50"
                    title="Live Demo"
                  >
                    <ExternalLink className="h-4 w-4 transition-transform group-hover/demo:scale-110" />
                  </Button>
                </Link>
              )}

              {githubUrl && (
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="sm"
                    className="h-10 w-10 p-0 text-muted-foreground hover:text-accent-primary hover:bg-accent-primary/10 transition-all group/code rounded-lg border border-border/50"
                    title="View Code"
                  >
                    <Github className="h-4 w-4 transition-transform group-hover/code:rotate-12" />
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}