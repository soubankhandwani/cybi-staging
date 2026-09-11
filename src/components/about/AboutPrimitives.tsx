import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function AboutLabel({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return (
    <p className={cn("flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase sm:text-xs", inverse ? "text-mist-blue" : "text-steel")}>
      <span className={inverse ? "text-electric-blue" : "text-command-blue"}>/</span>
      {children}
    </p>
  );
}

export function ActionLink({
  href,
  children,
  variant = "primary",
  event,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "light" | "text";
  event?: string;
  className?: string;
}) {
  const variants = {
    primary: "border-signal-blue bg-signal-blue text-white hover:border-electric-blue hover:bg-electric-blue hover:text-obsidian",
    outline: "border-deep-navy bg-transparent text-deep-navy hover:bg-deep-navy hover:text-white dark:border-mist-blue dark:text-mist-blue dark:hover:bg-mist-blue dark:hover:text-obsidian",
    light: "border-intelligence-white bg-intelligence-white text-obsidian hover:border-electric-blue hover:bg-electric-blue",
    text: "border-transparent bg-transparent px-0 text-command-blue hover:text-obsidian dark:text-electric-blue dark:hover:text-white",
  } as const;

  return (
    <Link
      href={href}
      data-event={event}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 border-2 px-5 py-3 text-xs font-bold tracking-[0.12em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric-blue",
        variants[variant],
        className,
      )}
    >
      {children}
      <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
    </Link>
  );
}

export function CornerMarks() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-3">
      <span className="absolute top-0 left-0 h-5 w-5 border-t border-l border-electric-blue" />
      <span className="absolute top-0 right-0 h-5 w-5 border-t border-r border-electric-blue" />
      <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-electric-blue" />
      <span className="absolute right-0 bottom-0 h-5 w-5 border-r border-b border-electric-blue" />
    </span>
  );
}
