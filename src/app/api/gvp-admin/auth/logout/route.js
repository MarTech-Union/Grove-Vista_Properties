import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/adminAuth";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logged out." },
    { status: 200 }
  );
  response.cookies.delete(ADMIN_SESSION_COOKIE);
  return response;
}