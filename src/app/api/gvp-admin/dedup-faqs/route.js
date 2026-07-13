export const runtime = "nodejs";

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import { DeveloperFaq } from "@/models";

export async function POST() {
  try {
    await connectDB();
    const col = DeveloperFaq;
    const all = await col.find({}).select('-_id').lean();

    const seen = new Set();
    const toDelete = [];

    for (const faq of all) {
      const key = `${faq.developer}||${(faq.question || "").toLowerCase().trim()}`;
      if (seen.has(key)) {
        toDelete.push(faq.id);
      } else {
        seen.add(key);
      }
    }

    if (toDelete.length === 0) {
      return NextResponse.json({ message: "No duplicate FAQs found.", removed: 0 }, { status: 200 });
    }

    await col.deleteMany({ id: { $in: toDelete } });

    return NextResponse.json(
      { message: `Removed ${toDelete.length} duplicate FAQ${toDelete.length !== 1 ? "s" : ""}.`, removed: toDelete.length },
      { status: 200 }
    );
  } catch (err) {
    console.error("[dedup-faqs]", err);
    return NextResponse.json({ message: "Dedup failed. " + err.message }, { status: 500 });
  }
}
