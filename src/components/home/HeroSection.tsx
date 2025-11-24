"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";
import { TypingEffect } from "../typing-effect";
import { useState, useEffect, useRef } from "react";
import {
  Download,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Sparkles,
  Code,
  Server,
  Cpu,
  Database,
  Cloud,
  GitBranch,
  ArrowRight,
  GitBranchIcon,
} from "lucide-react";
import ScrollIndicator from "./ScrollIndicator";
import { FaGithub, FaHackerrank, FaReact } from "react-icons/fa6";
import {
  SiCodechef,
  SiExpress,
  SiLeetcode,
  SiNestjs,
  SiNextdotjs,
  SiPostgresql,
} from "react-icons/si";
import { ResumePreview } from "./ResumePreview";

const HTML_TAGS = [
  "<div>",
  "<section>",
  "<h1>",
  "<p>",
  "<button>",
  "<span>",
  "<a>",
  "<main>",
  "<header>",
  "<footer>",
  "<nav>",
  "<ul>",
  "<NextJS/>",
  "<React/>",
  "<NodeJS/>",
  "<TypeScript/>",
];

const FLOATING_ICONS = [
  { icon: <SiExpress size={20} />, color: "text-blue-400" },
  { icon: <FaReact size={20} />, color: "text-green-400" },
  { icon: <SiNextdotjs size={20} />, color: "text-purple-400" },
  { icon: <SiNestjs size={20} />, color: "text-yellow-400" },
  { icon: <SiPostgresql size={20} />, color: "text-cyan-400" },
  { icon: <FaGithub size={20} />, color: "text-pink-400" },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -30]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  const personalInfo = {
    name: "Meraj Hossain",
    title: "Full Stack Developer",
    specialties: [
      "Express.js",
      "React",
      "Next.js",
      "Nest.js",
      "PostgreSQL",
      "Git",
    ],
    currentRole: "Jr. Full Stack Developer at ATI Limited",
    yearsExperience: "1.5+ years",
    location: "Dhaka, Bangladesh",
    email: "merajhossain15901@gmail.com",
    phone: "+8801684088348",
    resumeUrl: "/Meraj_Resume.pdf",
    socialLinks: {
      github: "https://github.com/meraj2704",
      linkedin: "https://www.linkedin.com/in/meraj-hossain-6566b8231/",
      hackerRank: "https://www.hackerrank.com/profile/mh1669101",
      codeChef: "https://www.codechef.com/users/ije_2704",
      leetCode: "https://leetcode.com/u/r0TFSzt8Ho",
    },
  };

  const [tags, setTags] = useState<
    { id: string; x: number; y: number; tag: string; rotation: number }[]
  >([]);
  const [floatingIcons, setFloatingIcons] = useState<
    { id: string; x: number; y: number; icon: React.ReactNode; color: string }[]
  >([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    mouseX.set(x);
    mouseY.set(y);

    // Add HTML tags
    if (tags.length < 12 && Math.random() > 0.8) {
      const newTag = {
        id: Math.random().toString(36).substring(2, 9),
        x: x + (Math.random() * 60 - 30),
        y: y + (Math.random() * 60 - 30),
        tag: HTML_TAGS[Math.floor(Math.random() * HTML_TAGS.length)],
        rotation: Math.random() * 20 - 10,
      };
      setTags((prev) => [...prev, newTag]);
    }

    // Add floating icons
    if (floatingIcons.length < 6 && Math.random() > 0.9) {
      const randomIcon =
        FLOATING_ICONS[Math.floor(Math.random() * FLOATING_ICONS.length)];
      const newIcon = {
        id: Math.random().toString(36).substring(2, 9),
        x: x + (Math.random() * 80 - 40),
        y: y + (Math.random() * 80 - 40),
        icon: randomIcon.icon,
        color: randomIcon.color,
      };
      setFloatingIcons((prev) => [...prev, newIcon]);
    }
  };

  useEffect(() => {
    const tagInterval = setInterval(() => {
      if (tags.length > 0) setTags((prev) => prev.slice(1));
    }, 1000);

    const iconInterval = setInterval(() => {
      if (floatingIcons.length > 0) setFloatingIcons((prev) => prev.slice(1));
    }, 1500);

    return () => {
      clearInterval(tagInterval);
      clearInterval(iconInterval);
    };
  }, [tags, floatingIcons]);

  const background = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(18,247,214,0.08) 0%, rgba(0,0,0,0) 70%)`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
        mass: 0.8,
      },
    },
  };

  // Pre-render some floating elements
  useEffect(() => {
    // Pre-populate with some floating icons
    const initialIcons = FLOATING_ICONS.map((icon, i) => ({
      id: `initial-${i}`,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      icon: icon.icon,
      color: icon.color,
    }));
    setFloatingIcons(initialIcons);
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/30"
      onMouseMove={handleMouseMove}
      style={{ opacity, scale }}
    >
      {/* Advanced Animated Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ y }}
      >
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl"
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent-primary/40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </motion.div>

      {/* Interactive Light Effect */}
      <div className="absolute inset-0">
        <motion.div
          style={{ background }}
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        />
      </div>

      {/* Animated Tags */}
      <AnimatePresence>
        {tags.map(({ id, x, y, tag, rotation }) => (
          <motion.span
            key={id}
            initial={{ x, y, opacity: 1, scale: 0.8, rotate: rotation }}
            animate={{
              opacity: 0,
              scale: 1.2,
              y: y - 40,
              transition: { duration: 1.2, ease: "easeOut" },
            }}
            exit={{ opacity: 0 }}
            className="fixed pointer-events-none text-accent-primary/40 font-mono text-sm font-medium"
            style={{ left: x, top: y, zIndex: 10, rotate: `${rotation}deg` }}
          >
            {tag}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Main Content */}
      <div className="container px-4 md:px-6 max-w-6xl space-y-8 z-20 relative pb-16 md:pb-0">
        {/* Vertical Social Links */}
        <motion.div
          className="absolute bottom-4 left-12 md:left-6 md:top-20 md:-translate-y-1/2  lg:flex lg:flex-col items-center gap-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <div className=" hidden md:block w-px h-40 bg-gradient-to-b from-accent-primary to-transparent" />
          <div className="flex md:flex-col gap-5">
            {[
              {
                icon: <Github size={22} />,
                href: personalInfo.socialLinks.github,
              },
              {
                icon: <Linkedin size={22} />,
                href: personalInfo.socialLinks.linkedin,
              },
              {
                icon: <FaHackerrank size={22} />,
                href: personalInfo.socialLinks.hackerRank,
              },
              {
                icon: <SiCodechef size={22} />,
                href: personalInfo.socialLinks.codeChef,
              },
              {
                icon: <SiLeetcode size={22} />,
                href: personalInfo.socialLinks.leetCode,
              },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.25, y: -3 }}
                className="p-3 rounded-full bg-background/80 backdrop-blur-md border border-border/50 text-muted-foreground hover:text-accent-primary hover:border-accent-primary/30 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
          <div className="w-px  hidden md:block h-40 bg-gradient-to-t from-accent-primary to-transparent" />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-6"
        >
          {/* Welcome Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center justify-center rounded-full bg-accent-primary/10 px-5 py-3 text-sm font-medium text-accent-primary mb-4 border border-accent-primary/20 backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
            Welcome to my digital realm
          </motion.div>

          {/* Main Name */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl lg:text-9xl mb-6"
          >
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-300% animate-gradient">
                {personalInfo.name}
              </span>
              <motion.span
                className="absolute -inset-4 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 blur-2xl -z-10 rounded-full"
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
              />
            </span>
          </motion.h1>

          {/* Title and Role */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl text-muted-foreground font-medium flex flex-col items-center justify-center gap-3 mb-8"
          >
            <span className="bg-background/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-border/50">
              {personalInfo.title}
            </span>
            <span className="flex items-center gap-3 text-lg text-accent-primary/80">
              <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
              {personalInfo.currentRole}
              <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
            </span>
          </motion.h2>

          {/* Specialties Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto mb-12"
          >
            {personalInfo.specialties.map((specialty, index) => (
              <motion.div
                key={specialty}
                custom={index}
                variants={itemVariants}
                className="p-4 bg-background/80 backdrop-blur-md border border-border/50 rounded-2xl text-center hover:border-accent-primary/30 hover:shadow-lg hover:scale-105 transition-all duration-300 group flex justify-center items-center gap-2"
                whileHover={{ y: -5 }}
              >
                <div className="text-accent-primary  opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  {FLOATING_ICONS[index % FLOATING_ICONS.length].icon}
                </div>
                <span className="text-sm font-medium text-foreground/90 group-hover:text-accent-primary transition-colors">
                  {specialty}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Animated Typing Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mx-auto max-w-3xl relative mb-12"
          >
            <div className="relative bg-background/70 backdrop-blur-md rounded-3xl p-8 border border-border/50 shadow-2xl">
              {/* Animated border */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 rounded-3xl blur-lg -z-10"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative">
                <p className="text-xl md:text-2xl text-foreground leading-relaxed font-light relative z-10">
                  <TypingEffect
                    text={`Crafting digital experiences with ${personalInfo.yearsExperience} years of expertise. Specializing in modern full-stack development, I transform ideas into scalable, performant applications that users love.`}
                    speed={40}
                    delay={600}
                  />
                  <span className="ml-1 inline-block w-2 h-8 bg-accent-primary animate-pulse rounded-full" />
                </p>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5 rounded-xl -z-0"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={containerVariants}
            className="flex flex-col sm:flex-row justify-center gap-5 pt-8"
          >
            <motion.div variants={itemVariants} className="flex justify-center">
              <Link href="/projects">
                <Button
                  size="lg"
                  className="px-10 py-7 text-lg font-medium rounded-2xl bg-gradient-to-r from-accent-primary to-accent-secondary text-background hover:shadow-2xl hover:shadow-accent-primary/30 transition-all relative group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore My Work{" "}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-secondary to-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center">
              <Link href="#contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-10 py-7 text-lg font-medium rounded-2xl border-2 border-accent-primary/40 bg-background/80 backdrop-blur-md text-foreground hover:bg-accent-primary/10 hover:border-accent-primary hover:shadow-lg transition-all group"
                >
                  <span className="relative z-10">Let's Collaborate</span>
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center">
              <ResumePreview resumeUrl={personalInfo.resumeUrl} />
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={containerVariants}
            className="flex flex-wrap justify-center gap-4 md:gap-8 pb-4 md:pb-0  text-muted-foreground text-sm md:text-base"
          >
            <motion.a
              href={`mailto:${personalInfo.email}`}
              variants={itemVariants}
              className="flex items-center gap-3 hover:text-accent-primary transition-all group bg-background/50 backdrop-blur-md px-4 py-3 rounded-xl border border-border/30 hover:border-accent-primary/30"
            >
              <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">{personalInfo.email}</span>
              <span className="sm:hidden">Email</span>
            </motion.a>

            <motion.a
              href={`tel:${personalInfo.phone}`}
              variants={itemVariants}
              className="flex items-center gap-3 hover:text-accent-primary transition-all group bg-background/50 backdrop-blur-md px-4 py-3 rounded-xl border border-border/30 hover:border-accent-primary/30"
            >
              <Phone className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">{personalInfo.phone}</span>
              <span className="sm:hidden">Call</span>
            </motion.a>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 group bg-background/50 backdrop-blur-md px-4 py-3 rounded-xl border border-border/30"
            >
              <MapPin className="h-5 w-5" />
              {personalInfo.location}
            </motion.div>
          </motion.div>
        </motion.div>
        <ScrollIndicator />
      </div>
    </motion.section>
  );
}
