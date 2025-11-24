"use client";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import {
  Quote,
  ExternalLink,
  Calendar,
  ChevronDown,
  ChevronUp,
  Sparkles,
  User,
  Building,
  Mail,
  Linkedin,
  MapPin,
  Network,
  MessageCircle,
  Star,
  SparkleIcon,
} from "lucide-react";

// Reference data
const references = [
  {
    id: 1,
    name: "Syed Maruful Huq",
    title: "Assistant Professor",
    company: "Northern University Bangladesh",
    relationship: "Academic Mentor & Professor",
    contact: "maruful@gmail.com",
    linkedin: null, // add if available
    location: "Dhaka, Bangladesh",
    testimonial:
      "Guided me throughout my academic journey with valuable mentorship and encouragement. His support played a vital role in shaping my foundation in Computer Science and problem-solving mindset.",
    projects: "Undergraduate & Research Guidance",
    strengths: [
      "Academic Guidance",
      "Problem Solving",
      "Research Mentorship",
      "Technical Knowledge",
    ],
    rating: 5,
    avatarColor: "from-emerald-500 to-teal-500",
  },
  {
    id: 2,
    name: "Mahfuz Islam",
    title: "Team Lead",
    company: "ATI Limited",
    relationship: "Direct Supervisor & Team Lead",
    contact: null, // add if you want his email/phone
    linkedin: "https://www.linkedin.com/in/mahfuz-islam1695/", // add if available
    location: "Dhaka, Bangladesh",
    testimonial:
      "As my team lead, Mahfuz bhai has been instrumental in improving my development skills. His expertise in full stack development and leadership qualities created a highly collaborative work environment where I learned industry best practices.",
    projects: "ATI Limited Projects (Web Applications & APIs)",
    strengths: [
      "Full Stack Development",
      "Leadership",
      "Teamwork",
      "Mentorship",
    ],
    rating: 5,
    avatarColor: "from-blue-500 to-cyan-500",
  },
];

export function References() {
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

  // Generate stars for rating
  const renderStars = (count: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < count
            ? "fill-yellow-400 text-yellow-400"
            : "text-muted-foreground/30"
        }`}
      />
    ));
  };

  return (
    <motion.section
      ref={sectionRef}
      id="references"
      className="w-full py-20 md:py-32 overflow-hidden relative bg-gradient-to-b from-background to-muted/10"
      style={{ opacity, scale }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-50px" }}
      variants={containerVariants}
    >
      {/* Animated background elements - Different from other sections */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <motion.path
            d="M10,50 Q25,30 40,50 T70,50 T90,30"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="text-primary/5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.path
            d="M10,30 Q35,70 50,30 T80,70 T90,50"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="text-primary/5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>

        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-amber-500/3 blur-3xl"
          animate={{
            x: [0, 15, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full bg-indigo-500/3 blur-3xl"
          animate={{
            x: [0, -15, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Dot grid pattern - different from line grid in other sections */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,#80808012_1px,transparent_1px)] bg-[size:20px_20px] opacity-30" />
      </div>

      <div className="container px-4 md:px-6 max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={itemVariants}
        >
          <div className="inline-flex items-center justify-center rounded-full bg-primary/5 px-4 py-2 text-sm font-medium text-primary mb-4">
            <Network className="h-4 w-4 mr-2" />
            Professional Network
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Reference Nexus
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A curated network of professionals who have directly engaged with my
            work and character
          </p>
        </motion.div>

        {/* References grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {references.map((ref) => (
            <motion.div key={ref.id} variants={itemVariants} className="h-full">
              {/* Reference card with unique connection node design */}
              <motion.div
                className="bg-card/80 backdrop-blur-md border border-border/40 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden h-full flex flex-col"
                whileHover={{ y: -6 }}
                onClick={() => toggleExpand(ref.id)}
              >
                {/* Connection node indicator */}
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-green-400/80 group-hover:animate-ping"></div>

                {/* Avatar placeholder with gradient */}
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${ref.avatarColor} flex items-center justify-center text-white shadow-lg mb-6`}
                >
                  <User className="h-8 w-8" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold group-hover:text-accent-primary transition-colors">
                      {ref.name}
                    </h3>
                    <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted flex-shrink-0 ml-2">
                      {expandedId === ref.id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <div className="mb-3">
                    <p className="font-medium text-foreground/90">
                      {ref.title}
                    </p>
                    <p className="text-muted-foreground flex items-center">
                      <Building className="h-3.5 w-3.5 mr-1" />
                      {ref.company}
                    </p>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span>{ref.location}</span>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground italic line-clamp-3">
                      "{ref.testimonial}"
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-5">
                    <div className="flex mr-2">{renderStars(ref.rating)}</div>
                    <span className="text-xs text-muted-foreground">
                      {ref.rating}/5
                    </span>
                  </div>

                  {/* Relationship badge */}
                  <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
                    {ref.relationship}
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedId === ref.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="mt-6 overflow-hidden border-t border-border/30 pt-4"
                    >
                      <h4 className="font-semibold mb-3 text-foreground flex items-center">
                        <SparkleIcon className="h-4 w-4 mr-2 text-accent-primary" />
                        Key Strengths Observed
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {ref.strengths.map((strength, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="px-2.5 py-1 text-xs font-medium bg-muted/50 rounded-full text-muted-foreground"
                          >
                            {strength}
                          </motion.span>
                        ))}
                      </div>

                      <h4 className="font-semibold mb-2 text-foreground flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-accent-primary" />
                        Collaboration Context
                      </h4>
                      <p className="text-muted-foreground text-sm mb-4">
                        {ref.projects}
                      </p>

                      <h4 className="font-semibold mb-2 text-foreground flex items-center">
                        <MessageCircle className="h-4 w-4 mr-2 text-accent-primary" />
                        Contact
                      </h4>
                      <div className="flex flex-col gap-2 text-sm">
                        <motion.a
                          href={`mailto:${ref.contact}`}
                          className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                          whileHover={{ x: 4 }}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          {ref.contact}
                        </motion.a>
                        <motion.a
                          href={ref.linkedin || ""}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                          whileHover={{ x: 4 }}
                        >
                          <Linkedin className="h-4 w-4 mr-2" />
                          LinkedIn Profile
                        </motion.a>
                      </div>
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
            Want to connect with my professional network?
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary text-background font-medium hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Request Introduction</span>
            <ExternalLink className="ml-2 h-4 w-4 relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent-secondary to-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
