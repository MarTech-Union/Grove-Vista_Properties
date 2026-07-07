"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const BREADCRUMBS = {
  "/gvp-admin/dashboard": "Dashboard",
  "/gvp-admin/applications": "Career Applications",
  "/gvp-admin/properties": "Properties",
  "/gvp-admin/properties/new": "New Property",
};

function getBreadcrumb(pathname) {
  if (BREADCRUMBS[pathname]) return BREADCRUMBS[pathname];
  if (pathname.endsWith("/edit")) return "Edit Property";
  if (pathname.match(/\/admin\/applications\/.+/)) return "Application Detail";
  return "Admin";
}

// Builds a parent crumb for nested routes
function getParentCrumb(pathname) {
  if (pathname.match(/\/admin\/applications\/.+/))
    return { label: "Applications", href: "/gvp-admin/applications" };
  if (pathname.match(/\/admin\/properties\/.+/))
    return { label: "Properties", href: "/gvp-admin/properties" };
  return null;
}

export default function AdminTopbar({ onMenuClick }) {
  const pathname = usePathname();
  const router = useRouter();
  const title = getBreadcrumb(pathname);
  const parent = getParentCrumb(pathname);

  async function handleLogout() {
    await fetch("/api/gvp-admin/auth/logout", { method: "POST" });
    router.push("/gvp-admin/login");
    router.refresh();
  }

  return (
<header className="w-full flex h-16 items-center justify-between border-b border-black-900 bg-white px-12 md:px-16 shrink-0 z-10 sticky top-0"> {/* Left — hamburger + breadcrumb */} 
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="md:hidden flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-sm min-w-0">
          {parent ? (
            <>
              <Link
                href={parent.href}
                className="text-slate-400 hover:text-blue-600 font-medium transition-colors shrink-0"
              >
                {parent.label}
              </Link>
              <svg className="w-3.5 h-3.5 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="font-bold text-slate-900 truncate">{title}</span>
            </>
          ) : (
            <h1 className="font-bold text-slate-900 text-base truncate">{title}</h1>
          )}
        </div>
      </div>

      {/* Right — admin badge only (logout is in sidebar) */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-sm select-none">
          A
        </div>
        <span className="hidden sm:block text-sm font-semibold text-slate-700">Admin</span>

        {/* Logout — kept here for quick access on mobile where sidebar is hidden */}
        <button
          onClick={handleLogout}
          className="ml-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-500 border border-slate-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
