export const runtime = "nodejs";

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import { Testimonial } from "@/models";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { tag, title, image, quote, name, role, avatar, badge, order } = body;
    if (!name?.trim() || !quote?.trim()) {
      return NextResponse.json({ message: "name and quote are required." }, { status: 400 });
    }
    await connectDB();
    const col = Testimonial;
    const update = {
      tag: tag?.trim() || "",
      title: title?.trim() || "",
      image: image?.trim() || "",
      quote: quote.trim(),
      name: name.trim(),
      role: role?.trim() || "",
      avatar: avatar?.trim() || "",
      badge: badge?.trim() || "",
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
    const { id } = await params;
    await connectDB();
    const col = Testimonial;
    const result = await col.deleteOne({ id });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Not found." }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted." }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Failed to delete." }, { status: 500 });
  }
}
