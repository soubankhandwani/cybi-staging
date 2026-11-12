"use client";

import { useState } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { contactLimits, enquiryTypes } from "@/lib/contact";

interface ContactFormData {
  email: string;
  enquiryType: string;
  message: string;
  name: string;
  organisation: string;
  phone: string;
  website: string;
}

const initialFormData: ContactFormData = { email: "", enquiryType: "", message: "", name: "", organisation: "", phone: "", website: "" };

export function ContactForm({ initialEnquiry = "", initialMessage = "" }: { initialEnquiry?: string; initialMessage?: string }) {
  const [formData, setFormData] = useState({ ...initialFormData, enquiryType: initialEnquiry, message: initialMessage });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field: keyof ContactFormData, value: string) => setFormData((current) => ({ ...current, [field]: value }));

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        setError(result?.error || "Your enquiry could not be sent. Please try again.");
        return;
      }
      setSubmitSuccess(true);
      setFormData(initialFormData);
    } catch {
      setError("Your enquiry could not be sent. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="flex min-h-[31rem] flex-col justify-between border border-command-blue bg-intelligence-white p-6 dark:bg-obsidian sm:p-8" role="status">
        <CheckCircle2 className="h-10 w-10 text-signal-blue" aria-hidden="true" />
        <div>
          <h2 className="text-3xl font-bold tracking-[-0.05em] uppercase sm:text-4xl">Your enquiry was sent.</h2>
          <p className="mt-5 text-sm leading-6 text-steel dark:text-mist-blue">The Cyber-I team can reply to the email address you provided.</p>
        </div>
        <button type="button" onClick={() => setSubmitSuccess(false)} className="min-h-11 cursor-pointer border border-deep-navy px-5 py-3 text-xs font-bold tracking-widest uppercase hover:bg-deep-navy hover:text-intelligence-white dark:border-mist-blue">Send another inquiry</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      {error && <p role="alert" className="border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-900">{error}</p>}
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="contact-name" label="Name" required><input id="contact-name" name="name" autoComplete="name" required minLength={2} maxLength={contactLimits.name} value={formData.name} onChange={(event) => updateField("name", event.target.value)} className="contact-input" /></FormField>
        <FormField id="contact-organisation" label="Organisation (optional)"><input id="contact-organisation" name="organisation" autoComplete="organization" maxLength={contactLimits.organisation} value={formData.organisation} onChange={(event) => updateField("organisation", event.target.value)} className="contact-input" /></FormField>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="contact-email" label="Email" required><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={contactLimits.email} value={formData.email} onChange={(event) => updateField("email", event.target.value)} className="contact-input" /></FormField>
        <FormField id="contact-phone" label="Contact number (optional)"><input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={contactLimits.phone} value={formData.phone} onChange={(event) => updateField("phone", event.target.value)} className="contact-input" /></FormField>
      </div>
      <FormField id="contact-enquiry" label="Service required" required>
          <select id="contact-enquiry" name="enquiryType" required value={formData.enquiryType} onChange={(event) => updateField("enquiryType", event.target.value)} className="contact-input appearance-none">
            <option value="" disabled>Select one</option>{enquiryTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
      </FormField>
      <FormField id="contact-message" label="Message" required hint="Please avoid sharing passwords or highly sensitive evidence through this form."><textarea id="contact-message" name="message" required rows={7} minLength={20} maxLength={contactLimits.message} aria-describedby="contact-message-hint" value={formData.message} onChange={(event) => updateField("message", event.target.value)} className="contact-input resize-y normal-case" /></FormField>
      <div className="absolute -left-[9999px]" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={(event) => updateField("website", event.target.value)} /></div>
      <p className="text-[10px] leading-5 text-steel dark:text-mist-blue">By submitting, you agree that Cyber-I may use these details to respond to your enquiry. Review the <a className="underline underline-offset-4 hover:text-command-blue" href="/privacy-policy">privacy policy</a>.</p>
      <button type="submit" disabled={isSubmitting} className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 border-2 border-command-blue bg-signal-blue px-6 py-4 text-xs font-bold tracking-[0.18em] text-intelligence-white uppercase transition-colors hover:border-electric-blue hover:bg-electric-blue hover:text-obsidian disabled:cursor-not-allowed disabled:opacity-60">
        {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}{isSubmitting ? "Sending enquiry" : "Send enquiry"}
      </button>
    </form>
  );
}

function FormField({ id, label, children, required = false, hint }: { id: string; label: string; children: React.ReactNode; required?: boolean; hint?: string }) {
  return <div className="flex min-w-0 flex-col gap-2"><label htmlFor={id} className="text-[10px] font-bold tracking-[0.15em] text-deep-navy uppercase dark:text-mist-blue">{label}{required && <span className="ml-1 text-command-blue dark:text-electric-blue">*</span>}</label>{children}{hint && <p id={`${id}-hint`} className="text-[9px] leading-4 text-steel">{hint}</p>}</div>;
}
