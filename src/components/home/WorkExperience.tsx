"use client";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import {
  Calendar,
  ExternalLink,
  Building,
  MapPin,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Code2,
  Cpu,
  Database,
} from "lucide-react";

// Work experience data
const experiences = [
  {
    id: 1,
    company: "ATI Limited",
    position: "Junior Frontend Developer",
    duration: "May 2024 - Present",
    location: "Dhaka, Bangladesh",
    description:
      "Developing modern web applications using Next.js, Nest.js, Express, and PostgreSQL. Collaborating with the team to build scalable and efficient solutions.",
    achievements: [
      "Developing responsive user interfaces with Next.js and React",
      "Building RESTful APIs with Nest.js and Express",
      "Implementing database solutions with PostgreSQL",
      "Collaborating with team members using Agile methodologies",
    ],
    technologies: [
      "Next.js",
      "Nest.js",
      "Express",
      "PostgreSQL",
      "React",
      "TypeScript",
    ],
    icon: <Code2 className="h-6 w-6" />,
    accentColor: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    company: "SIDTECH",
    position: "Frontend Developer",
    duration: "Jan 2024 - Apr 2024",
    location: "Lahore, Pakistan (Remote)",
    description:
      "Developed React-based applications with a focus on responsive design and user experience. Implemented modern UI components and integrated with backend APIs.",
    achievements: [
      "Built responsive web applications using React",
      "Implemented modern UI components with custom styling",
      "Collaborated with remote team members effectively",
      "Improved application performance through optimization techniques",
    ],
    technologies: ["React", "JavaScript", "CSS3", "REST APIs", "Git"],
    icon: <Cpu className="h-6 w-6" />,
    accentColor: "from-violet-500 to-purple-500",
  },
];

export function WorkExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scroll-based animations
  const y = useTransform(scrollYProgress, [0, 1], [80, -30]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <motion.section
      ref={sectionRef}
      id="experience"
      className="w-full py-20 md:py-32 overflow-hidden relative bg-gradient-to-b from-background to-muted/20"
      style={{ opacity, scale }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-50px" }}
      variants={containerVariants}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full bg-purple-500/5 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: 1,
          }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />
      </div>

      <div className="container px-4 md:px-6 max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={itemVariants}
        >
          <div className="inline-flex items-center justify-center rounded-full bg-primary/5 px-4 py-2 text-sm font-medium text-primary mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            Professional Journey
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Work Experience
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My professional path through innovative companies and challenging
            projects
          </p>
        </motion.div>

        {/* Modern timeline */}
        <div className="relative">
          {/* Vertical timeline line with gradient */}
          <div className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-primary to-accent-secondary transform md:-translate-x-1/2 z-0" />

          {/* Experience items */}
          <div className="space-y-10 relative z-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className={`flex flex-col md:flex-row items-start gap-6 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="flex-shrink-0 md:absolute left-6 sm:left-8 md:left-1/2 -translate-x-1/2 md:translate-x-0 w-10 h-10">
                  <div className="relative flex items-center justify-center w-full h-full">
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${exp.accentColor} blur-md opacity-50 animate-pulse`}
                    />
                    <div className="relative w-4 h-4 rounded-full bg-background border-2 border-accent-primary shadow-md" />
                  </div>
                </div>

                {/* Content card with glass morphism effect */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "md:pr-10 md:pl-16" : "md:pl-10 md:pr-16"
                  }`}
                >
                  <motion.div
                    className="bg-card/70 backdrop-blur-md border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
                    whileHover={{ y: -6 }}
                    onClick={() => toggleExpand(exp.id)}
                  >
                    {/* Accent gradient border on hover */}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${exp.accentColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}
                    />

                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      {/* Icon with gradient background */}
                      <div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${exp.accentColor} flex items-center justify-center text-white shadow-lg`}
                      >
                        {exp.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold group-hover:text-accent-primary transition-colors">
                              {exp.position}
                            </h3>
                            <div className="flex items-center text-muted-foreground mt-1 flex-wrap gap-x-2">
                              <span className="font-medium text-foreground flex items-center">
                                <Building className="h-4 w-4 mr-1" />
                                {exp.company}
                              </span>
                              <span className="hidden sm:inline">•</span>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{exp.location}</span>
                              </div>
                            </div>
                          </div>
                          <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted">
                            {expandedId === exp.id ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </button>
                        </div>

                        <div className="flex items-center mt-3 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{exp.duration}</span>
                        </div>

                        <p className="mt-4 text-muted-foreground leading-relaxed">
                          {exp.description}
                        </p>

                        {/* Technologies */}
                        <div className="mt-5 flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 text-xs font-medium bg-muted/50 rounded-full text-muted-foreground group-hover:bg-accent-primary/10 group-hover:text-accent-primary transition-all duration-300 cursor-default backdrop-blur-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Expanded Achievements */}
                        <AnimatePresence>
                          {expandedId === exp.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                              className="mt-6 overflow-hidden"
                            >
                              <div className="pt-4 border-t border-border/50">
                                <h4 className="font-semibold mb-3 text-foreground flex items-center">
                                  <Database className="h-4 w-4 mr-2 text-accent-primary" />
                                  Key Achievements
                                </h4>
                                <ul className="space-y-3">
                                  {exp.achievements.map((achievement, i) => (
                                    <motion.li
                                      key={i}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.1 }}
                                      className="flex items-start text-muted-foreground"
                                    >
                                      <span
                                        className={`text-lg mr-2 mt-0.5 bg-gradient-to-r ${exp.accentColor} bg-clip-text text-transparent`}
                                      >
                                        •
                                      </span>
                                      <span>{achievement}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div className="text-center mt-20" variants={itemVariants}>
          <p className="text-muted-foreground mb-6 text-lg">
            Interested in my work and expertise?
          </p>
          <motion.a
            href="#projects"
            className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary text-background font-medium hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Explore My Projects</span>
            <ExternalLink className="ml-2 h-4 w-4 relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent-secondary to-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
