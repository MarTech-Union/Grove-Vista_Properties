export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import {
  ADMIN_SESSION_COOKIE,
  COOKIE_MAX_AGE,
  generateSessionToken,
  verifyPassword,
  timingSafeCompare,
} from "@/lib/adminAuth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body ?? {};

    if (!password || typeof password !== "string") {
      return NextResponse.json({ message: "Password required." }, { status: 400 });
    }

    const sessionSecret = process.env.ADMIN_SESSION_SECRET;
    if (!sessionSecret) {
      return NextResponse.json({ message: "Server misconfiguration." }, { status: 500 });
    }

    const envAdminUsername = process.env.ADMIN_USERNAME;
    const envAdminHash = process.env.ADMIN_PASSWORD_HASH;
    const envAdminSalt = process.env.ADMIN_PASSWORD_SALT;
    
    const isUsernameMatch = username && envAdminUsername && username.trim().toLowerCase() === envAdminUsername.toLowerCase();
    
    if (!isUsernameMatch || !envAdminHash || !envAdminSalt || !verifyPassword(password, envAdminSalt, envAdminHash)) {
      return NextResponse.json({ message: "Invalid username or password." }, { status: 401 });
    }

    const sessionPayload = {
      userId: "env-admin",
      username: envAdminUsername,
      name: "Admin",
      exp: Date.now() + COOKIE_MAX_AGE * 1000,
    };

    const token = generateSessionToken(sessionPayload, sessionSecret);
    const response = NextResponse.json({ message: "Authenticated.", role: sessionPayload.role }, { status: 200 });
    response.cookies.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }
}
