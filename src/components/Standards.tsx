import { useLang } from "../i18n/LangContext";
import { SectionHead } from "./ui/SectionHead";
import { Reveal } from "./ui/Reveal";
import { Marquee } from "./ui/Marquee";

const PALETTE = [
  { name: "Indigo", hex: "#0F0566" },
  { name: "Lime", hex: "#DFFF00" },
  { name: "Black", hex: "#0F1103" },
  { name: "White", hex: "#FFFFFF" },
];

export function Standards() {
  const { c } = useLang();

  return (
    <section id="standards" className="relative border-t border-white/10 py-20 md:py-28 bg-ink">
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
                  <h3 className="h-sub mt-4 text-[16px] text-white">{s.t}</h3>
                  <p className="body-copy mt-2.5 text-[13px] text-white/55">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="space-y-4">
            <Reveal>
              <div className="border border-white/12 p-5 md:p-6 bg-white/[0.02]">
                <div className="kicker text-white/45">{c.standards.palette} · 0.3</div>
                <div className="mt-4 grid grid-cols-4 overflow-hidden border border-white/12">
                  {PALETTE.map((p) => (
                    <div key={p.name}>
                      <div className="h-16 w-full md:h-24" style={{ background: p.hex }} />
                      <div className="border-t border-white/12 px-2 py-2 bg-ink">
                        <div className="text-[10px] text-white/75">{p.name}</div>
                        <div className="mt-0.5 font-display text-[7.5px] tracking-[0.05em] text-white/35">
                          {p.hex}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-white/35">{c.standards.paletteNote}</p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="border border-white/12 p-5 md:p-6 bg-white/[0.02]">
                <div className="kicker text-white/45">{c.standards.type} · 0.4</div>
                <div className="mt-4 space-y-3">
                  {[
                    { label: "SYNCOPATE", cls: "font-display text-[13px] font-bold tracking-[0.16em]" },
                    { label: "Poppins", cls: "font-sans text-[14px] font-semibold" },
                    { label: "IBM Plex Sans Arabic", cls: "font-ar text-[15px] font-bold" },
                  ].map((f, i) => (
                    <div key={f.label}>
                      <div className={`text-white ${f.cls}`}>{f.label}</div>
                      <div className="mt-1 text-[11px] text-white/35">{c.standards.typeNote[i]}</div>
                      {i < 2 && <div className="mt-3 h-px bg-white/10" />}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="border border-white/12 p-5 md:p-6 bg-white/[0.02]">
                <div className="kicker text-white/45">{c.standards.dontsTitle} · 0.5</div>
                <ul className="mt-4 space-y-2.5">
                  {c.standards.donts.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-[12px] leading-relaxed text-white/55">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/80" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Endless, seamless brand statement marquee with large typography */}
      <div className="mt-20 border-y border-white/10 bg-white/[0.015] py-5">
        <Marquee
          items={c.standards.claim}
          speed={30}
          className="text-white/20 hover:text-white/40 transition-colors"
          itemClassName="font-display text-[clamp(1.3rem,2.8vw,2.2rem)] font-bold tracking-[0.03em]"
        />
      </div>
    </section>
  );
}
