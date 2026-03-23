/**
 * Server-side helper to fetch all Redis content overrides for a given language.
 * Used in page Server Components to hydrate the ContentOverrideProvider.
 *
 * Returns a partial Dictionary — only the sections that have Redis overrides.
 * Sections without overrides are omitted (client uses i18n fallback).
 */

import { Redis } from "@upstash/redis";
import { en } from "@/lib/i18n/en";
import type { Dictionary } from "@/lib/i18n/types";
import type { Lang } from "@/lib/content";

type SectionOverrides = Partial<Dictionary>;

const SECTIONS = Object.keys(en) as Array<keyof Dictionary>;

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function fetchContentOverrides(lang: Lang = "en"): Promise<SectionOverrides> {
  const redis = getRedis();
  if (!redis) return {};

  try {
    const keys = SECTIONS.map((s) => `content:${lang}:${s}`);
    const values = await redis.mget<Array<Dictionary[keyof Dictionary] | null>>(...keys);

    const overrides: SectionOverrides = {};
    SECTIONS.forEach((section, i) => {
      if (values[i] != null) {
        (overrides as Record<string, unknown>)[section] = values[i];
      }
    });

    return overrides;
  } catch {
    return {};
  }
}
