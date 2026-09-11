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
        src={hideText ? "/images/brand/cyberi-site-icon.png" : "/images/brand/cyberi-logo.png"}
        alt="Cyber-I"
        width={hideText ? 512 : 650}
        height={hideText ? 512 : 196}
        priority
        className={cn("h-full w-auto object-contain", imageClassName)}
      />
    </Link>
  );
}
