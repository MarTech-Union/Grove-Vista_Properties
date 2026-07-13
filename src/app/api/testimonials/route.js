export const runtime = "nodejs";

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import { Testimonial } from "@/models";

export async function GET() {
  try {
    await connectDB();
    const col = Testimonial;
    const items = await col
      .find({}).select('-_id')
      .sort({ order: 1, createdAt: 1 })
      .lean();
    return NextResponse.json({ items }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Failed to fetch." }, { status: 500 });
  }
}
