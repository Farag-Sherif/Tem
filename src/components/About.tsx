import { useLang } from "../i18n/LangContext";
import { SectionHead } from "./ui/SectionHead";
import { Reveal } from "./ui/Reveal";
import { Symbol } from "./ui/Symbol";

export function About() {
  const { c, dir, lang } = useLang();
  const about = c.about;

  return (
    <section id="about" className="relative border-t border-white/10 py-20 md:py-28 bg-ink overflow-hidden">
      {/* Subtle brand glow behind vision / mission cards */}
      <div
        className="pointer-events-none absolute -end-24 top-1/3 h-[400px] w-[400px] rounded-full opacity-10 blur-[120px]"
        style={{ background: "#DFFF00" }}
      />
      <div
        className="pointer-events-none absolute -start-24 bottom-10 h-[450px] w-[450px] rounded-full opacity-25 blur-[140px]"
        style={{ background: "#0F0566" }}
      />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead
            index="0.1"
            kicker={about.kicker}
            title={about.title}
            lead={about.tag}
          />
          <div className="hidden md:flex items-center gap-3 border border-white/10 px-4 py-2 bg-white/[0.02]">
            <Symbol size={18} />
            <span className="font-display text-[10px] tracking-[0.24em] text-white/50">
              CAIRO · EST. 2022
            </span>
          </div>
        </div>

        {/* Story Paragraphs + High-Impact Visual Grid */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6">
            <Reveal>
              <p className="body-copy text-[16px] md:text-[18px] leading-relaxed text-white/85">
                {about.storyP1}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="body-copy text-[15px] md:text-[16px] leading-relaxed text-white/65">
                {about.storyP2}
              </p>
            </Reveal>

            {/* Quick 3 pillars pill strip */}
            <Reveal delay={0.15}>
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/10">
                <div className="border border-white/10 bg-white/[0.02] p-4">
                  <div className="font-display text-xs text-lime font-bold">01 / ONE ROOF</div>
                  <div className="mt-1 text-[13px] text-white/80 font-medium">
                    {lang === "ar" ? "شريك واحد مسؤول" : "Single Accountable Partner"}
                  </div>
                </div>
                <div className="border border-white/10 bg-white/[0.02] p-4">
                  <div className="font-display text-xs text-lime font-bold">02 / 100% IN-HOUSE</div>
                  <div className="mt-1 text-[13px] text-white/80 font-medium">
                    {lang === "ar" ? "ورشة تصنيع خاصة بالكامل" : "100% In-House Workshop"}
                  </div>
                </div>
                <div className="border border-white/10 bg-white/[0.02] p-4">
                  <div className="font-display text-xs text-lime font-bold">03 / ZERO SURPRISES</div>
                  <div className="mt-1 text-[13px] text-white/80 font-medium">
                    {lang === "ar" ? "صفر مفاجآت وتسليم مبكر" : "Zero Surprises & Early Handover"}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="relative overflow-hidden border border-white/15 bg-white/[0.02] p-2">
                <img
                  src="/media/profile/hero_crew.jpg"
                  alt="TAM Crew inside architectural booth"
                  className="w-full object-cover aspect-[4/3]"
                />
                <div className="p-4 bg-ink/90 border-t border-white/10">
                  <div className="kicker text-[10px] text-lime font-bold">
                    {lang === "ar" ? "طاقم تام الميداني — القاهرة" : "TAM FIELD CREW — CAIRO"}
                  </div>
                  <div className="mt-1 text-[12.5px] text-white/70">
                    {lang === "ar"
                      ? "إشراف هندسي وتنفيذ ميداني مباشر بدون أي مقاولي باطن"
                      : "Direct on-site engineering supervision with zero subcontracting"}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 02 Vision & Mission Dual Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {/* Vision Card */}
          <Reveal delay={0.05}>
            <div className="group relative h-full border border-white/12 bg-white/[0.02] p-7 md:p-9 transition-colors duration-300 hover:border-lime/40">
              <div className="flex items-center justify-between">
                <span className="font-display text-[10px] tracking-[0.24em] font-bold text-lime">
                  02.A · VISION
                </span>
                <span className="h-2 w-2 rounded-full bg-lime/60 group-hover:bg-lime transition-colors" />
              </div>
              <h3 className="h-title mt-5 text-[22px] md:text-[24px] text-white group-hover:text-lime transition-colors">
                {about.visionTitle}
              </h3>
              <p className="body-copy mt-4 text-[14.5px] md:text-[15.5px] leading-relaxed text-white/70">
                {about.visionText}
              </p>
            </div>
          </Reveal>

          {/* Mission Card */}
          <Reveal delay={0.1}>
            <div className="group relative h-full border border-white/12 bg-white/[0.02] p-7 md:p-9 transition-colors duration-300 hover:border-lime/40">
              <div className="flex items-center justify-between">
                <span className="font-display text-[10px] tracking-[0.24em] font-bold text-lime">
                  02.B · MISSION
                </span>
                <span className="h-2 w-2 rounded-full bg-lime/60 group-hover:bg-lime transition-colors" />
              </div>
              <h3 className="h-title mt-5 text-[22px] md:text-[24px] text-white group-hover:text-lime transition-colors">
                {about.missionTitle}
              </h3>
              <p className="body-copy mt-4 text-[14.5px] md:text-[15.5px] leading-relaxed text-white/70">
                {about.missionText}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Statement Quote Banner (Page 6 of Profile: "Built to Stand Out / صُمّم ليبرز") */}
        <Reveal delay={0.15}>
          <div className="mt-14 relative overflow-hidden border border-lime/30 bg-gradient-to-r from-lime/[0.06] via-indigo/20 to-lime/[0.03] p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-[70ch]">
                <div className="kicker text-lime font-bold text-[11px]">
                  {about.statementKicker} · {about.statementTitle}
                </div>
                <blockquote className="mt-3 text-[17px] md:text-[21px] font-semibold text-white leading-relaxed font-ar">
                  {about.statementQuote}
                </blockquote>
              </div>
              <a
                href="#contact"
                className="inline-flex shrink-0 items-center gap-2 border border-lime bg-lime px-6 py-3.5 text-[13px] font-bold text-ink hover:bg-lime/90 transition-all hover:shadow-[0_0_20px_rgba(223,255,0,0.4)]"
              >
                <span>{c.hero.ctaPrimary}</span>
                <span>{dir === "rtl" ? "←" : "→"}</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
