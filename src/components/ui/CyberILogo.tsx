import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface CyberILogoProps {
  className?: string;
  hideText?: boolean;
  imageClassName?: string;
}

export function CyberILogo({ className, hideText = false, imageClassName }: CyberILogoProps) {
  return (
    <Link href="/" aria-label="Cyber-I home" className={cn("flex select-none items-center", className)}>
      <Image
        src={hideText ? "/images/brand/cyber-i-site-icon-2026.png" : "/images/brand/cyber-i-logo-2026.png"}
        alt="Cyber-I"
        width={hideText ? 512 : 541}
        height={hideText ? 512 : 461}
        sizes={hideText ? "48px" : "(min-width: 640px) 52px, 48px"}
        priority
        className={cn("h-full w-auto object-contain", imageClassName)}
      />
    </Link>
  );
}
