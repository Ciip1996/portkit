"use client";

import { motion } from "framer-motion";
import { AtSign, ArrowUpRight } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import SectionHeader from "@/components/ui/section-header";
import { useTranslation } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/types";

type Platform = Dictionary["social"]["links"][number]["platform"];

/* Brand marks are drawn inline (lucide no longer ships brand icons). */

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19.6 6.7a4.8 4.8 0 0 1-3.8-4.2V2h-3.4v13.4a2.9 2.9 0 0 1-5.2 1.7 2.9 2.9 0 0 1 3.2-4.5V9.1a6.3 6.3 0 0 0-5.4 10.6 6.3 6.3 0 0 0 10.8-4.4V8.6a8.2 8.2 0 0 0 4.8 1.5V6.7z" />
    </svg>
  );
}

const PLATFORM_META: Record<Platform, { name: string; Icon: ComponentType<{ className?: string }> }> = {
  instagram: { name: "Instagram", Icon: InstagramIcon },
  tiktok: { name: "TikTok", Icon: TikTokIcon },
  youtube: { name: "YouTube", Icon: AtSign },
  x: { name: "X", Icon: AtSign },
  other: { name: "Social", Icon: AtSign },
};

export default function SocialSection() {
  const t = useTranslation();
  const social = t.social;

  // Hidden from /admin, or nothing to show.
  const links = social?.links?.filter((l) => l.url) ?? [];
  if (!social?.enabled || links.length === 0) return null;

  return (
    <section id="social" className="py-20 sm:py-24">
      <div className="container max-w-4xl px-6">
        <SectionHeader
          icon={AtSign}
          label={social.sectionLabel}
          heading={social.heading}
          subtitle={social.subtitle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {links.map((link, i) => {
            const meta = PLATFORM_META[link.platform] ?? PLATFORM_META.other;
            const { Icon } = meta;
            return (
              <motion.a
                key={`${link.platform}-${link.handle}`}
                href={link.url}
                target="_blank"
                // rel="me" tells search engines and IndieAuth this profile belongs to the site owner.
                rel="me noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-secondary transition-colors min-w-0"
                aria-label={`${meta.name}: ${link.handle}`}
              >
                <span className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary/10 text-primary shrink-0">
                  <Icon className="w-5 h-5" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      {meta.name}
                    </span>
                  </span>
                  <span className="block font-semibold truncate">{link.handle}</span>
                  {link.description && (
                    <span className="block text-sm text-muted-foreground mt-1">{link.description}</span>
                  )}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary shrink-0 self-center">
                  {social.followLabel}
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
