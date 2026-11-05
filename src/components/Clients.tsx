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
        <SectionHead
          index="0.6"
          kicker={c.clients.kicker}
          title={c.clients.title}
          lead={c.clients.lead}
        />

        {/* 16 Client Logos Without Background (Transparent PNGs) */}
        <div className="mt-12 grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4 lg:grid-cols-4 border border-white/10">
          {apiClients
            ? apiClients.map((client, i) => (
                <Reveal key={client.name || i} delay={(i % 4) * 0.03}>
                  <div className="group flex h-[120px] items-center justify-center bg-ink p-5 transition-all duration-300 hover:bg-indigo/30 md:h-[135px]">
                    {client.logo_url ? (
                      <img
                        src={client.logo_url}
                        alt={client.name}
                        loading="lazy"
                        className="max-h-12 max-w-[135px] object-contain transition-all duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <span className="font-display text-[12px] font-bold text-white/85 group-hover:text-lime">
                        {client.name}
                      </span>
                    )}
                  </div>
                </Reveal>
              ))
            : profileClients.map((client, i) => (
                <Reveal key={client.name} delay={(i % 4) * 0.03}>
                  <div
                    className="group relative flex h-[120px] items-center justify-center bg-ink p-5 transition-all duration-300 hover:bg-indigo/25 hover:border-lime/30 md:h-[135px]"
                    title={lang === "ar" ? client.nameAr : client.name}
                  >
                    {/* Real Client Logo - Transparent Background */}
                    <img
                      src={client.logo}
                      alt={client.name}
                      loading="lazy"
                      className="max-h-12 max-w-[135px] object-contain transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
                    />

                    {/* Subtle micro-indicator on hover */}
                    <span className="pointer-events-none absolute bottom-2 end-2 font-display text-[8.5px] text-white/20 opacity-0 transition-opacity group-hover:opacity-100">
                      0{i + 1}
                    </span>
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
