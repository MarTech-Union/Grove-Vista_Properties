import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import { Booking } from "@/models";
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
  const countryCode = (body?.countryCode || "").trim();
  const mobile = (body?.mobile || "").trim();
  const subject = (body?.subject || "").trim();
  const bookingDate = (body?.bookingDate || "").trim();
  const bookingTime = (body?.bookingTime || "").trim();
  const message = (body?.message || "").trim();

  if (!fullName) {
    return NextResponse.json({ message: "Please provide your full name." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ message: "Please provide a valid email address." }, { status: 400 });
  }
  if (!countryCode || !isValidPhone(mobile)) {
    return NextResponse.json({ message: "Please provide a valid mobile number with country code." }, { status: 400 });
  }
  if (!subject) {
    return NextResponse.json({ message: "Please select a booking subject." }, { status: 400 });
  }
  if (!bookingDate || !bookingTime) {
    return NextResponse.json({ message: "Please select a valid booking date and time slot." }, { status: 400 });
  }

  try {
    const id = `BOOK-${randomUUID().slice(0, 8).toUpperCase()}`;
    const submittedAt = new Date().toISOString();
    
    // Determine source to distinguish from the simpler "Call Requests" if needed
    // The admin dashboard reads from "bookings" collection. Let's tag this as "website_booking".
    const booking = { 
      id, 
      fullName, 
      email, 
      countryCode,
      mobile, 
      subject,
      bookingDate,
      bookingTime,
      message,
      source: "website_booking", 
      submittedAt 
    };

    await connectDB();
    const col = Booking;
    await col.create(booking);

    return NextResponse.json({ message: "Booking confirmed successfully.", data: booking }, { status: 200 });
  } catch (err) {
    console.error("[api/book POST]", err);
    return NextResponse.json({ message: "Failed to process booking." }, { status: 500 });
  }
}
