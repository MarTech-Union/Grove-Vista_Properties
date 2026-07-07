export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { randomUUID } from "crypto";

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

export async function POST(request) {
  try {
    const body = await request.json();
    const { tag, title, image, quote, name, role, avatar, badge, order } = body;
    if (!name?.trim() || !quote?.trim()) {
      return NextResponse.json({ message: "name and quote are required." }, { status: 400 });
    }
    const col = await getCollection("testimonials");
    const doc = {
      id: `tst-${randomUUID().slice(0, 8)}`,
      tag: tag?.trim() || "",
      title: title?.trim() || "",
      image: image?.trim() || "",
      quote: quote.trim(),
      name: name.trim(),
      role: role?.trim() || "",
      avatar: avatar?.trim() || "",
      badge: badge?.trim() || "",
      order: order ? parseInt(order) : 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await col.insertOne(doc);
    return NextResponse.json({ item: doc }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Failed to create." }, { status: 500 });
  }
}
