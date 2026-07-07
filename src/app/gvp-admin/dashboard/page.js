import { getCollection } from "@/lib/mongodb";
import Link from "next/link";

export const metadata = { title: "Dashboard | Grove Vista Properties Admin" };
export const dynamic = "force-dynamic";

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

export default async function DashboardPage() {
  const [bookings, applications, properties, newsletters] = await Promise.all([
    getCollection("bookings").then((col) =>
      col.find({}, { projection: { _id: 0 } }).sort({ submittedAt: -1 }).toArray()
    ),
    getCollection("applications").then((col) =>
      col.find({}, { projection: { _id: 0 } }).sort({ submittedAt: -1 }).toArray()
    ),
    getCollection("properties").then((col) =>
      col.find({}, { projection: { _id: 0 } }).toArray()
    ),
    getCollection("newsletter").then((col) =>
      col.find({}, { projection: { _id: 0 } }).sort({ subscribedAt: -1 }).toArray()
    ),
  ]);

  const recentBookings = bookings.slice(0, 5);
  const recentApplications = applications.slice(0, 5);
  const recentNewsletters = newsletters.slice(0, 5);

  const stats = [
    {
      label: "Total Listings",
      value: properties.length,
      sub: "Live listings",
      color: "blue",
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      href: "/gvp-admin/properties",
    },
    {
      label: "Property Bookings",
      value: bookings.length,
      sub: "Total bookings",
      color: "violet",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
      href: "/gvp-admin/bookings",
    },
    {
      label: "Career Applications",
      value: applications.length,
      sub: "Total applicants",
      color: "emerald",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      href: "/gvp-admin/applications",
    },
    {
      label: "Newsletter Subs",
      value: newsletters.length,
      sub: "Total subscribers",
      color: "amber",
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      href: "/gvp-admin/newsletter",
    },
  ];

  const colorMap = {
    blue:   { bg: "bg-blue-50",    icon: "text-blue-600",   val: "text-blue-700"   },
    violet: { bg: "bg-violet-50",  icon: "text-violet-600", val: "text-violet-700" },
    emerald:{ bg: "bg-emerald-50", icon: "text-emerald-600",val: "text-emerald-700"},
    amber:  { bg: "bg-amber-50",   icon: "text-amber-600",  val: "text-amber-700"  },
  };

  return (
    <div className="space-y-8">

      {/* ── Page header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1">Admin Console</p>
          <h1 className="font-serif text-2xl font-bold text-slate-900 md:text-3xl">
            Grove Vista <span className="text-amber-600">Properties</span>
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const c = colorMap[s.color];
          return (
            <Link
              key={s.label}
              href={s.href}
              className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-100 hover:shadow-md"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${c.bg} ${c.icon}`}>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-500">{s.label}</p>
                <p className={`mt-0.5 text-3xl font-black ${c.val}`}>{s.value}</p>
                <p className="mt-0.5 text-xs text-slate-400">{s.sub}</p>
              </div>
              <svg className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          );
        })}
      </div>

      {/* ── Recent activity ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Recent Bookings */}
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Recent Bookings</h3>
            </div>
            <Link href="/gvp-admin/bookings" className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentBookings.length === 0 ? (
              <p className="px-5 py-10 text-center text-sm text-slate-400">No bookings yet.</p>
            ) : (
              recentBookings.map((b) => (
                <Link
                  key={b.id}
                  href={`/gvp-admin/bookings/${b.id}`}
                  className="group flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-slate-50/60"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 text-xs font-black select-none">
                      {(b.fullName?.[0] || "?").toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-amber-600 transition-colors truncate">
                        {b.fullName}
                      </p>
                      <p className="text-xs text-slate-400 truncate max-w-[180px]">{b.subject}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0 ml-3">{fmt(b.submittedAt)}</span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Recent Applications</h3>
            </div>
            <Link href="/gvp-admin/applications" className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentApplications.length === 0 ? (
              <p className="px-5 py-10 text-center text-sm text-slate-400">No applications yet.</p>
            ) : (
              recentApplications.map((a) => (
                <Link
                  key={a.id}
                  href={`/admin/applications/${a.id}`}
                  className="group flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-slate-50/60"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-black select-none">
                      {(a.fullName?.[0] || "?").toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-amber-600 transition-colors truncate">
                        {a.fullName}
                      </p>
                      <p className="text-xs text-slate-400">{a.department}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0 ml-3">{fmt(a.submittedAt)}</span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Newsletter Subscribers */}
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Recent Subscribers</h3>
            </div>
            <Link href="/gvp-admin/newsletter" className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentNewsletters.length === 0 ? (
              <p className="px-5 py-10 text-center text-sm text-slate-400">No subscribers yet.</p>
            ) : (
              recentNewsletters.map((n) => (
                <Link
                  key={n.id}
                  href={`/gvp-admin/newsletter`}
                  className="group flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-slate-50/60"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-xs font-black select-none">
                      {((n.name || n.email)?.[0] || "?").toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-amber-600 transition-colors truncate">
                        {n.name || "Subscriber"}
                      </p>
                      <p className="text-xs text-slate-400 truncate max-w-[150px]">{n.email}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0 ml-3">{fmt(n.subscribedAt)}</span>
                </Link>
              ))
            )}
          </div>
        </div>

      </div>

      {/* ── Footer ── */}
      <p className="text-center text-xs text-slate-400 pb-2">
        Grove Vista Properties — Admin Console &copy; {new Date().getFullYear()}
      </p>

    </div>
  );
}
