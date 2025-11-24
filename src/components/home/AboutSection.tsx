"use client";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ReactElement, useRef, useState } from "react";
import { Code, Server, Sparkles, Brain, Cpu, BookOpen } from "lucide-react";
import { FaJava, FaDocker, FaNodeJs, FaReact } from "react-icons/fa6";
import {
  SiDart,
  SiFlutter,

} from "react-icons/si";

const techIcons: Record<string, ReactElement> = {
  Java: <FaJava className="h-4 w-4" />,
  Dart: <SiDart className="h-4 w-4" />,
  Flutter: <SiFlutter className="h-4 w-4" />,
  "Machine Learning": <Brain className="h-4 w-4" />,
  LLM: <Cpu className="h-4 w-4" />,
  "Problem Solving": <BookOpen className="h-4 w-4" />,
};

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
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
        delayChildren: 0.2,
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

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0, rotate: -2 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 10,
      },
    },
  };

  const techVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.5 + i * 0.07,
        type: "spring" as const,
        stiffness: 400,
        damping: 10,
      },
    }),
    hover: {
      y: -4,
      scale: 1.05,
      backgroundColor: "hsl(var(--accent))",
      color: "hsl(var(--accent-foreground))",
      boxShadow: "0 8px 20px -5px rgba(var(--accent), 0.3)",
      transition: {
        type: "spring" as const,
        stiffness: 500,
        damping: 15,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      id="about"
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
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-red-500/5 blur-3xl"
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
          className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl"
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
          className="absolute top-20 left-10 opacity-10 text-red-300"
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
          <Code size={48} />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 opacity-10 text-blue-300"
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
          <Brain size={48} />
        </motion.div>
      </div>

      <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={itemVariants}
        >
          <div className="inline-flex items-center justify-center rounded-full bg-primary/5 px-4 py-2 text-sm font-medium text-primary mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            Professional Profile
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            About Me
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover my journey in software engineering, competitive
            programming, and passion for innovative solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image with interactive effects */}
          <motion.div
            variants={imageVariants}
            whileHover="hover"
            className="relative group"
          >
            <div className="relative z-10">
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-primary/20 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative rounded-3xl overflow-hidden border border-border/50 shadow-2xl bg-gradient-to-br from-card to-background">
                <Image
                  src="/tanjid.jpg" // Update with Tanjid's image path
                  width={600}
                  height={600}
                  alt="Tanjid Hossain Amran - Software Engineer"
                  className="mx-auto w-full max-w-[400px] md:max-w-none object-cover aspect-square z-10 relative"
                  priority
                />

                {/* Hover overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="px-4 py-2 bg-background/80 backdrop-blur-md rounded-full text-sm font-medium border border-border/50"
                  >
                    Software Engineer & ML Enthusiast
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Floating tech badges */}
            <AnimatePresence>
              {hoveredTech && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-background to-card border border-border/50 rounded-full px-4 py-2 shadow-lg z-20 flex items-center gap-2 backdrop-blur-sm"
                >
                  {techIcons[hoveredTech]}
                  <span className="text-sm font-medium">{hoveredTech}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Content */}
          <div className="space-y-6 md:space-y-8">
            <motion.h3
              className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Building <span className="text-accent">Innovative</span> Software
              Solutions
            </motion.h3>

            <div className="space-y-4 md:space-y-6 text-muted-foreground">
              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg leading-relaxed"
              >
                Hi, I'm{" "}
                <span className="font-semibold text-foreground">
                  Tanjid Hossain Amran
                </span>
                , a{" "}
                <span className="font-semibold text-foreground">
                  Software Engineer
                </span>{" "}
                and CSE graduate passionate about{" "}
                <span className="font-semibold text-foreground">
                  Java, Dart, Flutter, and Machine Learning
                </span>
                . With expertise in mobile development and AI, I specialize in
                creating impactful digital solutions.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg leading-relaxed"
              >
                I've solved{" "}
                <span className="font-semibold text-foreground">
                  370+ LeetCode problems
                </span>{" "}
                and competed in the{" "}
                <span className="font-semibold text-foreground">
                  ICPC Dhaka Regional 2021
                </span>
                . My professional journey includes building EdTech platforms
                like{" "}
                <span className="font-semibold text-foreground">
                  LivQuiz and Softmax Online School
                </span>
                , where I've enhanced user experiences through innovative
                features.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg leading-relaxed"
              >
                My research interests span{" "}
                <span className="font-semibold text-foreground">
                  deep learning, image processing, and software systems
                </span>
                . I've published work on{" "}
                <span className="font-semibold text-foreground">
                  CycleGAN for image translation
                </span>{" "}
                and continue to explore cutting-edge technologies while
                mentoring aspiring developers.
              </motion.p>
            </div>

            {/* Technologies */}
            <motion.div variants={itemVariants} className="pt-2">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider flex items-center">
                <span className="h-px w-8 bg-border mr-2" />
                Core Competencies
                <span className="h-px w-8 bg-border ml-2" />
              </h3>
              <div className="flex flex-wrap gap-3">
                {Object.keys(techIcons).map((tech, i) => (
                  <motion.button
                    key={tech}
                    custom={i}
                    variants={techVariants}
                    whileHover="hover"
                    onHoverStart={() => setHoveredTech(tech)}
                    onHoverEnd={() => setHoveredTech(null)}
                    className="px-4 py-2 text-sm bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl font-medium flex items-center gap-2 hover:z-10 transition-colors"
                  >
                    {techIcons[tech]}
                    {tech}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
