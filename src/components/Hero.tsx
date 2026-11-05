import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Wordline } from "./ui/Reveal";
import { useLang } from "../i18n/LangContext";
import { Marquee } from "./ui/Marquee";

const PREVIEW_CARDS = [
  {
    id: "hero_crew",
    titleAr: "جناح تام الرئيسي — تصميم معماري وإضاءة درامية",
    titleEn: "TAM Flagship Architectural Stand — Ambient Night Glow",
    tagAr: "جناح مخصص · إنديغو ولايم",
    tagEn: "Custom Stand · Indigo & Lime",
    img: "/media/profile/hero_crew.jpg",
    specsAr: "إشراف طاقم تام الميداني · ورشتنا الخاصة 100%",
    specsEn: "TAM Field Crew Supervision · 100% In-House",
  },
  {
    id: "tam_booth",
    titleAr: "بافيليون تام المتكامل — حضور استثنائي بالمعرض",
    titleEn: "TAM Signature Exhibition Pavilion — Full Turnkey",
    tagAr: "تصميم موديولار",
    tagEn: "Modular Architecture",
    img: "/media/profile/tam_flagship_booth.jpg",
    specsAr: "شاشات عرض · كاونتر استقبال · إضاءات نيون",
    specsEn: "Integrated Displays · Reception Desk · Neon Accents",
  },
  {
    id: "star_seven",
    titleAr: "جناح نيو ستار سفن — New Star Seven",
    titleEn: "New Star Seven — Star Emblem Exhibition Stand",
    tagAr: "قص خشب مفرغ",
    tagEn: "CNC Woodwork",
    img: "/media/profile/project_new_star_seven.jpg",
    specsAr: "ثيم أبيض وأسود · نجمة مضيئة · كاونتر ريسبشن",
    specsEn: "Black & White Palette · Backlit Star · VIP Lounge",
  },
  {
    id: "el_omda",
    titleAr: "جناح العمدة كافيه — أقواس معمارية وإضاءات دافئة",
    titleEn: "El-Omda Cafe Stand — Architectural Arches & Warm Glow",
    tagAr: "طابع تراثي حديث",
    tagEn: "Modern Heritage",
    img: "/media/profile/project_el_omda.jpg",
    specsAr: "أقواس خشبية · نيشات عرض منتجات · كاونتر ضيافة",
    specsEn: "Curved Wooden Arches · Recessed Display Niches · Hospitality",
  },
  {
    id: "workshop",
    titleAr: "داخل ورشة تام المركزية — تصنيع داخلي كامل",
    titleEn: "Inside TAM Central Workshop — 100% In-House Fabrication",
    tagAr: "ورشة داخلية 100%",
    tagEn: "In-House Workshop",
    img: "/media/profile/workshop_craftsman.jpg",
    specsAr: "نجارة · تشطيبات دوكو · فحص الجودة المسبق QC",
    specsEn: "Joinery · Spray Paint · Pre-Assembly QC",
  },
];

