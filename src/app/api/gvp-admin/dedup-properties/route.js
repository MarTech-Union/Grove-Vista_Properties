export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function POST() {
  try {
    const col = await getCollection("properties");
    const all = await col.find({}, { projection: { _id: 0 } }).toArray();

    // Group by title (case-insensitive)
    const seen = new Map();
    const toDelete = [];

    for (const prop of all) {
      const key = (prop.title || "").toLowerCase().trim();
      if (seen.has(key)) {
        toDelete.push(prop.id);
      } else {
        seen.set(key, prop.id);
      }
    }

    if (toDelete.length === 0) {
      return NextResponse.json({ message: "No duplicates found.", removed: 0 }, { status: 200 });
    }

    await col.deleteMany({ id: { $in: toDelete } });

    return NextResponse.json(
      { message: `Removed ${toDelete.length} duplicate${toDelete.length !== 1 ? "s" : ""}.`, removed: toDelete.length },
      { status: 200 }
    );
  } catch (err) {
    console.error("[dedup-properties]", err);
    return NextResponse.json({ message: "Dedup failed.", error: String(err) }, { status: 500 });
  }
}
