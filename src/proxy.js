import { NextResponse } from "next/server";

const PROD_ORIGIN = "https://grovevistaproperties.com";
const ADMIN_SESSION_COOKIE = "admin_session";

// --- Nonce (Web Crypto only — no Buffer, no Node built-ins) ---
function generateNonce() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes));
}

// --- CSP ---
function buildCSP(nonce) {
  const isDev = process.env.NODE_ENV === "development";
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://connect.facebook.net`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https:",
    "media-src 'self' https:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https:",
    "frame-src 'self' https://www.google.com https://maps.google.com",
    "object-src 'none'",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

// --- Session verification using Web Crypto (crypto.subtle) ---
// Token format: base64url(JSON payload).<hmac-sha256-hex>
async function verifySession(token, secret) {
  if (!token || !secret) return false;
  try {
    const dot = token.lastIndexOf(".");
    if (dot === -1) return false;
    const data = token.slice(0, dot);
    const sig  = token.slice(dot + 1);

    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw", enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false, ["sign"]
    );
    const sigBytes = await crypto.subtle.sign("HMAC", key, enc.encode(data));
    const expected = Array.from(new Uint8Array(sigBytes))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    if (sig !== expected) return false;

    // Verify expiry from payload
    const payload = JSON.parse(atob(data.replace(/-/g, "+").replace(/_/g, "/")));
    if (!payload.exp || payload.exp < Date.now()) return false;

    return true;
  } catch {
    return false;
  }
}

// --- Static security headers ---
const STATIC_HEADERS = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), ambient-light-sensor=(), autoplay=(), encrypted-media=(), fullscreen=(self), picture-in-picture=()",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Cross-Origin-Opener-Policy": "same-origin",
  "X-DNS-Prefetch-Control": "on",
};

function applyHeaders(response, nonce) {
  Object.entries(STATIC_HEADERS).forEach(([k, v]) => response.headers.set(k, v));
  response.headers.set("Content-Security-Policy", buildCSP(nonce));
  const origin = process.env.NODE_ENV === "development" ? "*" : PROD_ORIGIN;
  response.headers.set("Access-Control-Allow-Origin", origin);
}

// --- Proxy handler ---
export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const nonce = generateNonce();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("x-pathname", pathname);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("x-pathname", pathname);
  applyHeaders(response, nonce);

  if (pathname.startsWith("/gvp-admin")) {
    if (pathname === "/gvp-admin/login") return response;
    if (pathname.startsWith("/api/gvp-admin/auth")) return response;

    const sessionToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const sessionSecret = process.env.ADMIN_SESSION_SECRET;

    if (!(await verifySession(sessionToken, sessionSecret))) {
      const loginUrl = new URL("/gvp-admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      const redirectResponse = NextResponse.redirect(loginUrl);
      applyHeaders(redirectResponse, nonce);
      return redirectResponse;
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
