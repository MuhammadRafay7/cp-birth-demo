"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { stages, type Stage } from "@/data/hormones";
import { cn } from "@/lib/format";

const order = Object.keys(stages) as Stage[];

export function SymptomExplorer() {
  const [active, setActive] = useState<Stage>("perimenopause");
  const baseId = useId();
  const tabRefs = useRef<Record<Stage, HTMLButtonElement | null>>({ perimenopause: null, menopause: null });
  const reduceMotion = useReducedMotion();
  const stage = stages[active];

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = order[(order.indexOf(active) + (event.key === "ArrowRight" ? 1 : order.length - 1)) % order.length];
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Choose your stage" className="inline-flex rounded-full border border-line-strong bg-white p-1">
        {order.map((key) => {
          const selected = key === active;
          return (
            <button
              key={key}
              ref={(node) => {
                tabRefs.current[key] = node;
              }}
              role="tab"
              type="button"
              id={`${baseId}-${key}-tab`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(key)}
              onKeyDown={onKeyDown}
              className={cn(
                "h-11 rounded-full px-5 text-[15px] font-semibold transition-colors duration-200",
                selected ? "bg-brand-forest text-white" : "text-brand-forest hover:bg-brand-cream",
              )}
            >
              {stages[key].label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-${active}-tab`}
        tabIndex={0}
        className="mt-10 focus-visible:outline-offset-8"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid gap-5 lg:grid-cols-3">
              {stage.groups.map((group) => (
                <section
                  key={group.hormone}
                  aria-label={group.hormone}
                  className="rounded-card border border-line bg-white/70 p-6 sm:p-7"
                >
                  <h3 className="font-serif text-2xl leading-tight">{group.hormone}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{group.role}</p>
                  <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                    {group.symptoms.map((symptom) => (
                      <li key={symptom.label} className="flex gap-3 leading-snug">
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-forest" />
                        <span>
                          {symptom.label}
                          {symptom.note && <span className="text-ink-muted">, {symptom.note}</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
            <p className="mt-6 text-[15px] text-ink-muted">
              <span className="font-semibold text-ink">Also common:</span> {stage.alsoCommon}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
