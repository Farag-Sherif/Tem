import { useState } from "react";
import { useLang } from "../i18n/LangContext";
import { Reveal } from "./ui/Reveal";
import { Symbol } from "./ui/Symbol";
import { Marquee } from "./ui/Marquee";

const CURRENT_YEAR = new Date().getFullYear();

export function Contact() {
  const { c, dir } = useLang();
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/10 bg-ink">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(65% 55% at 12% 0%, rgba(15,6,102,0.55) 0%, transparent 65%), radial-gradient(45% 45% at 92% 92%, rgba(223,255,0,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-7 bg-lime" />
                <span className="kicker text-white/55">{c.contact.kicker}</span>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-6 text-[clamp(1.9rem,4.6vw,3.6rem)] font-bold leading-[1.2] tracking-normal text-white font-ar">
                {c.contact.title}
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="body-copy mt-5 max-w-[48ch] text-white/65">{c.contact.lead}</p>
            </Reveal>

            <Reveal delay={0.18}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="mt-9 grid gap-5 sm:grid-cols-2"
              >
                {[
                  { label: c.contact.name, ph: c.contact.namePh, span: false, area: false },
                  { label: c.contact.reach, ph: c.contact.reachPh, span: false, area: false },
                  { label: c.contact.details, ph: c.contact.detailsPh, span: true, area: true },
                ].map((f) => (
                  <label key={f.label} className={`block ${f.span ? "sm:col-span-2" : ""}`}>
                    <span className="kicker text-[11px] text-white/50">{f.label}</span>
                    {f.area ? (
                      <textarea
                        rows={3}
                        placeholder={f.ph}
                        className="mt-2 w-full resize-none border-b border-white/20 bg-transparent py-2.5 text-[14.5px] text-white outline-none transition-colors placeholder:text-white/25 focus:border-lime"
                      />
                    ) : (
                      <input
                        required
                        placeholder={f.ph}
                        className="mt-2 w-full border-b border-white/20 bg-transparent py-2.5 text-[14.5px] text-white outline-none transition-colors placeholder:text-white/25 focus:border-lime"
                      />
                    )}
                  </label>
                ))}

                <div className="mt-3 flex flex-wrap items-center gap-4 sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2.5 bg-lime px-7 py-3.5 text-[13.5px] font-bold text-ink shadow-[0_0_20px_-5px_rgba(223,255,0,0.35)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(223,255,0,0.5)] hover:-translate-y-0.5"
                  >
                    <span>{sent ? c.contact.sent : c.contact.submit}</span>
                    <span className="font-display text-[11px]">{sent ? "✓" : dir === "rtl" ? "←" : "↗"}</span>
                  </button>
                  <span className={`text-[12px] ${sent ? "text-lime font-medium" : "text-white/40"}`}>
                    {sent ? c.contact.thanks : c.contact.reply}
                  </span>
                </div>
              </form>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-6 text-[11px] leading-[1.9] text-white/30">{c.contact.note}</p>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <div className="relative h-full border border-white/12 bg-white/[0.02] p-6 md:p-8">
              <img
                src="/brand/logo-stacked.png"
                alt="TAM Booths & more"
                className="h-20 w-auto md:h-24"
              />
              <div className="mt-7 h-px w-full bg-white/12" />
              <div className="mt-6 space-y-4">
                {c.contact.rows.map(([k, v]) => (
                  <div key={k} className="flex items-start justify-between gap-5 border-b border-white/5 pb-3">
                    <span className="shrink-0 text-[11px] font-medium text-white/40">{k}</span>
                    <span className="text-end text-[12.5px] leading-relaxed text-white/85">{v}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-4">
                <Symbol size={22} />
                <span className="font-display text-[9.5px] tracking-[0.24em] text-white/40">
                  BUILT PIECE BY PIECE
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-ink">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-4 px-5 py-6 md:flex-row md:items-center md:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <img src="/brand/logo-alt.png" alt="TAM" className="h-4 w-auto opacity-75" />
            <span className="text-[11px] text-white/35">
              © {CURRENT_YEAR} TAM. {c.contact.footerNote}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-display text-[9px] tracking-[0.2em] text-white/30">
              {c.contact.version}
            </span>
            <a href="#top" className="text-[11px] text-white/55 transition-colors hover:text-lime">
              {c.contact.up}
            </a>
          </div>
        </div>
      </div>

      {/* Rock-solid, continuous, infinite footer ticker that never disappears */}
      <div className="relative border-t border-white/10 bg-ink/95 py-3.5">
        <Marquee
          items={c.hero.ticker}
          speed={26}
          className="text-white/30 font-display text-[10px] tracking-[0.26em]"
          itemClassName="hover:text-lime transition-colors duration-300"
        />
      </div>
    </section>
  );
}
