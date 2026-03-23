"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon: LucideIcon;
  label: string;
  heading: string;
  subtitle?: string;
}

export default function SectionHeader({
  icon: Icon,
  label,
  heading,
  subtitle,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-14"
    >
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
        <span className="text-sm font-mono tracking-widest text-primary uppercase">
          {label}
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold">{heading}</h2>
      {subtitle && (
        <p className="text-muted-foreground mt-3 max-w-2xl">{subtitle}</p>
      )}
    </motion.div>
  );
}
