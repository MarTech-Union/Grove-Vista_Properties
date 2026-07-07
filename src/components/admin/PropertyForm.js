"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TYPES = ["Apartment", "Villa", "Townhouse", "Penthouse", "Studio"];
const TAGS = ["HOT DEAL", "PREMIUM", "OFF PLAN", "FURNISHED", "EXCLUSIVE", ""];
const CATEGORIES = [
  { label: "Sale", value: "sale" },
  { label: "Rent", value: "rent" },
  { label: "Off-Plan", value: "off-plan" },
];
const PROPERTY_FOR = [
  { label: "Residential", value: "residential" },
  { label: "Commercial", value: "commercial" },
];

const inputClass = "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-amber-400 focus:bg-white";
const labelClass = "mb-1 block text-xs font-semibold text-slate-600";

function Field({ label, name, value, onChange, textarea, type = "text", required, placeholder, children }) {
  return (
    <div>
      <label className={labelClass}>{label}{required && " *"}</label>
      {children ?? (textarea ? (
        <textarea name={name} value={value} onChange={onChange} rows={4} placeholder={placeholder}
          className={inputClass + " resize-none"} />
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
          className={inputClass} />
      ))}
    </div>
  );
}

export default function PropertyForm({ initialData, onSubmit, submitLabel = "Save Property" }) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: initialData?.title || "",
    price: initialData?.price || "",
    priceCr: initialData?.priceCr || "",
    location: initialData?.location || "",
    category: initialData?.category || "sale",
    active: initialData?.active ?? true,
    type: initialData?.type || "Apartment",
    status: initialData?.status || "Ready",
    sqft: initialData?.sqft || "",
    beds: initialData?.beds || "",
    baths: initialData?.baths || "",
    image: initialData?.image || "",
    description: initialData?.description || "",
    tag: initialData?.tag || "",
    propertyFor: initialData?.propertyFor || "residential",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err.message || "Failed to save property.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Title" name="title" value={form.title} onChange={set("title")} required placeholder="Golf Course View | Ultra Luxury | Ready" />
        </div>

        <Field label="Display Price" name="price" value={form.price} onChange={set("price")} required placeholder="INR 45.00 Cr" />
        <Field label="Price in Cr (numeric)" name="priceCr" type="number" value={form.priceCr} onChange={set("priceCr")} placeholder="45" />

        <div className="sm:col-span-2">
          <Field label="Location" name="location" value={form.location} onChange={set("location")} required placeholder="Mulund, Mumbai" />
        </div>

        <Field label="Category">
          <select value={form.category} onChange={set("category")} className={inputClass}>
            {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </Field>

        <Field label="Property For">
          <select value={form.propertyFor} onChange={set("propertyFor")} className={inputClass}>
            {PROPERTY_FOR.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
        </Field>

        <Field label="Type">
          <select value={form.type} onChange={set("type")} className={inputClass}>
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>

        <Field label="Tag">
          <select value={form.tag} onChange={set("tag")} className={inputClass}>
            {TAGS.map((t) => <option key={t} value={t}>{t || "— None —"}</option>)}
          </select>
        </Field>

        <Field label="Beds" name="beds" type="number" value={form.beds} onChange={set("beds")} placeholder="4" />
        <Field label="Baths" name="baths" type="number" value={form.baths} onChange={set("baths")} placeholder="5" />

        <div className="sm:col-span-2">
          <Field label="Area (sqft)" name="sqft" value={form.sqft} onChange={set("sqft")} placeholder="7,100" />
        </div>

        <div className="sm:col-span-2">
          <Field label="Image URL" name="image" type="url" value={form.image} onChange={set("image")} placeholder="https://images.unsplash.com/…" />
          {form.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.image} alt="Preview" className="mt-2 h-32 w-full rounded-xl object-cover border border-slate-100"
              onError={(e) => { e.target.style.display = "none"; }} />
          )}
        </div>

        <div className="sm:col-span-2">
          <Field label="Description" name="description" value={form.description} onChange={set("description")} textarea placeholder="Stunning ultra-luxury apartment with…" />
        </div>

        <div className="sm:col-span-2 flex items-center gap-2">
          <input type="checkbox" id="active" checked={form.active}
            onChange={(e) => setForm((prev) => ({ ...prev, active: e.target.checked }))}
            className="h-4 w-4 rounded border-slate-300 accent-amber-400" />
          <label htmlFor="active" className="text-sm font-medium text-slate-700">Active (Show on Website)</label>
        </div>
      </div>

      <div className="flex gap-3 border-t border-slate-100 pt-5">
        <button type="submit" disabled={loading}
          className="rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-slate-900 hover:bg-amber-400 disabled:opacity-50 transition-colors">
          {loading ? "Saving…" : submitLabel}
        </button>
        <button type="button" onClick={() => router.back()}
          className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}

