"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/admin/ConfirmModal";

export default function DeleteApplicationButton({ id }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const res = await fetch(`/api/gvp-admin/applications/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.push("/gvp-admin/applications");
      router.refresh();
    }
  }

  return (
    <>
      <ConfirmModal
        open={open}
        title="Delete application?"
        message="This will permanently delete this career application. This cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setOpen(false)}
      />
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-700 transition-colors"
      >
        Delete Application
      </button>
    </>
  );
}
