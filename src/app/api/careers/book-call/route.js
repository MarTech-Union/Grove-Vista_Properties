import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 6 && digits.length <= 15;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
  }

  const fullName = (body?.fullName || "").trim();
  const email = (body?.email || "").trim().toLowerCase();
  const countryCode = (body?.countryCode || "+91").trim();
  const mobile = (body?.mobile || "").trim();
  const source = (body?.source || "default").trim();

  if (source !== "newsletter" && !fullName) {
    return NextResponse.json({ message: "Please provide your full name." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ message: "Please provide a valid email address." }, { status: 400 });
  }
  if (source !== "newsletter" && !isValidPhone(mobile)) {
    return NextResponse.json({ message: "Please provide a valid mobile number." }, { status: 400 });
  }

  try {
    const id = `CALL-${randomUUID().slice(0, 8).toUpperCase()}`;
    const submittedAt = new Date().toISOString();
    const booking = { id, fullName, email, countryCode, mobile, source, submittedAt };

    const col = await getCollection("bookings");
    await col.insertOne(booking);

    return NextResponse.json({ message: "Call request submitted successfully.", data: booking }, { status: 200 });
  } catch (err) {
    console.error("[careers/book-call]", err);
    return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
  }
}
