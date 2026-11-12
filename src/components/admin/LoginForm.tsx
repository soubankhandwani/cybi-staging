"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowRight, Eye, EyeOff, LoaderCircle, LockKeyhole } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setPending(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/admin/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email"), password: form.get("password") }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed.");
      router.replace("/admin"); router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : "Login failed."); setPending(false); }
  }
  return (
    <form onSubmit={submit} className="mt-9 space-y-5">
      {error && <div role="alert" className="border-l-4 border-red-500 bg-red-50 p-3 text-sm text-red-800">{error}</div>}
      <label className="block"><span className="mb-2 block text-xs font-bold tracking-wider text-slate-600 uppercase">Admin email</span><input name="email" type="email" autoComplete="username" required maxLength={254} className="admin-input" placeholder="admin@company.com" /></label>
      <label className="block"><span className="mb-2 block text-xs font-bold tracking-wider text-slate-600 uppercase">Password</span><span className="relative block"><input name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required maxLength={128} className="admin-input pr-12" placeholder="Enter your password" /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)} className="absolute inset-y-0 right-0 grid w-12 cursor-pointer place-items-center text-slate-500">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></span></label>
      <div className="flex justify-end"><Link href="/admin/forgot-password" className="text-xs font-bold text-command-blue hover:underline">Forgot password?</Link></div>
      <button disabled={pending} className="flex w-full cursor-pointer items-center justify-center gap-3 bg-command-blue px-5 py-4 text-sm font-bold text-white hover:bg-deep-navy disabled:cursor-wait disabled:opacity-70">{pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />}{pending ? "Signing in…" : "Sign in"}<ArrowRight className="h-4 w-4" /></button>
    </form>
  );
}

