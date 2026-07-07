import crypto from "node:crypto";

export const ADMIN_SESSION_COOKIE = "admin_session";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// ── Role permissions ──────────────────────────────────────────────────────────
// null means full access; array means allowed href prefixes only
export const ROLE_NAV = {
  admin:     null,
  sales:     ["/gvp-admin/dashboard", "/gvp-admin/properties", "/gvp-admin/bookings", "/gvp-admin/developer-projects"],
  marketing: ["/gvp-admin/dashboard", "/gvp-admin/testimonials", "/gvp-admin/newsletter", "/gvp-admin/developer-faqs"],
  hr:        ["/gvp-admin/dashboard"],
};

export const ROLES = ["admin", "sales", "marketing", "hr"];

// ── Password hashing (pbkdf2 — no extra deps) ─────────────────────────────────
export function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

export function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 100_000, 32, "sha256").toString("hex");
}

export function verifyPassword(password, salt, hash) {
  const attempt = hashPassword(password, salt);
  const a = Buffer.from(attempt, "hex");
  const b = Buffer.from(hash, "hex");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// ── Session token — signed JSON payload ───────────────────────────────────────
// Format: base64url(payload).<hmac-hex>
export function generateSessionToken(payload, secret) {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(data).digest("hex");
  return `${data}.${sig}`;
}

export function verifySessionToken(token, secret) {
  if (!token || !secret) return null;
  try {
    const dot = token.lastIndexOf(".");
    if (dot === -1) return null;
    const data = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    const expected = crypto.createHmac("sha256", secret).update(data).digest("hex");
    const sigBuf = Buffer.from(sig, "hex");
    const expBuf = Buffer.from(expected, "hex");
    if (sigBuf.length !== expBuf.length) return null;
    if (!crypto.timingSafeEqual(sigBuf, expBuf)) return null;
    const payload = JSON.parse(Buffer.from(data, "base64url").toString());
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

// Legacy helpers kept for backward compat during transition
export function timingSafeCompare(a, b) {
  try {
    const bufA = Buffer.from(String(a));
    const bufB = Buffer.from(String(b));
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}
