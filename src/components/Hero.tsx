import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Wordline } from "./ui/Reveal";
import { useLang } from "../i18n/LangContext";
import { Marquee } from "./ui/Marquee";

const PREVIEW_CARDS = [
  {
    id: "hero",
    titleAr: "جناح رئيسي دورين — إضاءة معمارية خاصة",
    titleEn: "Flagship Double-Deck Booth — Architectural Lighting",
    tagAr: "مخصص · دورين",
    tagEn: "Custom · Double Deck",
    img: "/media/work/hero_main.jpg",
    specsAr: "مساحة 120م² · ورشة TAM الخاصة",
    specsEn: "120m² · In-House Workshop",
  },
  {
    id: "wall",
    titleAr: "جدار براند مضيء وتشطيب ألمنيوم مخفي",
    titleEn: "Backlit Brand Feature Wall & Concealed Joinery",
    tagAr: "إضاءة خلفية",
    tagEn: "Backlit Wall",
    img: "/media/work/booth_g.jpg",
    specsAr: "جرافيك عالي الدقة · تقفيل مخفي",
    specsEn: "High-Res Graphics · Seamless",
  },
  {
    id: "workshop",
    titleAr: "تصنيع كامل في ورشة TAM المركزية",
    titleEn: "100% In-House Fabrication at TAM Workshop",
    tagAr: "ورشة داخلية",
    tagEn: "In-House Workshop",
    img: "/media/work/workshop.jpg",
    specsAr: "نجارة · حدادة · دهانات · فحص QC",
    specsEn: "Joinery · Metal · Paint · QC",
  },
];

