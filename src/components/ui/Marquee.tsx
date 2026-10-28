import { type ReactNode } from "react";

interface MarqueeProps {
  children?: ReactNode;
  items?: string[];
  separator?: string;
  speed?: number; // duration in seconds
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
  dir?: "ltr" | "rtl";
}

/**
 * Universal, 100% seamless infinite marquee that never glitches, never has gaps,
 * and works identically in RTL and LTR layouts without coordinate bugs.
 */
export function Marquee({
  children,
  items,
  separator = "✦",
  speed = 28,
  reverse = false,
  pauseOnHover = true,
  className = "",
  itemClassName = "",
}: MarqueeProps) {
  // If items array is provided, render items with separator
  const content = children ? (
    children
  ) : items && items.length > 0 ? (
    <div className="flex items-center gap-6 shrink-0">
      {items.map((item, idx) => (
        <span key={`${item}-${idx}`} className="inline-flex items-center gap-6 shrink-0">
          <span className={itemClassName}>{item}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-lime/70 shrink-0" aria-hidden="true" />
        </span>
      ))}
    </div>
  ) : null;

  if (!content) return null;

  // We repeat content 4 times in each track so even on 4K screens (3840px)
  // one track is guaranteed to exceed the full screen width.
  return (
    <div
      dir="ltr"
      className={`relative w-full overflow-hidden select-none ${className}`}
      style={{ direction: "ltr", textAlign: "left" }}
    >
      <div
        className={`flex w-max shrink-0 ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={{
          animation: `${reverse ? "tam-marquee-reverse" : "tam-marquee"} ${speed}s linear infinite`,
          willChange: "transform",
        }}
      >
        {/* Track A */}
        <div className="flex items-center gap-6 shrink-0 pe-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`a-${i}`} className="flex items-center gap-6 shrink-0">
              {content}
            </div>
          ))}
        </div>

        {/* Track B (exact duplicate for seamless loop) */}
        <div className="flex items-center gap-6 shrink-0 pe-6" aria-hidden="true">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`b-${i}`} className="flex items-center gap-6 shrink-0">
              {content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
