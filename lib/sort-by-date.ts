/**
 * Date-based sorting for experience and timeline entries.
 * ─────────────────────────────────────────────────────────────────────────────
 * Entries added from the admin panel are appended to the end of their list.
 * These helpers sort them so the most recent entry always comes first,
 * regardless of the order they were saved in.
 *
 * Understands free-text periods in English and Spanish, e.g.
 *   "Sep 2025 – Present", "Ago 2024 – Presente", "Fall 2017 – Winter 2018", "2025"
 * and ISO-like dates such as "2025-09" or "2025-09-15".
 * ─────────────────────────────────────────────────────────────────────────────
 */

const MONTHS: Record<string, number> = {
  jan: 1, ene: 1,
  feb: 2,
  mar: 3,
  apr: 4, abr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8, ago: 8,
  sep: 9, set: 9,
  oct: 10,
  nov: 11,
  dec: 12, dic: 12,
};

const SEASONS: Record<string, number> = {
  winter: 1, invierno: 1,
  spring: 3, primavera: 3,
  summer: 6, verano: 6,
  fall: 9, autumn: 9, otoño: 9, otono: 9,
};

const PRESENT_WORDS = ["present", "presente", "current", "actual", "now", "hoy"];

/** Sortable value for "ongoing" entries — always newer than any real date. */
const PRESENT_VALUE = Number.POSITIVE_INFINITY;
/** Sortable value for text we can't read — keeps such entries at the end. */
const UNKNOWN_VALUE = Number.NEGATIVE_INFINITY;

/** Turn a single date fragment ("Sep 2025", "2025-09", "Present") into a sortable number. */
export function parseDateFragment(fragment: string | undefined | null): number {
  if (!fragment) return UNKNOWN_VALUE;
  const text = fragment.trim().toLowerCase();
  if (!text) return UNKNOWN_VALUE;

  if (PRESENT_WORDS.some((w) => text.includes(w))) return PRESENT_VALUE;

  // ISO-like: 2025-09 or 2025-09-15
  const iso = text.match(/\b((?:19|20)\d{2})-(\d{1,2})(?:-\d{1,2})?\b/);
  if (iso) return Number(iso[1]) * 12 + Number(iso[2]);

  const yearMatch = text.match(/\b((?:19|20)\d{2})\b/);
  if (!yearMatch) return UNKNOWN_VALUE;
  const year = Number(yearMatch[1]);

  const words = text.normalize("NFC").split(/[^a-záéíóúñ]+/i).filter(Boolean);
  for (const word of words) {
    // "march" → mar, "septiembre" → sep, "agosto" → ago, etc.
    const month = MONTHS[word.slice(0, 3)];
    if (month) return year * 12 + month;
    const season = SEASONS[word];
    if (season) return year * 12 + season;
  }

  // Year only — treat as the start of that year.
  return year * 12;
}

/** Split a period like "Sep 2025 – Present" into its start and end parts. */
export function splitPeriod(period: string | undefined | null): { start: string; end: string } {
  if (!period) return { start: "", end: "" };
  const parts = period.split(/\s*[–—-]\s+|\s+[–—-]\s*|\s+to\s+|\s+a\s+/i);
  return { start: parts[0] ?? "", end: parts.length > 1 ? parts[parts.length - 1] : "" };
}

interface DateKeys {
  /** Free-text period, e.g. "Sep 2025 – Present" */
  period?: string;
  /** Optional explicit start, e.g. "2025-09" — takes priority over the period */
  startDate?: string;
  /** Optional explicit end, e.g. "2026-08" or "present" */
  endDate?: string;
}

function sortValues(item: DateKeys): { start: number; end: number } {
  const { start, end } = splitPeriod(item.period);
  const startValue = item.startDate ? parseDateFragment(item.startDate) : parseDateFragment(start);
  const endValue = item.endDate
    ? parseDateFragment(item.endDate)
    : end
      ? parseDateFragment(end)
      : startValue;
  return { start: startValue, end: endValue };
}

/**
 * Return a new array sorted most-recent-first.
 * Ordering: newest start date first; on a tie, ongoing ("Present") or later-ending
 * entries come first. Entries whose dates can't be read keep their relative order
 * at the end of the list.
 */
export function sortByMostRecent<T extends DateKeys>(items: readonly T[]): T[] {
  return items
    .map((item, index) => ({ item, index, ...sortValues(item) }))
    .sort((a, b) => {
      if (a.start !== b.start) return b.start > a.start ? 1 : -1;
      if (a.end !== b.end) return b.end > a.end ? 1 : -1;
      return a.index - b.index;
    })
    .map(({ item }) => item);
}
