export const runtime = "nodejs";

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import { DeveloperFaq } from "@/models";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const developer = searchParams.get("developer");

    await connectDB();
    const col = DeveloperFaq;
    const query = developer ? { developer } : {};
    const items = await col
      .find(query).select('-_id')
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return NextResponse.json({ items }, { status: 200 });
  } catch (err) {
    console.error("[developer-faqs GET]", err);
    return NextResponse.json({ message: "Failed to fetch FAQs." }, { status: 500 });
  }
}
