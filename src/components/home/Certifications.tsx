"use client";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import {
  Award,
  ExternalLink,
  Calendar,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BadgeCheck,
  Trophy,
} from "lucide-react";

import { Puzzle, Code2 } from "lucide-react";

// Certification data
const certifications = [
  {
    id: 1,
    title: "Java (Basic) Certificate",
    issuer: "HackerRank",
    date: "2024",
    credentialId: null,
    credentialUrl:
      "https://www.hackerrank.com/certificates/iframe/your_java_certificate_id",
    description:
      "Certified proficiency in Java programming fundamentals, object-oriented programming, and problem-solving with Java.",
    skills: ["Java", "OOP", "Problem Solving", "Algorithms"],
    icon: <BadgeCheck className="h-6 w-6" />,
    accentColor: "from-red-500 to-orange-500",
  },
  {
    id: 2,
    title: "Problem Solving Certificate",
    issuer: "HackerRank",
    date: "2024",
    credentialId: null,
    credentialUrl:
      "https://www.hackerrank.com/certificates/iframe/your_problem_solving_certificate_id",
    description:
      "Validated advanced problem-solving skills with expertise in data structures, algorithms, and computational thinking.",
    skills: [
      "Algorithms",
      "Data Structures",
      "Problem Solving",
      "Optimization",
    ],
    icon: <Puzzle className="h-6 w-6" />,
    accentColor: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    title: "ICPC Dhaka Regional 2021",
    issuer: "International Collegiate Programming Contest",
    date: "December 2021",
    credentialId: null,
    credentialUrl: null,
    description:
      "Competed in the prestigious ICPC Dhaka Regional Contest, ranking 164th among top programming teams from universities across the region.",
    skills: [
      "Competitive Programming",
      "Algorithms",
      "Team Collaboration",
      "Time Management",
    ],
    icon: <Trophy className="h-6 w-6" />,
    accentColor: "from-purple-500 to-pink-500",
  },
  {
    id: 6,
    title: "LeetCode 370+ Problems Solved",
    issuer: "LeetCode",
    date: "2022-Present",
    credentialId: null,
    credentialUrl: "https://leetcode.com/Tanjid470",
    description:
      "Solved 370+ coding problems on LeetCode platform, demonstrating strong algorithmic thinking and problem-solving capabilities across various difficulty levels.",
    skills: [
      "Data Structures",
      "Algorithms",
      "Problem Solving",
      "System Design",
    ],
    icon: <Code2 className="h-6 w-6" />,
    accentColor: "from-orange-500 to-yellow-500",
  },
  {
    id: 7,
    title: "CodeChef (1053 Rating)",
    issuer: "CodeChef",
    date: "2022-Present",
    credentialId: null,
    credentialUrl: "https://www.codechef.com/users/tanjid470",
    description:
      "Active competitive programmer on CodeChef with 1053 rating, participating in regular contests and improving algorithmic problem-solving skills.",
    skills: [
      "Competitive Programming",
      "Algorithms",
      "Mathematics",
      "Optimization",
    ],
    icon: <Award className="h-6 w-6" />,
    accentColor: "from-brown-500 to-yellow-700",
  },
];
export function Certifications() {
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
      id="certifications"
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
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl"
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
          className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full bg-indigo-500/5 blur-3xl"
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
            Credentials & Achievements
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Achievements
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Industry-recognized credentials that validate my expertise and
            commitment to professional development
          </p>
        </motion.div>

        {/* Certifications grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              className="h-full"
            >
              {/* Certification card with glass morphism effect */}
              <motion.div
                className="bg-card/70 backdrop-blur-md border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden h-full flex flex-col"
                whileHover={{ y: -6 }}
                onClick={() => toggleExpand(cert.id)}
              >
                {/* Accent gradient border on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${cert.accentColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}
                />

                {/* Icon with gradient background */}
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${cert.accentColor} flex items-center justify-center text-white shadow-lg mb-6`}
                >
                  {cert.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold group-hover:text-accent-primary transition-colors line-clamp-2">
                      {cert.title}
                    </h3>
                    <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted flex-shrink-0 ml-2">
                      {expandedId === cert.id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center text-muted-foreground mb-4">
                    <span className="font-medium text-foreground/90">
                      {cert.issuer}
                    </span>
                  </div>

                  <div className="flex items-center mb-4 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Issued {cert.date}</span>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {cert.description}
                  </p>

                  {/* Credential ID */}
                  <div className="mb-5">
                    <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                      ID: {cert.credentialId}
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="mt-auto flex flex-wrap gap-2">
                    {cert.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs font-medium bg-muted/50 rounded-full text-muted-foreground group-hover:bg-accent-primary/10 group-hover:text-accent-primary transition-all duration-300 cursor-default backdrop-blur-sm"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="px-2.5 py-1 text-xs font-medium bg-muted/50 rounded-full text-muted-foreground">
                        +{cert.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedId === cert.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="mt-6 overflow-hidden border-t border-border/50 pt-4"
                    >
                      <h4 className="font-semibold mb-3 text-foreground flex items-center">
                        <Award className="h-4 w-4 mr-2 text-accent-primary" />
                        Skills Validated
                      </h4>
                      <ul className="space-y-2 mb-4">
                        {cert.skills.map((skill, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start text-muted-foreground"
                          >
                            <span
                              className={`text-lg mr-2 mt-0.5 bg-gradient-to-r ${cert.accentColor} bg-clip-text text-transparent`}
                            >
                              •
                            </span>
                            <span>{skill}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <motion.a
                        href={cert.credentialUrl || ""}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-accent-primary hover:text-accent-secondary transition-colors mt-2"
                        whileHover={{ x: 4 }}
                      >
                        Verify credential{" "}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div className="text-center mt-20" variants={itemVariants}>
          <p className="text-muted-foreground mb-6 text-lg">
            Want to see more of my qualifications?
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary text-background font-medium hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Get In Touch</span>
            <ExternalLink className="ml-2 h-4 w-4 relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent-secondary to-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
