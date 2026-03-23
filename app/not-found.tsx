"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export default function NotFound() {
  const t = useTranslation();

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold mb-4">
          4<span className="text-primary">0</span>4
        </h1>
        <p className="text-muted-foreground text-lg mb-8">{t.notFound.body}</p>
        <Link
          href="/"
          className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          {t.notFound.back}
        </Link>
      </div>
    </main>
  );
}
