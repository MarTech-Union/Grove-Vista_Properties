import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, parseInt(searchParams.get("limit") || "20", 10));

    const col = await getCollection("bookings");
    const total = await col.countDocuments();
    const items = await col
      .find({}, { projection: { _id: 0 } })
      .sort({ submittedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({ items, total, page, limit }, { status: 200 });
  } catch (err) {
    console.error("[admin/bookings GET]", err);
    return NextResponse.json({ message: "Failed to fetch bookings." }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { ids } = await request.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ message: "No IDs provided." }, { status: 400 });
    }
    const col = await getCollection("bookings");
    const result = await col.deleteMany({ id: { $in: ids } });
    return NextResponse.json({ message: `Deleted ${result.deletedCount} booking(s).` }, { status: 200 });
  } catch (err) {
    console.error("[admin/bookings DELETE]", err);
    return NextResponse.json({ message: "Failed to delete bookings." }, { status: 500 });
  }
}
