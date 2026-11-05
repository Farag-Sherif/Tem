import { useLang } from "../i18n/LangContext";
import { SectionHead } from "./ui/SectionHead";
import { Reveal } from "./ui/Reveal";

export function WorkshopCrew() {
  const { c, lang, dir } = useLang();
  const ws = c.workshop;

  return (
    <section id="workshop" className="relative border-t border-white/10 py-20 md:py-28 bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead
            index="0.4"
            kicker={ws.kicker}
            title={ws.title}
            lead={ws.lead}
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

        {/* 3 Pillars of In-House Fabrication + Uniformed Crew Spotlight */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* Pillar 1: Carpentry */}
          <Reveal delay={0.05}>
            <div className="group h-full border border-white/10 bg-white/[0.02] p-7 transition-all duration-300 hover:border-lime/40">
              <div className="flex items-center justify-between">
                <span className="font-display text-[11px] tracking-[0.24em] font-bold text-lime">
                  01 / CRAFT
                </span>
                <span className="text-white/40 font-display text-xs">MDF & CNC</span>
              </div>
              <h3 className="h-sub mt-5 text-[18px] text-white group-hover:text-lime transition-colors">
                {ws.carpentryTitle}
              </h3>
              <p className="body-copy mt-3 text-[13.5px] leading-relaxed text-white/65">
                {ws.carpentryDesc}
              </p>
            </div>
          </Reveal>

          {/* Pillar 2: Paint & Finishing */}
          <Reveal delay={0.1}>
            <div className="group h-full border border-white/10 bg-white/[0.02] p-7 transition-all duration-300 hover:border-lime/40">
              <div className="flex items-center justify-between">
                <span className="font-display text-[11px] tracking-[0.24em] font-bold text-lime">
                  02 / FINISH
                </span>
                <span className="text-white/40 font-display text-xs">DUCO SPRAY</span>
              </div>
              <h3 className="h-sub mt-5 text-[18px] text-white group-hover:text-lime transition-colors">
                {ws.finishingTitle}
              </h3>
              <p className="body-copy mt-3 text-[13.5px] leading-relaxed text-white/65">
                {ws.finishingDesc}
              </p>
            </div>
          </Reveal>

          {/* Pillar 3: Lighting & Tech */}
          <Reveal delay={0.15}>
            <div className="group h-full border border-white/10 bg-white/[0.02] p-7 transition-all duration-300 hover:border-lime/40">
              <div className="flex items-center justify-between">
                <span className="font-display text-[11px] tracking-[0.24em] font-bold text-lime">
                  03 / TECH
                </span>
                <span className="text-white/40 font-display text-xs">LED & POWER</span>
              </div>
              <h3 className="h-sub mt-5 text-[18px] text-white group-hover:text-lime transition-colors">
                {ws.lightingTitle}
              </h3>
              <p className="body-copy mt-3 text-[13.5px] leading-relaxed text-white/65">
                {ws.lightingDesc}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Real Visual Showcase Gallery from Workshop & Field Installation */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Shot 1: Workshop Craftsman */}
          <Reveal delay={0.05}>
            <div className="group relative overflow-hidden border border-white/12 bg-white/[0.02]">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/media/profile/workshop_craftsman.jpg"
                  alt="TAM Craftsman in workshop"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-4 bg-ink/90 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="font-display text-[10px] text-lime font-bold tracking-wider">
                    {lang === "ar" ? "داخل ورشتنا المركزية" : "IN-HOUSE WORKSHOP"}
                  </span>
                  <span className="text-[10px] text-white/40">CAIRO</span>
                </div>
                <div className="mt-1 text-[13px] font-medium text-white/80">
                  {lang === "ar"
                    ? "لحام وتجهيز الهياكل المعدنية والخشبية"
                    : "Metal & Joinery Pre-Assembly"}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Shot 2: Field Crew Installing */}
          <Reveal delay={0.1}>
            <div className="group relative overflow-hidden border border-white/12 bg-white/[0.02]">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/media/profile/crew_installing.jpg"
                  alt="TAM Crew installing booth on site"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-4 bg-ink/90 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="font-display text-[10px] text-lime font-bold tracking-wider">
                    {lang === "ar" ? "طاقم تام الميداني" : "THE TAM FIELD CREW"}
                  </span>
                  <span className="text-[10px] text-white/40">ON-SITE</span>
                </div>
                <div className="mt-1 text-[13px] font-medium text-white/80">
                  {lang === "ar"
                    ? "تركيب جدران الجناح في صالة المعرض بالزي الرسمي"
                    : "Rapid Wall Assembly in Official Vests"}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Shot 3: Inspection & Handover */}
          <Reveal delay={0.15}>
            <div className="group relative overflow-hidden border border-white/12 bg-white/[0.02] sm:col-span-2 lg:col-span-1">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/media/profile/booth_inspection.jpg"
                  alt="TAM booth inspection and quality checklist"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-4 bg-ink/90 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="font-display text-[10px] text-lime font-bold tracking-wider">
                    {lang === "ar" ? "فحص الجودة والمطابقة QC" : "QC INSPECTION & HANDOVER"}
                  </span>
                  <span className="text-[10px] text-white/40">24H PRE-SHOW</span>
                </div>
                <div className="mt-1 text-[13px] font-medium text-white/80">
                  {lang === "ar"
                    ? "مراجعة الرفوف والكهرباء والتسليم الكامل للعميل"
                    : "Checklist Review & Turnkey Client Handover"}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Page 11 Precision in Every Detail Banner */}
        <Reveal delay={0.15}>
          <div className="mt-12 border border-lime/40 bg-lime/[0.04] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <span className="font-display text-[11px] text-lime font-bold tracking-[0.24em]">
                {ws.precisionClaim}
              </span>
              <p className="mt-1 text-[14px] text-white/80">
                {ws.precisionSub}
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-display text-white/50">
              <span className="border border-white/20 px-3 py-1.5">0% THIRD PARTIES</span>
              <span className="border border-lime/40 px-3 py-1.5 text-lime">100% ACCOUNTABILITY</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
