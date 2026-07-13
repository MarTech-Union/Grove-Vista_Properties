import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import { Newsletter } from "@/models";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim().toLowerCase();

  if (!email) {
    return NextResponse.json({ message: "Email is required." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ message: "Invalid email address." }, { status: 400 });
  }

  try {
    await connectDB();
    const col = Newsletter;
    const exists = await col.findOne({ email }, { projection: { _id: 0 } });
    if (exists) {
      return NextResponse.json({ message: "You are already subscribed." }, { status: 409 });
    }

    const subscriber = {
      id: `NEWS-${randomUUID().slice(0, 8).toUpperCase()}`,
      name,
      email,
      subscribedAt: new Date().toISOString(),
    };
    await col.create(subscriber);

    return NextResponse.json({ message: "Subscribed successfully.", data: subscriber }, { status: 200 });
  } catch (err) {
    console.error("[newsletter/subscribe]", err);
    return NextResponse.json({ message: "Failed to subscribe. Please try again." }, { status: 500 });
  }
}
