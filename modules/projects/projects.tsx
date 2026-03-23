"use client";

import { motion } from "framer-motion";
import { FolderGit2, ExternalLink, Github, MonitorPlay, Star, TrendingUp } from "lucide-react";
import Image from "next/image";
import SectionHeader from "@/components/ui/section-header";
import { useTranslation } from "@/lib/i18n";

const STATUS_STYLES = {
  "In Progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Completed: "bg-primary/10 text-primary border-primary/20",
  Archived: "bg-muted text-muted-foreground border-border",
} as const;

export default function ProjectsSection() {
  const t = useTranslation();

  const sorted = [...t.projects.items].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <section id="projects" className="py-20 sm:py-24 bg-card/50">
      <div className="container max-w-5xl px-6">
        <SectionHeader
          icon={FolderGit2}
          label={t.projects.sectionLabel}
          heading={t.projects.heading}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sorted.map((proj, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col rounded-xl border border-border bg-background hover:border-primary/30 transition-colors group overflow-hidden"
            >
              {/* Cover image */}
              {proj.image && (
                <div className="relative h-44 overflow-hidden bg-muted shrink-0">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
              )}

              <div className="flex flex-col flex-1 p-5 sm:p-6">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    {proj.featured && (
                      <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Star className="w-2.5 h-2.5" />
                        Featured
                      </span>
                    )}
                    <h3 className="text-base sm:text-lg font-semibold leading-tight truncate">
                      {proj.title}
                    </h3>
                  </div>

                  {/* Action links */}
                  <div className="flex items-center gap-1 shrink-0">
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
                        aria-label={`${t.projects.githubAriaLabel} ${proj.title}`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {proj.demo && (
                      <a
                        href={proj.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
                        aria-label={`${t.projects.demoAriaLabel} ${proj.title}`}
                      >
                        <MonitorPlay className="w-4 h-4" />
                      </a>
                    )}
                    {proj.link && !proj.demo && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
                        aria-label={`${t.projects.visitAriaLabel} ${proj.title}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Role + period + status */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <p className="text-primary text-sm font-medium">{proj.role}</p>
                  <span className="text-muted-foreground/40 text-xs">·</span>
                  <span className="text-muted-foreground text-xs">{proj.period}</span>
                  {proj.status && (
                    <>
                      <span className="text-muted-foreground/40 text-xs">·</span>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${STATUS_STYLES[proj.status]}`}
                      >
                        {proj.status}
                      </span>
                    </>
                  )}
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                  {proj.description}
                </p>

                {/* Metrics */}
                {proj.metrics && (
                  <div className="flex items-center gap-1.5 mb-4 text-xs text-primary/80 bg-primary/5 border border-primary/10 rounded-lg px-3 py-2">
                    <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-medium">{proj.metrics}</span>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs rounded-md bg-secondary text-secondary-foreground font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
