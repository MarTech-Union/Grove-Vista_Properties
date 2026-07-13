export const runtime = "nodejs";

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import { DeveloperFaq } from "@/models";
import { randomUUID } from "crypto";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const developer = searchParams.get("developer");

    await connectDB();
    const col = DeveloperFaq;
    const query = developer ? { developer } : {};
    const items = await col
      .find(query).select('-_id')
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return NextResponse.json({ items }, { status: 200 });
  } catch (err) {
    console.error("[admin/developer-faqs GET]", err);
    return NextResponse.json({ message: "Failed to fetch FAQs." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { developer, question, answer, order } = body;

    if (!developer || !question || !answer) {
      return NextResponse.json(
        { message: "developer, question, and answer are required." },
        { status: 400 }
      );
    }

    const newFaq = {
      id: `faq-${randomUUID().slice(0, 8)}`,
      developer,
      question: question.trim(),
      answer: answer.trim(),
      order: parseInt(order) || 99,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await connectDB();
    const col = DeveloperFaq;
    await col.create(newFaq);

    const { _id, ...data } = newFaq;
    return NextResponse.json({ message: "FAQ created.", data }, { status: 201 });
  } catch (err) {
    console.error("[admin/developer-faqs POST]", err);
    return NextResponse.json({ message: "Failed to create FAQ." }, { status: 500 });
  }
}
