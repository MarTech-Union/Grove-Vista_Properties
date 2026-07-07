"use client";

import { useEffect, useState, useCallback } from "react";
import DataTable from "@/components/admin/DataTable";

function fmt(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

const COLUMNS = [
  { key: "email", label: "Email" },
  {
    key: "subscribedAt",
    label: "Subscribed",
    render: (v) => fmt(v),
  },
];

export default function NewsletterAdminPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gvp-admin/newsletter?limit=100");
      const data = await res.json();
      setRows(data.items || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(id) {
    await fetch(`/api/gvp-admin/newsletter/${id}`, { method: "DELETE" });
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  async function handleBulkDelete(ids) {
    await fetch("/api/gvp-admin/newsletter", {
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
        searchPlaceholder="Search by email or name…"
        emptyMessage="No newsletter subscribers yet."
        title="Newsletter Subscribers"
        subtitle={`${rows.length} subscriber${rows.length !== 1 ? "s" : ""}`}
      />
    </div>
  );
}