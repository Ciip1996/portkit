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

  return { ...base, ...overrides } as Dictionary;
}

export type { Dictionary };
