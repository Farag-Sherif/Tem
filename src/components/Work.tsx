import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "../i18n/LangContext";
import { SectionHead } from "./ui/SectionHead";

type ProjectCategory = "all" | "booths" | "displays" | "concepts" | "prints";

export function Work() {
  const { c, dir, lang } = useLang();
  const [activeTab, setActiveTab] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<typeof c.work.items[0] | null>(null);

  const tabs: { id: ProjectCategory; label: string }[] = [
    { id: "all", label: c.work.allTab || (lang === "ar" ? "كل الأعمال" : "All Projects") },
    { id: "booths", label: c.work.boothsTab || (lang === "ar" ? "أجنحة المعارض" : "Exhibition Booths") },
    { id: "displays", label: c.work.displaysTab || (lang === "ar" ? "استندات العرض" : "Display Units") },
    { id: "concepts", label: c.work.conceptsTab || (lang === "ar" ? "مفاهيم 3D" : "3D Concepts") },
    { id: "prints", label: c.work.printsTab || (lang === "ar" ? "المطبوعات" : "Prints") },
  ];

  const filteredItems = useMemo(() => {
    if (activeTab === "all") return c.work.items;
    return c.work.items.filter((item) => ("category" in item ? item.category === activeTab : true));
  }, [c.work.items, activeTab]);

  return (
    <section id="work" className="relative border-t border-white/10 bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead
            index="0.3"
            kicker={c.work.kicker}
            title={c.work.title}
            lead={c.work.lead}
          />

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 border border-white/10 bg-white/[0.02] p-1.5" dir={dir}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-lime text-ink font-bold shadow-[0_0_15px_-3px_rgba(223,255,0,0.4)]"
                      : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive, Balanced Grid that displays perfectly in both Arabic and English */}
        <motion.div
          layout
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          dir={dir}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((w, idx) => (
              <motion.article
                layout
                key={w.title + idx}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: (idx % 6) * 0.04 }}
                className="group relative cursor-pointer overflow-hidden border border-white/12 bg-white/[0.02] transition-all duration-500 hover:border-lime/50 hover:bg-white/[0.04] hover:-translate-y-1"
                onClick={() => setSelectedProject(w)}
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-indigo/20">
                  <img
                    src={w.img}
                    alt={w.title}
                    loading={idx < 4 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />

                  {/* Category Pill Tag */}
                  <div className="absolute top-3.5 start-3.5 flex items-center gap-2">
                    <span className="border border-white/20 bg-ink/80 px-2.5 py-0.5 text-[10.5px] font-medium text-white/90 backdrop-blur-md">
                      {w.tag}
                    </span>
                  </div>

                  {/* Index Pill */}
                  <div className="absolute top-3.5 end-3.5 flex items-center gap-1 font-display text-[10px] text-lime font-bold bg-ink/80 px-2 py-0.5 border border-white/10 backdrop-blur-md">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 md:p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="h-sub text-[16px] md:text-[18px] text-white group-hover:text-lime transition-colors">
                      {w.title}
                    </h3>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-white/60 line-clamp-2">
                      {w.meta}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3.5">
                    <span className="text-[11.5px] text-lime/80 font-medium group-hover:text-lime flex items-center gap-1">
                      <span>{lang === "ar" ? "عرض التفاصيل" : "View Details"}</span>
                      <span className="font-display text-[10px]">{dir === "rtl" ? "←" : "→"}</span>
                    </span>
                    <span className="text-[10px] text-white/30 font-display">TAM PROJECT</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>

          {/* End CTA Card docking naturally in the grid */}
          <a
            href="#contact"
            className="group flex flex-col justify-center items-center border border-lime/40 bg-lime/[0.04] p-8 text-center transition-all duration-300 hover:border-lime hover:bg-lime/[0.08] hover:-translate-y-1"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-lime/50 text-lime mb-4 group-hover:scale-110 transition-transform">
              <span className="text-xl">↗</span>
            </div>
            <div className="font-display text-[10.5px] tracking-[0.24em] text-lime font-bold">
              {c.work.nextLabel}
            </div>
            <div className="h-title mt-2 text-[20px] md:text-[22px] text-white">
              {c.work.endTitle}
            </div>
            <div className="body-copy mt-2 text-[13px] text-white/60 max-w-[32ch]">
              {c.work.endSub}
            </div>
            <div className="mt-6 inline-flex items-center gap-2 bg-lime px-5 py-2.5 text-[12.5px] font-bold text-ink">
              <span>{c.work.endCta}</span>
              <span>↗</span>
            </div>
          </a>
        </motion.div>

        {/* Verification Note */}
        <div className="mt-12 text-center text-[11px] text-white/35 max-w-[80ch] mx-auto">
          {c.work.note}
        </div>
      </div>

      {/* Lightbox / Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-white/20 bg-ink p-6 md:p-8 shadow-2xl"
              dir={dir}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 end-4 flex h-8 w-8 items-center justify-center border border-white/20 text-white/70 hover:border-lime hover:text-lime transition-colors"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="relative aspect-[16/10] overflow-hidden border border-white/10 bg-black">
                <img
                  src={selectedProject.img}
                  alt={selectedProject.title}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-2">
                  <span className="border border-lime/40 bg-lime/10 px-2.5 py-0.5 text-xs text-lime font-medium">
                    {selectedProject.tag}
                  </span>
                  <span className="text-xs text-white/40">TAM Company Profile Project</span>
                </div>
                <h3 className="h-title mt-3 text-[22px] md:text-[26px] text-white">
                  {selectedProject.title}
                </h3>
                <p className="mt-2 text-sm text-lime font-medium">
                  {selectedProject.meta}
                </p>
                {"desc" in selectedProject && selectedProject.desc && (
                  <p className="body-copy mt-4 text-[14.5px] leading-relaxed text-white/75 border-t border-white/10 pt-4">
                    {String(selectedProject.desc)}
                  </p>
                )}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                <div className="text-xs text-white/40">
                  {lang === "ar"
                    ? "تواصل معنا لتصميم وتنفيذ مشروع مماثل"
                    : "Contact us to engineer a similar project for your brand"}
                </div>
                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex items-center gap-2 bg-lime px-5 py-2.5 text-xs font-bold text-ink hover:bg-lime/90 transition-colors"
                >
                  <span>{c.hero.ctaPrimary}</span>
                  <span>{dir === "rtl" ? "←" : "→"}</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
