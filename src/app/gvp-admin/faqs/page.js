"use client";

import { useState, useEffect, useCallback } from "react";

const CATEGORIES = [
  { value: "buying", label: "Buying Property" },
  { value: "service&support", label: "Services & Support" },
  { value: "renting", label: "Renting & Leasing" },
  { value: "luxury", label: "Luxury Homes" },
  { value: "agency", label: "Working With Us" },
];

const EMPTY = { question: "", answer: "", order: "" };

export default function FaqsAdminPage() {
  const [category, setCategory] = useState("buying");
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [seeding, setSeeding] = useState("idle");
  const [seedMsg, setSeedMsg] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/gvp-admin/faqs?category=${category}`);
      const data = await res.json();
      setFaqs(data.items || []);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => { load(); }, [load]);

  function startEdit(faq) {
    setEditingId(faq.id);
    setForm({ question: faq.question, answer: faq.answer, order: faq.order ?? "" });
    setError("");
    setSuccess("");
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY);
    setError("");
    setSuccess("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.question.trim() || !form.answer.trim()) {
      setError("Question and answer are both required.");
      return;
    }
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      if (editingId) {
        const res = await fetch(`/api/gvp-admin/faqs/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: form.question, answer: form.answer, order: form.order }),
        });
        if (!res.ok) throw new Error();
        setSuccess("FAQ updated.");
      } else {
        const res = await fetch("/api/gvp-admin/faqs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category, question: form.question, answer: form.answer, order: form.order }),
        });
        if (!res.ok) throw new Error();
        setSuccess("FAQ added.");
      }
      setForm(EMPTY);
      setEditingId(null);
      await load();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleSeed() {
    if (seeding === "loading") return;
    setSeeding("loading");
    setSeedMsg("");
    try {
      const res = await fetch("/api/gvp-admin/seed-site-faqs", { method: "POST" });
      const data = await res.json();
      setSeedMsg(data.message || "Done.");
      setSeeding(res.ok ? "done" : "error");
      if (res.ok) await load();
    } catch {
      setSeedMsg("Network error. Please try again.");
      setSeeding("error");
    }
  }

  async function handleDelete(id) {
    setDeletingId(id);
    try {
      await fetch(`/api/gvp-admin/faqs/${id}`, { method: "DELETE" });
      setFaqs((prev) => prev.filter((f) => f.id !== id));
      if (editingId === id) cancelEdit();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Site FAQs</h2>
          <p className="text-sm text-slate-500 mt-0.5">Manage FAQs displayed on the public FAQ page.</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <button
            type="button"
            onClick={handleSeed}
            disabled={seeding === "loading" || seeding === "done"}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold shadow-sm transition-all disabled:opacity-60 ${
              seeding === "done"
                ? "bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-default"
                : "bg-white border border-slate-200 text-slate-700 hover:border-amber-400 hover:text-amber-700"
            }`}
          >
            {seeding === "loading" ? (
              <><span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />Seeding…</>
            ) : seeding === "done" ? (
              <><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>FAQs added!</>
            ) : (
              <><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>Add Sample FAQs</>
            )}
          </button>
          {seedMsg && <p className={`text-xs ${seeding === "error" ? "text-red-600" : "text-emerald-600"}`}>{seedMsg}</p>}
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => { setCategory(c.value); cancelEdit(); }}
            className={`rounded-xl px-5 py-2 text-sm font-bold transition ${
              category === c.value
                ? "bg-amber-400 text-slate-900 shadow-sm"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid gap-8 xl:grid-cols-3">

        {/* FAQ list — 2/3 */}
        <div className="xl:col-span-2 space-y-3">
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-slate-400 py-8">
              <span className="h-4 w-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
              Loading…
            </div>
          ) : faqs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
              <p className="text-sm font-semibold text-slate-400">No FAQs yet for this category.</p>
              <p className="text-xs text-slate-400 mt-1">Add one using the form →</p>
            </div>
          ) : (
            faqs.map((faq, i) => (
              <div key={faq.id} className={`rounded-2xl border p-5 ${editingId === faq.id ? "border-amber-300 bg-amber-50/40" : "border-slate-100 bg-white"}`}>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 leading-snug">{faq.question}</p>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">{faq.answer}</p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => startEdit(faq)}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(faq.id)}
                      disabled={deletingId === faq.id}
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      {deletingId === faq.id ? "…" : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Form — 1/3 */}
        <div className="xl:col-span-1">
          <div className="sticky top-[100px] rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold text-slate-900 mb-4">{editingId ? "Edit FAQ" : "Add New FAQ"}</p>

            {error && <p className="mb-3 rounded-xl bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-700">{error}</p>}
            {success && <p className="mb-3 rounded-xl bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-700">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-700">Question *</label>
                <input
                  type="text"
                  value={form.question}
                  onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
                  placeholder="e.g. What documents do I need?"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-700">Answer *</label>
                <textarea
                  rows={5}
                  value={form.answer}
                  onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
                  placeholder="Write a clear, helpful answer…"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 resize-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-700">Display Order <span className="font-normal text-slate-400">(optional)</span></label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm((f) => ({ ...f, order: e.target.value }))}
                  placeholder="1, 2, 3…"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-xl bg-amber-400 py-2.5 text-sm font-bold text-slate-900 hover:bg-amber-300 transition-colors disabled:opacity-60"
                >
                  {saving ? "Saving…" : editingId ? "Update FAQ" : "Add FAQ"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
