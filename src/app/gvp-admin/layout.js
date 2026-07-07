"use client";

import { usePathname } from "next/navigation";
import AdminNavbar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  if (pathname === "/gvp-admin/login") {
    return children;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNavbar />
      <main className="pt-[130px] px-6 md:px-12 lg:px-16 pb-12 mx-auto max-w-[100%] lg:max-w-[95%]"> 
        {children}
      </main>
    </div>
  );
}
