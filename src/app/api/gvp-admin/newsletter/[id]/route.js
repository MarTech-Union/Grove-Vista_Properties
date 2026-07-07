import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const col = await getCollection("newsletter");
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
