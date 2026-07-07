"use client";

import { useState, useEffect, useCallback } from "react";

// ── Section config ──────────────────────────────────────────────────────────
const PROPERTY_DEVS = [
  { value: "lodha",   label: "Lodha Group" },
  { value: "oberoi",  label: "Oberoi Realty" },
  { value: "godrej",  label: "Godrej Properties" },
  { value: "piramal", label: "Piramal Realty" },
  { value: "marathon",label: "Marathon Group" },
];

const LISTING_TABS = {
  residential: [
    { value: "sale-residential",     label: "Sale" },
    { value: "rent-residential",     label: "Rent" },
    { value: "off-plan-residential", label: "Off-Plan" },
  ],
  commercial: [
    { value: "sale-commercial",     label: "Sale" },
    { value: "rent-commercial",     label: "Rent" },
    { value: "off-plan-commercial", label: "Off-Plan" },
  ],
};

const SITE_CATEGORIES = [
  { value: "buying",          label: "Buying Property" },
  { value: "service&support", label: "Services & Support" },
  { value: "renting",         label: "Renting & Leasing" },
  { value: "luxury",          label: "Luxury Homes" },
  { value: "agency",          label: "Working With Us" },
];

const EMPTY = { question: "", answer: "", order: "" };

// ── Helpers ─────────────────────────────────────────────────────────────────
function apiFor(section, slug) {
  if (section === "site-faq") {
    return {
      list:   `/api/gvp-admin/faqs?category=${slug}`,
      create: `/api/gvp-admin/faqs`,
      item:   (id) => `/api/gvp-admin/faqs/${id}`,
      createBody: (slug, form) => ({ category: slug, ...form }),
    };
  }
  return {
    list:   `/api/gvp-admin/developer-faqs?developer=${slug}`,
    create: `/api/gvp-admin/developer-faqs`,
    item:   (id) => `/api/gvp-admin/developer-faqs/${id}`,
    createBody: (slug, form) => ({ developer: slug, ...form }),
  };
}