export function Hero() {
  const { c, lang, dir, heroCards, news } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [activeCard, setActiveCard] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Dynamic preview cards from API or fallback to real profile cards
  const previewCards = useMemo(() => {
    if (heroCards && heroCards.length > 0) {
      return heroCards.map((card, idx) => ({
        id: String(card.id ?? idx),
        title: card.title,
        tag: card.badge,
        specs: card.subtitle,
        img: card.image_url,
      }));
    }
    return PREVIEW_CARDS.map((card) => ({
      id: card.id,
      title: lang === "ar" ? card.titleAr : card.titleEn,
      tag: lang === "ar" ? card.tagAr : card.tagEn,
      specs: lang === "ar" ? card.specsAr : card.specsEn,
      img: card.img,
    }));
  }, [heroCards, lang]);

  // Auto transition between preview cards every 3.8 seconds
  useEffect(() => {
    if (reduce || isPaused || previewCards.length <= 1) return;
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % previewCards.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [reduce, isPaused, previewCards.length]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const yCopy = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const currentPreview = previewCards[activeCard % previewCards.length] || previewCards[0];

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden bg-ink pt-20">
      {/* 
        NO VIDEO: Clean luxury background with architectural radial glows, 
        subtle blueprint grid, and watermark TAM brand mark
      */}
      <div className="absolute inset-0 bg-[#0F1103]">
        {/* Subtle architectural blueprint grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Brand Indigo & Lime ambient glowing orbs */}
        <div
          className="pointer-events-none absolute -top-40 start-1/4 h-[550px] w-[550px] rounded-full opacity-40 blur-[130px]"
          style={{ background: "#0F0566" }}
        />
        <div
          className="pointer-events-none absolute bottom-10 end-10 h-[450px] w-[450px] rounded-full opacity-15 blur-[140px]"
          style={{ background: "#DFFF00" }}
        />

        {/* Atmospheric vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />

        {/* Large subtle watermark logo in the backdrop */}
        <div
          className="pointer-events-none absolute top-1/2 -translate-y-1/2 end-[-8%] opacity-[0.03] select-none"
          aria-hidden="true"
        >
          <img
            src="/brand/symbol-lime.png"
            alt=""
            className="w-[720px] max-w-none grayscale brightness-200"
          />
        </div>
      </div>

      {/* Main Hero Content Area */}
      <motion.div
        style={reduce ? undefined : { opacity: fade, y: yCopy }}
        className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-[1440px] flex-col justify-between px-5 pb-6 pt-8 md:px-8 md:pt-12"
      >
        {/* Top Status Bar with Est. 2022 and Company Profile badge */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-lime/30 bg-lime/[0.06] px-3.5 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            <span className="kicker text-[10.5px] md:text-[11px] text-lime font-medium tracking-wide">
              {c.hero.badge}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {news && news.length > 0 ? (
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-lime/20 px-2.5 py-0.5 font-display text-[9px] text-lime font-bold">
                  NEWS
                </span>
                <a
                  href={news[0].link || "#contact"}
                  className="text-[11.5px] text-white/75 hover:text-lime transition-colors truncate max-w-[280px]"
                  title={news[0].excerpt}
                >
                  {news[0].title}
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-white/40">
                <span className="h-1.5 w-1.5 rounded-full bg-lime/70" />
                <span className="font-display text-[9.5px] tracking-[0.22em] text-white/50">
                  EST. 2022 · 100% IN-HOUSE WORKSHOP
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Center Split: Headline & Interactive Showcase Card */}
        <div className="my-auto grid items-center gap-10 py-8 lg:grid-cols-12 lg:gap-12">
          {/* Headline & Value Proposition Column */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-7 bg-lime" />
              <span className="kicker text-white/70 font-semibold tracking-wider">
                {c.hero.kicker}
              </span>
            </div>

            <h1 className="h-display mt-5 text-white">
              <Wordline text={c.hero.titleA} />
              <br />
              <span className="text-lime drop-shadow-[0_0_35px_rgba(223,255,0,0.3)]">
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
                className="group relative inline-flex items-center gap-3 bg-lime px-7 py-4 text-[13.5px] font-bold text-ink shadow-[0_0_25px_-5px_rgba(223,255,0,0.45)] transition-all duration-300 hover:bg-lime/90 hover:shadow-[0_0_35px_rgba(223,255,0,0.65)] hover:-translate-y-0.5"
              >
                <span>{c.hero.ctaPrimary}</span>
                <span className="font-display text-[12px] transition-transform duration-300 group-hover:translate-x-1">
                  {dir === "rtl" ? "←" : "→"}
                </span>
              </a>

              <a
                href="#work"
                className="inline-flex items-center gap-2.5 border border-white/25 bg-white/[0.03] px-6 py-4 text-[13.5px] font-medium text-white/90 backdrop-blur-md transition-all duration-300 hover:border-lime/60 hover:text-lime hover:bg-white/[0.06]"
              >
                <span>{c.hero.ctaSecondary}</span>
                <span className="text-[11px] opacity-70">↓</span>
              </a>
            </motion.div>

            {/* Micro value badges directly from Company Profile */}
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-white/50">
              <span className="flex items-center gap-1.5">
                <span className="text-lime font-bold">✓</span>
                {lang === "ar" ? "100% ورشة تصنيع خاصة بنا" : "100% In-House Cairo Workshop"}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-lime font-bold">✓</span>
                {lang === "ar" ? "تسليم قبل الافتتاح بـ 24 ساعة" : "Turnkey Handover 24h Early"}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-lime font-bold">✓</span>
                {lang === "ar" ? "فك وتخزين آمن للمعارض القادمة" : "Dismantling & Reusable Storage"}
              </span>
            </div>
          </div>

          {/* Interactive Architectural Preview Card (Cycling Real Profile Projects) */}
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
                {previewCards.map((card, idx) => (
                  <img
                    key={card.id}
                    src={card.img}
                    alt={card.title}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out ${
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
                    {currentPreview.tag}
                  </span>
                </div>

                {/* Overlay card details */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-ink via-ink/90 to-transparent">
                  <div className="text-[10.5px] text-lime font-display tracking-wider">
                    {c.hero.cardBadge}
                  </div>
                  <h3 className="h-sub mt-1 text-[15px] font-bold text-white transition-all">
                    {currentPreview.title}
                  </h3>
                  <div className="mt-1 text-[11.5px] text-white/60 transition-all">
                    {currentPreview.specs}
                  </div>
                </div>
              </div>

              {/* Quick interactive switcher tabs */}
              <div className="mt-3 grid grid-cols-5 gap-1.5" dir="ltr">
                {previewCards.map((card, idx) => {
                  const isActive = activeCard === idx;
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => {
                        setActiveCard(idx);
                      }}
                      title={card.title}
                      className={`relative flex items-center justify-center py-2 px-1 text-center text-[9.5px] transition-all duration-300 border ${
                        isActive
                          ? "border-lime bg-lime/15 text-white font-bold shadow-[0_0_15px_-4px_rgba(223,255,0,0.4)]"
                          : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="heroCardTab"
                          className="absolute inset-0 border border-lime bg-lime/10"
                        />
                      )}
                      <span className="relative z-10 truncate font-display">
                        0{idx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Verification Facts Strip */}
        <div className="border-t border-white/10 pt-6">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {c.hero.facts.map(([num, label]) => (
              <div key={label} className="border-s border-lime/40 ps-4">
                <div className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white">
                  {num}
                </div>
                <div className="kicker mt-1 text-[11px] text-white/50">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Infinite Bottom Marquee */}
      <div className="relative border-t border-white/10 bg-ink/90 py-3 backdrop-blur-md">
        <Marquee
          items={c.hero.ticker}
          speed={28}
          className="text-white/35 font-display text-[10.5px] tracking-[0.24em]"
          itemClassName="hover:text-lime transition-colors duration-300"
        />
      </div>
    </section>
  );
}
