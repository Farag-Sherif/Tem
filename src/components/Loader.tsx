import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Symbol } from "./ui/Symbol";

export function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const DUR = 1250;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DUR);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setGone(true);
        window.setTimeout(onDone, 560);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-end gap-4" dir="ltr">
            <Symbol size={48} animated />
            <div className="pb-1">
              <div className="font-display text-[24px] font-bold leading-none tracking-[0.28em] text-white">
                TAM
              </div>
              <div className="mt-2 font-sans text-[8.5px] tracking-[0.34em] text-white/45">
                BOOTHS &amp; MORE
              </div>
            </div>
          </div>
          <div className="mt-9 h-px w-[200px] overflow-hidden bg-white/12">
            <motion.div className="h-full bg-lime" animate={{ width: `${pct}%` }} transition={{ ease: "linear", duration: 0.12 }} />
          </div>
          <div className="mt-4 font-display text-[9.5px] tracking-[0.3em] text-white/40">
            {String(pct).padStart(3, "0")}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
