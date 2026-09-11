import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow: string;
  children: ReactNode;
  align?: "left" | "center";
  actions?: ReactNode;
  className?: string;
  headingClassName?: string;
}

export function SectionHeading({ eyebrow, children, align = "left", actions, className, headingClassName }: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <p className={cn("mb-6 flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] text-steel uppercase dark:text-mist-blue sm:text-xs", align === "center" && "justify-center")}>
        <span className="font-black text-command-blue dark:text-electric-blue">/</span>
        {eyebrow}
      </p>
      <h2 className={cn("text-[8vw] leading-[1.08] font-bold tracking-tight text-obsidian uppercase dark:text-intelligence-white sm:text-[5vw] md:text-[3.2vw]", headingClassName)}>
        {children}
      </h2>
      {actions}
    </div>
  );
}
