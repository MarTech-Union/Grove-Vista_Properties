"use client";

import { useState, useEffect, useCallback } from "react";
import DataTable from "@/components/admin/DataTable";
import Link from "next/link";

function fmt(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch { return dateStr; }
}

const COLUMNS = [
  { key: "fullName", label: "Name" },
  { key: "email", label: "Email" },
  { key: "department", label: "Department" },
  { key: "nationality", label: "Nationality" },
  { key: "inMumbai", label: "In Mumbai" },
  {
    key: "submittedAt",
    label: "Applied",
    render: (v) => fmt(v),
  },
  {
    key: "id",
    label: "Detail",
    sortable: false,
    render: (v) => (
      <Link href={`/admin/applications/${v}`} className="text-blue-600 hover:underline text-xs font-semibold">
        View →
      </Link>
    ),
  },
];

export default function ApplicationsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gvp-admin/applications?limit=100");
      const data = await res.json();
      setRows(data.items || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id) {
    await fetch(`/api/gvp-admin/applications/${id}`, { method: "DELETE" });
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  async function handleBulkDelete(ids) {
    await fetch("/api/gvp-admin/applications", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    setRows((prev) => prev.filter((r) => !ids.includes(r.id)));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-6 h-6 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <DataTable
        columns={COLUMNS}
        rows={rows}
        onDelete={handleDelete}
        onBulkDelete={handleBulkDelete}
        searchPlaceholder="Search by name, department…"
        emptyMessage="No career applications yet."
        title="Career Applications"
        subtitle={`${rows.length} total application${rows.length !== 1 ? "s" : ""}`}
      />
    </div>
  );
}
