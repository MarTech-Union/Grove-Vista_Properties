export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { randomUUID } from "crypto";

export async function GET() {
  try {
    const col = await getCollection("properties");
    const items = await col.find({}, { projection: { _id: 0 } }).toArray();
    return NextResponse.json({ items, total: items.length }, { status: 200 });
  } catch (err) {
    console.error("[admin/properties GET]", err);
    return NextResponse.json({ message: "Failed to fetch properties." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, price, priceCr, location, category, propertyFor, type, status, sqft, beds, baths, image, description, tag, active } = body;

    if (!title || !price || !location || !type || !status || !category || !propertyFor) {
      return NextResponse.json({ message: "title, price, location, type, status, category, propertyFor are required" }, { status: 400 });
    }

    const newProperty = {
      id: `prop-${randomUUID().slice(0, 8)}`,
      title,
      price,
      priceCr: parseFloat(priceCr) || 0,
      location,
      category,
      propertyFor,
      type,
      status,
      sqft: sqft || "",
      beds: parseInt(beds) || 0,
      baths: parseInt(baths) || 0,
      image: image || "",
      description: description || "",
      tag: tag || "",
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      active: active ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const col = await getCollection("properties");
    await col.insertOne(newProperty);

    // Return without _id
    const { _id, ...data } = newProperty;
    return NextResponse.json({ message: "Property created.", data }, { status: 201 });
  } catch (err) {
    console.error("[admin/properties POST]", err);
    return NextResponse.json({ message: "Failed to create property." }, { status: 500 });
  }
}
