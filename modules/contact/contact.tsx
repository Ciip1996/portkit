"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Phone, Globe } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface ContactSectionProps {
  showPhone?: boolean;
}

export default function ContactSection({ showPhone = false }: ContactSectionProps) {
  const t = useTranslation();
  const { email, phone, github, linkedin, website } = t.profile;

  const baseLinks = [
    {
      icon: Mail,
      label: email,
      href: email.startsWith("mailto:") ? email : `mailto:${email}`,
    },
    {
      icon: Linkedin,
      label: linkedin.replace(/^https?:\/\/(www\.)?/, ""),
      href: linkedin,
    },
    {
      icon: Github,
      label: github.replace(/^https?:\/\//, ""),
      href: github,
    },
    {
      icon: Globe,
      label: website.replace(/^https?:\/\//, ""),
      href: website,
    },
  ];

  const phoneLink = {
    icon: Phone,
    label: phone,
    href: `tel:${phone.replace(/\s+/g, "")}`,
  };

  const links = showPhone
    ? [baseLinks[0], phoneLink, ...baseLinks.slice(1)]
    : baseLinks;

  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="container max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-mono tracking-widest text-primary uppercase">
            {t.contact.sectionLabel}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            {t.contact.heading}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          {links.map(({ icon: Icon, label, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-secondary transition-colors group min-w-0 cursor-pointer"
            >
              <Icon className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors truncate">
                {label}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
