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

  const firstName = (body?.firstName || "").trim();
  const lastName = (body?.lastName || "").trim();
  const email = (body?.email || "").trim().toLowerCase();
  const phone = (body?.phone || "").trim();
  const message = (body?.message || "").trim();

  if (!firstName || !lastName) {
    return NextResponse.json({ message: "Please enter your first and last name." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ message: "Please provide a valid email address." }, { status: 400 });
  }
  if (!isValidPhone(phone)) {
    return NextResponse.json({ message: "Please provide a valid phone number." }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ message: "Please enter a message." }, { status: 400 });
  }

  try {
    const id = `CNT-${randomUUID().slice(0, 8).toUpperCase()}`;
    const submittedAt = new Date().toISOString();
    
    // Normalize to match Bookings table schema
    const fullName = `${firstName} ${lastName}`.trim();
    const submission = { 
      id, 
      fullName, 
      email, 
      mobile: phone, 
      message, 
      subject: "Contact Us Inquiry",
      source: "contact_page",
      submittedAt 
    };

    const col = await getCollection("bookings");
    await col.insertOne(submission);

    return NextResponse.json(
      { message: "Your details were submitted successfully.", data: { inquiryId: id, firstName, lastName, email, phone, submittedAt } },
      { status: 200 }
    );
  } catch (err) {
    console.error("[contact/submit]", err);
    return NextResponse.json({ message: "Unable to save your submission. Please try again." }, { status: 500 });
  }
}
