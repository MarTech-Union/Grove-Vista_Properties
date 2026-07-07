export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const developer = searchParams.get("developer");
    const col = await getCollection("developer_projects");
    const query = developer ? { developer } : {};
    const items = await col
      .find(query, { projection: { _id: 0 } })
      .sort({ featured: -1, order: 1, createdAt: 1 })
      .toArray();
    return NextResponse.json({ items }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Failed to fetch." }, { status: 500 });
  }
}
