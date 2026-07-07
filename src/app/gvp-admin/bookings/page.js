"use client";

import { useState, useEffect, useCallback } from "react";
import DataTable from "@/components/admin/DataTable";

function fmt(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch { return dateStr; }
}

const COLUMNS = [
  { key: "fullName", label: "Full Name" },
  { key: "email", label: "Email" },
  { 
    key: "mobile", 
    label: "Phone",
    render: (v, row) => {
      const code = row.countryCode ? `${row.countryCode} ` : "";
      return v ? `${code}${v}` : "—";
    }
  },
  {
    key: "source",
    label: "Source",
    render: (v) => {
      if (v === "contact_page") return "Contact Us";
      if (v === "website_booking") return "Booking Page";
      if (v === "default") return "Popup Form";
      if (v === "newsletter") return "Newsletter";
      return v || "Legacy";
    }
  },
  { 
    key: "subject", 
    label: "Subject",
    render: (v) => v || "—"
  },
  {
    key: "message",
    label: "Message",
    render: (v) => v ? (
      <span className="block truncate max-w-[200px]" title={v}>
        {v}
      </span>
    ) : "—"
  },
  {
    key: "bookingDate",
    label: "Date",
    render: (v) => v || "—"
  },
  {
    key: "bookingTime",
    label: "Time Slot",
    render: (v) => v || "—"
  },
  {
    key: "submittedAt",
    label: "Submitted On",
    render: (v) => fmt(v),
  },
];

export default function BookingsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gvp-admin/bookings?limit=100");
      const data = await res.json();
      setRows(data.items || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id) {
    await fetch(`/api/gvp-admin/bookings/${id}`, { method: "DELETE" });
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  async function handleBulkDelete(ids) {
    await fetch("/api/gvp-admin/bookings", {
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
    <div className="w-full">
      <DataTable
        columns={COLUMNS}
        rows={rows}
        onDelete={handleDelete}
        onBulkDelete={handleBulkDelete}
        searchPlaceholder="Search by name, email or subject…"
        emptyMessage="No booking requests yet."
        title="Bookings & Call Requests"
        subtitle={`${rows.length} total request${rows.length !== 1 ? "s" : ""}`}
      />
    </div>
  );
}
