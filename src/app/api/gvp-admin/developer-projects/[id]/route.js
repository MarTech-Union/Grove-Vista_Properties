export const runtime = "nodejs";

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import { DeveloperProject } from "@/models";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, developer, location, price, area, image, description, tags, featured, order } = body;
    if (!name?.trim() || !developer?.trim()) {
      return NextResponse.json({ message: "name and developer are required." }, { status: 400 });
    }
    await connectDB();
    const col = DeveloperProject;
    const update = {
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
      updatedAt: new Date().toISOString(),
    };
    const result = await col.updateOne({ id }, { $set: update });
    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Not found." }, { status: 404 });
    }
    return NextResponse.json({ message: "Updated." }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Failed to update." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await connectDB();
    const col = DeveloperProject;
    const result = await col.deleteOne({ id });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Not found." }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted." }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Failed to delete." }, { status: 500 });
  }
}
