import { motion } from "motion/react";
import { useLang } from "../i18n/LangContext";
import { SectionHead } from "./ui/SectionHead";

export function Services() {
  const { c, dir, lang } = useLang();
  const stages = c.services.stages || c.services.items;
  const andMore = c.services.andMoreItems;

  return (
    <section id="services" className="relative border-t border-white/10 py-20 md:py-28 bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead
            index="04"
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

        {/* 5 Core Stages Bento Grid */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {stages.map((s, i) => {
            const featured = "big" in s && Boolean(s.big);
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
                      className="h-full w-full object-cover opacity-35 transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-55"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
                  </div>
                ) : null}

                <div className="relative z-10 flex h-full flex-col p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display text-[11px] tracking-[0.24em] font-bold text-lime">
                      {lang === "ar" ? `المرحلة ${s.n}` : `STAGE ${s.n}`}
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
                      featured ? "h-title text-[22px] md:text-[26px]" : "h-sub text-[18px]"
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
                    <span className="kicker text-[10px] text-white/40">0{i + 1} / 05</span>
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

        {/* Page 8: & MORE Display Solutions Section */}
        {andMore && andMore.length > 0 && (
          <div className="mt-16 border-t border-white/10 pt-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="kicker text-lime font-bold text-[11px] tracking-wider">
                  {lang === "ar" ? "حلول العرض الإضافية & MORE" : "& MORE DISPLAY SOLUTIONS"}
                </span>
                <h3 className="h-title mt-2 text-white text-[22px] md:text-[26px]">
                  {c.services.andMoreTitle}
                </h3>
              </div>
              <p className="body-copy text-white/60 text-[13.5px] max-w-[44ch]">
                {c.services.andMoreLead}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {andMore.map((item, idx) => (
                <div
                  key={item.title}
                  className="group relative border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-lime/40 hover:bg-white/[0.04]"
                >
                  <div className="flex items-center justify-between text-lime">
                    <span className="font-display text-lg">{item.icon}</span>
                    <span className="font-display text-[9.5px] text-white/30">0{idx + 1}</span>
                  </div>
                  <h4 className="mt-4 text-[15px] font-bold text-white group-hover:text-lime transition-colors">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-white/55">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
