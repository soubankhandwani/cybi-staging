"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoaderCircle, Pencil, Trash2 } from "lucide-react";

export function BlogActions({ id, title }: { id: string; title: string }) {
  const router = useRouter(); const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function remove() {
    if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) return;
    setPending(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      if (response.status === 401) { router.replace("/admin/login"); return; }
      if (!response.ok && response.status !== 404) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Could not delete the blog.");
      }
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not delete the blog.");
      setPending(false);
    }
  }
  return <div><div className="flex items-center justify-end gap-1"><Link href={`/admin/blogs/${id}/edit`} aria-label={`Edit ${title}`} className="grid h-11 w-11 place-items-center text-slate-600 hover:bg-blue-50 hover:text-command-blue"><Pencil className="h-4 w-4" /></Link><button type="button" disabled={pending} onClick={remove} aria-label={`Delete ${title}`} className="grid h-11 w-11 cursor-pointer place-items-center text-slate-600 hover:bg-red-50 hover:text-red-600 disabled:cursor-wait">{pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}</button></div>{error && <p role="alert" className="mt-2 text-right text-xs text-red-800">{error}</p>}</div>;
}

