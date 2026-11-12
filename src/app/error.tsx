"use client";

import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="mx-auto w-full max-w-xl bg-intelligence-white p-6 text-obsidian sm:p-10">
      <h1 className="text-2xl font-bold">This page is temporarily unavailable.</h1>
      <div className="mt-6 flex flex-wrap items-center gap-5">
        <button type="button" onClick={() => window.location.reload()} className="min-h-11 cursor-pointer bg-command-blue px-4 py-2 text-white">Try again</button>
        <Link href="/" className="underline">Return home</Link>
      </div>
    </div>
  );
}
