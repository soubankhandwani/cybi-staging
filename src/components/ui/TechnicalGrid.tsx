import { cn } from "@/lib/cn";

export function TechnicalGrid({ large = false, className }: { large?: boolean; className?: string }) {
  return <span aria-hidden="true" className={cn("pointer-events-none absolute inset-0 opacity-80", large ? "technical-grid-large" : "technical-grid", className)} />;
}
