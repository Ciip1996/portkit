import { createHmac, timingSafeEqual } from "crypto";

export { COOKIE_NAME, COOKIE_MAX_AGE } from "@/lib/auth-constants";

function getSecret(): string {
  const secret = process.env.PORTFOLIO_TOKEN_SECRET;
  if (!secret) throw new Error("PORTFOLIO_TOKEN_SECRET env var is not set");
  return secret;
}

export function verifyPin(pin: string): boolean {
  const expected = process.env.PORTFOLIO_PIN;
  if (!expected) return false;

  const a = Buffer.from(pin);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;

  return timingSafeEqual(a, b);
}

export function createToken(slug: string): string {
  const payload = Buffer.from(JSON.stringify({ slug })).toString("base64url");
  const sig = createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyToken(token: string): { valid: boolean; slug?: string } {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return { valid: false };

  const expected = createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");

  if (sig !== expected) return { valid: false };

  try {
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf-8"),
    );
    return { valid: true, slug: data.slug };
  } catch {
    return { valid: false };
  }
}

export function createCookieValue(): string {
  const payload = Buffer.from(
    JSON.stringify({ ts: Date.now() }),
  ).toString("base64url");
  const sig = createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyCookieValue(value: string): boolean {
  const [payload, sig] = value.split(".");
  if (!payload || !sig) return false;

  const expected = createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");

  return sig === expected;
}
