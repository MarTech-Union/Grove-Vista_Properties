export const runtime = "nodejs";

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import { DeveloperFaq } from "@/models";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { question, answer, order } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { message: "question and answer are required." },
        { status: 400 }
      );
    }

    await connectDB();
    const col = DeveloperFaq;
    const result = await col.updateOne(
      { id },
      {
        $set: {
          question: question.trim(),
          answer: answer.trim(),
          ...(order !== undefined && { order: parseInt(order) }),
          updatedAt: new Date().toISOString(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "FAQ not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "FAQ updated." }, { status: 200 });
  } catch (err) {
    console.error("[admin/developer-faqs PUT]", err);
    return NextResponse.json({ message: "Failed to update FAQ." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await connectDB();
    const col = DeveloperFaq;
    const result = await col.deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "FAQ not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "FAQ deleted." }, { status: 200 });
  } catch (err) {
    console.error("[admin/developer-faqs DELETE]", err);
    return NextResponse.json({ message: "Failed to delete FAQ." }, { status: 500 });
  }
}
