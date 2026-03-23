"use client";

/**
 * ContentOverrideProvider
 * Receives server-fetched Redis content overrides and makes them available to
 * all useTranslation() callers via context. When a section has a Redis override
 * it replaces the i18n file fallback; otherwise the fallback is used as-is.
 */

import { createContext, useContext } from "react";
import type { Dictionary } from "@/lib/i18n/types";

type SectionOverrides = Partial<Dictionary>;

const ContentOverrideContext = createContext<SectionOverrides>({});

export function ContentOverrideProvider({
  children,
  overrides,
}: {
  children: React.ReactNode;
  overrides: SectionOverrides;
}) {
  return (
    <ContentOverrideContext.Provider value={overrides}>
      {children}
    </ContentOverrideContext.Provider>
  );
}

export function useContentOverrides(): SectionOverrides {
  return useContext(ContentOverrideContext);
}
