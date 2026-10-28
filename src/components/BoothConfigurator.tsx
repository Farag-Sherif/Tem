import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "../i18n/LangContext";
import { SectionHead } from "./ui/SectionHead";

const BRAND_PALETTE = [
  { name: "Blue", hex: "#2563EB" },
  { name: "Dark Ink", hex: "#0F172A" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Purple", hex: "#7C3AED" },
  { name: "Emerald", hex: "#10B981" },
  { name: "Red", hex: "#EF4444" },
  { name: "Orange", hex: "#F59E0B" },
  { name: "Pink", hex: "#EC4899" },
  { name: "Cyan", hex: "#06B6D4" },
  { name: "TAM Lime", hex: "#DFFF00" },
];

const CURRENT_YEAR = new Date().getFullYear();

export function BoothConfigurator() {
  const { c, dir } = useLang();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Step 1: Dimensions
  const [width, setWidth] = useState(6);
  const [depth, setDepth] = useState(4);
  const [height, setHeight] = useState(3);

  // Step 2: Booth Type
  const [boothType, setBoothType] = useState<"inline" | "corner" | "peninsula" | "island">("island");

  // Step 3: Style & Industry
  const [selectedStyles, setSelectedStyles] = useState<string[]>(["Modern", "Technology"]);
  const [selectedColors, setSelectedColors] = useState<string[]>(["#2563EB", "#DFFF00"]);
  const [industry, setIndustry] = useState("");
  const [logoFileName, setLogoFileName] = useState("");

  // Step 4: Features
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["led_screen", "reception"]);

  // Step 5: Budget & Notes
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [budget, setBudget] = useState(10000);
  const [notes, setNotes] = useState("");

  const area = (width * depth).toFixed(1);
  const volume = (width * depth * height).toFixed(1);

  const toggleStyle = (st: string) => {
    setSelectedStyles((prev) =>
      prev.includes(st) ? prev.filter((s) => s !== st) : [...prev, st]
    );
  };

  const toggleColor = (hex: string) => {
    setSelectedColors((prev) => {
      if (prev.includes(hex)) return prev.filter((c) => c !== hex);
      if (prev.length >= 3) return [prev[1], prev[2], hex];
      return [...prev, hex];
    });
  };

  const toggleFeature = (fid: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(fid) ? prev.filter((f) => f !== fid) : [...prev, fid]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  const resetForm = () => {
    setStep(1);
    setSubmitted(false);
  };

  return (
    <section id="journey" className="relative border-t border-white/10 py-20 md:py-28 bg-ink overflow-hidden">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(55% 50% at 50% 15%, rgba(15, 5, 102, 0.7) 0%, transparent 70%), radial-gradient(40% 40% at 85% 85%, rgba(223, 255, 0, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
        <SectionHead
          index="0.1"
          kicker={c.configurator.kicker}
          title={c.configurator.title}
          lead={c.configurator.lead}
        />

        {/* Stepper Navigation Pills Bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {c.configurator.steps.map((sLabel, idx) => {
            const stepNum = idx + 1;
            const isCurrent = step === stepNum && !submitted;
            const isCompleted = step > stepNum || submitted;

            return (
              <button
                key={sLabel}
                type="button"
                onClick={() => {
                  if (submitted) setSubmitted(false);
                  setStep(stepNum);
                }}
                className={`group flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px] md:text-[12px] transition-all duration-300 border ${
                  isCurrent
                    ? "border-lime bg-lime text-ink font-bold shadow-[0_0_20px_rgba(223,255,0,0.35)]"
                    : isCompleted
                    ? "border-lime/40 bg-lime/[0.06] text-white hover:border-lime hover:text-lime"
                    : "border-white/10 bg-white/[0.02] text-white/40 hover:border-white/20 hover:text-white/70"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-display font-bold ${
                    isCurrent
                      ? "bg-ink text-lime"
                      : isCompleted
                      ? "bg-lime text-ink"
                      : "bg-white/10 text-white/50"
                  }`}
                >
                  {isCompleted ? "✓" : stepNum}
                </span>
                <span className="font-medium">{sLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Main Step Card Container */}
        <div className="mt-10 mx-auto max-w-4xl border border-white/12 bg-white/[0.02] p-6 sm:p-10 md:p-12 backdrop-blur-xl shadow-2xl">
          <AnimatePresence mode="wait">
            {submitted ? (
              /* Success Screen */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-lime bg-lime/10 text-lime text-3xl shadow-[0_0_35px_rgba(223,255,0,0.4)]">
                  ✓
                </div>
                <h3 className="h-title mt-6 text-2xl md:text-3xl font-bold text-white">
                  {c.configurator.step6.successTitle}
                </h3>
                <p className="body-copy mt-3 max-w-xl mx-auto text-white/70 text-[14.5px]">
                  {c.configurator.step6.successLead}
                </p>

                <div className="mt-8 border border-white/10 bg-white/[0.02] p-6 max-w-lg mx-auto text-start">
                  <div className="text-[11px] font-display text-lime font-bold tracking-wider">
                    {c.configurator.step6.specSheet}
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-white/40">{c.configurator.step1.area}:</span>{" "}
                      <span className="text-white font-bold">{area} m²</span>
                    </div>
                    <div>
                      <span className="text-white/40">{c.configurator.step2.title}:</span>{" "}
                      <span className="text-white font-bold uppercase">{boothType}</span>
                    </div>
                    <div>
                      <span className="text-white/40">{c.configurator.step5.budgetLabel}:</span>{" "}
                      <span className="text-lime font-bold">${budget.toLocaleString()} USD</span>
                    </div>
                    <div>
                      <span className="text-white/40">{c.configurator.step5.company}:</span>{" "}
                      <span className="text-white font-bold">{company || "—"}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-8 inline-flex items-center gap-2 border border-white/25 px-6 py-3 text-xs font-semibold text-white/80 hover:border-lime hover:text-lime transition-all"
                >
                  {c.configurator.step6.restartBtn}
                </button>
              </motion.div>
            ) : step === 1 ? (
              /* Step 1: Dimensions */
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: dir === "rtl" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir === "rtl" ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border-b border-white/10 pb-6">
                  <h3 className="h-title text-xl md:text-2xl font-bold text-white">
                    {c.configurator.step1.title}
                  </h3>
                  <p className="body-copy mt-1.5 text-xs md:text-sm text-white/55">
                    {c.configurator.step1.sub}
                  </p>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-3">
                  {/* Width Controller */}
                  <div className="border border-white/10 bg-white/[0.015] p-5 text-center">
                    <div className="kicker text-[11px] text-white/45 flex items-center justify-center gap-1.5">
                      <span>↔</span>
                      <span>{c.configurator.step1.width}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => setWidth((prev) => Math.max(2, prev - 1))}
                        className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/70 hover:border-lime hover:text-lime transition-all text-lg font-bold"
                      >
                        -
                      </button>
                      <span className="w-16 font-display text-3xl font-bold text-lime">
                        {width}
                      </span>
                      <button
                        type="button"
                        onClick={() => setWidth((prev) => Math.min(50, prev + 1))}
                        className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/70 hover:border-lime hover:text-lime transition-all text-lg font-bold"
                      >
                        +
                      </button>
                    </div>
                    <div className="mt-3 text-[11px] text-white/40">
                      {width}m × {depth}m = {area} m²
                    </div>
                  </div>

                  {/* Depth Controller */}
                  <div className="border border-white/10 bg-white/[0.015] p-5 text-center">
                    <div className="kicker text-[11px] text-white/45 flex items-center justify-center gap-1.5">
                      <span>↕</span>
                      <span>{c.configurator.step1.depth}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => setDepth((prev) => Math.max(2, prev - 1))}
                        className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/70 hover:border-lime hover:text-lime transition-all text-lg font-bold"
                      >
                        -
                      </button>
                      <span className="w-16 font-display text-3xl font-bold text-lime">
                        {depth}
                      </span>
                      <button
                        type="button"
                        onClick={() => setDepth((prev) => Math.min(50, prev + 1))}
                        className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/70 hover:border-lime hover:text-lime transition-all text-lg font-bold"
                      >
                        +
                      </button>
                    </div>
                    <div className="mt-3 text-[11px] text-white/40">
                      {depth}m
                    </div>
                  </div>

                  {/* Height Controller */}
                  <div className="border border-white/10 bg-white/[0.015] p-5 text-center">
                    <div className="kicker text-[11px] text-white/45 flex items-center justify-center gap-1.5">
                      <span>↑</span>
                      <span>{c.configurator.step1.height}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => setHeight((prev) => Math.max(2.5, prev - 0.5))}
                        className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/70 hover:border-lime hover:text-lime transition-all text-lg font-bold"
                      >
                        -
                      </button>
                      <span className="w-16 font-display text-3xl font-bold text-lime">
                        {height}
                      </span>
                      <button
                        type="button"
                        onClick={() => setHeight((prev) => Math.min(8, prev + 0.5))}
                        className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/70 hover:border-lime hover:text-lime transition-all text-lg font-bold"
                      >
                        +
                      </button>
                    </div>
                    <div className="mt-3 text-[11px] text-white/40">
                      {height}m
                    </div>
                  </div>
                </div>

                {/* Calculation Summary Bar */}
                <div className="mt-6 grid grid-cols-2 gap-4 border border-white/10 bg-indigo/30 p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-e border-white/10 pe-4">
                    <span className="text-xs text-white/50">{c.configurator.step1.area}</span>
                    <span className="font-display text-xl sm:text-2xl font-bold text-lime">
                      {area} <span className="text-sm font-sans text-white/70">m²</span>
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 ps-2">
                    <span className="text-xs text-white/50">{c.configurator.step1.volume}</span>
                    <span className="font-display text-xl sm:text-2xl font-bold text-lime">
                      {volume} <span className="text-sm font-sans text-white/70">m³</span>
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 bg-lime px-7 py-3.5 text-xs font-bold text-ink shadow-[0_0_20px_-4px_rgba(223,255,0,0.4)] hover:shadow-[0_0_30px_rgba(223,255,0,0.6)] transition-all"
                  >
                    <span>{c.configurator.continue}</span>
                  </button>
                </div>
              </motion.div>
            ) : step === 2 ? (
              /* Step 2: Booth Type */
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: dir === "rtl" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir === "rtl" ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border-b border-white/10 pb-6">
                  <h3 className="h-title text-xl md:text-2xl font-bold text-white">
                    {c.configurator.step2.title}
                  </h3>
                  <p className="body-copy mt-1.5 text-xs md:text-sm text-white/55">
                    {c.configurator.step2.sub}
                  </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {c.configurator.step2.types.map((type) => {
                    const isSelected = boothType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setBoothType(type.id as typeof boothType)}
                        className={`group flex flex-col items-center justify-between p-6 text-center transition-all duration-300 border ${
                          isSelected
                            ? "border-lime bg-lime/10 shadow-[0_0_25px_-5px_rgba(223,255,0,0.3)]"
                            : "border-white/10 bg-white/[0.015] hover:border-white/30 hover:bg-white/[0.03]"
                        }`}
                      >
                        {/* Architectural Wireframe SVG Diagram */}
                        <div className="flex h-16 w-16 items-center justify-center">
                          {type.id === "inline" && (
                            <svg width="48" height="48" viewBox="0 0 48 48" className="stroke-current">
                              {/* 3 solid walls, 1 open bottom */}
                              <rect x="8" y="8" width="32" height="32" fill="none" strokeWidth="2" strokeDasharray="32 0 32 32" className={isSelected ? "stroke-lime" : "stroke-white/40"} />
                              <line x1="8" y1="8" x2="40" y2="8" strokeWidth="3" className={isSelected ? "stroke-lime" : "stroke-white/80"} />
                              <line x1="8" y1="8" x2="8" y2="40" strokeWidth="3" className={isSelected ? "stroke-lime" : "stroke-white/80"} />
                              <line x1="40" y1="8" x2="40" y2="40" strokeWidth="3" className={isSelected ? "stroke-lime" : "stroke-white/80"} />
                              <path d="M24 38 L24 24 M20 28 L24 24 L28 28" fill="none" strokeWidth="1.5" className={isSelected ? "stroke-lime" : "stroke-white/30"} />
                            </svg>
                          )}
                          {type.id === "corner" && (
                            <svg width="48" height="48" viewBox="0 0 48 48" className="stroke-current">
                              {/* 2 solid walls (top & left), 2 open */}
                              <line x1="8" y1="8" x2="40" y2="8" strokeWidth="3" className={isSelected ? "stroke-lime" : "stroke-white/80"} />
                              <line x1="8" y1="8" x2="8" y2="40" strokeWidth="3" className={isSelected ? "stroke-lime" : "stroke-white/80"} />
                              <rect x="8" y="8" width="32" height="32" fill="none" strokeWidth="1" strokeDasharray="4 4" className={isSelected ? "stroke-lime/50" : "stroke-white/20"} />
                              <path d="M24 34 L32 26 M32 32 L32 26 L26 26" fill="none" strokeWidth="1.5" className={isSelected ? "stroke-lime" : "stroke-white/30"} />
                            </svg>
                          )}
                          {type.id === "peninsula" && (
                            <svg width="48" height="48" viewBox="0 0 48 48" className="stroke-current">
                              {/* 1 solid back wall (top), 3 open */}
                              <line x1="8" y1="8" x2="40" y2="8" strokeWidth="3" className={isSelected ? "stroke-lime" : "stroke-white/80"} />
                              <rect x="8" y="8" width="32" height="32" fill="none" strokeWidth="1" strokeDasharray="4 4" className={isSelected ? "stroke-lime/50" : "stroke-white/20"} />
                              <path d="M24 38 L24 22 M20 26 L24 22 L28 26" fill="none" strokeWidth="1.5" className={isSelected ? "stroke-lime" : "stroke-white/30"} />
                            </svg>
                          )}
                          {type.id === "island" && (
                            <svg width="48" height="48" viewBox="0 0 48 48" className="stroke-current">
                              {/* 4 open sides, floating central structure */}
                              <rect x="14" y="14" width="20" height="20" fill={isSelected ? "rgba(223,255,0,0.15)" : "none"} strokeWidth="2" className={isSelected ? "stroke-lime" : "stroke-white/70"} />
                              <rect x="6" y="6" width="36" height="36" fill="none" strokeWidth="1" strokeDasharray="3 3" className={isSelected ? "stroke-lime/40" : "stroke-white/20"} />
                              <circle cx="24" cy="24" r="3" fill={isSelected ? "#DFFF00" : "#FFFFFF"} />
                            </svg>
                          )}
                        </div>

                        <div className="mt-4">
                          <h4 className="text-sm font-bold text-white group-hover:text-lime transition-colors">
                            {type.name}
                          </h4>
                          <span className="mt-1 block text-[11px] text-white/50 font-medium">
                            {type.sides}
                          </span>
                        </div>

                        <div className="mt-3">
                          <span
                            className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${
                              isSelected
                                ? "border-lime bg-lime text-ink"
                                : "border-white/10 text-white/40"
                            }`}
                          >
                            {isSelected ? "✓ SELECTED" : "SELECT"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-xs font-semibold text-white/70 hover:border-lime hover:text-lime transition-all"
                  >
                    {c.configurator.back}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 bg-lime px-7 py-3 text-xs font-bold text-ink shadow-[0_0_20px_-4px_rgba(223,255,0,0.4)] hover:shadow-[0_0_30px_rgba(223,255,0,0.6)] transition-all"
                  >
                    <span>{c.configurator.continue}</span>
                  </button>
                </div>
              </motion.div>
            ) : step === 3 ? (
              /* Step 3: Style & Industry */
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: dir === "rtl" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir === "rtl" ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border-b border-white/10 pb-6">
                  <h3 className="h-title text-xl md:text-2xl font-bold text-white">
                    {c.configurator.step3.title}
                  </h3>
                  <p className="body-copy mt-1.5 text-xs md:text-sm text-white/55">
                    {c.configurator.step3.sub}
                  </p>
                </div>

                <div className="mt-7 space-y-7">
                  {/* Design Style */}
                  <div>
                    <label className="kicker text-[11px] text-white/50 block">
                      {c.configurator.step3.styleLabel}
                    </label>
                    <div className="mt-3 flex flex-wrap gap-2.5">
                      {c.configurator.step3.styles.map((styleName) => {
                        const isChosen = selectedStyles.includes(styleName);
                        return (
                          <button
                            key={styleName}
                            type="button"
                            onClick={() => toggleStyle(styleName)}
                            className={`rounded-full px-4 py-2 text-xs font-semibold transition-all border ${
                              isChosen
                                ? "border-lime bg-lime text-ink shadow-[0_0_15px_rgba(223,255,0,0.3)]"
                                : "border-white/15 bg-white/[0.02] text-white/70 hover:border-white/30 hover:text-white"
                            }`}
                          >
                            {styleName}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Brand Colors */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="kicker text-[11px] text-white/50 block">
                        {c.configurator.step3.colorLabel}
                      </label>
                      <span className="text-[11px] font-mono text-lime">
                        {selectedColors.length}/3 {c.configurator.step3.colorSelected}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      {BRAND_PALETTE.map((pal) => {
                        const isSelected = selectedColors.includes(pal.hex);
                        return (
                          <button
                            key={pal.name}
                            type="button"
                            onClick={() => toggleColor(pal.hex)}
                            title={pal.name}
                            className={`group relative flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-110 ${
                              isSelected
                                ? "ring-2 ring-lime ring-offset-2 ring-offset-ink scale-105"
                                : "opacity-80 hover:opacity-100"
                            }`}
                            style={{ backgroundColor: pal.hex }}
                          >
                            {isSelected && (
                              <span
                                className={`text-xs font-bold ${
                                  pal.hex === "#FFFFFF" || pal.hex === "#DFFF00"
                                    ? "text-ink"
                                    : "text-white"
                                }`}
                              >
                                ✓
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Industry Dropdown */}
                  <div>
                    <label className="kicker text-[11px] text-white/50 block">
                      {c.configurator.step3.industryLabel}
                    </label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="mt-2.5 w-full border border-white/20 bg-ink px-4 py-3 text-xs md:text-sm text-white outline-none focus:border-lime"
                    >
                      <option value="" disabled className="bg-ink text-white/40">
                        {c.configurator.step3.industryPh}
                      </option>
                      {c.configurator.step3.industries.map((ind) => (
                        <option key={ind} value={ind} className="bg-ink text-white">
                          {ind}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Brand Logo Upload */}
                  <div>
                    <label className="kicker text-[11px] text-white/50 block">
                      {c.configurator.step3.logoLabel}
                    </label>
                    <label className="mt-2.5 flex cursor-pointer flex-col items-center justify-center border border-dashed border-white/20 bg-white/[0.015] px-6 py-6 text-center hover:border-lime/50 transition-colors">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setLogoFileName(file.name);
                        }}
                        className="hidden"
                      />
                      <span className="text-xl text-lime">📁</span>
                      <span className="mt-2 text-xs text-white/70">
                        {logoFileName || c.configurator.step3.logoUpload}
                      </span>
                      {logoFileName && (
                        <span className="mt-1 text-[10px] text-lime font-mono">
                          ✓ {c.configurator.step3.logoAttached}
                        </span>
                      )}
                    </label>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-xs font-semibold text-white/70 hover:border-lime hover:text-lime transition-all"
                  >
                    {c.configurator.back}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="inline-flex items-center gap-2 bg-lime px-7 py-3 text-xs font-bold text-ink shadow-[0_0_20px_-4px_rgba(223,255,0,0.4)] hover:shadow-[0_0_30px_rgba(223,255,0,0.6)] transition-all"
                  >
                    <span>{c.configurator.continue}</span>
                  </button>
                </div>
              </motion.div>
            ) : step === 4 ? (
              /* Step 4: Booth Features */
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: dir === "rtl" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir === "rtl" ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border-b border-white/10 pb-6">
                  <h3 className="h-title text-xl md:text-2xl font-bold text-white">
                    {c.configurator.step4.title}
                  </h3>
                  <p className="body-copy mt-1.5 text-xs md:text-sm text-white/55">
                    {c.configurator.step4.sub}
                  </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {c.configurator.step4.features.map((feat) => {
                    const isSelected = selectedFeatures.includes(feat.id);
                    return (
                      <button
                        key={feat.id}
                        type="button"
                        onClick={() => toggleFeature(feat.id)}
                        className={`group flex items-start gap-4 p-5 text-start transition-all duration-300 border ${
                          isSelected
                            ? "border-lime bg-lime/10 shadow-[0_0_20px_-5px_rgba(223,255,0,0.25)]"
                            : "border-white/10 bg-white/[0.015] hover:border-white/30 hover:bg-white/[0.03]"
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-sm text-lg transition-colors ${
                            isSelected ? "bg-lime text-ink" : "bg-white/10 text-white/60"
                          }`}
                        >
                          {feat.id === "led_screen" && "🖥️"}
                          {feat.id === "reception" && "🛎️"}
                          {feat.id === "meeting_room" && "🤝"}
                          {feat.id === "storage" && "📦"}
                          {feat.id === "double_deck" && "🏗️"}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-white group-hover:text-lime transition-colors">
                              {feat.name}
                            </h4>
                            <span
                              className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold ${
                                isSelected ? "bg-lime text-ink" : "border border-white/20 text-transparent"
                              }`}
                            >
                              ✓
                            </span>
                          </div>
                          <p className="mt-1 text-[11.5px] leading-relaxed text-white/50">
                            {feat.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-xs font-semibold text-white/70 hover:border-lime hover:text-lime transition-all"
                  >
                    {c.configurator.back}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(5)}
                    className="inline-flex items-center gap-2 bg-lime px-7 py-3 text-xs font-bold text-ink shadow-[0_0_20px_-4px_rgba(223,255,0,0.4)] hover:shadow-[0_0_30px_rgba(223,255,0,0.6)] transition-all"
                  >
                    <span>{c.configurator.continue}</span>
                  </button>
                </div>
              </motion.div>
            ) : step === 5 ? (
              /* Step 5: Budget & Notes */
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: dir === "rtl" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir === "rtl" ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border-b border-white/10 pb-6">
                  <h3 className="h-title text-xl md:text-2xl font-bold text-white">
                    {c.configurator.step5.title}
                  </h3>
                  <p className="body-copy mt-1.5 text-xs md:text-sm text-white/55">
                    {c.configurator.step5.sub}
                  </p>
                </div>

                <div className="mt-7 space-y-6">
                  <div className="grid gap-5 sm:grid-cols-3">
                    <div>
                      <label className="kicker text-[11px] text-white/50 block">
                        {c.configurator.step5.name}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={c.configurator.step5.namePh}
                        className="mt-2 w-full border-b border-white/20 bg-transparent py-2.5 text-sm text-white outline-none focus:border-lime placeholder:text-white/20"
                      />
                    </div>
                    <div>
                      <label className="kicker text-[11px] text-white/50 block">
                        {c.configurator.step5.phone}
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={c.configurator.step5.phonePh}
                        className="mt-2 w-full border-b border-white/20 bg-transparent py-2.5 text-sm text-white outline-none focus:border-lime placeholder:text-white/20"
                      />
                    </div>
                    <div>
                      <label className="kicker text-[11px] text-white/50 block">
                        {c.configurator.step5.company}
                      </label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder={c.configurator.step5.companyPh}
                        className="mt-2 w-full border-b border-white/20 bg-transparent py-2.5 text-sm text-white outline-none focus:border-lime placeholder:text-white/20"
                      />
                    </div>
                  </div>

                  {/* Budget Slider */}
                  <div className="border border-white/10 bg-white/[0.015] p-5 sm:p-6">
                    <div className="flex items-center justify-between">
                      <span className="kicker text-[11px] text-white/50">
                        {c.configurator.step5.budgetLabel}
                      </span>
                      <span className="font-display text-xl font-bold text-lime">
                        ${budget.toLocaleString()} <span className="text-xs font-sans text-white/60">USD</span>
                      </span>
                    </div>

                    <input
                      type="range"
                      min="1000"
                      max="50000"
                      step="1000"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="mt-4 h-1.5 w-full cursor-pointer appearance-none bg-white/20 accent-lime outline-none"
                    />

                    <div className="mt-2 flex justify-between text-[10px] font-mono text-white/35">
                      <span>$1k</span>
                      <span>$10k</span>
                      <span>$25k</span>
                      <span>$50k+</span>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="kicker text-[11px] text-white/50 block">
                      {c.configurator.step5.notes}
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={c.configurator.step5.notesPh}
                      className="mt-2 w-full resize-none border border-white/20 bg-ink p-3.5 text-xs md:text-sm text-white outline-none focus:border-lime placeholder:text-white/20"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-xs font-semibold text-white/70 hover:border-lime hover:text-lime transition-all"
                  >
                    {c.configurator.back}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(6)}
                    className="inline-flex items-center gap-2 bg-lime px-7 py-3 text-xs font-bold text-ink shadow-[0_0_20px_-4px_rgba(223,255,0,0.4)] hover:shadow-[0_0_30px_rgba(223,255,0,0.6)] transition-all"
                  >
                    <span>{c.configurator.continue}</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Step 6: Review & Submit */
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: dir === "rtl" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir === "rtl" ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border-b border-white/10 pb-6">
                  <h3 className="h-title text-xl md:text-2xl font-bold text-white">
                    {c.configurator.step6.title}
                  </h3>
                  <p className="body-copy mt-1.5 text-xs md:text-sm text-white/55">
                    {c.configurator.step6.sub}
                  </p>
                </div>

                {/* Architectural Spec Sheet */}
                <div className="mt-8 border border-white/12 bg-white/[0.015] p-5 sm:p-7">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-sm font-bold text-lime">TAM SPECIFICATION</span>
                      <span className="text-[10px] text-white/30 font-mono">v1.0 · {CURRENT_YEAR}</span>
                    </div>
                    <span className="font-display text-[10px] tracking-widest text-white/40">CONFIDENTIAL</span>
                  </div>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    {/* Dimension Spec */}
                    <div className="border-b sm:border-b-0 sm:border-e border-white/10 pb-4 sm:pb-0 sm:pe-4">
                      <div className="flex items-center justify-between">
                        <span className="kicker text-[10px] text-lime font-bold">01. {c.configurator.step6.dimensionsHeader}</span>
                        <button type="button" onClick={() => setStep(1)} className="text-[10px] text-white/40 hover:text-lime underline">
                          {c.configurator.step6.editBtn}
                        </button>
                      </div>
                      <div className="mt-2 space-y-1 text-xs">
                        <div>
                          <span className="text-white/50">{width}m (W) × {depth}m (D) × {height}m (H)</span>
                        </div>
                        <div>
                          <span className="text-white font-bold">{area} m²</span> ({volume} m³ volume)
                        </div>
                      </div>
                    </div>

                    {/* Booth Type Spec */}
                    <div className="border-b sm:border-b-0 pb-4 sm:pb-0">
                      <div className="flex items-center justify-between">
                        <span className="kicker text-[10px] text-lime font-bold">02. {c.configurator.step6.boothTypeHeader}</span>
                        <button type="button" onClick={() => setStep(2)} className="text-[10px] text-white/40 hover:text-lime underline">
                          {c.configurator.step6.editBtn}
                        </button>
                      </div>
                      <div className="mt-2 text-xs text-white font-bold uppercase">
                        {boothType} booth
                      </div>
                    </div>

                    {/* Style Spec */}
                    <div className="border-b sm:border-b-0 sm:border-e border-white/10 pb-4 sm:pb-0 sm:pe-4 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="kicker text-[10px] text-lime font-bold">03. {c.configurator.step6.styleHeader}</span>
                        <button type="button" onClick={() => setStep(3)} className="text-[10px] text-white/40 hover:text-lime underline">
                          {c.configurator.step6.editBtn}
                        </button>
                      </div>
                      <div className="mt-2 text-xs text-white/70">
                        <div><strong className="text-white">{selectedStyles.join(", ")}</strong></div>
                        <div className="mt-1 flex items-center gap-1.5">
                          {selectedColors.map((hex) => (
                            <span key={hex} className="h-3.5 w-3.5 rounded-full inline-block border border-white/30" style={{ backgroundColor: hex }} />
                          ))}
                        </div>
                        {industry && <div className="mt-1 text-white/50">{industry}</div>}
                      </div>
                    </div>

                    {/* Features Spec */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between">
                        <span className="kicker text-[10px] text-lime font-bold">04. {c.configurator.step6.featuresHeader}</span>
                        <button type="button" onClick={() => setStep(4)} className="text-[10px] text-white/40 hover:text-lime underline">
                          {c.configurator.step6.editBtn}
                        </button>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {selectedFeatures.length > 0 ? (
                          selectedFeatures.map((fid) => (
                            <span key={fid} className="border border-white/20 bg-white/[0.04] px-2 py-0.5 text-[10px] text-lime font-medium">
                              {fid.replace("_", " ").toUpperCase()}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-white/40">Standard Build</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Client & Budget row */}
                  <div className="mt-6 border-t border-white/10 pt-4 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] text-white/40 block">{c.configurator.step6.budgetHeader}</span>
                      <span className="text-xs text-white">
                        {name || "Guest"} {company ? `(${company})` : ""} · {phone || "No phone provided"}
                      </span>
                    </div>
                    <div className="text-end">
                      <span className="text-[11px] text-white/40 block">{c.configurator.step5.budgetLabel}</span>
                      <span className="font-display text-lg font-bold text-lime">
                        ${budget.toLocaleString()} USD
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <form onSubmit={handleSubmit} className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                  <button
                    type="button"
                    onClick={() => setStep(5)}
                    className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-xs font-semibold text-white/70 hover:border-lime hover:text-lime transition-all"
                  >
                    {c.configurator.back}
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2.5 bg-lime px-8 py-3.5 text-xs font-bold text-ink shadow-[0_0_25px_-5px_rgba(223,255,0,0.5)] hover:shadow-[0_0_35px_rgba(223,255,0,0.7)] hover:-translate-y-0.5 transition-all disabled:opacity-50"
                  >
                    <span>{submitting ? c.configurator.step6.submitting : c.configurator.step6.submitBtn}</span>
                    <span className="font-display text-xs">↗</span>
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
