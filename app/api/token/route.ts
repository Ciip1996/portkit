import { NextResponse, type NextRequest } from "next/server";
import { createToken, verifyCookieValue, COOKIE_NAME } from "@/lib/auth";
import { SITE_URL } from "@/lib/constants";

export async function POST(req: NextRequest) {
  const cookie = req.cookies.get(COOKIE_NAME);
  if (!cookie?.value || !verifyCookieValue(cookie.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slug } = await req.json();
    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "slug is required" },
        { status: 400 },
      );
    }

    const token = createToken(slug);
    const path = slug === "full" ? "/full" : `/p/${slug}`;
    const url = `${SITE_URL}${path}?token=${token}`;

    return NextResponse.json({ token, url });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 },
    );
  }
}
