"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Languages } from "lucide-react";
import DiplomaGallery from "./diploma-gallery";
import SectionHeader from "@/components/ui/section-header";
import { useTranslation } from "@/lib/i18n";
import { LOGOS, LogoImage } from "@/lib/logos";

export default function EducationSection() {
  const t = useTranslation();

  return (
    <section id="education" className="py-20 sm:py-24">
      <div className="container max-w-4xl px-6">
        <SectionHeader
          icon={GraduationCap}
          label={t.education.sectionLabel}
          heading={t.education.heading}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {t.education.schools.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 sm:p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors flex gap-4 items-start"
            >
              {edu.logo && (
                <div
                  className="w-14 h-14 shrink-0 rounded-xl overflow-hidden flex items-center justify-center shadow-[0_0_0_1px_hsl(var(--border))]"
                  style={{ background: edu.logoBg ?? "hsl(var(--secondary))" }}
                >
                  <LogoImage
                    src={`/logos/${edu.logo}.png`}
                    alt={edu.school}
                    className="w-9 h-9"
                  />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs font-mono text-muted-foreground mb-1">
                  {edu.location}
                </p>
                <h3 className="font-semibold text-base sm:text-lg mb-0.5">
                  {edu.school}
                </h3>
                <p className="text-primary text-sm font-medium mb-0.5">
                  {edu.degree}
                </p>
                <p className="text-muted-foreground text-sm">{edu.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-5 sm:p-6 rounded-xl border border-primary/20 bg-primary/5 flex gap-4 items-start"
        >
          <Award className="w-8 h-8 text-primary shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-1">
              {t.education.award.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-1">
              {t.education.award.org}
            </p>
            <p className="text-muted-foreground text-sm">
              {t.education.award.description}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 p-5 sm:p-6 rounded-xl border border-border bg-card flex gap-4 items-start"
        >
          <Languages className="w-6 h-6 text-primary shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-base mb-1">
              {t.education.languagesHeading}
            </h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              {t.education.languages.map((lang) => (
                <p key={lang.name}>
                  <span className="text-foreground font-medium">
                    {lang.name}
                  </span>{" "}
                  — {lang.detail}
                </p>
              ))}
            </div>
          </div>
        </motion.div>

        <DiplomaGallery />
      </div>
    </section>
  );
}
