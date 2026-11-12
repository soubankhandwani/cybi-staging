import { redirect } from "next/navigation";
import { AuthCard } from "@/components/admin/AuthCard";
import { LoginForm } from "@/components/admin/LoginForm";
import { getCurrentAdmin } from "@/lib/server/auth";

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ reset?: string }> }) {
  let currentAdmin = null;
  try { currentAdmin = await getCurrentAdmin(); } catch { /* The form will show configuration errors. */ }
  if (currentAdmin) redirect("/admin");
  const reset = (await searchParams).reset === "success";
  return <AuthCard eyebrow="Cyber-I / Publishing" title="Welcome back" description="Sign in to manage and publish Cyber-I insights.">{reset && <div className="mb-5 bg-emerald-50 p-3 text-sm text-emerald-800">Password updated. You can now sign in.</div>}<LoginForm /></AuthCard>;
}
