"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/gvp-admin");

  return (
    <div className="flex min-h-full flex-col">
      {!isAdminRoute && <Header />}
      <main className={`flex-1 ${!isAdminRoute ? "pt-25" : ""}`}>{children}</main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}