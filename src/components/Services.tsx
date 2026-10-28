import { motion } from "motion/react";
import { useLang } from "../i18n/LangContext";
import { SectionHead } from "./ui/SectionHead";

export function Services() {
  const { c } = useLang();
  const items = c.services.items;

  return (
    <section id="services" className="relative border-t border-white/10 py-20 md:py-28">
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
            className="group inline-flex shrink-0 items-center gap-2.5 border border-white/20 px-5 py-3 text-[12.5px] text-white/80 transition-colors hover:border-lime hover:text-lime"
          >
            {c.nav.cta}
            <span className="font-display text-[10px] transition-transform group-hover:-translate-x-1">←</span>
          </a>
        </div>

        {/* bento */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
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
                className={`group relative overflow-hidden border border-white/10 bg-ink ${
                  featured ? "md:col-span-2 md:row-span-1" : ""
                }`}
              >
                {img ? (
                  <div className="absolute inset-0">
                    <img
                      src={img}
                      alt={s.t}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-45 transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
                  </div>
                ) : null}

                <div className="relative z-10 flex h-full flex-col p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display text-[10px] tracking-[0.24em] text-lime/75">{s.n}</span>
                    <span className="text-[9.5px] tracking-[0.14em] text-white/30">
                      {s.tags.join(" · ").toUpperCase()}
                    </span>
                  </div>

                  <h3
                    className={`mt-auto pt-10 text-white ${featured ? "h-title" : "h-sub"}`}
                  >
                    {s.t}
                  </h3>
                  <p
                    className={`body-copy mt-3 text-white/55 ${
                      featured ? "max-w-[46ch] text-[14px]" : "text-[13px]"
                    }`}
                  >
                    {s.d}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="kicker text-[9px] text-white/30">0{i + 1} / 06</span>
                    <span className="font-display text-[12px] text-white/25 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-lime">
                      ←
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
