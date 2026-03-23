export type SectionId =
  | "hero"
  | "experience"
  | "skills"
  | "education"
  | "projects"
  | "freelance"
  | "demos"
  | "press"
  | "contact"
  | "contact-phone";

export interface VariantConfig {
  slug: string;
  label: string;
  sections: SectionId[];
  protected: boolean;
}

export const BUILTIN_VARIANTS: Record<string, VariantConfig> = {
  general: {
    slug: "general",
    label: "General",
    sections: ["hero", "experience", "skills", "education", "demos", "press", "contact"],
    protected: false,
  },
  full: {
    slug: "full",
    label: "Full Portfolio",
    sections: [
      "hero",
      "experience",
      "skills",
      "education",
      "projects",
      "freelance",
      "demos",
      "press",
      "contact-phone",
    ],
    protected: true,
  },
};

export const ALL_SECTIONS: { id: SectionId; label: string }[] = [
  { id: "hero", label: "Hero / Profile" },
  { id: "experience", label: "Work Experience" },
  { id: "skills", label: "Skills & Technologies" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Contractor Projects" },
  { id: "freelance", label: "Freelance Projects" },
  { id: "demos", label: "Work Demos" },
  { id: "press", label: "In the Media" },
  { id: "contact", label: "Contact" },
  { id: "contact-phone", label: "Contact (with phone)" },
];
