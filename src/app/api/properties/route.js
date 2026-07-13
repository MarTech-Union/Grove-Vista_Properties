import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import { Property } from "@/models";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const propertyFor = searchParams.get("propertyFor");
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "6", 10));

    const query = { active: true };
    if (category) query.category = { $regex: new RegExp(`^${category}$`, "i") };
    if (propertyFor) query.propertyFor = { $regex: new RegExp(`^${propertyFor}$`, "i") };

    await connectDB();
    const col = Property;
    const total = await col.countDocuments(query);
    const properties = await col
      .find(query).select('-_id')
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({ properties, total, page, limit, hasMore: page * limit < total }, { status: 200 });
  } catch (err) {
    console.error("[api/properties GET]", err);
    return NextResponse.json({ message: "Failed to fetch properties." }, { status: 500 });
  }
}
