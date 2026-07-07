export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function GET() {
  try {
    const col = await getCollection("testimonials");
    const items = await col
      .find({}, { projection: { _id: 0 } })
      .sort({ order: 1, createdAt: 1 })
      .toArray();
    return NextResponse.json({ items }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Failed to fetch." }, { status: 500 });
  }
}
