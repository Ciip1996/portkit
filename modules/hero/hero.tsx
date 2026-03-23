"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, ArrowDown } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import { portfolio } from "@/config/portfolio";

const { photos: PHOTOS, social } = portfolio;

const INTERVAL_MS = 5000;

export default function HeroSection() {
  const t = useTranslation();
  const [index, setIndex] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(
    () => setIndex((prev) => (prev + 1) % PHOTOS.length),
    [],
  );

  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(advance, INTERVAL_MS);
  }, [advance]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetTimer]);

  const handlePhotoClick = useCallback(() => {
    advance();
    resetTimer();
  }, [advance, resetTimer]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 glow-top pointer-events-none" />

      <div className="container max-w-5xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative shrink-0"
          >
            <button
              type="button"
              onClick={handlePhotoClick}
              className="w-40 h-40 md:w-[19rem] md:h-[19rem] rounded-full overflow-hidden ring-2 ring-primary/30 ring-offset-4 ring-offset-background relative cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
              aria-label="Next photo"
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={PHOTOS[index]}
                    alt={t.hero.imgAlt}
                    width={304}
                    height={304}
                    priority={index === 0}
                    draggable={false}
                    className="w-full h-full object-cover object-top select-none pointer-events-none"
                    sizes="(max-width: 768px) 160px, 304px"
                  />
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Progress dots */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
              {PHOTOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "bg-primary w-4"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>

            <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-primary animate-pulse" aria-hidden="true" />
          </motion.div>

          <div className="text-center md:text-left mt-4 md:mt-0">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm font-mono tracking-widest text-primary uppercase mb-3"
            >
              {t.hero.subtitle}
            </motion.p>
            <motion.h1
              id="hero-name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4"
            >
              {t.hero.firstName}{" "}
              <span className="text-gradient">{t.hero.lastName}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-base sm:text-lg max-w-xl leading-relaxed mb-6"
            >
              {t.hero.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground text-sm mb-6"
            >
              <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>{t.hero.location}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center md:justify-start gap-3 flex-wrap"
            >
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={social.email}
                className="p-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#contact"
                className="ml-1 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <ArrowDown className="w-4 h-4" />
                {t.hero.cta}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-5 h-8 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
