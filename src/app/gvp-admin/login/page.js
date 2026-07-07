import { Suspense } from "react";
import Image from "next/image";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata = { title: "Admin Login | Grove Vista Properties" };

export default function AdminLoginPage() {
  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center p-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/luxuryImg.jpg"
          alt="Luxury Real Estate Background"
          fill
          className="object-cover brightness-[0.3]"
          priority
        />
      </div>

      {/* ── Login Form Container ── */}
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl sm:p-12">
        <div className="w-full">
          {/* Heading */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Welcome back</h2>
            <p className="mt-2 text-sm text-slate-500">Sign in to access the admin dashboard.</p>
          </div>

          <Suspense>
            <AdminLoginForm />
          </Suspense>

          <p className="mt-8 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Grove Vista Properties
          </p>
        </div>
      </div>
    </div>
  );
}
