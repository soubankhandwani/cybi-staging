"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";

export function ShareArticle({ title }: { title: string }) {
  const [status, setStatus] = useState("");
  const [manualUrl, setManualUrl] = useState("");

  async function share() {
    const url = window.location.origin + window.location.pathname;
    setStatus("");
    try {
      if (navigator.share) await navigator.share({ title, url });
      else {
        await navigator.clipboard.writeText(url);
        setStatus("Link copied.");
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      setManualUrl(url);
    }
  }

  return <div className="min-w-0 shrink-0 text-right">
    <button type="button" aria-label="Share article" onClick={share} className="ml-auto grid h-11 w-11 cursor-pointer place-items-center border border-deep-navy hover:bg-deep-navy hover:text-intelligence-white dark:border-mist-blue"><Share2 className="h-4 w-4" aria-hidden="true" /></button>
    {status && <p role="status" className="mt-2 text-xs">{status}</p>}
    {manualUrl && <input aria-label="Article link" readOnly value={manualUrl} onFocus={(event) => event.target.select()} className="mt-2 w-32 border p-1 text-xs sm:w-56" />}
  </div>;
}
