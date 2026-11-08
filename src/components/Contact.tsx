import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { useLang } from "../i18n/LangContext";
import { Reveal } from "./ui/Reveal";
import { Symbol } from "./ui/Symbol";
import { Marquee } from "./ui/Marquee";
import { BoothConfigModal, type ConfiguratorData, normalizePhone, isValidPhoneNumber } from "./BoothConfigModal";
import { submitBrief, RateLimitError } from "../api/client";

const CURRENT_YEAR = new Date().getFullYear();

export function Contact() {
  const { c, dir, lang } = useLang();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [apiFeedback, setApiFeedback] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Controlled form state for pre-filling into modal & API submission
  const [name, setName] = useState("");
  const [reach, setReach] = useState("");
  const [details, setDetails] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Bot-protection honeypot (website)

  const handleModalComplete = (data: ConfiguratorData) => {
    setSent(true);
    if (data.name) setName(data.name);
    if (data.phone) setReach(data.phone);
    if (data.notes) setDetails(data.notes);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    if (!isValidPhoneNumber(reach)) {
      setErrorMessage(
        lang === "ar"
          ? "يرجى إدخال رقم هاتف صالح للتواصل (أرقام فقط، من 8 إلى 15 رقم)."
          : "Please enter a valid phone number (digits only, 8 to 15 digits)."
      );
      setSubmitting(false);
      return;
    }

    try {
      const res = await submitBrief({
        name,
        contact: reach,
        details,
        locale: lang,
        website: honeypot,
      });

      setSent(true);
      if (res.message) {
        setApiFeedback(res.message);
      }
    } catch (err: unknown) {
      if (err instanceof RateLimitError) {
        setErrorMessage(
          lang === "ar"
            ? "تم إرسال عدة طلبات مؤخراً. يرجى الانتظار قليلاً قبل المحاولة مجدداً (خطأ 429)."
            : "Too many requests. Please wait a moment before trying again (429 Rate Limit)."
        );
      } else {
        setErrorMessage(
          err instanceof Error
            ? err.message
            : lang === "ar"
            ? "تعذر إرسال الطلب. يرجى المحاولة مرة أخرى."
            : "Submission failed. Please try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/10 bg-ink">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(65% 55% at 12% 0%, rgba(15,6,102,0.55) 0%, transparent 65%), radial-gradient(45% 45% at 92% 92%, rgba(223,255,0,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-7 bg-lime" />
                <span className="kicker text-white/55">{c.contact.kicker}</span>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-6 text-[clamp(1.9rem,4.6vw,3.6rem)] font-bold leading-[1.2] tracking-normal text-white font-ar">
                {c.contact.title}
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="body-copy mt-5 max-w-[48ch] text-white/65">{c.contact.lead}</p>
            </Reveal>

            <Reveal delay={0.18}>
              <form onSubmit={handleFormSubmit} className="mt-9 grid gap-5 sm:grid-cols-2">
                {/* Honeypot field for bot protection as specified in API spec */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                  aria-hidden="true"
                />

                <label className="block">
                  <span className="kicker text-[11px] text-white/50">{c.contact.name}</span>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={c.contact.namePh}
                    className="mt-2 w-full border-b border-white/20 bg-transparent py-2.5 text-[14.5px] text-white outline-none transition-colors placeholder:text-white/25 focus:border-lime"
                  />
                </label>

                <label className="block">
                  <span className="kicker text-[11px] text-white/50">{c.contact.reach}</span>
                  <input
                    type="tel"
                    inputMode="tel"
                    required
                    value={reach}
                    onChange={(e) => setReach(normalizePhone(e.target.value))}
                    placeholder={c.contact.reachPh}
                    className="mt-2 w-full border-b border-white/20 bg-transparent py-2.5 text-[14.5px] text-white outline-none transition-colors placeholder:text-white/25 focus:border-lime"
                  />
                </label>

                <label className="block sm:col-span-2">
                  <span className="kicker text-[11px] text-white/50">{c.contact.details}</span>
                  <textarea
                    rows={3}
                    required
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder={c.contact.detailsPh}
                    className="mt-2 w-full resize-none border-b border-white/20 bg-transparent py-2.5 text-[14.5px] text-white outline-none transition-colors placeholder:text-white/25 focus:border-lime"
                  />
                </label>

                {errorMessage && (
                  <div className="sm:col-span-2 border border-amber-400/40 bg-amber-400/10 px-4 py-2.5 text-xs text-amber-200">
                    ⚠️ {errorMessage}
                  </div>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-4 sm:col-span-2">
                  {/* Primary Quick Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2.5 bg-lime px-7 py-3.5 text-[13.5px] font-bold text-ink shadow-[0_0_20px_-5px_rgba(223,255,0,0.35)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(223,255,0,0.5)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>
                      {submitting
                        ? lang === "ar"
                          ? "جاري الإرسال..."
                          : "Sending..."
                        : sent
                        ? c.contact.sent
                        : c.contact.submit}
                    </span>
                    <span className="font-display text-[11px]">
                      {sent ? "✓" : dir === "rtl" ? "←" : "↗"}
                    </span>
                  </button>

                  {/* Add Specifications Button (Opens Configurator Modal) */}
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 border border-lime/50 bg-lime/[0.08] px-6 py-3.5 text-[13.5px] font-bold text-lime backdrop-blur-md transition-all duration-300 hover:border-lime hover:bg-lime hover:text-ink hover:shadow-[0_0_25px_rgba(223,255,0,0.4)] hover:-translate-y-0.5"
                  >
                    <span className="font-display text-sm leading-none" aria-hidden="true">+</span>
                    <span>{c.contact.addDetailsBtn}</span>
                  </button>

                  <div className="w-full sm:w-auto">
                    <span
                      className={`text-[12px] block ${
                        sent ? "text-lime font-medium" : "text-white/40"
                      }`}
                    >
                      {sent ? apiFeedback || c.contact.thanks : c.contact.reply}
                    </span>
                  </div>
                </div>
              </form>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-6 text-[11px] leading-[1.9] text-white/30">{c.contact.note}</p>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <div className="relative h-full border border-white/12 bg-white/[0.02] p-6 md:p-8">
              <img
                src="/brand/logo-stacked.png"
                alt="TAM Booths & more"
                className="h-20 w-auto md:h-24"
              />
              <div className="mt-7 h-px w-full bg-white/12" />
              <div className="mt-6 space-y-4">
                {c.contact.rows.map(([k, v]) => {
                  let valNode: React.ReactNode = v;
                  if (k.includes("Phone") || k.includes("الهاتف") || k.includes("واتساب")) {
                    valNode = (
                      <a
                        href="https://wa.me/201011116346"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lime hover:underline font-mono text-[13px]"
                      >
                        {v}
                      </a>
                    );
                  } else if (k.includes("Email") || k.includes("البريد")) {
                    valNode = (
                      <a
                        href="mailto:inof@bluebrain-co.com"
                        className="text-lime hover:underline text-[12.5px]"
                      >
                        {v}
                      </a>
                    );
                  } else if (k.includes("Website") || k.includes("الموقع")) {
                    valNode = (
                      <a
                        href="https://www.bluebrain-co.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lime hover:underline text-[12.5px]"
                      >
                        {v}
                      </a>
                    );
                  }

                  return (
                    <div
                      key={k}
                      className="flex items-start justify-between gap-5 border-b border-white/5 pb-3"
                    >
                      <span className="shrink-0 text-[11px] font-medium text-white/40">{k}</span>
                      <span className="text-end text-[12.5px] leading-relaxed text-white/85">
                        {valNode}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Direct WhatsApp Instant Action Button with Real WhatsApp Logo */}
              <div className="mt-6">
                <a
                  href="https://wa.me/201011116346"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-center gap-3 border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-3.5 text-xs font-bold text-white transition-all duration-300 hover:border-[#25D366] hover:bg-[#25D366] hover:text-ink hover:shadow-[0_0_25px_rgba(37,211,102,0.4)]"
                >
                  <svg
                    className="h-5 w-5 fill-[#25D366] group-hover:fill-ink transition-colors shrink-0"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.57 14.39C16.32 14.27 15.1 13.67 14.87 13.58C14.65 13.5 14.48 13.46 14.32 13.71C14.15 13.96 13.67 14.52 13.52 14.69C13.38 14.86 13.23 14.88 12.98 14.76C12.73 14.64 11.92 14.37 10.96 13.51C10.21 12.84 9.7 12.01 9.55 11.76C9.4 11.51 9.53 11.38 9.66 11.25C9.77 11.14 9.91 10.96 10.04 10.81C10.16 10.66 10.2 10.56 10.28 10.39C10.37 10.22 10.33 10.08 10.27 9.95C10.2 9.83 9.72 8.65 9.52 8.16C9.32 7.68 9.12 7.75 8.97 7.74C8.83 7.73 8.66 7.73 8.49 7.73C8.32 7.73 8.05 7.79 7.82 8.04C7.59 8.29 6.94 8.9 6.94 10.13C6.94 11.36 7.84 12.54 7.97 12.71C8.09 12.88 9.73 15.41 12.24 16.49C12.84 16.75 13.3 16.9 13.67 17.02C14.27 17.21 14.82 17.18 15.25 17.12C15.74 17.05 16.75 16.51 16.96 15.92C17.17 15.34 17.17 14.84 17.11 14.74C17.05 14.63 16.82 14.52 16.57 14.39Z" />
                  </svg>
                  <span>
                    {lang === "ar" ? "محادثة فورية عبر واتساب" : "Chat on WhatsApp"}
                  </span>
                  <span dir="ltr" className="font-mono text-lime font-bold group-hover:text-ink transition-colors">
                    (+20 010 1111 63 46)
                  </span>
                </a>
              </div>

              <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-4">
                <Symbol size={22} />
                <span className="font-display text-[9.5px] tracking-[0.24em] text-white/40">
                  {lang === "ar" ? "صُنع قطعة تلو الأخرى" : "BUILT PIECE BY PIECE"}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-ink">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-4 px-5 py-6 md:flex-row md:items-center md:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <img src="/brand/logo-alt.png" alt="TAM" className="h-4 w-auto opacity-75" />
            <span className="text-[11px] text-white/35">
              © {CURRENT_YEAR} TAM. {c.contact.footerNote}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-display text-[9px] tracking-[0.2em] text-white/30">
              {c.contact.version}
            </span>
            <a href="#top" className="text-[11px] text-white/55 transition-colors hover:text-lime">
              {c.contact.up}
            </a>
          </div>
        </div>
      </div>

      {/* Infinite marquee ticker */}
      <div className="relative border-t border-white/10 bg-ink/95 py-3.5">
        <Marquee
          items={c.hero.ticker}
          speed={26}
          className="text-white/30 font-display text-[10px] tracking-[0.26em]"
          itemClassName="hover:text-lime transition-colors duration-300"
        />
      </div>

      {/* Interactive 6-step Booth Configuration Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <BoothConfigModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            initialData={{
              name,
              reach,
              details,
            }}
            onComplete={handleModalComplete}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
