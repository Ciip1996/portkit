"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Monitor, Languages } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { useLang } from "@/components/providers/language-provider";
import { useTranslation } from "@/lib/i18n";
import type { SectionId } from "@/lib/variants";

const themeIcons = {
  system: Monitor,
  dark: Moon,
  light: Sun,
} as const;
const themeLabels = {
  system: "System theme",
  dark: "Dark theme",
  light: "Light theme",
} as const;

const SECTION_HREF: Record<SectionId, string> = {
  hero: "#",
  experience: "#experience",
  skills: "#skills",
  education: "#education",
  projects: "#projects",
  freelance: "#freelance",
  demos: "#demos",
  press: "#press",
  contact: "#contact",
  "contact-phone": "#contact",
};

interface NavbarProps {
  visibleSections?: SectionId[];
}

export default function Navbar({ visibleSections }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [showName, setShowName] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, cycleTheme } = useTheme();
  const { lang, toggleLang } = useLang();
  const t = useTranslation();

  const allNavItems = useMemo(
    () => [
      { label: t.nav.experience, href: "#experience", section: "experience" as SectionId },
      { label: t.nav.skills, href: "#skills", section: "skills" as SectionId },
      { label: t.nav.education, href: "#education", section: "education" as SectionId },
      { label: t.nav.projects, href: "#projects", section: "projects" as SectionId },
      { label: t.nav.demos, href: "#demos", section: "demos" as SectionId },
      { label: t.nav.contact, href: "#contact", section: "contact" as SectionId },
      { label: t.nav.timeline, href: "/timeline", isPage: true, section: undefined },
    ],
    [t],
  );

  const navItems = useMemo(() => {
    if (!visibleSections) return allNavItems;
    return allNavItems.filter(
      (item) =>
        !item.section ||
        visibleSections.some(
          (s) => s === item.section || s.startsWith(`${item.section}-`),
        ),
    );
  }, [allNavItems, visibleSections]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const heroName = document.getElementById("hero-name");
    if (!heroName) {
      setShowName(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setShowName(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(heroName);
    return () => observer.disconnect();
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("nav")) closeMobile();
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [mobileOpen, closeMobile]);

  const ThemeIcon = themeIcons[theme];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : ""
      }`}
    >
      <div className="container max-w-5xl px-6 flex items-center justify-between h-16">
        <a href="#" className="font-bold text-lg tracking-tight overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {showName ? (
              <motion.span
                key="full"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                Ivan <span className="text-primary">Pacheco</span>
              </motion.span>
            ) : (
              <motion.span
                key="short"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                IP<span className="text-primary">.</span>
              </motion.span>
            )}
          </AnimatePresence>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.isPage ? (
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors text-xs font-mono font-medium"
              aria-label={t.nav.langLabel}
              title={lang === "en" ? "Cambiar a Español" : "Switch to English"}
            >
              <Languages className="w-4 h-4" />
              {t.nav.langLabel}
            </button>
            <button
              onClick={cycleTheme}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label={themeLabels[theme]}
              title={themeLabels[theme]}
            >
              <ThemeIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors text-xs font-mono font-medium"
            aria-label={t.nav.langLabel}
          >
            <Languages className="w-4 h-4" />
            {t.nav.langLabel}
          </button>
          <button
            onClick={cycleTheme}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={themeLabels[theme]}
          >
            <ThemeIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-muted-foreground hover:text-foreground"
            aria-label={t.nav.toggleMenu}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border overflow-hidden"
          >
            <ul className="px-6 py-4 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  {item.isPage ? (
                    <Link
                      href={item.href}
                      onClick={closeMobile}
                      className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={closeMobile}
                      className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
