"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  BadgeCheck,
  Newspaper,
} from "lucide-react";
import { LOGOS } from "@/lib/logos";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type TimelineEntryType =
  | "work"
  | "education"
  | "award"
  | "certification"
  | "exchange"
  | "press";

export interface TimelineEntry {
  type: TimelineEntryType;
  typeLabel?: string;
  title: string;
  subtitle: string;
  location: string;
  period: string;
  description?: string;
  bullets?: string[];
  tags?: string[];
  logo?: string | null;
  logoBg?: string;
}

export interface TimelineProps {
  /** Ordered array of timeline entries (newest first). */
  items: TimelineEntry[];
  /** Show year labels on the left side of the timeline (default true). */
  showYearMarkers?: boolean;
  /** Show a coloured type badge above each entry title (default false). */
  showTypeIndicator?: boolean;
  /** Additional class names for the root element. */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const TYPE_ICONS: Record<
  TimelineEntryType,
  React.ComponentType<{ className?: string }>
> = {
  work: Briefcase,
  education: GraduationCap,
  award: Award,
  exchange: Globe,
  certification: BadgeCheck,
  press: Newspaper,
};

const TYPE_COLORS: Record<TimelineEntryType, string> = {
  work: "text-primary border-primary/25 bg-primary/5",
  education: "text-emerald-500 border-emerald-500/25 bg-emerald-500/5",
  award: "text-amber-500 border-amber-500/25 bg-amber-500/5",
  exchange: "text-sky-500 border-sky-500/25 bg-sky-500/5",
  certification: "text-violet-500 border-violet-500/25 bg-violet-500/5",
  press: "text-rose-500 border-rose-500/25 bg-rose-500/5",
};

const DOT_BORDER_COLORS: Record<TimelineEntryType, string> = {
  work: "border-primary",
  education: "border-emerald-500",
  award: "border-amber-500",
  exchange: "border-sky-500",
  certification: "border-violet-500",
  press: "border-rose-500",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function extractYear(period: string): string {
  const m = period.match(/\b(20\d{2})\b/);
  return m ? m[1] : "";
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Timeline({
  items,
  showYearMarkers = true,
  showTypeIndicator = false,
  className,
}: TimelineProps) {
  return (
    <div className={className}>
      <div className="relative">
        <div
          className="absolute left-[5px] sm:left-[47px] top-2 bottom-2 w-px bg-border"
          aria-hidden="true"
        />

        <ol
          className="space-y-6 sm:space-y-10 pl-6 sm:pl-[4.5rem] list-none"
          role="list"
        >
          {items.map((entry, i) => {
            const year = extractYear(entry.period);
            const prevYear =
              i > 0 ? extractYear(items[i - 1].period) : null;
            const isNewYear = showYearMarkers && year !== prevYear;
            const dotColor = showTypeIndicator
              ? DOT_BORDER_COLORS[entry.type]
              : "border-primary";

            return (
              <motion.li
                key={`${entry.subtitle}-${entry.period}-${i}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.06, 0.5) }}
                className="relative"
              >
                {/* Year marker */}
                {isNewYear && (
                  <>
                    <span
                      className="absolute -left-[4.5rem] top-[5px] w-9 text-right font-mono text-[13px] font-bold text-primary/60 tracking-wide hidden sm:block"
                      aria-hidden="true"
                    >
                      {year}
                    </span>
                    <span
                      className="block sm:hidden font-mono text-[11px] font-bold text-primary/60 tracking-wide mb-1.5 -ml-1"
                      aria-hidden="true"
                    >
                      {year}
                    </span>
                  </>
                )}

                {/* Timeline dot */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-1.5 w-[11px] h-[11px] sm:w-[15px] sm:h-[15px] rounded-full border-2 bg-background ${dotColor}`}
                  aria-hidden="true"
                />

                {/* Card */}
                <article className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                    <div className="flex items-start gap-3">
                      {entry.logo && LOGOS[entry.logo] && (
                        <div
                          className="shrink-0 mt-0.5 w-8 h-8 rounded-md overflow-hidden flex items-center justify-center shadow-[0_0_0_1px_hsl(var(--border))]"
                          style={{
                            background:
                              entry.logoBg ?? "hsl(var(--secondary))",
                          }}
                        >
                          {LOGOS[entry.logo]}
                        </div>
                      )}
                      <div>
                        {showTypeIndicator && entry.typeLabel && (
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 mb-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${TYPE_COLORS[entry.type]}`}
                          >
                            {React.createElement(TYPE_ICONS[entry.type], {
                              className: "w-3 h-3",
                            })}
                            {entry.typeLabel}
                          </span>
                        )}
                        <h3 className="text-base sm:text-lg font-semibold">
                          {entry.title}
                        </h3>
                        <p className="text-primary font-medium text-sm sm:text-base">
                          {entry.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground shrink-0 text-left sm:text-right">
                      <p>
                        <time dateTime={entry.period}>{entry.period}</time>
                      </p>
                      {entry.location && <p>{entry.location}</p>}
                    </div>
                  </div>

                  {entry.description && (
                    <p className="text-sm text-muted-foreground mb-3">
                      {entry.description}
                    </p>
                  )}

                  {entry.bullets && entry.bullets.length > 0 && (
                    <ul className="space-y-1.5">
                      {entry.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="text-sm text-muted-foreground flex items-baseline gap-2"
                        >
                          <span
                            className="text-primary shrink-0 leading-none"
                            aria-hidden="true"
                          >
                            ›
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border/50">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 text-[11px] rounded-full font-mono border border-primary/25 text-primary bg-primary/5 hover:bg-primary/15 hover:border-primary/50 hover:scale-105 transition-all duration-200 cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
