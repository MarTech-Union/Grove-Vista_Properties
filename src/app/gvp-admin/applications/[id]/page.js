import { getCollection } from "@/lib/mongodb";
import { notFound } from "next/navigation";
import Link from "next/link";
import DeleteApplicationButton from "./DeleteApplicationButton";

export const dynamic = "force-dynamic";

function Row({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 border-b border-slate-50 last:border-0">
      <span className="w-36 shrink-0 text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
      <span className="text-sm text-slate-800 break-all">{value || "—"}</span>
    </div>
  );
}

export default async function ApplicationDetailPage({ params }) {
  const { id } = await params;
  const col = await getCollection("applications");
  const app = await col.findOne({ id }, { projection: { _id: 0 } });
  if (!app) notFound();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/applications" className="text-sm font-semibold text-blue-600 hover:underline">← Back</Link>
        <h2 className="text-xl font-bold text-slate-900">Application Detail</h2>
      </div>

      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
        <Row label="Full Name" value={app.fullName} />
        <Row label="Email" value={app.email} />
        <Row label="Mobile" value={app.mobile} />
        <Row label="Department" value={app.department} />
        <Row label="Nationality" value={app.nationality} />
        <Row label="In Mumbai" value={app.inMumbai} />
        <Row label="CV File" value={app.cvFileName} />
        <Row label="Application ID" value={app.id} />
        <Row label="Submitted At" value={new Date(app.submittedAt).toLocaleString("en-IN")} />
      </div>

      <DeleteApplicationButton id={id} />
    </div>
  );
}
