import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(100, parseInt(searchParams.get("limit") || "50", 10));

    const col = await getCollection("newsletter");
    const total = await col.countDocuments();
    const items = await col
      .find({}, { projection: { _id: 0 } })
      .sort({ subscribedAt: -1 })
      .limit(limit)
      .toArray();

    return NextResponse.json({ items, total }, { status: 200 });
  } catch (err) {
    console.error("[admin/newsletter GET]", err);
    return NextResponse.json({ message: "Failed to fetch subscribers." }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { ids } = await request.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ message: "No IDs provided." }, { status: 400 });
    }
    const col = await getCollection("newsletter");
    const result = await col.deleteMany({ id: { $in: ids } });
    return NextResponse.json({ message: `Deleted ${result.deletedCount} subscriber(s).` }, { status: 200 });
  } catch (err) {
    console.error("[admin/newsletter DELETE]", err);
    return NextResponse.json({ message: "Failed to delete subscribers." }, { status: 500 });
  }
}
