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
// Social links (Instagram, TikTok). Shown unless turned off in /admin → Social.
const SocialSection = dynamic(() => import("@/modules/social"));

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
  const socialAnchor = sections.find((id) => id === "contact" || id === "contact-phone");

  return (
    <div className="min-h-screen bg-background">
      <Navbar visibleSections={sections} />
      <main id="main-content">
        {sections.map((id) => {
          const Section = SECTION_MAP[id];
          if (!Section) return null;
          // The social block sits just above the contact section.
          if (id === socialAnchor) {
            return [<SocialSection key="social" />, <Section key={id} />];
          }
          return <Section key={id} />;
        })}
        {!socialAnchor && <SocialSection />}
      </main>
      <Footer />
    </div>
  );
}