export function Hero() {
  const { c, lang, dir } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [activeCard, setActiveCard] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto transition between the 3 preview cards every 3.2 seconds (comfortable reading pace)
  useEffect(() => {
    if (reduce || isPaused) return;
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % PREVIEW_CARDS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [reduce, isPaused]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const yCopy = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const currentPreview = PREVIEW_CARDS[activeCard];

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden bg-ink pt-20">
      {/* Background Video with depth tints */}
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y: yBg, scale: scaleBg }}>
        <video
          className="h-full w-full object-cover"
          src="/media/film.mp4"
          poster="/media/poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </motion.div>

      {/* Layered brand gradients for atmosphere and text clarity */}
      <div className="pointer-events-none absolute inset-0 bg-ink/65 backdrop-blur-[1px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/75" />
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(65% 55% at 18% 25%, rgba(15, 5, 102, 0.75) 0%, transparent 68%), radial-gradient(50% 50% at 85% 75%, rgba(223, 255, 0, 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Main Hero Content Area */}
      <motion.div
        style={reduce ? undefined : { opacity: fade, y: yCopy }}
        className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-[1440px] flex-col justify-between px-5 pb-6 pt-10 md:px-8 md:pt-14"
      >
        {/* Top Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-lime/30 bg-lime/[0.06] px-3.5 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            <span className="kicker text-[11px] text-lime font-medium tracking-wide">
              {c.hero.badge}
            </span>
          </div>

          <div className="hidden items-center gap-2 text-white/40 md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-lime/60" />
            <span className="font-display text-[9.5px] tracking-[0.24em]">
              BRAND v1.0 — EXHIBITIONS & MORE
            </span>
          </div>
        </div>

        {/* Center Split: Headline & Interactive Showcase Card */}
        <div className="my-auto grid items-center gap-10 py-10 lg:grid-cols-12 lg:gap-12">
          {/* Headline & Value Proposition Column */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-7 bg-lime" />
              <span className="kicker text-white/65">{c.hero.kicker}</span>
            </div>

            <h1 className="h-display mt-5 text-white">
              <Wordline text={c.hero.titleA} />
              <br />
              <span className="text-lime drop-shadow-[0_0_30px_rgba(223,255,0,0.25)]">
                <Wordline text={c.hero.titleB} delay={0.12} />
              </span>
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="body-copy mt-6 max-w-[54ch] text-white/75 text-[15.5px] md:text-[16.5px]"
            >
              {c.hero.lead}
            </motion.p>

            {/* CTAs and trust indicators */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-3 bg-lime px-7 py-4 text-[13.5px] font-bold text-ink shadow-[0_0_25px_-5px_rgba(223,255,0,0.4)] transition-all duration-300 hover:bg-lime/90 hover:shadow-[0_0_35px_rgba(223,255,0,0.6)] hover:-translate-y-0.5"
              >
                <span>{c.hero.ctaPrimary}</span>
                <span className="font-display text-[12px] transition-transform duration-300 group-hover:translate-x-1">
                  {dir === "rtl" ? "←" : "→"}
                </span>
              </a>

              <a
                href="#journey"
                className="inline-flex items-center gap-2.5 border border-white/25 bg-white/[0.03] px-6 py-4 text-[13.5px] font-medium text-white/90 backdrop-blur-md transition-all duration-300 hover:border-lime/60 hover:text-lime hover:bg-white/[0.06]"
              >
                <span>{c.hero.ctaSecondary}</span>
                <span className="text-[11px] opacity-70">↓</span>
              </a>
            </motion.div>

            {/* Micro value badges */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-white/45">
              <span className="flex items-center gap-1.5">
                <span className="text-lime">✓</span>
                {lang === "ar" ? "سكتش ثلاثي الأبعاد للمساحة" : "Free 3D Concept Sketch"}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-lime">✓</span>
                {lang === "ar" ? "تسليم قبل الافتتاح بـ 24 ساعة" : "Handover 24h Before Opening"}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-lime">✓</span>
                {lang === "ar" ? "ضمان مطابقة التنفيذ للتصميم" : "100% Execution Fidelity"}
              </span>
            </div>
          </div>

          {/* Interactive Architectural Preview Card */}
          <div className="lg:col-span-5 xl:col-span-5">
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="relative overflow-hidden rounded-sm border border-white/15 bg-white/[0.03] p-3 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-lime/40"
            >
              {/* Image Preview Container with Pre-rendered Crossfade */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-indigo/30">
                {PREVIEW_CARDS.map((card, idx) => (
                  <img
                    key={card.id}
                    src={card.img}
                    alt={lang === "ar" ? card.titleAr : card.titleEn}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-in-out ${
                      activeCard === idx
                        ? "opacity-100 scale-[1.04]"
                        : "opacity-0 scale-100 pointer-events-none"
                    }`}
                  />
                ))}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

                {/* Floating pill badge */}
                <div className="absolute top-3 start-3">
                  <span className="rounded-full border border-lime/40 bg-ink/80 px-3 py-1 text-[10.5px] font-semibold text-lime backdrop-blur-md transition-all">
                    {lang === "ar" ? currentPreview.tagAr : currentPreview.tagEn}
                  </span>
                </div>

                {/* Overlay card details */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-ink via-ink/90 to-transparent">
                  <div className="text-[11px] text-lime font-display tracking-wider">
                    {c.hero.cardBadge}
                  </div>
                  <h3 className="h-sub mt-1 text-[15px] font-bold text-white transition-all">
                    {lang === "ar" ? currentPreview.titleAr : currentPreview.titleEn}
                  </h3>
                  <div className="mt-1 text-[11.5px] text-white/60 transition-all">
                    {lang === "ar" ? currentPreview.specsAr : currentPreview.specsEn}
                  </div>
                </div>
              </div>

              {/* Quick interactive switcher tabs */}
              <div className="mt-3 grid grid-cols-3 gap-2" dir="ltr">
                {PREVIEW_CARDS.map((card, idx) => {
                  const isActive = activeCard === idx;
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => {
                        setActiveCard(idx);
                      }}
                      className={`relative flex items-center justify-center py-2.5 px-2 text-center text-[10px] md:text-[11px] transition-all duration-300 border ${
                        isActive
                          ? "border-lime bg-lime/15 text-white font-semibold shadow-[0_0_15px_-4px_rgba(223,255,0,0.4)]"
                          : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute top-1 end-1 h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
                      )}
                      <span className="truncate">
                        {lang === "ar" ? card.tagAr : card.tagEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Hero Facts Ribbon */}
        <div className="border-t border-white/12 pt-5">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:items-center">
            {c.hero.facts.map(([num, label]) => (
              <div key={label} className="flex items-baseline gap-2.5 border-s-2 border-lime/40 ps-3">
                <span className="font-display text-[22px] md:text-[26px] font-bold text-lime leading-none">
                  {num}
                </span>
                <span className="text-[12px] md:text-[13px] text-white/60 font-medium">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Hero Bottom Seamless Infinite Marquee Transition */}
      <div className="relative border-y border-white/10 bg-ink/90 py-3.5 backdrop-blur-md">
        <Marquee
          items={c.hero.ticker}
          speed={32}
          className="text-white/35 font-display text-[10px] tracking-[0.24em]"
          itemClassName="hover:text-lime transition-colors"
        />
      </div>
    </section>
  );
}
