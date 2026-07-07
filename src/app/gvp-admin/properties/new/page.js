"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import PropertyForm from "@/components/admin/PropertyForm";

export default function NewPropertyPage() {
  const router = useRouter();

  async function handleSubmit(form) {
    const res = await fetch("/api/gvp-admin/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Failed to create property.");
    }

    router.push("/gvp-admin/properties");
    router.refresh();
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
          <h2 className="text-xl font-bold text-slate-900">Add New Property</h2>
          <p className="text-sm text-slate-500">Add a new listing to the website</p>
        </div>
      </div>
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
        <PropertyForm onSubmit={handleSubmit} submitLabel="Create Property" />
      </div>
    </div>
  );
}
