import { Reveal } from "./ui/Reveal";
import { useLang } from "../i18n/LangContext";

export function Glance() {
  const { c } = useLang();
  return (
    <section className="relative border-t border-white/10 py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-7 bg-lime/70" />
            <span className="kicker text-white/45">{c.glance.kicker}</span>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-px bg-white/10 md:grid-cols-3">
          {c.glance.items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.07}>
              <div className="group h-full bg-ink px-6 py-7 transition-colors duration-300 hover:bg-white/[0.03] md:px-8 md:py-9">
                <div className="flex items-center justify-between">
                  <span className="font-display text-[10px] tracking-[0.24em] text-lime/70">
                    0{i + 1}
                  </span>
                  <span className="h-1.5 w-1.5 bg-white/20 transition-colors group-hover:bg-lime" />
                </div>
                <h3 className="h-sub mt-5 text-white">{it.t}</h3>
                <p className="body-copy mt-3 text-[13.5px] text-white/50">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
