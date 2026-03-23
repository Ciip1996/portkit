"use client";

import { useMemo, useRef, useCallback, useEffect } from "react";
import { Newspaper, ExternalLink } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import { useTranslation } from "@/lib/i18n";
import styles from "./press.module.css";

const GAP_PX = 48;
const CARD_WIDTH = 340;
const DURATION_PER_ITEM_S = 4;

const ROTATIONS = [-2.2, 1.4, -0.8, 2, -1.5];

export default function PressSection() {
  const t = useTranslation();
  const items = t.press.items;
  const carouselRef = useRef<HTMLDivElement>(null);

  const singleSetWidth = useMemo(
    () => items.length * (CARD_WIDTH + GAP_PX),
    [items.length],
  );

  const duration = items.length * DURATION_PER_ITEM_S;

  const uniqueSources = useMemo(
    () => [...new Set(items.map((item) => item.source))],
    [items],
  );

  const collapse = useCallback(() => {
    carouselRef.current?.classList.remove(styles.modalOpen);
    document.body.style.overflow = "";
    if (
      document.activeElement instanceof HTMLElement &&
      document.activeElement.closest(`.${styles.card}`)
    ) {
      document.activeElement.blur();
    }
  }, []);

  const handleCardClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if ((e.target as HTMLElement).closest("a")) return;
      const el = e.currentTarget;
      const isOpen = document.activeElement === el;
      if (isOpen) {
        collapse();
      } else {
        carouselRef.current?.classList.add(styles.modalOpen);
        document.body.style.overflow = "hidden";
        el.focus();
      }
    },
    [collapse],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") collapse();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [collapse]);

  if (items.length === 0) return null;

  const loopedItems = [...items, ...items, ...items];

  return (
    <section id="press" className="py-20 sm:py-24">
      <div className="container max-w-4xl px-6">
        <SectionHeader
          icon={Newspaper}
          label={t.press.sectionLabel}
          heading={t.press.heading}
          subtitle={t.press.subtitle}
        />

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 -mt-6 mb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            {t.press.featuredIn}
          </span>
          {uniqueSources.map((source, i) => (
            <span key={source} className="flex items-center gap-6">
              <span className="text-sm sm:text-base font-semibold italic text-foreground/80 font-serif">
                {source}
              </span>
              {i < uniqueSources.length - 1 && (
                <span className="text-muted-foreground/40 text-lg" aria-hidden="true">·</span>
              )}
            </span>
          ))}
        </div>
      </div>

      <div
        ref={carouselRef}
        className={`${styles.carousel} group/carousel overflow-x-clip overflow-y-visible py-8 select-none`}
        role="region"
        aria-label={t.press.heading}
      >
        <div
          className={`${styles.scrollTrack} flex will-change-transform animate-press-scroll group-hover/carousel:[animation-play-state:paused]`}
          style={{
            gap: `${GAP_PX}px`,
            paddingLeft: 24,
            paddingRight: 24,
            "--scroll-distance": `-${singleSetWidth}px`,
            "--scroll-duration": `${duration}s`,
          } as React.CSSProperties}
        >
          {loopedItems.map((item, i) => (
            <article
              key={`${item.title}-${i}`}
              className={`${styles.card} shrink-0 rounded-lg border p-5 flex flex-col transition-all duration-300 ease-out origin-center relative overflow-hidden`}
              style={{
                width: CARD_WIDTH,
                transform: `rotate(${ROTATIONS[i % ROTATIONS.length]}deg)`,
                backgroundColor: "hsl(var(--press-bg))",
                borderColor: "hsl(var(--press-border))",
                boxShadow: "2px 3px 12px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.06)",
              }}
              tabIndex={0}
              onClick={handleCardClick}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  collapse();
                }
              }}
            >
              <span
                className="absolute -top-4 -left-2 text-[120px] font-serif leading-none pointer-events-none select-none"
                style={{ color: "hsl(var(--press-quote) / 0.35)" }}
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <div className="relative z-10 flex flex-col h-full">
                <p
                  className={`${styles.cardSource} text-base font-bold uppercase tracking-wide mb-1`}
                  style={{ color: "hsl(var(--press-fg))" }}
                >
                  {item.source}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`${styles.cardDate} text-xs`}
                    style={{ color: "hsl(var(--press-muted))" }}
                  >
                    <time dateTime={item.date}>{item.date}</time>
                  </span>
                  {item.lang && (
                    <span
                      className={`${styles.cardLang} px-1.5 py-0.5 text-[11px] font-mono font-semibold rounded`}
                      style={{
                        color: "hsl(var(--press-muted))",
                        border: "1px solid hsl(var(--press-border))",
                      }}
                    >
                      {item.lang}
                    </span>
                  )}
                </div>

                <h3
                  className={`${styles.cardTitle} text-sm font-semibold leading-snug line-clamp-3 mb-2 flex-1 font-serif italic`}
                  style={{ color: "hsl(var(--press-fg))" }}
                >
                  {item.title}
                </h3>

                <p
                  className={`${styles.cardExcerpt} text-xs line-clamp-3 mb-3 leading-relaxed`}
                  style={{ color: "hsl(var(--press-muted))" }}
                >
                  {item.excerpt}
                </p>

                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.cardLink} inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline mt-auto`}
                  >
                    {t.press.readArticle}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
