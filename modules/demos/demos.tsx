"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Maximize2,
  X,
  MonitorPlay,
  Volume2,
  VolumeX,
} from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import { useTranslation } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n";

function VideoPlayer({
  src,
  poster,
  onRequestFullscreen,
  labels,
}: {
  src: string;
  poster: string;
  onRequestFullscreen: () => void;
  labels: Dictionary["demos"];
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
      setHasStarted(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden bg-black aspect-video">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={muted}
        playsInline
        preload="none"
        onEnded={() => setPlaying(false)}
        onClick={togglePlay}
        className="w-full h-full object-contain cursor-pointer"
      />

      {!hasStarted && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity"
          aria-label={labels.playVideo}
        >
          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm">
            <Play className="w-7 h-7 text-primary-foreground ml-1" />
          </div>
        </button>
      )}

      {hasStarted && (
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
            aria-label={playing ? labels.pause : labels.play}
          >
            {playing ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white ml-0.5" />
            )}
          </button>
          <button
            onClick={toggleMute}
            className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
            aria-label={muted ? labels.unmute : labels.mute}
          >
            {muted ? (
              <VolumeX className="w-4 h-4 text-white" />
            ) : (
              <Volume2 className="w-4 h-4 text-white" />
            )}
          </button>
          <div className="flex-1" />
          <button
            onClick={onRequestFullscreen}
            className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
            aria-label={labels.fullscreen}
          >
            <Maximize2 className="w-4 h-4 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}

function FullscreenViewer({
  src,
  poster,
  open,
  onClose,
  closeLabel,
}: {
  src: string;
  poster: string;
  open: boolean;
  onClose: () => void;
  closeLabel: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.addEventListener("keydown", handleKeyDown);
      requestAnimationFrame(() => closeRef.current?.focus());
      return () => document.removeEventListener("keydown", handleKeyDown);
    } else {
      previousFocusRef.current?.focus();
    }
  }, [open, handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={onClose}
        >
          <button
            ref={closeRef}
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            aria-label={closeLabel}
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div
            className="w-full max-w-6xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              controls
              autoPlay
              playsInline
              className="w-full rounded-lg"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function DemosSection() {
  const t = useTranslation();
  const [fullscreenVideo, setFullscreenVideo] = useState<{
    src: string;
    poster: string;
  } | null>(null);

  return (
    <section id="demos" className="py-20 sm:py-24">
      <div className="container max-w-4xl px-6">
        <SectionHeader
          icon={MonitorPlay}
          label={t.demos.sectionLabel}
          heading={t.demos.heading}
          subtitle={t.demos.subtitle}
        />
      </div>

      {/* Mobile: stacked cards. Desktop: horizontal scroll */}
      <div className="md:overflow-x-auto md:scrollbar-none">
        <div className="container max-w-4xl px-6 md:max-w-none md:px-0">
          <div className="space-y-8 md:space-y-0 md:flex md:gap-6 md:px-[max(1.5rem,calc((100vw-56rem)/2))]">
            {t.demos.items.map((demo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-colors md:min-w-[420px] md:max-w-[420px] md:shrink-0"
              >
                <VideoPlayer
                  src={demo.video}
                  poster={demo.poster}
                  onRequestFullscreen={() =>
                    setFullscreenVideo({
                      src: demo.video,
                      poster: demo.poster,
                    })
                  }
                  labels={t.demos}
                />
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold">
                        {demo.title}
                      </h3>
                      <p className="text-primary text-sm font-medium">
                        {demo.company} &middot; {demo.period}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground shrink-0 px-2 py-1 rounded-md bg-secondary">
                      {demo.duration}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {demo.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {demo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs rounded-md bg-secondary text-secondary-foreground font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <FullscreenViewer
        src={fullscreenVideo?.src ?? ""}
        poster={fullscreenVideo?.poster ?? ""}
        open={!!fullscreenVideo}
        onClose={() => setFullscreenVideo(null)}
        closeLabel={t.demos.close}
      />
    </section>
  );
}
