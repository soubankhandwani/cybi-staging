import Link from "next/link";
import { companyName } from "@/data/company";

export function Footer() {
  return (
    <footer className="relative z-10 mt-auto flex w-full flex-col items-center justify-between gap-4 border-t border-deep-navy bg-midnight p-4 text-[10px] font-bold tracking-widest text-mist-blue uppercase sm:flex-row sm:text-xs">
      <div>© 2026 {companyName}</div>
      <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-4 sm:gap-6">
        <Link href="/gallery" className="transition-colors hover:text-electric-blue">Gallery</Link>
        <Link href="/testimonials" className="transition-colors hover:text-electric-blue">Testimonials</Link>
      </nav>
    </footer>
  );
}
