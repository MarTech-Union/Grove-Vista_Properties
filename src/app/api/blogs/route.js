import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function GET() {
  try {
    const blogsCollection = await getCollection("blogs");
    const blogs = await blogsCollection.find({}).sort({ _id: -1 }).toArray();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const blogsCollection = await getCollection("blogs");
    
    // Check if slug exists
    const existing = await blogsCollection.findOne({ slug: data.slug });
    if (existing) {
      return NextResponse.json({ error: "Blog with this slug already exists" }, { status: 400 });
    }

    const result = await blogsCollection.insertOne({
      ...data,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
