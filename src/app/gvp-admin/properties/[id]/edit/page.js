"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import PropertyForm from "@/components/admin/PropertyForm";
import Link from "next/link";

export default function EditPropertyPage() {
  const { id } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/gvp-admin/properties/${id}`)
      .then((r) => {
        if (!r.ok) { setNotFound(true); return null; }
        return r.json();
      })
      .then((data) => {
        if (data) setProperty(data.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(form) {
    const res = await fetch(`/api/gvp-admin/properties/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Failed to update property.");
    }

    router.push("/gvp-admin/properties");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-6 h-6 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <p className="text-slate-500">Property not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/gvp-admin/properties" className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 transition-colors">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Edit Property</h2>
          <p className="text-sm text-slate-500">{property?.title || "Edit listing details"}</p>
        </div>
      </div>
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
        <PropertyForm initialData={property} onSubmit={handleSubmit} submitLabel="Save Changes" />
      </div>
    </div>
  );
}
