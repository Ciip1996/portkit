"use client";

import { motion } from "framer-motion";
import { Wrench, ExternalLink } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import { useTranslation } from "@/lib/i18n";

export default function FreelanceSection() {
  const t = useTranslation();

  if (t.freelance.items.length === 0) return null;

  return (
    <section id="freelance" className="py-20 sm:py-24">
      <div className="container max-w-4xl px-6">
        <SectionHeader
          icon={Wrench}
          label={t.freelance.sectionLabel}
          heading={t.freelance.heading}
          subtitle={t.freelance.subtitle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {t.freelance.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-5 sm:p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors flex flex-col"
            >
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 text-[11px] rounded-full font-mono border border-primary/25 text-primary bg-primary/5 hover:bg-primary/15 hover:border-primary/50 hover:scale-105 transition-all duration-200 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  aria-label={`${t.freelance.visitAriaLabel} ${item.title}`}
                >
                  {t.freelance.visitAriaLabel}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
