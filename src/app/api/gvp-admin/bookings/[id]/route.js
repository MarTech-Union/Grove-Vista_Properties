import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import { Booking } from "@/models";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const col = Booking;
    const result = await col.deleteOne({ id });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Booking not found." }, { status: 404 });
    }
    return NextResponse.json({ message: "Booking deleted." }, { status: 200 });
  } catch (err) {
    console.error("[admin/bookings/[id] DELETE]", err);
    return NextResponse.json({ message: "Failed to delete booking." }, { status: 500 });
  }
}
