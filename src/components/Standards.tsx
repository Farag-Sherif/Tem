import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLang } from "../i18n/LangContext";
import { SectionHead } from "./ui/SectionHead";
import { Reveal } from "./ui/Reveal";

const PALETTE = [
  { name: "Indigo", hex: "#0F0566" },
  { name: "Lime", hex: "#DFFF00" },
  { name: "Black", hex: "#0F1103" },
  { name: "White", hex: "#FFFFFF" },
];

export function Standards() {
  const { c } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bandX = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <section id="standards" ref={ref} className="relative border-t border-white/10 py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <SectionHead
          index="0.4"
          kicker={c.standards.kicker}
          title={c.standards.title}
          lead={c.standards.lead}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="grid gap-px bg-white/10 sm:grid-cols-2">
            {c.standards.items.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <div className="h-full bg-ink p-6 transition-colors duration-300 hover:bg-white/[0.03] md:p-7">
                  <div className="font-display text-[10px] tracking-[0.26em] text-lime/75">{s.n}</div>
                  <h3 className="h-sub mt-4 text-[15.5px] text-white">{s.t}</h3>
                  <p className="body-copy mt-2.5 text-[12.5px] text-white/50">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="space-y-4">
            <Reveal>
              <div className="border border-white/12 p-5 md:p-6">
                <div className="kicker text-white/40">{c.standards.palette} · 0.3</div>
                <div className="mt-4 grid grid-cols-4 overflow-hidden border border-white/12">
                  {PALETTE.map((p) => (
                    <div key={p.name}>
                      <div className="h-16 w-full md:h-24" style={{ background: p.hex }} />
                      <div className="border-t border-white/12 px-2 py-2">
                        <div className="text-[9px] text-white/65">{p.name}</div>
                        <div className="mt-0.5 font-display text-[7px] tracking-[0.05em] text-white/30">
                          {p.hex}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[10.5px] text-white/30">{c.standards.paletteNote}</p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="border border-white/12 p-5 md:p-6">
                <div className="kicker text-white/40">{c.standards.type} · 0.4</div>
                <div className="mt-4 space-y-3">
                  {[
                    { label: "SYNCOPATE", cls: "font-display text-[13px] font-bold tracking-[0.16em]" },
                    { label: "Poppins", cls: "font-sans text-[14px] font-semibold" },
                    { label: "IBM Plex Sans Arabic", cls: "font-ar text-[15px] font-bold" },
                  ].map((f, i) => (
                    <div key={f.label}>
                      <div className={`text-white ${f.cls}`}>{f.label}</div>
                      <div className="mt-1 text-[10px] text-white/32">{c.standards.typeNote[i]}</div>
                      {i < 2 && <div className="mt-3 h-px bg-white/10" />}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="border border-white/12 p-5 md:p-6">
                <div className="kicker text-white/40">{c.standards.dontsTitle} · 0.5</div>
                <ul className="mt-4 space-y-2.5">
                  {c.standards.donts.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-[11.5px] leading-relaxed text-white/50">
                      <span className="mt-1.5 h-1 w-1 shrink-0 bg-red-400/70" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="mt-20 overflow-hidden border-y border-white/10">
        <motion.div style={{ x: bandX }} className="select-none whitespace-nowrap py-5" dir="ltr">
          <div className="flex items-center gap-6">
            {c.standards.claim.map((t, i) => (
              <span key={t} className="flex items-center gap-6">
                <span className="font-display text-[clamp(1.2rem,2.8vw,2.2rem)] font-bold tracking-[0.01em] text-white/12">
                  {t}
                </span>
                {i < c.standards.claim.length - 1 && <span className="h-1.5 w-1.5 bg-lime" />}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
