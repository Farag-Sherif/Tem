import { useLang } from "../i18n/LangContext";
import { SectionHead } from "./ui/SectionHead";
import { Reveal } from "./ui/Reveal";

const SLOTS = ["01", "02", "03", "04", "05", "06", "07", "08"];

export function Clients() {
  const { c } = useLang();
  return (
    <section id="clients" className="relative border-t border-white/10 py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <SectionHead index="0.5" kicker={c.clients.kicker} title={c.clients.title} lead={c.clients.lead} />

        <div className="mt-10 grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
          {SLOTS.map((n, i) => (
            <Reveal key={n} delay={(i % 4) * 0.04}>
              <div className="group flex h-[92px] items-center justify-center bg-ink transition-colors duration-300 hover:bg-indigo/25 md:h-[116px]">
                <div className="flex flex-col items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center border border-dashed border-white/20 font-display text-[8.5px] text-white/30 transition-colors group-hover:border-lime/50 group-hover:text-lime/70">
                    {n}
                  </span>
                  <span className="kicker text-[8.5px] text-white/20">{c.clients.slot}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-6 flex items-start gap-3 border-s-2 border-lime/40 bg-lime/[0.03] px-4 py-3.5">
            <span className="mt-0.5 text-[10px] text-lime">✦</span>
            <p className="text-[11.5px] leading-[1.9] text-white/50">{c.clients.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
