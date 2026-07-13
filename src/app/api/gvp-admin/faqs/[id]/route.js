export const runtime = "nodejs";

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import { SiteFaq } from "@/models";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { question, answer, order } = await request.json();

    await connectDB();
    const col = SiteFaq;
    await col.updateOne(
      { id },
      { $set: { question: question?.trim(), answer: answer?.trim(), order: order ? parseInt(order) : 0, updatedAt: new Date().toISOString() } }
    );
    return NextResponse.json({ message: "Updated." }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Failed to update." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const col = SiteFaq;
    await col.deleteOne({ id });
    return NextResponse.json({ message: "Deleted." }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Failed to delete." }, { status: 500 });
  }
}
