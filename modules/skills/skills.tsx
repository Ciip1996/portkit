"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, ChevronDown } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import { useTranslation } from "@/lib/i18n";

export default function SkillsSection() {
  const t = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) =>
    setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section id="skills" className="py-20 sm:py-24 bg-card/50">
      <div className="container max-w-4xl px-6">
        <SectionHeader
          icon={Code2}
          label={t.skills.sectionLabel}
          heading={t.skills.heading}
        />

        <div className="space-y-2">
          {t.skills.categories.map((cat, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border bg-background overflow-hidden"
                onMouseEnter={() => setOpenIndex(i)}
                onMouseLeave={() => setOpenIndex(null)}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-mono tracking-wider text-primary">
                      {cat.label}
                    </h3>
                    <span className="text-xs text-muted-foreground font-mono">
                      {cat.skills.length}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 flex flex-wrap gap-2">
                        {cat.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 text-sm rounded-md bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
