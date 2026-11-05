import { Reveal } from "./ui/Reveal";
import { useLang } from "../i18n/LangContext";

export function Glance() {
  const { c, dir } = useLang();
  const glance = c.glance;

  return (
    <section className="relative border-t border-white/10 py-16 md:py-24 bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-0.5 w-7 bg-lime/80" />
            <span className="kicker text-white/60 font-semibold">{glance.kicker}</span>
          </div>
          <h2 className="h-title mt-4 text-white text-[24px] md:text-[32px] max-w-[40ch]">
            {glance.title}
          </h2>
          <p className="body-copy mt-2 text-white/65 text-[14.5px] max-w-[60ch]">
            {glance.lead}
          </p>
        </Reveal>

        {/* 4 Core Metrics Grid from Page 5 */}
        <div className="mt-10 grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4 border border-white/10">
          {glance.stats.map((st, i) => (
            <Reveal key={st.label} delay={i * 0.05}>
              <div className="group h-full bg-ink p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.03]">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-3xl md:text-5xl font-bold tracking-tight text-lime group-hover:drop-shadow-[0_0_15px_rgba(223,255,0,0.4)] transition-all">
                    {st.num}
                  </span>
                  <span className="font-display text-[10px] text-white/30">0{i + 1}</span>
                </div>
                <h3 className="h-sub mt-4 text-white text-[16px] md:text-[18px] group-hover:text-lime transition-colors">
                  {st.label}
                </h3>
                <p className="mt-1 text-[12px] text-white/50">{st.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 5-Stage Lifecycle Bar from Page 5 */}
        <Reveal delay={0.15}>
          <div className="mt-10 border border-white/12 bg-white/[0.02] p-5 md:p-7">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <span className="kicker text-[11px] text-lime font-bold tracking-wider">
                {glance.lifecycleTitle}
              </span>
              <span className="font-display text-[9.5px] tracking-[0.2em] text-white/40">
                100% IN-HOUSE TIMELINE
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
              {glance.lifecycle.map((lc, idx) => (
                <div
                  key={lc.name}
                  className="relative border border-white/10 bg-ink/60 p-4 transition-colors hover:border-lime/40"
                >
                  <div className="flex items-center justify-between text-white/40">
                    <span className="font-display text-xs text-lime font-bold">{lc.n}</span>
                    {idx < glance.lifecycle.length - 1 && (
                      <span className="text-[11px] hidden sm:inline text-white/30">
                        {dir === "rtl" ? "←" : "→"}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 font-display text-[14px] md:text-[15px] font-bold text-white">
                    {lc.name}
                  </div>
                  <div className="mt-0.5 text-[11px] text-white/50">{lc.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 3 Core Value Pillars */}
        <div className="mt-8 grid gap-px bg-white/10 md:grid-cols-3 border border-white/10">
          {glance.items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.07}>
              <div className="group h-full bg-ink px-6 py-8 transition-colors duration-300 hover:bg-white/[0.03] md:px-8 md:py-10">
                <div className="flex items-center justify-between">
                  <span className="font-display text-[11px] tracking-[0.24em] font-bold text-lime">
                    0{i + 1}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-white/20 transition-colors group-hover:bg-lime" />
                </div>
                <h3 className="h-sub mt-6 text-white text-[18px] group-hover:text-lime transition-colors">
                  {it.t}
                </h3>
                <p className="body-copy mt-3 text-[14px] text-white/60">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
