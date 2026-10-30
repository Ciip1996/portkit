"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import Timeline, { type TimelineEntry } from "@/components/ui/timeline";
import SectionHeader from "@/components/ui/section-header";
import { useTranslation } from "@/lib/i18n";
import { sortByMostRecent } from "@/lib/sort-by-date";

const INITIAL_COUNT = 3;

export default function ExperienceSection() {
  const t = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const allItems: TimelineEntry[] = useMemo(
    () =>
      // Most recent first, even if a job was added at the end from /admin.
      sortByMostRecent(t.experience.jobs).map((job) => ({
        type: "work" as const,
        title: job.title,
        subtitle: job.company,
        location: job.location,
        period: job.period,
        bullets: job.bullets,
        tags: job.tags,
        logo: job.logo,
        logoBg: job.logoBg,
      })),
    [t.experience.jobs],
  );

  const visibleItems = expanded ? allItems : allItems.slice(0, INITIAL_COUNT);
  const hasMore = allItems.length > INITIAL_COUNT;

  return (
    <section id="experience" className="py-20 sm:py-24 relative">
      <div className="container max-w-4xl px-6">
        <SectionHeader
          icon={Briefcase}
          label={t.experience.sectionLabel}
          heading={t.experience.heading}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={expanded ? "all" : "partial"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Timeline items={visibleItems} showYearMarkers />
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          {hasMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-muted-foreground text-sm font-medium hover:text-foreground hover:border-primary/30 transition-all"
            >
              {expanded ? (
                <>
                  Show less
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show {allItems.length - INITIAL_COUNT} more
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          )}
          <Link
            href="/timeline"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/30 text-primary text-sm font-medium hover:bg-primary/5 hover:border-primary/50 transition-all"
          >
            {t.experience.viewFullTimeline}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
