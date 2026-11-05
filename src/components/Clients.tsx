import { useLang } from "../i18n/LangContext";
import { SectionHead } from "./ui/SectionHead";
import { Reveal } from "./ui/Reveal";

export function Clients() {
  const { c, lang, clientsData } = useLang();
  const apiClients = Array.isArray(clientsData) && clientsData.length > 0 ? clientsData : null;
  const profileClients = c.clients.list || [];

  return (
    <section id="clients" className="relative border-t border-white/10 py-20 md:py-28 bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <SectionHead index="0.6" kicker={c.clients.kicker} title={c.clients.title} lead={c.clients.lead} />

        {/* 16 Real Client Brands from Page 25 of Company Profile */}
        <div className="mt-12 grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4 lg:grid-cols-4 border border-white/10">
          {apiClients
            ? apiClients.map((client, i) => (
                <Reveal key={client.name || i} delay={(i % 4) * 0.04}>
                  <div className="group flex h-[105px] items-center justify-center bg-ink p-4 transition-colors duration-300 hover:bg-indigo/30 md:h-[125px]">
                    {client.logo_url ? (
                      <img
                        src={client.logo_url}
                        alt={client.name}
                        loading="lazy"
                        className="max-h-11 max-w-[120px] object-contain opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-1.5 text-center">
                        <span className="font-display text-[12px] font-bold text-white/85 transition-colors group-hover:text-lime">
                          {client.name}
                        </span>
                        <span className="kicker text-[8.5px] text-white/30">{c.clients.slot}</span>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))
            : profileClients.map((client, i) => (
                <Reveal key={client.name} delay={(i % 4) * 0.03}>
                  <div className="group flex h-[105px] items-center justify-center bg-ink p-4 transition-colors duration-300 hover:bg-indigo/30 md:h-[125px]">
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <span className="font-display text-[12px] md:text-[13px] font-bold tracking-wide text-white/85 transition-colors group-hover:text-lime">
                        {client.name}
                      </span>
                      <span className="font-ar text-[11px] text-white/40 group-hover:text-white/70 transition-colors">
                        {lang === "ar" ? client.nameAr : c.clients.slot}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
        </div>

        {/* Verification Footer Note */}
        <div className="mt-8 text-center text-[11px] text-white/35">
          {c.clients.note}
        </div>
      </div>
    </section>
  );
}
