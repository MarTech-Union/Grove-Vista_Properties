import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const blogsCollection = await getCollection("blogs");
    const blog = await blogsCollection.findOne({ slug });
    
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { slug } = params;
    const data = await request.json();
    
    // Remove _id if it exists in data so MongoDB doesn't complain about immutable field
    if (data._id) {
      delete data._id;
    }
    
    const blogsCollection = await getCollection("blogs");
    const result = await blogsCollection.updateOne(
      { slug },
      { $set: { ...data, updatedAt: new Date() } }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { slug } = params;
    const blogsCollection = await getCollection("blogs");
    const result = await blogsCollection.deleteOne({ slug });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
