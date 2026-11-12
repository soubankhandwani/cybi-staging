"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BookOpen, ExternalLink, FilePlus2, LayoutDashboard, LogOut } from "lucide-react";

export function AdminShell({ children, adminName }: { children: React.ReactNode; adminName: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/blogs/new", label: "New blog", icon: FilePlus2 },
  ];
  async function logout() {
    if (pending) return;
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/admin/auth/logout", { method: "POST" });
      if (!response.ok) throw new Error();
      router.replace("/admin/login");
      router.refresh();
    } catch {
      setError("Sign-out failed. Please try again.");
      setPending(false);
    }
  }
  return (
    <div className="admin-surface min-h-screen bg-[#f3f5f8] text-[#111827]">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col bg-[#101a2b] text-white lg:flex">
        <Link href="/admin" className="flex h-20 items-center border-b border-white/10 px-7 text-lg font-bold tracking-[-0.04em]">
          CYBER-I <span className="ml-2 text-[#62b5ff]">PUBLISH</span>
        </Link>
        <nav className="flex-1 space-y-1 p-4">
          {links.map(({ href, label, icon: Icon }) => {
            const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
            return <Link key={href} href={href} className={`flex items-center gap-3 px-4 py-3 text-sm font-bold ${active ? "bg-[#23559c] text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}><Icon className="h-4 w-4" />{label}</Link>;
          })}
          <Link href="/blog" target="_blank" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-300 hover:bg-white/5 hover:text-white"><BookOpen className="h-4 w-4" />View live blog<ExternalLink className="ml-auto h-3.5 w-3.5" /></Link>
        </nav>
        <div className="border-t border-white/10 p-4">
          <p className="truncate px-4 pb-3 text-xs text-slate-400">Signed in as<br /><span className="text-slate-200">{adminName}</span></p>
          <button onClick={logout} disabled={pending} className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-sm font-bold text-slate-300 hover:bg-red-500/10 hover:text-red-300 disabled:opacity-60"><LogOut className="h-4 w-4" />Log out</button>
        </div>
      </aside>
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 lg:ml-64 lg:px-8">
        <Link href="/admin" className="font-bold lg:hidden">CYBER-I <span className="text-command-blue">PUBLISH</span></Link>
        <p className="hidden text-xs font-bold tracking-widest text-slate-500 uppercase lg:block">Editorial control room</p>
        <div className="flex items-center lg:hidden"><Link aria-label="New blog" href="/admin/blogs/new" className="grid h-11 w-11 place-items-center text-command-blue"><FilePlus2 className="h-5 w-5" /></Link><button aria-label="Log out" onClick={logout} disabled={pending} className="grid h-11 w-11 place-items-center disabled:opacity-60"><LogOut className="h-5 w-5" /></button></div>
      </header>
      <main className="px-4 py-8 sm:px-6 lg:ml-64 lg:px-10 lg:py-10">{error && <p role="alert" className="mb-4 border-l-4 border-red-500 bg-red-50 p-3 text-sm text-red-800">{error}</p>}{children}</main>
    </div>
  );
}

