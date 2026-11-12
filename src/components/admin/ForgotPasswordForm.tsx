"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, LoaderCircle } from "lucide-react";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState<"request" | "reset">("request");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  async function requestCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setError("");
    const form = new FormData(event.currentTarget); const value = String(form.get("email") || "");
    try { const response = await fetch("/api/admin/auth/forgot-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: value }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error); setEmail(value); setMessage(data.message); setStep("reset"); }
    catch (err) { setError(err instanceof Error ? err.message : "Unable to send code."); } finally { setPending(false); }
  }
  async function reset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setError("");
    const form = new FormData(event.currentTarget); const password = String(form.get("password"));
    if (password !== form.get("confirmPassword")) { setError("Passwords do not match."); setPending(false); return; }
    try { const response = await fetch("/api/admin/auth/reset-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, otp: form.get("otp"), password }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error); router.replace("/admin/login?reset=success"); }
    catch (err) { setError(err instanceof Error ? err.message : "Unable to reset password."); setPending(false); }
  }
  return step === "request" ? (
    <form onSubmit={requestCode} className="mt-9 space-y-5">
      {error && <div role="alert" className="border-l-4 border-red-500 bg-red-50 p-3 text-sm text-red-800">{error}</div>}
      <label className="block"><span className="mb-2 block text-xs font-bold tracking-wider text-slate-600 uppercase">Admin email</span><input name="email" type="email" required autoComplete="email" className="admin-input" /></label>
      <button disabled={pending} className="flex w-full cursor-pointer items-center justify-center gap-2 bg-command-blue px-5 py-4 text-sm font-bold text-white disabled:opacity-70">{pending && <LoaderCircle className="h-4 w-4 animate-spin" />}Send reset code</button>
      <Link href="/admin/login" className="flex items-center justify-center gap-2 text-xs font-bold text-slate-600 hover:text-command-blue"><ArrowLeft className="h-4 w-4" />Back to sign in</Link>
    </form>
  ) : (
    <form onSubmit={reset} className="mt-8 space-y-4">
      <div className="flex gap-3 bg-blue-50 p-4 text-sm leading-6 text-blue-900"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0" /><span>{message}</span></div>
      {error && <div role="alert" className="border-l-4 border-red-500 bg-red-50 p-3 text-sm text-red-800">{error}</div>}
      <label className="block"><span className="admin-label">Six-digit code</span><input name="otp" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required autoComplete="one-time-code" className="admin-input text-center text-xl tracking-[0.4em]" /></label>
      <label className="block"><span className="admin-label">New password</span><input name="password" type="password" minLength={12} maxLength={128} required autoComplete="new-password" className="admin-input" /><span className="mt-2 block text-[11px] leading-5 text-slate-500">At least 12 characters with upper/lowercase, a number, and a symbol.</span></label>
      <label className="block"><span className="admin-label">Confirm password</span><input name="confirmPassword" type="password" minLength={12} required autoComplete="new-password" className="admin-input" /></label>
      <button disabled={pending} className="flex w-full cursor-pointer items-center justify-center gap-2 bg-command-blue px-5 py-4 text-sm font-bold text-white disabled:opacity-70">{pending && <LoaderCircle className="h-4 w-4 animate-spin" />}Reset password</button>
      <button type="button" onClick={() => setStep("request")} className="w-full cursor-pointer text-xs font-bold text-slate-600 hover:text-command-blue">Request another code</button>
    </form>
  );
}

