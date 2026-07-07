import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { blogs } from "@/data/blogs";

export async function GET() {
  try {
    const blogsCollection = await getCollection("blogs");
    
    // Clear existing
    await blogsCollection.deleteMany({});
    
    // Insert from file
    // Remove the hardcoded 'id' if you prefer MongoDB's _id, but we'll keep the object clean
    const formattedBlogs = blogs.map(blog => {
      const { id, ...rest } = blog;
      return {
        ...rest,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    if (formattedBlogs.length > 0) {
      await blogsCollection.insertMany(formattedBlogs);
    }
    
    return NextResponse.json({ success: true, count: formattedBlogs.length });
  } catch (error) {
    console.error("Error seeding blogs:", error);
    return NextResponse.json({ error: "Failed to seed blogs" }, { status: 500 });
  }
}
