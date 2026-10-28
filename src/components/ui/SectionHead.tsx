import { Reveal } from "./Reveal";

export function SectionHead({
  kicker,
  index,
  title,
  lead,
  align = "start",
}: {
  kicker: string;
  index?: string;
  title: string;
  lead?: string;
  align?: "start" | "center";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "text-center" : ""}>
      <Reveal>
        <div className={`flex items-center gap-4 ${centered ? "justify-center" : ""}`}>
          <span className="font-display text-[10px] tracking-[0.3em] text-white/40">{index}</span>
          <span className="h-px w-9 bg-lime/70" />
          <span className="kicker text-white/55">{kicker}</span>
        </div>
      </Reveal>
      <Reveal delay={0.07}>
        <h2 className="h-title mt-5 text-white">{title}</h2>
      </Reveal>
      {lead ? (
        <Reveal delay={0.14}>
          <p
            className={`body-copy mt-5 max-w-[54ch] text-white/55 ${centered ? "mx-auto" : ""}`}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
