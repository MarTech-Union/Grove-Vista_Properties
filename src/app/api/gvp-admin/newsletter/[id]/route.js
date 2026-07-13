import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import { Newsletter } from "@/models";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const col = Newsletter;
    const result = await col.deleteOne({ id });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Subscriber not found." }, { status: 404 });
    }
    return NextResponse.json({ message: "Subscriber deleted." }, { status: 200 });
  } catch (err) {
    console.error("[admin/newsletter/[id] DELETE]", err);
    return NextResponse.json({ message: "Failed to delete subscriber." }, { status: 500 });
  }
}
