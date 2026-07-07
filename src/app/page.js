import HomePage from "@/components/home/HomePage";
import { getCollection } from "@/lib/mongodb";

export const metadata = {
  title: "Luxury Real Estate in India",
  description:
    "Explore premium Indian real estate with Grove Vista Properties. Find luxury apartments, villas and investment opportunities with expert guidance.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Grove Vista Properties | Luxury Real Estate in India",
    description: "Discover premium listings and property advisory support across India.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grove Vista Properties",
    description: "Luxury apartments, villas and investment-ready properties in India.",
  },
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const blogsCollection = await getCollection("blogs");
  const blogs = await blogsCollection.find({}).toArray();
  blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

  const serializedBlogs = blogs.slice(0, 3).map(blog => ({
    ...blog,
    _id: blog._id.toString()
  }));

  return <HomePage latestBlogs={serializedBlogs} />;
}
