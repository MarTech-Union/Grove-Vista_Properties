"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BlogForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showJson, setShowJson] = useState(false);
  
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    excerpt: initialData?.excerpt || "",
    category: initialData?.category || "Buyer's Guide",
    date: initialData?.date || "",
    readTime: initialData?.readTime || "",
    author: initialData?.author || "Grove Vista Properties",
    slug: initialData?.slug || "",
    primaryKeyword: initialData?.primaryKeyword || "",
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    image: initialData?.image || "",
  });

  const [contentJson, setContentJson] = useState(JSON.stringify(initialData?.content || [], null, 2));

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let parsedContent = [];
    try {
      parsedContent = JSON.parse(contentJson);
    } catch (err) {
      alert("Invalid JSON in content blocks");
      setLoading(false);
      return;
    }

    const payload = {
      ...formData,
      content: parsedContent,
    };

    try {
      const url = initialData ? `/api/blogs/${initialData.slug}` : "/api/blogs";
      const method = initialData ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/gvp-admin/blogs");
      } else {
        const error = await res.json();
        alert(error.error || "Failed to save blog");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">
          {initialData ? "Edit Blog" : "Create New Blog"}
        </h1>
        <button
          onClick={() => router.push("/gvp-admin/blogs")}
          className="text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Basic Info</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700">Title</label>
              <input required type="text" name="title" value={formData.title} onChange={handleInputChange} className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700">Excerpt</label>
              <textarea required name="excerpt" value={formData.excerpt} onChange={handleInputChange} className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2" rows="3" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Slug (URL)</label>
              <input required type="text" name="slug" value={formData.slug} onChange={handleInputChange} className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Category</label>
              <input required type="text" name="category" value={formData.category} onChange={handleInputChange} className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Date (e.g. April 18, 2026)</label>
              <input required type="text" name="date" value={formData.date} onChange={handleInputChange} className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Read Time</label>
              <input required type="text" name="readTime" value={formData.readTime} onChange={handleInputChange} className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700">Hero Image URL</label>
              <input required type="text" name="image" value={formData.image} onChange={handleInputChange} className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">SEO Meta</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Primary Keyword</label>
              <input type="text" name="primaryKeyword" value={formData.primaryKeyword} onChange={handleInputChange} className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Meta Title</label>
              <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleInputChange} className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700">Meta Description</label>
              <textarea name="metaDescription" value={formData.metaDescription} onChange={handleInputChange} className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2" rows="2" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-900">Content Blocks</h2>
            <button type="button" onClick={() => setShowJson(!showJson)} className="text-sm text-blue-600 hover:underline">Toggle JSON Editor</button>
          </div>
          
          <p className="text-sm text-slate-500 mb-4">
            For now, the content array is managed as a JSON object to preserve the complex block structure (e.g. leads, h2, p, ul). 
            Ensure it matches the array structure: <code>[{`{"type": "h2", "text": "Heading"}`}]</code>
          </p>
          
          <textarea 
            value={contentJson} 
            onChange={(e) => setContentJson(e.target.value)} 
            className="w-full rounded-lg border border-slate-300 px-4 py-2 font-mono text-sm" 
            rows="20" 
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Blog"}
        </button>
      </form>
    </div>
  );
}
