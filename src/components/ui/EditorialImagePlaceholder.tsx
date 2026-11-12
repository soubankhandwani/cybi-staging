import { cn } from "@/lib/cn";
import { TechnicalGrid } from "@/components/ui/TechnicalGrid";

interface EditorialImagePlaceholderProps {
  code: string;
  subject: string;
  altDraft: string;
  inverse?: boolean;
  className?: string;
}

export function EditorialImagePlaceholder({ code, subject, altDraft, inverse = false, className }: EditorialImagePlaceholderProps) {
  return (
    <figure
      role="img"
      aria-label={`Image placeholder: ${subject}`}
      className={cn(
        "editorial-image-placeholder group relative isolate flex w-full min-w-0 min-h-56 overflow-hidden border [overflow-wrap:anywhere]",
        inverse ? "border-mist-blue/50 bg-midnight text-intelligence-white" : "border-deep-navy bg-ice-gray text-obsidian",
        className,
      )}
    >
      <TechnicalGrid large className={inverse ? "opacity-20" : "opacity-60"} />
      <span aria-hidden="true" className="absolute top-4 left-4 h-6 w-6 border-t border-l border-electric-blue" />
      <span aria-hidden="true" className="absolute top-4 right-4 h-6 w-6 border-t border-r border-electric-blue" />
      <span aria-hidden="true" className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-electric-blue" />
      <span aria-hidden="true" className="absolute right-4 bottom-4 h-6 w-6 border-r border-b border-electric-blue" />
      <div className="relative z-10 flex w-full flex-col justify-between p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-2 text-[8px] font-bold tracking-[0.15em] uppercase">
          <span className={inverse ? "text-electric-blue" : "text-command-blue"}>{code}</span>
          <span className={inverse ? "text-mist-blue" : "text-steel"}>Media / Pending</span>
        </div>
        <div className="my-10 max-w-md">
          <p className="text-lg font-bold tracking-[-0.025em] uppercase sm:text-xl">[Authentic image required]</p>
          <p className={cn("mt-3 text-[10px] leading-5 font-bold tracking-[0.1em] uppercase", inverse ? "text-mist-blue" : "text-steel")}>{subject}</p>
        </div>
        <figcaption className={cn("border-t pt-4 text-[8px] leading-4 font-bold tracking-[0.1em] uppercase", inverse ? "border-deep-navy text-mist-blue" : "border-mist-blue text-steel")}>
          Alt-text draft / {altDraft}
        </figcaption>
      </div>
      <span aria-hidden="true" className="absolute top-1/2 left-0 h-px w-full origin-left scale-x-0 bg-electric-blue/50 transition-transform duration-700 group-hover:scale-x-100" />
    </figure>
  );
}
