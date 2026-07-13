export const runtime = "nodejs";

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import { SiteFaq } from "@/models";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    await connectDB();
    const col = SiteFaq;
    const query = category ? { category } : {};
    const items = await col
      .find(query).select('-_id')
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return NextResponse.json({ items }, { status: 200 });
  } catch (err) {
    console.error("[faqs GET]", err);
    return NextResponse.json({ message: "Failed to fetch FAQs." }, { status: 500 });
  }
}
