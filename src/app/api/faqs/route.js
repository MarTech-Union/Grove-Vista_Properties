export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const col = await getCollection("site_faqs");
    const query = category ? { category } : {};
    const items = await col
      .find(query, { projection: { _id: 0 } })
      .sort({ order: 1, createdAt: 1 })
      .toArray();

    return NextResponse.json({ items }, { status: 200 });
  } catch (err) {
    console.error("[faqs GET]", err);
    return NextResponse.json({ message: "Failed to fetch FAQs." }, { status: 500 });
  }
}
