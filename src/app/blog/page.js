import BlogPage from "@/components/blog/BlogPage";
import { getCollection } from "@/lib/mongodb";

export const metadata = {
  title: "Blog | Grove Vista Properties",
  description:
    "Expert real estate insights, market guides, and project spotlights for Mumbai homebuyers and investors.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const blogsCollection = await getCollection("blogs");
  const blogs = await blogsCollection.find({}).toArray();
  
  // Sort by date string (latest first)
  blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

  const serializedBlogs = blogs.map(blog => ({
    ...blog,
    _id: blog._id.toString()
  }));

  return <BlogPage blogs={serializedBlogs} />;
}