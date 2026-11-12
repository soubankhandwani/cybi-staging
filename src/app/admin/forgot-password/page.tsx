import { AuthCard } from "@/components/admin/AuthCard";
import { ForgotPasswordForm } from "@/components/admin/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return <AuthCard eyebrow="Account recovery" title="Reset password" description="We’ll send a time-limited one-time code to the administrator email."><ForgotPasswordForm /></AuthCard>;
}

