"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const COLUMNS = [
  { col: "title", req: true, note: "Property name" },
  { col: "price", req: false, note: 'Display price, e.g. "₹2.5 Cr"' },
  { col: "priceCr", req: false, note: "Numeric price in Crore, e.g. 2.5" },
  { col: "location", req: false, note: "City / area" },
  { col: "category", req: false, note: "sale · rent · off-plan" },
  { col: "propertyFor", req: false, note: "residential · commercial" },
  { col: "type", req: false, note: "Apartment · Villa · Office · Retail…" },
  { col: "status", req: false, note: "Ready · Off Plan" },
  { col: "sqft", req: false, note: "Area in sq ft" },
  { col: "beds", req: false, note: "Number of bedrooms" },
  { col: "baths", req: false, note: "Number of bathrooms" },
  { col: "description", req: false, note: "Short description" },
  { col: "image", req: false, note: "Full image URL" },
  { col: "tag", req: false, note: 'Badge label, e.g. "New Launch"' },
];

export default function UploadPropertiesPage() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | uploading | done | error
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);

  function pickFile(f) {
    if (!f) return;
    const ok = f.name.endsWith(".xlsx") || f.name.endsWith(".xls") || f.name.endsWith(".csv");
    if (!ok) {
      setResult({ error: "Only .xlsx, .xls, or .csv files are accepted." });
      setStatus("error");
      return;
    }
    setFile(f);
    setStatus("idle");
    setResult(null);
  }

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    pickFile(e.dataTransfer.files[0]);
  }

  async function handleUpload() {
    if (!file || status === "uploading") return;
    setStatus("uploading");
    setResult(null);

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/gvp-admin/upload-properties", { method: "POST", body: fd });
      const data = await res.json();
      setResult(data);
      setStatus(res.ok ? "done" : "error");
      if (res.ok) setFile(null);
    } catch {
      setResult({ message: "Network error. Please try again." });
      setStatus("error");
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">Bulk Import</p>
          <h2 className="text-xl font-bold text-slate-900">Upload Properties via Excel</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Upload an .xlsx, .xls, or .csv file — all rows become live listings instantly.
          </p>
        </div>
        <Link
          href="/gvp-admin/properties"
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
        >
          View All Properties
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid gap-8 xl:grid-cols-3">

        {/* Upload area — 2/3 */}
        <div className="xl:col-span-2 space-y-5">

          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={`relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed cursor-pointer transition-all py-16 px-8 text-center ${
              dragging
                ? "border-amber-400 bg-amber-50"
                : file
                ? "border-emerald-300 bg-emerald-50/40"
                : "border-slate-200 bg-slate-50 hover:border-amber-300 hover:bg-amber-50/30"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              onChange={(e) => pickFile(e.target.files?.[0])}
            />

            {file ? (
              <>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
                  <svg className="h-7 w-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{file.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{(file.size / 1024).toFixed(1)} KB — click to change</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                  <svg className="h-7 w-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-700">Drop your file here or click to browse</p>
                  <p className="text-xs text-slate-400 mt-1">Supports .xlsx · .xls · .csv</p>
                </div>
              </>
            )}
          </div>

          {/* Result banner */}
          {result && (
            <div className={`rounded-2xl border px-5 py-4 ${
              status === "done"
                ? "border-emerald-200 bg-emerald-50"
                : "border-red-200 bg-red-50"
            }`}>
              <p className={`font-semibold text-sm ${status === "done" ? "text-emerald-800" : "text-red-800"}`}>
                {status === "done" ? "✓ " : "✕ "}{result.message}
              </p>
              {status === "done" && result.skipped > 0 && (
                <p className="text-xs text-emerald-600 mt-1">{result.skipped} row{result.skipped !== 1 ? "s" : ""} skipped (missing title).</p>
              )}
              {status === "done" && (
                <Link href="/gvp-admin/properties" className="mt-2 inline-block text-xs font-bold text-emerald-700 hover:underline">
                  View imported properties →
                </Link>
              )}
            </div>
          )}

          {/* Upload button */}
          <button
            type="button"
            onClick={handleUpload}
            disabled={!file || status === "uploading"}
            className="w-full rounded-xl bg-amber-400 py-3.5 text-sm font-bold text-slate-900 shadow-sm transition-all hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "uploading" ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-slate-900 border-t-transparent animate-spin" />
                Importing…
              </span>
            ) : "Import Properties"}
          </button>
        </div>

        {/* Column reference — 1/3 */}
        <div className="xl:col-span-1">
          <div className="sticky top-[100px] rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold text-slate-900 mb-1">Expected Columns</p>
            <p className="text-xs text-slate-500 mb-4">Column names are flexible — the system matches case-insensitively.</p>

            <div className="space-y-2">
              {COLUMNS.map((c) => (
                <div key={c.col} className="flex items-start gap-2.5">
                  <code className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-bold font-mono ${
                    c.req ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-600"
                  }`}>
                    {c.col}
                  </code>
                  <span className="text-xs text-slate-500 leading-snug pt-0.5">{c.note}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
              <p className="text-[11px] font-bold text-amber-800 uppercase tracking-wider mb-1">Required</p>
              <p className="text-xs text-amber-700">
                Only <code className="font-mono font-bold">title</code> is required. All other columns are optional — rows missing a title are skipped.
              </p>
            </div>

            <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
              <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Category values</p>
              <p className="text-xs text-slate-500">
                <span className="font-bold">sale</span> · <span className="font-bold">rent</span> · <span className="font-bold">off-plan</span>
              </p>
              <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mt-2 mb-1">PropertyFor values</p>
              <p className="text-xs text-slate-500">
                <span className="font-bold">residential</span> · <span className="font-bold">commercial</span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
