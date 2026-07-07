"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import ConfirmModal from "@/components/admin/ConfirmModal";

const CATEGORY_TABS = [
  { label: "All", value: "all" },
  { label: "Sale", value: "sale" },
  { label: "Rent", value: "rent" },
  { label: "Off-Plan", value: "off-plan" },
];

const PROPERTY_FOR_TABS = [
  { label: "All", value: "all" },
  { label: "Residential", value: "residential" },
  { label: "Commercial", value: "commercial" },
];

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activePropertyFor, setActivePropertyFor] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gvp-admin/properties");
      const data = await res.json();
      setProperties(data.items || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete() {
    if (!deleteTarget) return;
    await fetch(`/api/gvp-admin/properties/${deleteTarget}`, { method: "DELETE" });
    setProperties((prev) => prev.filter((p) => p.id !== deleteTarget));
    setDeleteTarget(null);
  }

  const filteredProperties = properties.filter((p) => {
    const categoryMatch =
      activeCategory === "all" ? true : p.category === activeCategory;

    const propertyForMatch =
      activePropertyFor === "all" ? true : p.propertyFor === activePropertyFor;

    return categoryMatch && propertyForMatch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-6 h-6 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <>
      <ConfirmModal
        open={!!deleteTarget}
        title="Delete property?"
        message="This will permanently remove this listing from the public pages. Cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Listings</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {filteredProperties.length} listing{filteredProperties.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/gvp-admin/upload-properties"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm hover:border-amber-400 hover:text-amber-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload Excel
            </Link>
            <Link
              href="/gvp-admin/properties/new"
              className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-slate-900 shadow-sm hover:bg-amber-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Add Listing
            </Link>
          </div>
        </div>

        {/* PropertyFor Tabs */}
        <div className="flex flex-wrap gap-2">
          {PROPERTY_FOR_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActivePropertyFor(tab.value)}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                activePropertyFor === tab.value
                  ? "bg-amber-400 text-slate-900 shadow-sm"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveCategory(tab.value)}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                activeCategory === tab.value
                  ? "bg-amber-400 text-slate-900 shadow-sm"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filteredProperties.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-20 text-center">
            <p className="text-slate-500 text-sm">No properties found in this category.</p>
            <Link href="/gvp-admin/properties/new" className="mt-3 inline-block text-sm font-semibold text-amber-600 hover:underline">
              Add Listing →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600 w-16">Photo</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Listing</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Price</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Type</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 bg-white">
                {filteredProperties.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Thumbnail */}
                    <td className="px-4 py-3">
                      <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        {p.image ? (
                          <Image src={p.image} alt={p.title} fill className="object-cover" sizes="64px" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Title + location */}
                    <td className="px-4 py-3 max-w-[220px]">
                      <p className="font-semibold text-slate-900 truncate">{p.title}</p>
                      <p className="text-xs text-slate-500 truncate">{p.location}</p>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">
                        {p.beds && <span>{p.beds} bd</span>}
                        {p.baths && <span>{p.baths} ba</span>}
                        {p.sqft && <span>{p.sqft} sqft</span>}
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">
                      {p.price || "—"}
                    </td>

                    {/* Type badges */}
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {p.category && (
                          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 capitalize">{p.category}</span>
                        )}
                        {p.propertyFor && (
                          <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-bold text-violet-700 capitalize">{p.propertyFor}</span>
                        )}
                      </div>
                    </td>


                    {/* Actions */}
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <Link
                          href={`/admin/properties/${p.id}/edit`}
                          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(p.id)}
                          className="rounded-lg border border-red-100 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
