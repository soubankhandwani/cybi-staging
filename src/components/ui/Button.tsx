import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "outline" | "dark" | "modal";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variants: Record<ButtonVariant, string> = {
  primary: "border-command-blue bg-signal-blue text-intelligence-white hover:border-electric-blue hover:bg-electric-blue hover:text-obsidian",
  outline: "border-command-blue bg-transparent text-command-blue hover:bg-command-blue hover:text-intelligence-white dark:border-mist-blue dark:text-mist-blue dark:hover:bg-mist-blue dark:hover:text-obsidian",
  dark: "border-obsidian bg-obsidian text-electric-blue hover:bg-midnight",
  modal: "border-electric-blue bg-transparent text-electric-blue hover:bg-electric-blue hover:text-obsidian",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2.5 text-[11px]",
  md: "px-5 py-2.5 text-xs",
  lg: "px-6 py-3.5 text-xs md:text-sm",
};

export function Button({ className, variant = "primary", size = "md", children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "cursor-pointer border-2 text-center font-bold tracking-widest uppercase transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
