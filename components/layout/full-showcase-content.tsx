"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import HeroSection from "@/modules/hero";
import ContactSection from "@/modules/contact";
import Footer from "@/components/layout/footer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ALL_SECTIONS, BUILTIN_VARIANTS, type SectionId } from "@/lib/variants";
import type { ComponentType } from "react";

const ExperienceSection = dynamic(() => import("@/modules/experience"));
const SkillsSection = dynamic(() => import("@/modules/skills"));
const EducationSection = dynamic(() => import("@/modules/education"));
const ProjectsSection = dynamic(() => import("@/modules/projects"));
const FreelanceSection = dynamic(() => import("@/modules/freelance"));
const DemosSection = dynamic(() => import("@/modules/demos"));
const PressSection = dynamic(() => import("@/modules/press"));
const ContactPhoneSection = dynamic(
  () => import("@/modules/contact/contact-phone"),
);

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

const SECTION_LABEL_MAP: Record<string, string> = Object.fromEntries(
  ALL_SECTIONS.map((s) => [s.id, s.label]),
);

function SectionWrapper({
  id,
  selected,
  onToggle,
  children,
}: {
  id: SectionId;
  selected: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const label = SECTION_LABEL_MAP[id] ?? id;

  return (
    <div
      className={`relative group transition-all duration-300 ${
        selected ? "ring-2 ring-primary rounded-sm" : ""
      }`}
    >
      {/* Selection tint overlay */}
      {selected && (
        <div className="absolute inset-0 bg-primary/[0.03] pointer-events-none rounded-sm z-0" />
      )}
      {/* Module name badge + checkbox — pinned below the fixed navbar */}
      <div className="sticky top-16 z-30 flex items-center justify-between px-4 py-2 pointer-events-none">
        <span
          className={`pointer-events-auto inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm transition-colors duration-300 ${
            selected
              ? "bg-primary text-primary-foreground border border-primary"
              : "bg-card/90 border border-primary/30 text-primary"
          }`}
        >
          {selected && <Check className="w-3 h-3" strokeWidth={3} />}
          {label}
        </span>
        <button
          type="button"
          onClick={onToggle}
          aria-label={`${selected ? "Deselect" : "Select"} ${label}`}
          className={`pointer-events-auto w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-200 shadow-sm ${
            selected
              ? "bg-primary border-primary text-primary-foreground scale-110"
              : "bg-card/90 border-border backdrop-blur-sm hover:border-primary/60 hover:scale-105"
          }`}
        >
          {selected && <Check className="w-4 h-4" strokeWidth={3} />}
        </button>
      </div>

      {children}
    </div>
  );
}

export default function FullShowcaseContent() {
  const router = useRouter();
  const sections = BUILTIN_VARIANTS.full.sections;
  const [selected, setSelected] = useState<Set<SectionId>>(new Set());
  const [showConfirm, setShowConfirm] = useState(false);
  const [variantLabel, setVariantLabel] = useState("");

  const toggleSection = useCallback((id: SectionId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectedList = Array.from(selected);
  const count = selectedList.length;

  const handleConfirm = () => {
    const sectionsParam = selectedList.join(",");
    const labelParam = variantLabel.trim();
    const params = new URLSearchParams();
    params.set("sections", sectionsParam);
    if (labelParam) params.set("label", labelParam);
    router.push(`/admin?${params.toString()}`);
  };

  const openModal = () => {
    setVariantLabel("");
    setShowConfirm(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar visibleSections={sections} />
      <main id="main-content">
        {sections.map((id) => {
          const Section = SECTION_MAP[id];
          if (!Section) return null;
          return (
            <SectionWrapper
              key={id}
              id={id}
              selected={selected.has(id)}
              onToggle={() => toggleSection(id)}
            >
              <Section />
            </SectionWrapper>
          );
        })}
      </main>
      <Footer />

      {/* Floating action button */}
      <AnimatePresence>
        {count > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={openModal}
            className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Create Variant ({count})
          </motion.button>
        )}
      </AnimatePresence>

      {/* Confirmation modal */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Variant</DialogTitle>
            <DialogDescription>
              Review your selected modules and give the variant a name.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Variant Name
              </label>
              <input
                type="text"
                value={variantLabel}
                onChange={(e) => setVariantLabel(e.target.value)}
                placeholder="e.g. Microsoft Application"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Selected Modules ({count})
              </label>
              <div className="flex flex-wrap gap-1.5">
                {selectedList.map((id) => (
                  <span
                    key={id}
                    className="px-2.5 py-1 text-xs rounded-full font-mono border border-primary/30 text-primary bg-primary/5"
                  >
                    {SECTION_LABEL_MAP[id] ?? id}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <button
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={selectedList.length === 0}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Continue to Admin
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
