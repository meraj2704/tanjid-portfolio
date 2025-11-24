"use client";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Card, CardTitle } from "../ui/card";
import { useRef } from "react";
import { FaNodeJs } from "react-icons/fa6";
import { FaReact } from "react-icons/fa";
import { SiNestjs, SiNextdotjs } from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { Sparkles } from "lucide-react";

export function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
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

  const hoverEffect = {
    scale: 1.05,
    y: -8,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 10,
    },
  };

  const icons = [
    {
      icon: <FaNodeJs className="h-10 w-10 text-green-500 mb-3" />,
      title: "Node.js",
      accentColor: "from-green-500 to-emerald-500",
    },
    {
      icon: <FaReact className="h-10 w-10 text-blue-400 mb-3" />,
      title: "React",
      accentColor: "from-blue-400 to-cyan-400",
    },
    {
      icon: <SiNextdotjs className="h-10 w-10 text-foreground mb-3" />,
      title: "Next.js",
      accentColor: "from-foreground to-muted-foreground",
    },
    {
      icon: <SiExpress className="h-10 w-10 text-amber-500 mb-3" />,
      title: "Express.js",
      accentColor: "from-amber-500 to-yellow-500",
    },
    {
      icon: <SiNestjs className="h-10 w-10 text-red-500 mb-3"/>,
      title: "Nest.js",
      accentColor: "from-red-500 to-pink-500",
    },
    {
      icon: <BiLogoPostgresql className="h-10 w-10 text-blue-600 mb-3" />,
      title: "PostgreSQL",
      accentColor: "from-blue-600 to-indigo-600",
    },
    {
      icon: <FaGithub className="h-10 w-10 text-purple-500 mb-3" />,
      title: "Git & GitHub",
      accentColor: "from-purple-500 to-pink-500",
    },
    {
      icon: <SiTypescript className="h-10 w-10 text-blue-600 mb-3" />,
      title: "TypeScript",
      accentColor: "from-blue-600 to-cyan-600",
    },
  ];

  return (
    <motion.section
      ref={ref}
      id="skills"
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
            ease: "easeInOut",
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
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />

        {/* Floating icons */}
        <motion.div
          className="absolute top-20 left-10 opacity-10 text-blue-300"
          animate={{
            y: [0, 15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <FaReact size={48} />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 opacity-10 text-purple-300"
          animate={{
            y: [0, -15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <FaNodeJs size={48} />
        </motion.div>
      </div>

      <div className="container px-4 md:px-6 max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={itemVariants}
        >
          <div className="inline-flex items-center justify-center rounded-full bg-primary/5 px-4 py-2 text-sm font-medium text-primary mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            Technical Expertise
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
        >
          {icons.map((skill, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <motion.div whileHover={hoverEffect} className="h-full">
                <Card className="bg-card/80 backdrop-blur-md border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all h-full flex flex-col items-center justify-center relative overflow-hidden group">
                  {/* Accent gradient border on hover */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${skill.accentColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}
                  />

                  {/* Skill icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className="mb-4"
                  >
                    {skill.icon}
                  </motion.div>

                  {/* Skill title */}
                  <CardTitle className="text-lg font-semibold text-center">
                    {skill.title}
                  </CardTitle>

                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 rounded-2xl border border-accent-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
