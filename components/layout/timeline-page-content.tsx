"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Sun, Moon, Monitor, Languages } from "lucide-react";
import Timeline, { type TimelineEntry, type TimelineEntryType } from "@/components/ui/timeline";
import Footer from "@/components/layout/footer";
import { useTheme } from "@/components/providers/theme-provider";
import { useLang } from "@/components/providers/language-provider";
import { useTranslation } from "@/lib/i18n";
import { sortByMostRecent } from "@/lib/sort-by-date";

const themeIcons = { system: Monitor, dark: Moon, light: Sun } as const;

type FilterKey = "all" | "work" | "education" | "milestones" | "press";

const FILTER_TYPES: Record<FilterKey, TimelineEntryType[] | null> = {
  all: null,
  work: ["work"],
  education: ["education", "exchange"],
  milestones: ["award", "certification"],
  press: ["press"],
};

export default function TimelinePageContent() {
  const t = useTranslation();
  const { theme, cycleTheme } = useTheme();
  const { lang, toggleLang } = useLang();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const ThemeIcon = themeIcons[theme];

  const allEntries: TimelineEntry[] = useMemo(
    () =>
      // Most recent first, even if an event was added at the end from /admin.
      sortByMostRecent(t.timelinePage.events).map((ev) => ({
        type: ev.type,
        typeLabel: t.timelinePage.typeLabels[ev.type],
        title: ev.title,
        subtitle: ev.subtitle,
        location: ev.location,
        period: ev.period,
        description: ev.description,
        bullets: ev.bullets,
        tags: ev.tags,
        logo: ev.logo,
        logoBg: ev.logoBg,
      })),
    [t],
  );

  const filteredEntries = useMemo(() => {
    const allowed = FILTER_TYPES[activeFilter];
    if (!allowed) return allEntries;
    return allEntries.filter((e) => allowed.includes(e.type));
  }, [allEntries, activeFilter]);

  const filterKeys: FilterKey[] = ["all", "work", "education", "milestones", "press"];

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-4 right-4 z-50 flex items-center gap-1 bg-background/80 backdrop-blur-lg rounded-full border border-border px-1 py-1 shadow-sm">
        <button
          onClick={toggleLang}
          className="flex items-center gap-1.5 px-2 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors text-xs font-mono font-medium"
          aria-label={t.nav.langLabel}
          title={lang === "en" ? "Cambiar a Español" : "Switch to English"}
        >
          <Languages className="w-4 h-4" />
          {t.nav.langLabel}
        </button>
        <button
          onClick={cycleTheme}
          className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          aria-label={`Theme: ${theme}`}
        >
          <ThemeIcon className="w-4 h-4" />
        </button>
      </div>

      <header className="pt-24 pb-12 sm:pt-28 sm:pb-16">
        <div className="container max-w-4xl px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.timelinePage.backToHome}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm font-mono tracking-widest text-primary uppercase">
                Timeline
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t.timelinePage.title}
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed">
              {t.timelinePage.subtitle}
            </p>
          </motion.div>
        </div>
      </header>

      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-4xl px-6 py-3">
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter timeline entries"
          >
            {filterKeys.map((key) => {
              const isActive = activeFilter === key;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="timeline-tabpanel"
                  onClick={() => setActiveFilter(key)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {t.timelinePage.filters[key]}
                  {key !== "all" && (
                    <span className="ml-1.5 text-xs opacity-70">
                      {
                        allEntries.filter((e) =>
                          FILTER_TYPES[key]!.includes(e.type),
                        ).length
                      }
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <main id="main-content" className="py-12 sm:py-16" role="tabpanel" aria-label="Timeline entries">
        <div id="timeline-tabpanel" className="container max-w-4xl px-6">
          <Timeline
            items={filteredEntries}
            showYearMarkers
            showTypeIndicator
          />

          {filteredEntries.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No entries found for this filter.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
