import BlogForm from "@/components/admin/BlogForm";
import { getCollection } from "@/lib/mongodb";
import { notFound } from "next/navigation";

export default async function EditBlogPage({ params }) {
  const { slug } = await params;
  const blogsCollection = await getCollection("blogs");
  const blog = await blogsCollection.findOne({ slug });

  if (!blog) {
    notFound();
  }

  // Convert _id to string
  const serializedBlog = {
    ...blog,
    _id: blog._id.toString()
  };

  return <BlogForm initialData={serializedBlog} />;
}
