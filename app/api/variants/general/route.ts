import { NextResponse, type NextRequest } from "next/server";
import { verifyCookieValue, COOKIE_NAME } from "@/lib/auth";
import {
  getGeneralSections,
  saveGeneralSections,
} from "@/lib/variants-server";
import { ALL_SECTIONS, type SectionId } from "@/lib/variants";

function isAuthorized(req: NextRequest): boolean {
  const cookie = req.cookies.get(COOKIE_NAME);
  if (!cookie?.value) return false;
  return verifyCookieValue(cookie.value);
}

const VALID_IDS = new Set<string>(ALL_SECTIONS.map((s) => s.id));

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sections = await getGeneralSections();
  return NextResponse.json({ sections });
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { sections } = await req.json();

    if (!Array.isArray(sections) || sections.length === 0) {
      return NextResponse.json(
        { error: "At least one section is required" },
        { status: 400 },
      );
    }

    const valid = sections.filter((s: string) =>
      VALID_IDS.has(s),
    ) as SectionId[];

    if (valid.length === 0) {
      return NextResponse.json(
        { error: "No valid sections provided" },
        { status: 400 },
      );
    }

    await saveGeneralSections(valid);
    return NextResponse.json({ sections: valid });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 },
    );
  }
}
