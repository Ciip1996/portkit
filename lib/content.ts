/**
 * Content Loader
 * ─────────────────────────────────────────────────────────────────────────────
 * Hybrid content layer: Redis override → i18n file fallback.
 *
 * - Without Redis: content always comes from lib/i18n/en.ts or es.ts.
 * - With Redis: admin-saved content overrides the file-based defaults.
 *
 * Redis keys: content:{lang}:{section}
 * e.g.  content:en:experience  content:es:projects
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { Redis } from "@upstash/redis";
import type { Dictionary } from "@/lib/i18n/types";

export type ContentSection = keyof Dictionary;
export type Lang = "en" | "es";

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function contentKey(lang: Lang, section: ContentSection): string {
  return `content:${lang}:${section}`;
}

/**
 * Retrieve a single section's content for the given language.
 * Returns the Redis-stored override if available, otherwise the provided fallback.
 */
export async function getSectionContent<T>(
  section: ContentSection,
  lang: Lang,
  fallback: T,
): Promise<T> {
  const redis = getRedis();
  if (!redis) return fallback;

  try {
    const override = await redis.get<T>(contentKey(lang, section));
    return override ?? fallback;
  } catch {
    return fallback;
  }
}

/**
 * Save a content section override to Redis.
 * Requires Redis to be configured.
 */
export async function saveSectionContent<T>(
  section: ContentSection,
  lang: Lang,
  data: T,
): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis is not configured");

  await redis.set(contentKey(lang, section), data);
}

/**
 * Delete a content section override from Redis, reverting to the i18n fallback.
 */
export async function deleteSectionContent(
  section: ContentSection,
  lang: Lang,
): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis is not configured");

  await redis.del(contentKey(lang, section));
}

/**
 * Check whether a Redis override exists for the given section / language.
 */
export async function hasSectionOverride(
  section: ContentSection,
  lang: Lang,
): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;

  try {
    const exists = await redis.exists(contentKey(lang, section));
    return exists === 1;
  } catch {
    return false;
  }
}
