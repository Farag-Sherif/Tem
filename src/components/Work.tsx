import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLang } from "../i18n/LangContext";
import { SectionHead } from "./ui/SectionHead";

export function Work() {
  const { c, dir } = useLang();
  const items = c.work.items;
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = useReducedMotion();

  // Measure track scroll distance
  const measure = useCallback(() => {
    if (!track.current) return;
    // Padding buffer to ensure the last card docks comfortably inside the viewport
    const totalW = track.current.scrollWidth;
    const winW = window.innerWidth;
    const padding = winW < 768 ? 32 : 64;
    const d = totalW - winW + padding;
    setDistance(Math.max(0, d));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 500);
    const t2 = window.setTimeout(measure, 1200);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, [c, measure]);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });

  // In RTL, the track starts aligned to the right edge. To reveal items extending
  // to the left, we translate positively (+distance) towards the right.
  // In LTR, the track starts aligned to the left edge. To reveal items extending
  // to the right, we translate negatively (-distance) towards the left.
  const xRtl = useTransform(scrollYProgress, [0, 1], [0, distance]);
  const xLtr = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = dir === "rtl" ? xRtl : xLtr;

  // Track active project index based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const idx = Math.min(items.length - 1, Math.floor(latest * (items.length + 0.5)));
      setActiveIndex(Math.max(0, idx));
    });
    return () => unsubscribe();
  }, [scrollYProgress, items.length]);

  // Scroll to a specific card when clicking arrow buttons
  const scrollToCard = (targetIdx: number) => {
    if (!wrap.current) return;
    const rect = wrap.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const scrollHeight = wrap.current.offsetHeight - window.innerHeight;
    const targetProgress = targetIdx / items.length;
    window.scrollTo({
      top: scrollTop + scrollHeight * targetProgress,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    scrollToCard(Math.max(0, activeIndex - 1));
  };

  const handleNext = () => {
    scrollToCard(Math.min(items.length, activeIndex + 1));
  };

  return (
    <section id="work" className="relative border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 md:px-8 md:pt-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead index="0.3" kicker={c.work.kicker} title={c.work.title} lead={c.work.lead} />

          <div className="flex flex-wrap items-center gap-4">
            {/* Active index counter */}
            <div className="flex items-center gap-2 border border-white/15 px-3 py-1.5 text-xs text-white/70">
              <span className="font-display text-lime font-bold">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-white/30">/</span>
              <span className="text-white/40">{String(items.length).padStart(2, "0")}</span>
            </div>

            {/* Prev / Next controls */}
            <div className="flex items-center gap-1.5" dir="ltr">
              <button
                type="button"
                onClick={dir === "rtl" ? handleNext : handlePrev}
                aria-label="Previous project"
                className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-lime hover:text-lime"
              >
                ←
              </button>
              <button
                type="button"
                onClick={dir === "rtl" ? handlePrev : handleNext}
                aria-label="Next project"
                className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-lime hover:text-lime"
              >
                →
              </button>
            </div>

            <div className="hidden items-center gap-3 text-white/35 lg:flex">
              <span className="kicker text-[10px] text-white/50">{c.work.hint}</span>
              <span className="h-px w-10 bg-white/25" />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky horizontal track container */}
      <div
        ref={wrap}
        className="relative mt-10"
        style={{ height: `${Math.max(1, items.length + 1) * 65}vh` }}
      >
        <div
          dir={dir}
          className="sticky top-0 flex h-[100svh] items-center overflow-hidden"
        >
          <motion.div
            ref={track}
            dir={dir}
            className="flex gap-5 px-5 md:gap-7 md:px-8 shrink-0 items-center"
            style={reduce ? undefined : { x }}
          >
            {items.map((w, i) => (
              <figure
                key={w.title + i}
                className="group relative w-[min(84vw,620px)] shrink-0 overflow-hidden border border-white/12 bg-white/[0.02] transition-colors duration-500 hover:border-lime/40"
              >
                <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden">
                  <img
                    src={w.img}
                    alt={w.title}
                    loading={i < 2 ? "eager" : "lazy"}
                    className="h-full w-full scale-[1.02] object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                  />
                  {/* Subtle dark gradient overlay for text readability */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />

                  {/* Top floating pill */}
                  <div className="absolute top-4 start-4 flex items-center gap-2">
                    <span className="border border-white/20 bg-ink/70 px-2.5 py-1 text-[10px] tracking-wide text-white/80 backdrop-blur-md">
                      {w.tag}
                    </span>
                  </div>

                  {/* Bottom caption bar */}
                  <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-5 md:p-6 bg-gradient-to-t from-ink via-ink/80 to-transparent">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-[10.5px] font-bold text-lime">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] text-white/30">/</span>
                      <span className="text-[10px] text-white/40">
                        {String(items.length).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="h-sub mt-2 text-[16px] md:text-[18px] text-white group-hover:text-lime transition-colors duration-300">
                      {w.title}
                    </h3>
                    <div className="mt-1 text-[12px] text-white/60">{w.meta}</div>
                  </div>
                </div>
              </figure>
            ))}

            {/* End CTA Card */}
            <a
              href="#contact"
              className="group flex w-[min(84vw,560px)] shrink-0 flex-col items-center justify-center border border-lime/40 bg-lime/[0.04] p-8 md:p-12 text-center transition-all duration-300 hover:border-lime hover:bg-lime/[0.08]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-lime/50 text-lime mb-5 group-hover:scale-110 transition-transform">
                <span className="text-xl">↗</span>
              </div>
              <div className="font-display text-[10.5px] tracking-[0.24em] text-lime font-bold">
                {c.work.nextLabel}
              </div>
              <div className="h-title mt-4 text-[22px] md:text-[26px] text-white">
                {c.work.endTitle}
              </div>
              <div className="body-copy mt-3 text-[13.5px] text-white/60 max-w-[36ch]">
                {c.work.endSub}
              </div>
              <div className="mt-7 inline-flex items-center gap-2 bg-lime px-6 py-3 text-[13px] font-semibold text-ink group-hover:shadow-[0_0_25px_-5px_rgba(223,255,0,0.5)] transition-shadow">
                <span>{c.work.endCta}</span>
                <span>↗</span>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
