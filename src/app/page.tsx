import React from "react";
import { HeroSection } from "../components/home/HeroSection";
import { AboutSection } from "../components/home/AboutSection";
import { SkillsSection } from "../components/home/SkillSection";
import { ProjectsSection } from "../components/home/ProjectSection";
import { ContactSection } from "../components/home/ContactSection";
import { WorkExperience } from "../components/home/WorkExperience";
import { Certifications } from "../components/home/Certifications";
import { Publications } from "../components/home/Publications";
import { References } from "../components/home/References";

export default function page() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <WorkExperience />
      <SkillsSection />
      <ProjectsSection />
      <Certifications />
      <Publications />
      <References />
      <ContactSection />
    </>
  );
}
