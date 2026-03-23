"use client";

import { useTranslation } from "@/lib/i18n";

export default function Footer() {
  const t = useTranslation();

  return (
    <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border">
      <p>
        &copy; {new Date().getFullYear()} {t.footer.copyright}
      </p>
    </footer>
  );
}
