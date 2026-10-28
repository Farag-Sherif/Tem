import { useState } from "react";
import { motion } from "motion/react";
import { useLang } from "../i18n/LangContext";
import { Reveal } from "./ui/Reveal";
import { Symbol } from "./ui/Symbol";

export function Contact() {
  const { c, lang } = useLang();
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
              <h2 className="mt-6 text-[clamp(1.9rem,4.6vw,3.6rem)] font-bold leading-[1.05] tracking-tight text-white font-ar">
                {c.contact.title}
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="body-copy mt-5 max-w-[46ch] text-white/60">{c.contact.lead}</p>
            </Reveal>

            <Reveal delay={0.18}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="mt-9 grid gap-4 sm:grid-cols-2"
              >
                {[
                  { label: c.contact.name, ph: c.contact.namePh, span: false, area: false },
                  { label: c.contact.reach, ph: c.contact.reachPh, span: false, area: false },
                  { label: c.contact.details, ph: c.contact.detailsPh, span: true, area: true },
                ].map((f) => (
                  <label key={f.label} className={`block ${f.span ? "sm:col-span-2" : ""}`}>
                    <span className="kicker text-[9.5px] text-white/40">{f.label}</span>
                    {f.area ? (
                      <textarea
                        rows={3}
                        placeholder={f.ph}
                        className="mt-2 w-full resize-none border-b border-white/20 bg-transparent py-2.5 text-[14px] text-white outline-none transition-colors placeholder:text-white/20 focus:border-lime"
                      />
                    ) : (
                      <input
                        required
                        placeholder={f.ph}
                        className="mt-2 w-full border-b border-white/20 bg-transparent py-2.5 text-[14px] text-white outline-none transition-colors placeholder:text-white/20 focus:border-lime"
                      />
                    )}
                  </label>
                ))}

                <div className="mt-2 flex flex-wrap items-center gap-4 sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2.5 bg-lime px-6 py-3.5 text-[13px] font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {sent ? c.contact.sent : c.contact.submit}
                    <span className="font-display text-[10px]">{sent ? "✓" : "↗"}</span>
                  </button>
                  <span className="text-[11px] text-white/30">
                    {sent ? c.contact.thanks : c.contact.reply}
                  </span>
                </div>
              </form>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-5 text-[10.5px] leading-[1.9] text-white/25">{c.contact.note}</p>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <div className="relative h-full border border-white/12 p-6 md:p-8">
              <img
                src="/brand/logo-stacked.png"
                alt="TAM Booths & more"
                className="h-20 w-auto md:h-24"
              />
              <div className="mt-7 h-px w-full bg-white/12" />
              <div className="mt-6 space-y-4">
                {c.contact.rows.map(([k, v]) => (
                  <div key={k} className="flex items-start justify-between gap-5">
                    <span className="shrink-0 text-[10.5px] text-white/35">{k}</span>
                    <span className="text-end text-[12px] leading-relaxed text-white/80">{v}</span>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex items-center gap-3">
                <Symbol size={20} />
                <span className="font-display text-[8.5px] tracking-[0.24em] text-white/30">
                  BUILT PIECE BY PIECE
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-4 px-5 py-6 md:flex-row md:items-center md:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <img src="/brand/logo-alt.png" alt="TAM" className="h-4 w-auto opacity-70" />
            <span className="text-[10.5px] text-white/28">
              © {new Date().getFullYear()} TAM. {c.contact.footerNote}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="font-display text-[8.5px] tracking-[0.2em] text-white/22">
              {c.contact.version}
            </span>
            <a href="#top" className="text-[10.5px] text-white/45 transition-colors hover:text-lime">
              {c.contact.up}
            </a>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-white/10 py-3.5" dir="ltr">
        <motion.div
          className="flex w-max items-center gap-5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-5">
              {c.hero.ticker.map((t) => (
                <span key={t + k} className="flex items-center gap-5">
                  <span className="font-display text-[9.5px] tracking-[0.28em] text-white/25">{t}</span>
                  <span className="h-1 w-1 bg-lime/60" />
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* language hint for non-arabic visitors */}
      {lang === "ar" ? null : null}
    </section>
  );
}
