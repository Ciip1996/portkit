"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/navbar";
import HeroSection from "@/modules/hero";
import ContactSection from "@/modules/contact";
import Footer from "@/components/layout/footer";
import type { SectionId } from "@/lib/variants";
import type { ComponentType } from "react";

const ExperienceSection = dynamic(() => import("@/modules/experience"));
const SkillsSection = dynamic(() => import("@/modules/skills"));
const EducationSection = dynamic(() => import("@/modules/education"));
const ProjectsSection = dynamic(() => import("@/modules/projects"));
const FreelanceSection = dynamic(() => import("@/modules/freelance"));
const DemosSection = dynamic(() => import("@/modules/demos"));
const PressSection = dynamic(() => import("@/modules/press"));
const ContactPhoneSection = dynamic(() => import("@/modules/contact/contact-phone"));

const SECTION_MAP: Record<SectionId, ComponentType> = {
  hero: HeroSection,
  experience: ExperienceSection,
  skills: SkillsSection,
  education: EducationSection,
  projects: ProjectsSection,
  freelance: FreelanceSection,
  demos: DemosSection,
  press: PressSection,
  contact: ContactSection,
  "contact-phone": ContactPhoneSection,
};

interface VariantPageContentProps {
  sections: SectionId[];
}

export default function VariantPageContent({
  sections,
}: VariantPageContentProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar visibleSections={sections} />
      <main id="main-content">
        {sections.map((id) => {
          const Section = SECTION_MAP[id];
          return Section ? <Section key={id} /> : null;
        })}
      </main>
      <Footer />
    </div>
  );
}
