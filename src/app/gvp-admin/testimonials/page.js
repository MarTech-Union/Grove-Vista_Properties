"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import ConfirmModal from "@/components/admin/ConfirmModal";

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gvp-admin/testimonials");
      const data = await res.json();
      setItems(data.items || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleDelete() {
    if (!deleteTarget) return;
    await fetch(`/api/gvp-admin/testimonials/${deleteTarget}`, { method: "DELETE" });
    setItems((prev) => prev.filter((p) => p.id !== deleteTarget));
    setDeleteTarget(null);
  }

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
        title="Delete testimonial?"
        message="This will permanently remove this testimonial from the public pages. Cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Testimonials</h2>
            <p className="mt-0.5 text-sm text-slate-500">
              {items.length} testimonial{items.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            href="/gvp-admin/testimonials/new"
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-slate-900 shadow-sm transition-colors hover:bg-amber-400"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Add Testimonial
          </Link>
        </div>

        {/* Table */}
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-20 text-center">
            <p className="text-sm text-slate-500">No testimonials yet.</p>
            <Link href="/gvp-admin/testimonials/new" className="mt-3 inline-block text-sm font-semibold text-amber-600 hover:underline">
              Add Testimonial →
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-100 bg-slate-50">
                <tr>
                  {/* <th className="w-14 px-4 py-3 text-left font-semibold text-slate-600">Avatar</th> */}
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Client</th>
                  <th className="hidden px-4 py-3 text-left font-semibold text-slate-600 md:table-cell">Quote</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 bg-white">
                {items.map((t) => (
                  <tr key={t.id} className="transition-colors hover:bg-slate-50/60">
                    {/* <td className="px-4 py-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-100">
                        <div className="flex h-full w-full items-center justify-center text-sm font-bold text-slate-400">
                          {t.name?.[0] ?? "?"}
                        </div>
                      </div>
                    </td> */}
                    <td className="max-w-[180px] px-4 py-3">
                      <p className="truncate font-semibold text-slate-900">{t.name}</p>
                      {t.role && <p className="truncate text-xs text-slate-500">{t.role}</p>}
                    </td>
                    <td className="hidden max-w-[300px] px-4 py-3 md:table-cell">
                      <p className="line-clamp-2 text-xs text-slate-500">&quot;{t.quote}&quot;</p>
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        <Link
                          href={`/admin/testimonials/${t.id}/edit`}
                          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(t.id)}
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
