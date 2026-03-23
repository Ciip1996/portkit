"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useTranslation } from "@/lib/i18n";
import { SITE_URL } from "@/lib/constants";

function getGoogleViewerUrl(path: string) {
  const absolute = path.startsWith("http") ? path : `${SITE_URL}${path}`;
  return `https://docs.google.com/viewer?url=${encodeURIComponent(absolute)}&embedded=true`;
}

export default function DiplomaGallery() {
  const t = useTranslation();
  const diplomas = t.diplomas.items;

  const [current, setCurrent] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerFile, setViewerFile] = useState("");

  const prev = () =>
    setCurrent((c) => (c === 0 ? diplomas.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === diplomas.length - 1 ? 0 : c + 1));

  const openViewer = (file: string) => {
    setViewerFile(file);
    setViewerOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-5 h-5 text-primary" aria-hidden="true" />
          <h3 className="text-lg font-semibold">{t.diplomas.heading}</h3>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {diplomas.map((diploma, i) => (
                <div key={i} className="w-full shrink-0 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-6 items-center">
                    <button
                      type="button"
                      className="relative w-full sm:w-80 aspect-[17/22] sm:aspect-auto sm:h-96 rounded-lg overflow-hidden bg-muted border border-border cursor-pointer group text-left"
                      onClick={() => openViewer(diploma.file)}
                      aria-label={`${t.diplomas.viewDocument}: ${diploma.title}`}
                    >
                      <iframe
                        src={getGoogleViewerUrl(diploma.file)}
                        className="w-full h-full pointer-events-none border-0"
                        title={diploma.title}
                        tabIndex={-1}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center">
                        <Maximize2 className="w-8 h-8 text-primary" aria-hidden="true" />
                      </div>
                    </button>

                    <div className="flex-1 text-center sm:text-left">
                      <h4 className="text-xl font-semibold mb-2">
                        {diploma.title}
                      </h4>
                      <p className="text-muted-foreground text-sm mb-4">
                        {diploma.description}
                      </p>
                      <div className="flex gap-3 justify-center sm:justify-start">
                        <button
                          onClick={() => openViewer(diploma.file)}
                          className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                        >
                          {t.diplomas.viewDocument}
                        </button>
                        <a
                          href={diploma.file}
                          download
                          className="px-4 py-2 text-sm rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {t.diplomas.download}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {diplomas.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label={t.diplomas.prevAriaLabel}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label={t.diplomas.nextAriaLabel}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {diplomas.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {diplomas.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === current ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                  aria-label={`${t.diplomas.goToAriaLabel} ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>

      <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <DialogTitle>{t.diplomas.documentViewer}</DialogTitle>
              <DialogDescription className="sr-only">
                {t.diplomas.pdfViewer}
              </DialogDescription>
            </div>
            <div className="flex-1">
              <iframe
                src={getGoogleViewerUrl(viewerFile)}
                className="w-full h-full border-0"
                title={t.diplomas.pdfViewer}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
