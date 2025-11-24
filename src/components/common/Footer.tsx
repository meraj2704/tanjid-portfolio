"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Github, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const links = [
    { href: "/#about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/services", label: "Services" },
    { href: "/#contact", label: "Contact" },
  ];

  const socialLinks = [
    {
      icon: <Mail className="h-4 w-4" />,
      href: "mailto:merajhossain15901@gmail.com",
      label: "Email",
    },
    {
      icon: <Github className="h-4 w-4" />,
      href: "https://github.com/meraj2704",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="h-4 w-4" />,
      href: "https://www.linkedin.com/in/meraj-hossain-6566b8231/",
      label: "LinkedIn",
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6 }}
      className="relative w-full py-8 px-4 md:px-6 border-t border-border/50 bg-background/80 backdrop-blur-sm"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-muted-foreground"
          >
            &copy; {currentYear}{" "}
            <span className="text-accent-primary">Meraj Hossain</span>. All
            rights reserved.
          </motion.p>

          {/* Navigation */}
          <motion.nav
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          >
            {links.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <Link
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-accent-primary transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-accent-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.label}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  type: "spring",
                  delay: 0.5 + index * 0.1,
                  stiffness: 300,
                  damping: 10,
                }}
                whileHover={{ y: -3, scale: 1.1 }}
              >
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-8 w-8 rounded-full border border-border/50 bg-background text-muted-foreground hover:text-accent-primary hover:border-accent-primary/50 hover:shadow-[0_0_10px_rgba(18,247,214,0.2)] transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Decorative element */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </div>
    </motion.footer>
  );
}
