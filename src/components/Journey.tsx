import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLang } from "../i18n/LangContext";
import { SectionHead } from "./ui/SectionHead";
import { Reveal } from "./ui/Reveal";

function Stage({
  index,
  stage,
  active,
  onEnter,
  mirrored,
}: {
  index: number;
  stage: {
    n: string;
    tag: string;
    title: string;
    body: string;
    chips: readonly string[];
    img: string;
  };
  active: number;
  onEnter: (i: number) => void;
  mirrored: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const isActive = active === index;

  return (
    <div
      ref={ref}
      onMouseEnter={() => onEnter(index)}
      className="relative border-t border-white/10 py-12 first:border-t-0 md:py-16"
    >
      <motion.div
        onViewportEnter={() => onEnter(index)}
        viewport={{ margin: "-45% 0px -45% 0px" }}
        className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
      >
        <div
          className={`lg:col-span-4 ${mirrored ? "lg:order-2 lg:col-start-9" : ""}`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`font-display text-[34px] font-bold leading-none transition-colors duration-500 ${
                isActive ? "text-lime" : "text-white/20"
              }`}
            >
              {stage.n}
            </span>
            <span className="kicker text-white/50">{stage.tag}</span>
          </div>

          <h3 className="h-title mt-5 text-white">{stage.title}</h3>
          <p className="body-copy mt-4 max-w-[44ch] text-white/65">{stage.body}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {stage.chips.map((ch) => (
              <span
                key={ch}
                className="border border-white/15 bg-white/[0.02] px-2.5 py-1 text-[11px] text-white/60"
              >
                {ch}
              </span>
            ))}
          </div>
        </div>

        <div className={`lg:col-span-8 ${mirrored ? "lg:order-1 lg:col-start-1" : ""}`}>
          <div className="relative overflow-hidden bg-indigo/20 border border-white/10">
            <motion.div style={reduce ? undefined : { y }} className="relative">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <motion.img
                  src={stage.img}
                  alt={stage.title}
                  loading={index < 2 ? "eager" : "lazy"}
                  className="h-full w-full scale-[1.06] object-cover"
                  initial={reduce ? false : { opacity: 0.2, scale: 1.14 }}
                  whileInView={{ opacity: 1, scale: 1.06 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 start-4 flex items-center gap-2 bg-ink/70 px-2.5 py-1 backdrop-blur-md border border-white/10">
              <span className={`h-1.5 w-1.5 rounded-full transition-colors ${isActive ? "bg-lime" : "bg-white/40"}`} />
              <span className="font-display text-[9px] tracking-[0.2em] text-white/70">
                STAGE {stage.n}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Journey() {
  const { c, dir } = useLang();
  const [active, setActive] = useState(0);
  const stages = c.journey.stages;

  return (
    <section id="journey" className="relative border-t border-white/10 py-20 md:py-28 bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <SectionHead
          index="0.1"
          kicker={c.journey.kicker}
          title={c.journey.title}
          lead={c.journey.lead}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[120px_1fr] lg:gap-8">
          {/* Progress rail */}
          <div className="relative hidden lg:block">
            <div className="sticky top-28">
              <div className="flex flex-col gap-3">
                {stages.map((s, i) => (
                  <a
                    key={s.n}
                    href={`#stage-${s.n}`}
                    onClick={() => setActive(i)}
                    className="group flex items-center gap-3"
                  >
                    <span
                      className={`h-px transition-all duration-500 ${
                        active === i ? "w-7 bg-lime" : "w-3 bg-white/25 group-hover:w-5"
                      }`}
                    />
                    <span
                      className={`font-display text-[9.5px] tracking-[0.2em] transition-colors ${
                        active === i ? "text-lime font-bold" : "text-white/30"
                      }`}
                    >
                      {stages[i].n}
                    </span>
                  </a>
                ))}
              </div>
              <div className="mt-5 h-24 w-px bg-white/10">
                <motion.div
                  className="w-px bg-lime"
                  animate={{ height: `${((active + 1) / stages.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <div className="mt-3 kicker text-[9.5px] text-white/35">{c.journey.stagesLabel}</div>
            </div>
          </div>

          <div>
            {stages.map((s, i) => (
              <div key={s.n} id={`stage-${s.n}`}>
                <Stage index={i} stage={s} active={active} onEnter={setActive} mirrored={i % 2 === 1} />
              </div>
            ))}

            <Reveal>
              <div className="mt-12 flex flex-col items-start justify-between gap-5 border border-lime/30 bg-lime/[0.04] p-7 md:flex-row md:items-center md:p-9 shadow-[0_0_35px_-10px_rgba(223,255,0,0.1)]">
                <div>
                  <div className="font-display text-[10.5px] tracking-[0.26em] text-lime font-bold">
                    {c.journey.stages[5].n} {dir === "rtl" ? "↺ 01" : "→ 01"}
                  </div>
                  <h3 className="h-sub mt-3 text-white text-[19px]">{c.work.endTitle}</h3>
                  <p className="body-copy mt-2 text-[13.5px] text-white/60">{c.work.endSub}</p>
                </div>
                <a
                  href="#contact"
                  className="inline-flex shrink-0 items-center gap-2.5 bg-lime px-6 py-3.5 text-[13px] font-bold text-ink shadow-[0_0_20px_-5px_rgba(223,255,0,0.4)] hover:shadow-[0_0_30px_rgba(223,255,0,0.6)] transition-all"
                >
                  <span>{c.work.endCta}</span>
                  <span className="font-display text-[10px]">{dir === "rtl" ? "←" : "→"}</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
