import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_NAME } from "@/lib/auth-constants";

const BUILTIN_PROTECTED: Record<string, boolean> = {
  general: false,
  full: true,
};

const encoder = new TextEncoder();

async function hmacVerify(
  secret: string,
  payload: string,
  signature: string,
): Promise<boolean> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const expected = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, encoder.encode(payload)),
  );

  let sigBytes: Uint8Array;
  try {
    const raw = atob(signature.replace(/-/g, "+").replace(/_/g, "/"));
    sigBytes = Uint8Array.from(raw, (c) => c.charCodeAt(0));
  } catch {
    return false;
  }

  if (expected.length !== sigBytes.length) return false;

  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected[i] ^ sigBytes[i];
  }
  return diff === 0;
}

async function hasValidCookie(req: NextRequest): Promise<boolean> {
  const secret = process.env.PORTFOLIO_TOKEN_SECRET;
  if (!secret) return false;

  const cookie = req.cookies.get(COOKIE_NAME);
  if (!cookie?.value) return false;

  const [payload, sig] = cookie.value.split(".");
  if (!payload || !sig) return false;

  return hmacVerify(secret, payload, sig);
}

async function hasValidTokenParam(
  req: NextRequest,
): Promise<string | null> {
  const secret = process.env.PORTFOLIO_TOKEN_SECRET;
  if (!secret) return null;

  const token = req.nextUrl.searchParams.get("token");
  if (!token) return null;

  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;

  const valid = await hmacVerify(secret, payload, sig);
  return valid ? token : null;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.endsWith("/unlock") || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const needsAuth = isProtectedRoute(pathname);
  if (!needsAuth) return NextResponse.next();

  if (await hasValidCookie(req)) return NextResponse.next();

  const token = await hasValidTokenParam(req);
  if (token) {
    const url = req.nextUrl.clone();
    url.searchParams.delete("token");
    const response = NextResponse.redirect(url);
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    return response;
  }

  const unlockUrl = req.nextUrl.clone();
  unlockUrl.pathname = `${pathname}/unlock`;
  unlockUrl.search = "";
  return NextResponse.redirect(unlockUrl);
}

function isProtectedRoute(pathname: string): boolean {
  if (pathname === "/full" || pathname.startsWith("/full/")) return true;
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return true;

  if (pathname.startsWith("/p/")) {
    const slug = pathname.split("/")[2];
    if (!slug) return false;
    if (slug in BUILTIN_PROTECTED) return BUILTIN_PROTECTED[slug];
    return true;
  }

  return false;
}

export const config = {
  matcher: ["/full/:path*", "/p/:variant/:path*", "/admin/:path*"],
};
