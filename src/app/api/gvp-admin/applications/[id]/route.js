import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import { Application } from "@/models";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const col = Application;
    const result = await col.deleteOne({ id });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Application not found." }, { status: 404 });
    }
    return NextResponse.json({ message: "Application deleted." }, { status: 200 });
  } catch (err) {
    console.error("[admin/applications/[id] DELETE]", err);
    return NextResponse.json({ message: "Failed to delete application." }, { status: 500 });
  }
}
