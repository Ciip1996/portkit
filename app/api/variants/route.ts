import { NextResponse, type NextRequest } from "next/server";
import { verifyCookieValue, COOKIE_NAME } from "@/lib/auth";
import {
  listCustomVariants,
  saveVariant,
  deleteVariant,
} from "@/lib/variants-server";
import {
  BUILTIN_VARIANTS,
  type VariantConfig,
  type SectionId,
} from "@/lib/variants";

function isAuthorized(req: NextRequest): boolean {
  const cookie = req.cookies.get(COOKIE_NAME);
  if (!cookie?.value) return false;
  return verifyCookieValue(cookie.value);
}

const VALID_SECTIONS: SectionId[] = [
  "hero", "experience", "skills", "education",
  "projects", "freelance", "demos", "press", "contact", "contact-phone",
];

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const variants = await listCustomVariants();
  return NextResponse.json({ variants });
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { slug, label, sections, protected: isProtected } = body;

    if (!slug || typeof slug !== "string" || !/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        { error: "Invalid slug (lowercase letters, numbers, hyphens only)" },
        { status: 400 },
      );
    }

    if (slug in BUILTIN_VARIANTS) {
      return NextResponse.json(
        { error: "Cannot override built-in variants" },
        { status: 400 },
      );
    }

    if (!label || typeof label !== "string") {
      return NextResponse.json(
        { error: "Label is required" },
        { status: 400 },
      );
    }

    if (!Array.isArray(sections) || sections.length === 0) {
      return NextResponse.json(
        { error: "At least one section is required" },
        { status: 400 },
      );
    }

    const validSections = sections.filter((s: string) =>
      VALID_SECTIONS.includes(s as SectionId),
    ) as SectionId[];

    if (validSections.length === 0) {
      return NextResponse.json(
        { error: "No valid sections provided" },
        { status: 400 },
      );
    }

    const config: VariantConfig = {
      slug,
      label,
      sections: validSections,
      protected: Boolean(isProtected),
    };

    await saveVariant(config);
    return NextResponse.json({ variant: config });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slug } = await req.json();
    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 },
      );
    }

    if (slug in BUILTIN_VARIANTS) {
      return NextResponse.json(
        { error: "Cannot delete built-in variants" },
        { status: 400 },
      );
    }

    await deleteVariant(slug);
    return NextResponse.json({ deleted: slug });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 },
    );
  }
}
