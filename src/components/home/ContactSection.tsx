"use client";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  Github,
  Linkedin,
  Send,
  Sparkles,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

export function ContactSection() {
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data: any) => {
    console.log("Form submitted:", data);

    // Animation for submit button
    await controls.start({
      y: -10,
      transition: { type: "spring", stiffness: 300 },
    });

    setIsSubmitted(true);
    reset();

    // Reset animation after delay
    setTimeout(() => {
      controls.start({ y: 0 });
      setIsSubmitted(false);
    }, 3000);
  };

  const socialLinks = [
    {
      icon: <Mail className="h-5 w-5" />,
      href: "mailto:merajhossain15901@gmail.com",
      label: "Email",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com/meraj2704",
      label: "GitHub",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/in/meraj-hossain-6566b8231/",
      label: "LinkedIn",
      color: "from-blue-600 to-blue-700",
    },
  ];

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "merajhossain15901@gmail.com",
      link: "mailto:merajhossain15901@gmail.com",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      value: "01684088348",
      link: "tel:01684088348",
    }
  ];

  return (
    <motion.section
      ref={sectionRef}
      id="contact"
      className="w-full py-20 md:py-32 overflow-hidden relative bg-gradient-to-b from-background to-muted/20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.8 }}
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
          <MessageCircle size={48} />
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
          <Mail size={48} />
        </motion.div>
      </div>

      <div className="container px-4 md:px-6 max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center rounded-full bg-primary/5 px-4 py-2 text-sm font-medium text-primary mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            Get In Touch
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Let's Connect
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? I'd love to hear
            from you!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact methods */}
          <motion.div
            className="space-y-8"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-foreground to-accent-primary bg-clip-text text-transparent">
              Direct Contact
            </h3>

            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card/80 backdrop-blur-md border border-border/50 hover:border-accent-primary/30 transition-all group"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="p-3 rounded-full bg-accent-primary/10 text-accent-primary group-hover:scale-110 transition-transform">
                    {method.icon}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {method.title}
                    </p>
                    <Link
                      href={method.link}
                      className="text-muted-foreground hover:text-accent-primary transition-colors"
                    >
                      {method.value}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <div className="pt-4">
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                Follow me
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.1 }}
                  >
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r ${link.color} text-background hover:shadow-lg transition-all`}
                    >
                      {link.icon}
                      <span className="sr-only">{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 p-6 rounded-2xl bg-card/80 backdrop-blur-md border border-border/50"
            >
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-center"
                  >
                    Thank you! Your message has been sent successfully.
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                <div>
                  <Input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="Your Name"
                    className="bg-background/50 border-border/50 h-12 px-4 text-foreground placeholder:text-muted-foreground hover:border-accent-primary/50 focus:border-accent-primary transition-all"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      Name is required
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    type="email"
                    placeholder="Your Email"
                    className="bg-background/50 border-border/50 h-12 px-4 text-foreground placeholder:text-muted-foreground hover:border-accent-primary/50 focus:border-accent-primary transition-all"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      Valid email is required
                    </p>
                  )}
                </div>

                <div>
                  <Textarea
                    {...register("message", { required: true })}
                    placeholder="Your Message"
                    rows={5}
                    className="bg-background/50 border-border/50 px-4 py-3 text-foreground placeholder:text-muted-foreground hover:border-accent-primary/50 focus:border-accent-primary transition-all"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      Message is required
                    </p>
                  )}
                </div>
              </div>

              <motion.button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-accent-primary to-accent-secondary text-background font-medium rounded-xl hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
                animate={controls}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  Send Message
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-secondary to-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
