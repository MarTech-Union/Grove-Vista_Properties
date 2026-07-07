"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import ConfirmModal from "@/components/admin/ConfirmModal";

const DEVELOPER_TABS = [
  { label: "All", value: "all" },
  { label: "Lodha Group", value: "Lodha Group" },
  { label: "Oberoi Realty", value: "Oberoi Realty" },
  { label: "Godrej Properties", value: "Godrej Properties" },
  { label: "Piramal Realty", value: "Piramal Realty" },
  { label: "Marathon Group", value: "Marathon Group" },
];

const DEVELOPER_COLORS = {
  "Lodha Group": "bg-red-50 text-red-700",
  "Oberoi Realty": "bg-orange-50 text-orange-700",
  "Godrej Properties": "bg-green-50 text-green-700",
  "Piramal Realty": "bg-blue-50 text-blue-700",
  "Marathon Group": "bg-purple-50 text-purple-700",
};

export default function DeveloperProjectsAdminPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [activeDev, setActiveDev] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gvp-admin/developer-projects");
      const data = await res.json();
      setItems(data.items || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleDelete() {
    if (!deleteTarget) return;
    await fetch(`/api/gvp-admin/developer-projects/${deleteTarget}`, { method: "DELETE" });
    setItems((prev) => prev.filter((p) => p.id !== deleteTarget));
    setDeleteTarget(null);
  }

  const filtered = activeDev === "all" ? items : items.filter((p) => p.developer === activeDev);

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <ConfirmModal
        open={!!deleteTarget}
        title="Delete project?"
        message="This will permanently remove this project from the public pages. Cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Developer Projects</h2>
            <p className="mt-0.5 text-sm text-slate-500">
              {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            href="/gvp-admin/developer-projects/new"
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-slate-900 shadow-sm transition-colors hover:bg-amber-400"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Add Project
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2">
          {DEVELOPER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveDev(tab.value)}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                activeDev === tab.value
                  ? "bg-amber-400 text-slate-900 shadow-sm"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-20 text-center">
            <p className="text-sm text-slate-500">No projects found.</p>
            <Link href="/gvp-admin/developer-projects/new" className="mt-3 inline-block text-sm font-semibold text-amber-600 hover:underline">
              Add Project →
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-100 bg-slate-50">
                <tr>
                  <th className="w-16 px-4 py-3 text-left font-semibold text-slate-600">Photo</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Project</th>
                  <th className="hidden px-4 py-3 text-left font-semibold text-slate-600 md:table-cell">Price</th>
                  <th className="hidden px-4 py-3 text-left font-semibold text-slate-600 lg:table-cell">Developer</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 bg-white">
                {filtered.map((p) => (
                  <tr key={p.id} className="transition-colors hover:bg-slate-50/60">
                    <td className="px-4 py-3">
                      <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        {p.image ? (
                          <Image src={p.image} alt={p.name} fill className="object-cover" sizes="64px" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="max-w-[220px] px-4 py-3">
                      <div className="flex items-center gap-2">
                        <p className="truncate font-semibold text-slate-900">{p.name}</p>
                        {p.featured && (
                          <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">Featured</span>
                        )}
                      </div>
                      <p className="truncate text-xs text-slate-500">{p.location}</p>
                      {p.area && <p className="text-[11px] text-slate-400">{p.area}</p>}
                    </td>
                    <td className="hidden whitespace-nowrap px-4 py-3 font-semibold text-slate-800 md:table-cell">
                      {p.price || "—"}
                    </td>
                    <td className="hidden px-4 py-3 lg:table-cell">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${DEVELOPER_COLORS[p.developer] || "bg-slate-100 text-slate-600"}`}>
                        {p.developer}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        <Link
                          href={`/admin/developer-projects/${p.id}/edit`}
                          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(p.id)}
                          className="rounded-lg border border-red-100 px-3 py-1.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-50"
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
