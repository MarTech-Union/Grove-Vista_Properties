export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const col = await getCollection("properties");
    const property = await col.findOne({ id }, { projection: { _id: 0 } });
    if (!property) {
      return NextResponse.json({ message: "Property not found." }, { status: 404 });
    }
    return NextResponse.json({ data: property }, { status: 200 });
  } catch (err) {
    console.error("[admin/properties/[id] GET]", err);
    return NextResponse.json({ message: "Failed to fetch property." }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, price, priceCr, location, category, propertyFor, type, status, sqft, beds, baths, image, description, tag, active } = body;

    if (!title || !price || !location || !type || !status || !category || !propertyFor) {
      return NextResponse.json({ message: "title, price, location, type, status, category, propertyFor are required." }, { status: 400 });
    }

    const update = {
      title, price,
      priceCr: parseFloat(priceCr) || 0,
      location, category, propertyFor, type, status,
      sqft: sqft || "",
      beds: parseInt(beds) || 0,
      baths: parseInt(baths) || 0,
      image: image || "",
      description: description || "",
      tag: tag || "",
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      active: active ?? true,
      updatedAt: new Date().toISOString(),
    };

    const col = await getCollection("properties");
    const result = await col.findOneAndUpdate(
      { id },
      { $set: update },
      { returnDocument: "after", projection: { _id: 0 } }
    );

    if (!result) {
      return NextResponse.json({ message: "Property not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Property updated.", data: result }, { status: 200 });
  } catch (err) {
    console.error("[admin/properties/[id] PUT]", err);
    return NextResponse.json({ message: "Failed to update property." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const col = await getCollection("properties");
    const result = await col.deleteOne({ id });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Property not found." }, { status: 404 });
    }
    return NextResponse.json({ message: "Property deleted." }, { status: 200 });
  } catch (err) {
    console.error("[admin/properties/[id] DELETE]", err);
    return NextResponse.json({ message: "Failed to delete property." }, { status: 500 });
  }
}
