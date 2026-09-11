import { cn } from "@/lib/cn";

interface MarqueeProps {
  items: string[];
  variant?: "ticker" | "chips";
  direction?: "left" | "right";
  speed?: "normal" | "fast" | "slow";
}

export function Marquee({ items, variant = "ticker", direction = "left", speed = "normal" }: MarqueeProps) {
  const animation = direction === "right" ? "marquee-right" : speed === "fast" ? "marquee-left-fast" : speed === "slow" ? "marquee-left-slow" : "marquee-left";
  const content = [...items, ...items];

  return (
    <div className="w-full overflow-hidden" aria-label={items.join(", ")}>
      <div className={cn(animation, "items-center whitespace-nowrap")} aria-hidden="true">
        {content.map((item, index) =>
          variant === "chips" ? (
            <span key={`${item}-${index}`} className="mx-2 flex items-center gap-2 border-2 border-command-blue bg-signal-blue px-5 py-2.5 text-xs font-bold tracking-wider text-intelligence-white uppercase sm:text-sm">
              <span>✓</span>{item}
            </span>
          ) : (
            <span key={`${item}-${index}`} className="flex items-center gap-12">
              <span>{item}</span><span className="text-[10px] text-electric-blue">■</span>
            </span>
          ),
        )}
      </div>
    </div>
  );
}
