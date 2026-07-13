export const runtime = "nodejs";

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import { DeveloperProject } from "@/models";
import { randomUUID } from "crypto";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const developer = searchParams.get("developer");
    await connectDB();
    const col = DeveloperProject;
    const query = developer ? { developer } : {};
    const items = await col
      .find(query).select('-_id')
      .sort({ featured: -1, order: 1, createdAt: 1 })
      .lean();
    return NextResponse.json({ items }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Failed to fetch." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, developer, location, price, area, image, description, tags, featured, order } = body;
    if (!name?.trim() || !developer?.trim()) {
      return NextResponse.json({ message: "name and developer are required." }, { status: 400 });
    }
    await connectDB();
    const col = DeveloperProject;
    const doc = {
      id: `proj-${randomUUID().slice(0, 8)}`,
      name: name.trim(),
      developer: developer.trim(),
      location: location?.trim() || "",
      price: price?.trim() || "",
      area: area?.trim() || "",
      image: image?.trim() || "",
      description: description?.trim() || "",
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : []),
      featured: featured === true || featured === "true",
      order: order ? parseInt(order) : 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await col.create(doc);
    return NextResponse.json({ item: doc }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Failed to create." }, { status: 500 });
  }
}