// ── Main component ───────────────────────────────────────────────────────────
export default function DeveloperFaqsPage() {
  // Section navigation
  const [section, setSection] = useState("properties");

  // Sub-selections per section
  const [propDev,    setPropDev]    = useState("lodha");
  const [listingSlug, setListingSlug] = useState("sale-residential");
  const [siteCat,    setSiteCat]    = useState("buying");

  // Derived active slug
  const activeSlug =
    section === "properties" ? propDev :
    section === "listings"   ? listingSlug :
    siteCat;

  // FAQ CRUD state
  const [faqs,       setFaqs]       = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [saving,     setSaving]     = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [form,       setForm]       = useState(EMPTY);
  const [editingId,  setEditingId]  = useState(null);
  const [error,      setError]      = useState("");
  const [success,    setSuccess]    = useState("");

  // Seed / dedup state
  const [seedStates, setSeedStates] = useState({ properties: "idle", listings: "idle", siteFaq: "idle" });
  const [seedMsgs,   setSeedMsgs]   = useState({ properties: "", listings: "", siteFaq: "" });
  const [deduping,   setDeduping]   = useState("idle");
  const [dedupMsg,   setDedupMsg]   = useState("");

  // ── Load FAQs ──────────────────────────────────────────────────────────────
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const api = apiFor(section, activeSlug);
      const res = await fetch(api.list);
      const data = await res.json();
      setFaqs(data.items || []);
    } finally {
      setLoading(false);
    }
  }, [section, activeSlug]);

  useEffect(() => { load(); }, [load]);

  // ── Form helpers ───────────────────────────────────────────────────────────
  function startEdit(faq) {
    setEditingId(faq.id);
    setForm({ question: faq.question, answer: faq.answer, order: faq.order ?? "" });
    setError(""); setSuccess("");
  }
  function cancelEdit() {
    setEditingId(null); setForm(EMPTY); setError(""); setSuccess("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.question.trim() || !form.answer.trim()) {
      setError("Question and answer are required."); return;
    }
    setSaving(true); setError(""); setSuccess("");
    try {
      const api = apiFor(section, activeSlug);
      if (editingId) {
        const res = await fetch(api.item(editingId), {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: form.question, answer: form.answer, order: form.order }),
        });
        if (!res.ok) throw new Error();
        setSuccess("FAQ updated.");
      } else {
        const res = await fetch(api.create, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(api.createBody(activeSlug, { question: form.question, answer: form.answer, order: form.order })),
        });
        if (!res.ok) throw new Error();
        setSuccess("FAQ added.");
      }
      setForm(EMPTY); setEditingId(null);
      await load();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    setDeletingId(id);
    try {
      const api = apiFor(section, activeSlug);
      await fetch(api.item(id), { method: "DELETE" });
      setFaqs((prev) => prev.filter((f) => f.id !== id));
      if (editingId === id) cancelEdit();
    } finally {
      setDeletingId(null);
    }
  }

  // ── Seed / dedup ───────────────────────────────────────────────────────────
  async function runSeed(key, endpoint) {
    if (seedStates[key] === "loading") return;
    setSeedStates((s) => ({ ...s, [key]: "loading" }));
    setSeedMsgs((m) => ({ ...m, [key]: "" }));
    try {
      const res = await fetch(endpoint, { method: "POST" });
      const data = await res.json();
      setSeedMsgs((m) => ({ ...m, [key]: data.message || "Done." }));
      setSeedStates((s) => ({ ...s, [key]: res.ok ? "done" : "error" }));
      if (res.ok) await load();
    } catch {
      setSeedMsgs((m) => ({ ...m, [key]: "Network error." }));
      setSeedStates((s) => ({ ...s, [key]: "error" }));
    }
  }

  async function handleDedup() {
    if (deduping === "loading") return;
    setDeduping("loading"); setDedupMsg("");
    try {
      const [r1, r2] = await Promise.all([
        fetch("/api/gvp-admin/dedup-properties", { method: "POST" }).then((r) => r.json()),
        fetch("/api/gvp-admin/dedup-faqs",       { method: "POST" }).then((r) => r.json()),
      ]);
      const removed = (r1.removed || 0) + (r2.removed || 0);
      setDedupMsg(removed > 0 ? `Removed ${removed} duplicate${removed !== 1 ? "s" : ""}.` : "No duplicates found.");
      setDeduping("done");
      await load();
    } catch {
      setDedupMsg("Network error."); setDeduping("error");
    }
  }

  const SEED_ACTIONS = [
    { key: "properties", label: "Seed Properties",   endpoint: "/api/gvp-admin/seed-properties" },
    { key: "listings",   label: "Seed Listing FAQs", endpoint: "/api/gvp-admin/seed-faqs" },
    { key: "siteFaq",    label: "Seed Site FAQs",    endpoint: "/api/gvp-admin/seed-site-faqs" },
  ];

  // ── Section tab helpers ────────────────────────────────────────────────────
  function switchSection(s) {
    setSection(s); cancelEdit();
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">

      {/* ── Section buttons ── */}
      <div className="flex items-center gap-2">
        {[
          { id: "properties", label: "Properties" },
          { id: "listings",   label: "Listings" },
          { id: "site-faq",   label: "Site FAQ" },
        ].map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => switchSection(id)}
            className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
              section === id
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Sub-tabs per section ── */}
      {section === "properties" && (
        <div className="flex flex-wrap gap-2">
          {PROPERTY_DEVS.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => { setPropDev(d.value); cancelEdit(); }}
              className={`rounded-xl px-5 py-2 text-sm font-bold transition ${
                propDev === d.value
                  ? "bg-amber-400 text-slate-900 shadow-sm"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      )}

      {section === "listings" && (
        <div className="flex flex-col lg:inline-flex lg:flex-row rounded-2xl border border-slate-200 bg-slate-50 p-2 lg:p-1 gap-3 lg:gap-0">
          {[
            { group: "Residential", tabs: LISTING_TABS.residential },
            { group: "Commercial",  tabs: LISTING_TABS.commercial  },
          ].map(({ group, tabs }, gi) => (
            <div key={group} className={`flex flex-wrap lg:flex-nowrap items-center gap-2 lg:gap-1 px-1 lg:px-3 ${gi === 0 ? "border-b lg:border-b-0 lg:border-r border-slate-200 pb-3 lg:pb-0" : ""}`}>
              <span className="w-full lg:w-auto text-[11px] lg:text-[10px] font-bold uppercase tracking-wider text-slate-400 lg:mr-1">{group}</span>
              <div className="flex w-full lg:w-auto gap-2 lg:gap-1">
                {tabs.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => { setListingSlug(t.value); cancelEdit(); }}
                    className={`rounded-xl px-3 py-2 lg:px-4 lg:py-1.5 text-xs lg:text-sm font-bold transition flex-1 lg:flex-none text-center justify-center ${
                      listingSlug === t.value
                        ? "bg-amber-400 text-slate-900 shadow-sm"
                        : "bg-white lg:bg-transparent border border-slate-200 lg:border-transparent text-slate-600 hover:bg-white hover:text-slate-900"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {section === "site-faq" && (
        <div className="flex flex-wrap gap-2">
          {SITE_CATEGORIES.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => { setSiteCat(c.value); cancelEdit(); }}
              className={`rounded-xl px-5 py-2 text-sm font-bold transition ${
                siteCat === c.value
                  ? "bg-amber-400 text-slate-900 shadow-sm"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      {/* ── FAQ list + form ── */}
      <div className="grid gap-8 xl:grid-cols-3">

        {/* List — 2/3 */}
        <div className="xl:col-span-2 space-y-3">
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-slate-400 py-8">
              <span className="h-4 w-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
              Loading…
            </div>
          ) : faqs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
              <p className="text-sm font-semibold text-slate-400">No FAQs yet for this selection.</p>
              <p className="text-xs text-slate-400 mt-1">Add one using the form →</p>
            </div>
          ) : (
            faqs.map((faq, i) => (
              <div
                key={faq.id}
                className={`rounded-2xl border p-5 ${editingId === faq.id ? "border-amber-300 bg-amber-50/40" : "border-slate-100 bg-white"}`}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">
                    {i + 1}
                  </span>
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

            {error   && <p className="mb-3 rounded-xl bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-700">{error}</p>}
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
                <label className="mb-1.5 block text-xs font-bold text-slate-700">
                  Display Order <span className="font-normal text-slate-400">(optional)</span>
                </label>
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
