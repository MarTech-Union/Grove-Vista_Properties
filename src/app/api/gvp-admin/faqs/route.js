export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { randomUUID } from "crypto";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const col = await getCollection("site_faqs");
    const query = category ? { category } : {};
    const items = await col
      .find(query, { projection: { _id: 0 } })
      .sort({ order: 1, createdAt: 1 })
      .toArray();

    return NextResponse.json({ items }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { category, question, answer, order } = await request.json();
    if (!category || !question?.trim() || !answer?.trim()) {
      return NextResponse.json({ message: "category, question and answer are required." }, { status: 400 });
    }

    const col = await getCollection("site_faqs");
    const doc = {
      id: `sfaq-${randomUUID().slice(0, 8)}`,
      category,
      question: question.trim(),
      answer: answer.trim(),
      order: order ? parseInt(order) : 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await col.insertOne(doc);
    return NextResponse.json({ item: doc }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Failed to create." }, { status: 500 });
  }
}
