import { NextResponse, type NextRequest } from "next/server";
import { verifyCookieValue, COOKIE_NAME } from "@/lib/auth";
import {
  getSectionContent,
  saveSectionContent,
  deleteSectionContent,
  type ContentSection,
  type Lang,
} from "@/lib/content";
import { en } from "@/lib/i18n/en";
import type { Dictionary } from "@/lib/i18n/types";

const VALID_SECTIONS = new Set<string>(Object.keys(en));
const VALID_LANGS = new Set<string>(["en", "es"]);

function isAuthorized(req: NextRequest): boolean {
  const cookie = req.cookies.get(COOKIE_NAME);
  if (!cookie?.value) return false;
  return verifyCookieValue(cookie.value);
}

type RouteParams = { params: Promise<{ section: string }> };

/**
 * GET /api/content/[section]?lang=en
 * Returns the Redis override for this section/lang, or the i18n fallback.
 */
export async function GET(req: NextRequest, { params }: RouteParams) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { section } = await params;
  const lang = (req.nextUrl.searchParams.get("lang") ?? "en") as Lang;

  if (!VALID_SECTIONS.has(section)) {
    return NextResponse.json({ error: "Unknown section" }, { status: 404 });
  }
  if (!VALID_LANGS.has(lang)) {
    return NextResponse.json({ error: "Invalid lang" }, { status: 400 });
  }

  const fallback = en[section as ContentSection];
  const content = await getSectionContent(
    section as ContentSection,
    lang,
    fallback,
  );

  return NextResponse.json({ section, lang, content });
}

/**
 * PUT /api/content/[section]?lang=en
 * Body: { content: <section data> }
 * Saves the content to Redis, overriding the i18n fallback.
 */
export async function PUT(req: NextRequest, { params }: RouteParams) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { section } = await params;
  const lang = (req.nextUrl.searchParams.get("lang") ?? "en") as Lang;

  if (!VALID_SECTIONS.has(section)) {
    return NextResponse.json({ error: "Unknown section" }, { status: 404 });
  }
  if (!VALID_LANGS.has(lang)) {
    return NextResponse.json({ error: "Invalid lang" }, { status: 400 });
  }

  let body: { content: Dictionary[ContentSection] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.content === undefined) {
    return NextResponse.json({ error: "content field is required" }, { status: 400 });
  }

  try {
    await saveSectionContent(section as ContentSection, lang, body.content);
    return NextResponse.json({ saved: true, section, lang });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Save failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * DELETE /api/content/[section]?lang=en
 * Removes the Redis override, reverting the section to the i18n fallback.
 */
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { section } = await params;
  const lang = (req.nextUrl.searchParams.get("lang") ?? "en") as Lang;

  if (!VALID_SECTIONS.has(section)) {
    return NextResponse.json({ error: "Unknown section" }, { status: 404 });
  }
  if (!VALID_LANGS.has(lang)) {
    return NextResponse.json({ error: "Invalid lang" }, { status: 400 });
  }

  try {
    await deleteSectionContent(section as ContentSection, lang);
    return NextResponse.json({ deleted: true, section, lang });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Delete failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
