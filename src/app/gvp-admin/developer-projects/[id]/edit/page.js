"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const DEVELOPERS = ["Lodha Group", "Oberoi Realty", "Godrej Properties", "Piramal Realty", "Marathon Group"];

function Field({ label, name, value, onChange, textarea, type = "text", required }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-slate-600">{label}{required && " *"}</label>
      {textarea ? (
        <textarea name={name} value={value} onChange={onChange} rows={3}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-amber-400 focus:bg-white" />
      ) : (
        <input type={type} name={name} value={value} onChange={onChange}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-amber-400 focus:bg-white" />
      )}
    </div>
  );
}

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/gvp-admin/developer-projects")
      .then((r) => r.json())
      .then((d) => {
        const item = (d.items || []).find((p) => p.id === id);
        if (item) {
          setForm({
            name: item.name, developer: item.developer, location: item.location,
            price: item.price, area: item.area, image: item.image,
            description: item.description,
            tags: Array.isArray(item.tags) ? item.tags.join(", ") : (item.tags || ""),
            featured: item.featured, order: item.order ?? 0,
          });
        }
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) { setError("Project name is required."); return; }
    setSaving(true);
    const res = await fetch(`/api/gvp-admin/developer-projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) { router.push("/gvp-admin/developer-projects"); }
    else { const d = await res.json(); setError(d.message || "Failed to update."); }
  };

  if (!form) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/gvp-admin/developer-projects" className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 transition-colors">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Edit Project</h2>
          <p className="text-sm text-slate-500">{form.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-5">
        {error && <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>}

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Project Name" name="name" value={form.name} onChange={handleChange} required />
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600">Developer *</label>
            <select name="developer" value={form.developer} onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-amber-400 focus:bg-white">
              {DEVELOPERS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <Field label="Location" name="location" value={form.location} onChange={handleChange} />
          <Field label="Price" name="price" value={form.price} onChange={handleChange} />
          <Field label="Area" name="area" value={form.area} onChange={handleChange} />
          <Field label="Display Order" name="order" type="number" value={form.order} onChange={handleChange} />
          <div className="sm:col-span-2">
            <Field label="Image URL" name="image" value={form.image} onChange={handleChange} />
          </div>
          <div className="sm:col-span-2">
            <Field label="Tags (comma-separated)" name="tags" value={form.tags} onChange={handleChange} />
          </div>
          <div className="sm:col-span-2">
            <Field label="Description" name="description" value={form.description} onChange={handleChange} textarea />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="featured" name="featured" checked={form.featured} onChange={handleChange}
              className="h-4 w-4 rounded border-slate-300 accent-amber-400" />
            <label htmlFor="featured" className="text-sm font-medium text-slate-700">Mark as Featured Project</label>
          </div>
        </div>

        <div className="flex gap-3 border-t border-slate-100 pt-5">
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-slate-900 hover:bg-amber-400 disabled:opacity-50 transition-colors">
            {saving ? "Saving…" : "Save Changes"}
          </button>
          <Link href="/gvp-admin/developer-projects"
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
