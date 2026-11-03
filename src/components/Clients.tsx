import { useLang } from "../i18n/LangContext";
import { SectionHead } from "./ui/SectionHead";
import { Reveal } from "./ui/Reveal";

const SLOTS = ["01", "02", "03", "04", "05", "06", "07", "08"];

export function Clients() {
  const { c, clientsData } = useLang();
  const hasClients = Array.isArray(clientsData) && clientsData.length > 0;

  return (
    <section id="clients" className="relative border-t border-white/10 py-20 md:py-28 bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <SectionHead index="0.5" kicker={c.clients.kicker} title={c.clients.title} lead={c.clients.lead} />

        <div className="mt-12 grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4 border border-white/10">
          {hasClients
            ? clientsData.map((client, i) => {
                const inner = (
                  <div className="group flex h-[100px] items-center justify-center bg-ink p-4 transition-colors duration-300 hover:bg-indigo/30 md:h-[120px]">
                    {client.logo_url ? (
                      <img
                        src={client.logo_url}
                        alt={client.name}
                        loading="lazy"
                        className="max-h-11 max-w-[120px] object-contain opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-1.5 text-center">
                        <span className="font-display text-[11px] font-bold text-white/85 transition-colors group-hover:text-lime">
                          {client.name}
                        </span>
                        <span className="kicker text-[8.5px] text-white/30">{c.clients.slot}</span>
                      </div>
                    )}
                  </div>
                );

                return (
                  <Reveal key={client.name || i} delay={(i % 4) * 0.04}>
                    {client.website ? (
                      <a
                        href={client.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block focus:outline-none"
                      >
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </Reveal>
                );
              })
            : SLOTS.map((n, i) => (
                <Reveal key={n} delay={(i % 4) * 0.04}>
                  <div className="group flex h-[100px] items-center justify-center bg-ink transition-colors duration-300 hover:bg-indigo/30 md:h-[120px]">
                    <div className="flex flex-col items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center border border-dashed border-white/20 font-display text-[9px] text-white/35 transition-colors group-hover:border-lime/60 group-hover:text-lime">
                        {n}
                      </span>
                      <span className="kicker text-[9.5px] text-white/30">{c.clients.slot}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  );
}
