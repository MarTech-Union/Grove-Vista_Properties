// src/app/blog/[slug]/page.js

import { getCollection } from "@/lib/mongodb";
import BlogDetailPage from "@/components/blog/BlogDetailPage";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const blogsCollection = await getCollection("blogs");
  const blogs = await blogsCollection.find({}, { projection: { slug: 1 } }).toArray();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blogsCollection = await getCollection("blogs");
  const blog = await blogsCollection.findOne({ slug });
  
  if (!blog) return {};
  return {
    title: (blog.metaTitle || blog.title) + " | Grove Vista Properties",
    description: blog.metaDescription || blog.excerpt,
  };
}

export default async function BlogDetailRoute({ params }) {
  const { slug } = await params;
  const blogsCollection = await getCollection("blogs");
  const blog = await blogsCollection.findOne({ slug });
  
  if (!blog) {
    notFound();
  }

  // Convert _id to string for serialization
  const serializedBlog = {
    ...blog,
    _id: blog._id.toString()
  };

  return <BlogDetailPage blog={serializedBlog} />;
}