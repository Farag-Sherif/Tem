import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useLang } from "../i18n/LangContext";

export function Nav() {
  const { c, lang, toggle } = useLang();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });

  useEffect(() => {
    const handler = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const items = [
    ["#journey", c.nav.journey],
    ["#services", c.nav.services],
    ["#work", c.nav.work],
    ["#standards", c.nav.standards],
    ["#clients", c.nav.clients],
    ["#contact", c.nav.contact],
  ] as const;

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-white/10">
        <motion.div className="h-full origin-right bg-lime" style={{ scaleX: bar }} />
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid ? "border-b border-white/10 bg-ink/85 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-4 px-5 md:px-8">
          <a href="#top" className="flex shrink-0 items-center" aria-label="TAM — Booths & more">
            <img src="/brand/logo-alt.png" alt="TAM Booths & more" className="h-[22px] w-auto md:h-[26px]" />
          </a>

          <nav className="hidden items-center gap-7 xl:flex">
            {items.map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="group relative text-[12.5px] text-white/60 transition-colors hover:text-white"
              >
                {label}
                <span className="absolute -bottom-1.5 start-0 h-px w-0 bg-lime transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={toggle}
              className="flex items-center gap-2 border border-white/20 px-3 py-2 text-[11.5px] text-white/75 transition-colors hover:border-lime hover:text-lime"
              aria-label={`Switch to ${c.meta.langNext}`}
            >
              <span className={lang === "ar" ? "font-display text-[9px] tracking-[0.18em]" : "font-ar text-[13px]"}>
                {c.meta.langLabel}
              </span>
              <span className="hidden text-[10.5px] opacity-55 sm:inline">{c.meta.langNext}</span>
            </button>

            <a
              href="#contact"
              className="hidden items-center gap-2 bg-lime px-4 py-2.5 text-[12px] font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5 md:flex"
            >
              {c.nav.cta}
              <span className="font-display text-[10px]">↗</span>
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] border border-white/20 xl:hidden"
              aria-label={c.nav.menu}
              aria-expanded={open}
            >
              <span className={`h-px w-4 bg-white transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`h-px w-4 bg-white transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-white/10 bg-ink/[0.97] px-5 py-4 xl:hidden">
            <div className="grid gap-1">
              {items.map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between border-b border-white/10 py-3 text-[14.5px] text-white/80"
                >
                  <span>{label}</span>
                  <span className="font-display text-[9px] tracking-[0.2em] text-white/30">
                    {href.replace("#", "").toUpperCase()}
                  </span>
                </a>
              ))}
            </div>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 flex justify-center bg-lime py-3 text-[13.5px] font-semibold text-ink"
            >
              {c.nav.cta}
            </a>
          </div>
        )}
      </header>
    </>
  );
}
