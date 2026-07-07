export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const developer = searchParams.get("developer");

    const col = await getCollection("developer_faqs");
    const query = developer ? { developer } : {};
    const items = await col
      .find(query, { projection: { _id: 0 } })
      .sort({ order: 1, createdAt: 1 })
      .toArray();

    return NextResponse.json({ items }, { status: 200 });
  } catch (err) {
    console.error("[developer-faqs GET]", err);
    return NextResponse.json({ message: "Failed to fetch FAQs." }, { status: 500 });
  }
}
