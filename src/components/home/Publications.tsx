"use client";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import {
  FileText,
  ExternalLink,
  Calendar,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  BarChart3,
  Users,
  Bookmark,
  Quote,
  Library,
  GraduationCap,
  Feather,
} from "lucide-react";

// Publication data
const publications = [
  {
    id: 1,
    title: "Advanced Techniques for Responsive Web Design in Modern Frameworks",
    publisher: "Journal of Web Engineering",
    date: "March 2024",
    url: "https://example.com/publication/1",
    description:
      "An in-depth analysis of responsive design patterns in React, Vue, and Angular applications with performance comparisons and best practices.",
    abstract:
      "This paper explores cutting-edge responsive design methodologies implemented in modern JavaScript frameworks. We conducted performance benchmarks across 50+ implementations and identified key optimization strategies that can improve load times by up to 42% while maintaining design integrity across devices.",
    topics: [
      "Responsive Design",
      "Web Performance",
      "React",
      "Vue.js",
      "Angular",
    ],
    citation: "Web Eng. J., 2024, 12(3), 45-67",
    citationCount: 28,
    readTime: "12 min read",
    icon: <BookOpen className="h-6 w-6" />,
    accentColor: "from-blue-500 to-cyan-500",
    badge: "Research Paper",
  },
  {
    id: 2,
    title: "Machine Learning Integration in Frontend Development Workflows",
    publisher: "International Conference on AI Systems",
    date: "January 2024",
    url: "https://example.com/publication/2",
    description:
      "Exploring practical approaches to integrate machine learning models into frontend applications without compromising performance or user experience.",
    abstract:
      "Our research presents a novel framework for integrating machine learning capabilities directly into frontend applications. We demonstrate how TensorFlow.js and similar libraries can be optimized for production environments, reducing bundle size by 67% while maintaining model accuracy.",
    topics: [
      "Machine Learning",
      "Frontend Development",
      "TensorFlow.js",
      "Performance Optimization",
    ],
    citation: "Proc. IC-AIS 2024, 234-241",
    citationCount: 14,
    readTime: "8 min read",
    icon: <BarChart3 className="h-6 w-6" />,
    accentColor: "from-purple-500 to-pink-500",
    badge: "Conference Paper",
  },
  {
    id: 3,
    title: "Accessibility-First Approach in Modern Web Applications",
    publisher: "Web Accessibility Journal",
    date: "November 2023",
    url: "https://example.com/publication/3",
    description:
      "A comprehensive guide to implementing accessibility standards from the initial design phase through development and testing in complex web applications.",
    abstract:
      "This publication introduces an accessibility-first development methodology that integrates WCAG guidelines throughout the entire development lifecycle. Our approach resulted in 89% fewer accessibility issues in production applications compared to traditional testing methods.",
    topics: [
      "Web Accessibility",
      "WCAG Guidelines",
      "Inclusive Design",
      "Testing",
    ],
    citation: "Web Access. J., 2023, 8(2), 112-134",
    citationCount: 31,
    readTime: "15 min read",
    icon: <Users className="h-6 w-6" />,
    accentColor: "from-green-500 to-emerald-500",
    badge: "Journal Article",
  },
];

export function Publications() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

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

  // Filter publications by category (in a real app, you'd have actual categories)
  const filteredPublications =
    activeCategory === "all"
      ? publications
      : publications.filter((pub) => pub.badge === activeCategory);

  return (
    <motion.section
      ref={sectionRef}
      id="publications"
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

        {/* Floating document shapes */}
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
          <FileText size={48} />
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
          <BookOpen size={48} />
        </motion.div>

        {/* Floating library icon */}
        <motion.div
          className="absolute top-1/3 right-20 opacity-5 text-cyan-300"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.7,
          }}
        >
          <Library size={64} />
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
            Research & Writings
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Publications
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore my research papers, articles, and contributions to the web
            development community
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          variants={itemVariants}
        >
          {["all", "Research Paper", "Conference Paper", "Journal Article"].map(
            (category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-accent-primary text-background shadow-md"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                {category}
              </button>
            )
          )}
        </motion.div>

        {/* Publications grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPublications.map((pub) => (
            <motion.div
              key={pub.id}
              variants={itemVariants}
              className="h-full"
              layout
            >
              {/* Publication card with unique book-like design */}
              <motion.div
                className="bg-card/80 backdrop-blur-md border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden h-full flex flex-col"
                whileHover={{ y: -8, rotate: 0.5 }}
                onClick={() => toggleExpand(pub.id)}
                layout
              >
                {/* Book spine effect */}
                <div
                  className={`absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b ${pub.accentColor}`}
                />

                {/* Accent gradient border on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${pub.accentColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}
                />

                {/* Publication badge */}
                <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4 self-start">
                  {pub.badge}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold group-hover:text-accent-primary transition-colors line-clamp-3 leading-tight">
                      {pub.title}
                    </h3>
                    <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted flex-shrink-0 ml-2">
                      {expandedId === pub.id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center text-muted-foreground mb-3">
                    <span className="font-medium text-foreground/90 flex items-center">
                      <Feather className="h-4 w-4 mr-1" />
                      {pub.publisher}
                    </span>
                  </div>

                  <div className="flex items-center mb-4 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Published {pub.date}</span>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {pub.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-5 text-xs text-muted-foreground">
                    <span className="flex items-center">
                      <GraduationCap className="h-3.5 w-3.5 mr-1" />
                      {pub.citationCount} citations
                    </span>
                    <span>•</span>
                    <span>{pub.readTime}</span>
                  </div>

                  {/* Citation */}
                  <div className="mb-5">
                    <span className="text-xs font-mono text-muted-foreground bg-muted/30 px-2 py-1 rounded">
                      {pub.citation}
                    </span>
                  </div>

                  {/* Topics */}
                  <div className="mt-auto flex flex-wrap gap-2">
                    {pub.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-2.5 py-1 text-xs font-medium bg-muted/30 rounded-full text-muted-foreground group-hover:bg-accent-primary/10 group-hover:text-accent-primary transition-all duration-300 cursor-default backdrop-blur-sm"
                      >
                        {topic}
                      </span>
                    ))}
                    {pub.topics.length > 3 && (
                      <span className="px-2.5 py-1 text-xs font-medium bg-muted/30 rounded-full text-muted-foreground">
                        +{pub.topics.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedId === pub.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="mt-6 overflow-hidden border-t border-border/30 pt-4"
                    >
                      <h4 className="font-semibold mb-3 text-foreground flex items-center">
                        <Quote className="h-4 w-4 mr-2 text-accent-primary" />
                        Abstract
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {pub.abstract}
                      </p>

                      <h4 className="font-semibold mb-2 text-foreground flex items-center">
                        <Bookmark className="h-4 w-4 mr-2 text-accent-primary" />
                        Research Topics
                      </h4>
                      <ul className="space-y-2 mb-4">
                        {pub.topics.map((topic, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start text-muted-foreground text-sm"
                          >
                            <span
                              className={`text-lg mr-2 mt-0.5 bg-gradient-to-r ${pub.accentColor} bg-clip-text text-transparent`}
                            >
                              •
                            </span>
                            <span>{topic}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <motion.a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-accent-primary hover:text-accent-secondary transition-colors mt-2 group/link"
                        whileHover={{ x: 4 }}
                      >
                        Read full publication
                        <ExternalLink className="ml-1 h-3 w-3 group-hover/link:rotate-12 transition-transform" />
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
            Interested in my research and writings?
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary text-background font-medium hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Request Full Papers</span>
            <ExternalLink className="ml-2 h-4 w-4 relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent-secondary to-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
