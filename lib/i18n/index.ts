import { useState, useEffect } from "react";
import { useLang } from "@/components/providers/language-provider";
import { useContentOverrides } from "@/components/providers/content-provider";
import { en } from "./en";
import type { Dictionary } from "./types";

/**
 * Returns the full content dictionary for the active language, with any
 * Redis-stored admin overrides deep-merged on top.
 */
export function useTranslation(): Dictionary {
  const { lang } = useLang();
  const overrides = useContentOverrides();
  const [base, setBase] = useState<Dictionary>(en);

  useEffect(() => {
    if (lang === "es") {
      import("./es").then((mod) => setBase(mod.es));
    } else {
      setBase(en);
    }
  }, [lang]);

  if (Object.keys(overrides).length === 0) return base;

  // Merge each overridden section on top of its file default, so fields added in
  // code later (e.g. hero.birthLine) still have a value when an older admin save
  // doesn't include them. Lists inside a section are still replaced as a whole.
  const merged: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(overrides)) {
    const fallback = (base as unknown as Record<string, unknown>)[key];
    merged[key] = isPlainObject(fallback) && isPlainObject(value) ? { ...fallback, ...value } : value;
  }
  return merged as unknown as Dictionary;
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export type { Dictionary };
