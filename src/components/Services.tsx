import { motion } from "motion/react";
import { useLang } from "../i18n/LangContext";
import { SectionHead } from "./ui/SectionHead";

export function Services() {
  const { c, dir } = useLang();
  const items = c.services.items;

  return (
    <section id="services" className="relative border-t border-white/10 py-20 md:py-28 bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead
            index="0.2"
            kicker={c.services.kicker}
            title={c.services.title}
            lead={c.services.lead}
          />
          <a
            href="#contact"
            className="group inline-flex shrink-0 items-center gap-2.5 border border-white/20 bg-white/[0.02] px-5 py-3 text-[13px] text-white/85 transition-all hover:border-lime hover:text-lime hover:bg-white/[0.04]"
          >
            <span>{c.nav.cta}</span>
            <span
              className={`font-display text-[11px] transition-transform duration-300 ${
                dir === "rtl" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
              }`}
            >
              {dir === "rtl" ? "←" : "→"}
            </span>
          </a>
        </div>

        {/* Bento Grid */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((s, i) => {
            const featured = "big" in s && s.big;
            const img = "img" in s ? (s.img as string | undefined) : undefined;
            return (
              <motion.article
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{ duration: 0.65, delay: (i % 3) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden border border-white/10 bg-white/[0.02] transition-colors duration-500 hover:border-lime/40 ${
                  featured ? "md:col-span-2 md:row-span-1" : ""
                }`}
              >
                {img ? (
                  <div className="absolute inset-0">
                    <img
                      src={img}
                      alt={s.t}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-40 transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-55"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
                  </div>
                ) : null}

                <div className="relative z-10 flex h-full flex-col p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display text-[11px] tracking-[0.24em] font-bold text-lime">
                      {s.n}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {s.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-white/15 bg-ink/70 px-2 py-0.5 text-[10px] text-white/50 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3
                    className={`mt-auto pt-10 text-white group-hover:text-lime transition-colors duration-300 ${
                      featured ? "h-title text-[24px] md:text-[28px]" : "h-sub text-[18px]"
                    }`}
                  >
                    {s.t}
                  </h3>
                  <p
                    className={`body-copy mt-3 text-white/65 ${
                      featured ? "max-w-[48ch] text-[14.5px]" : "text-[13.5px]"
                    }`}
                  >
                    {s.d}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="kicker text-[10px] text-white/40">0{i + 1} / 06</span>
                    <span
                      className={`font-display text-[12px] text-white/30 transition-all duration-300 group-hover:text-lime ${
                        dir === "rtl" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
                      }`}
                    >
                      {dir === "rtl" ? "←" : "→"}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
