"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowCounterClockwise,
  ArrowLeft,
  ArrowRight,
  Check,
  Phone,
  Warning,
} from "@phosphor-icons/react/dist/ssr";
import { AnchorButton, Button, ButtonLink } from "@/components/ui/button";
import {
  ageOptions,
  frequencyOptions,
  hormoneInfo,
  periodOptions,
  questionsFor,
  scoreQuiz,
  sexOptions,
  type Answers,
  type QuizResult,
} from "@/data/symptom-quiz";
import { cn } from "@/lib/format";
import { ctaLabel, siteConfig } from "@/lib/site";

type Option<T> = { value: T; label: string; hint?: string };

type Step = {
  key: string;
  title: string;
  hint?: string;
  options: Option<unknown>[];
  selected: unknown;
  apply: (answers: Answers, value: unknown) => Answers;
};

function buildSteps(answers: Answers): Step[] {
  const steps: Step[] = [
    {
      key: "sex",
      title: "Who are you checking symptoms for?",
      options: sexOptions,
      selected: answers.sex,
      // Switching between women's and men's questions starts the symptom answers over.
      apply: (current, value) =>
        value === current.sex ? current : { symptoms: {}, sex: value as Answers["sex"] },
    },
  ];

  if (answers.sex === "woman") {
    steps.push(
      {
        key: "age",
        title: "How old are you?",
        options: ageOptions,
        selected: answers.age,
        apply: (current, value) => ({ ...current, age: value as Answers["age"] }),
      },
      {
        key: "periods",
        title: "How would you describe your periods lately?",
        options: periodOptions,
        selected: answers.periods,
        apply: (current, value) => ({ ...current, periods: value as Answers["periods"] }),
      },
    );
    if (answers.periods === "stopped-year") {
      steps.push({
        key: "bleeding",
        title: "Have you had any bleeding or spotting since your periods stopped?",
        options: [
          { value: true, label: "Yes" },
          { value: false, label: "No" },
        ],
        selected: answers.bleeding,
        apply: (current, value) => ({ ...current, bleeding: value as boolean }),
      });
    }
  }

  if (answers.sex) {
    for (const question of questionsFor(answers)) {
      steps.push({
        key: question.id,
        title: question.prompt,
        options: frequencyOptions,
        selected: answers.symptoms[question.id],
        apply: (current, value) => ({
          ...current,
          symptoms: { ...current.symptoms, [question.id]: value as 0 | 1 | 2 },
        }),
      });
    }
  }

  return steps;
}

const emptyAnswers: Answers = { symptoms: {} };

export function SymptomQuiz() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();

  const steps = useMemo(() => buildSteps(answers), [answers]);
  const step = steps[index];
  // Before "who" is answered we don't know the length yet, so assume the longer women's path.
  const total = answers.sex ? steps.length : 15;

  useEffect(() => {
    if (started) headingRef.current?.focus({ preventScroll: true });
  }, [started, index, result]);

  const choose = (value: unknown) => {
    const next = step.apply(answers, value);
    const nextSteps = buildSteps(next);
    setAnswers(next);
    if (index + 1 < nextSteps.length) {
      setIndex(index + 1);
    } else {
      setResult(scoreQuiz(next));
    }
  };

  const restart = () => {
    setAnswers(emptyAnswers);
    setIndex(0);
    setResult(null);
    setStarted(true);
  };

  const transition = { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const };
  const motionProps = {
    initial: reduceMotion ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8 },
    transition,
  };

  return (
    <div className="overflow-hidden rounded-card border border-line bg-white/80 shadow-soft">
      <AnimatePresence mode="wait" initial={false}>
        {!started ? (
          <motion.div key="intro" {...motionProps} className="grid gap-8 p-7 sm:p-10 md:grid-cols-[1.3fr_1fr] md:items-center">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand-forest">
                2-minute symptom check
              </p>
              <h3 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">What could be behind how you feel?</h3>
              <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-muted">
                Answer a few quick questions. We&rsquo;ll show which hormone changes your symptoms point to, and what
                a consultation with Joanne can do about them.
              </p>
              <Button size="lg" className="mt-7" onClick={() => setStarted(true)}>
                Start the symptom check
                <ArrowRight size={18} weight="bold" aria-hidden />
              </Button>
            </div>
            <ul className="space-y-3 text-[15px] text-ink-muted md:border-l md:border-line md:pl-8">
              {["About 15 questions, one tap each", "For women and men", "Private: nothing is saved or sent"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-sage-soft text-brand-forest">
                      <Check size={13} weight="bold" aria-hidden />
                    </span>
                    {item}
                  </li>
                ),
              )}
            </ul>
          </motion.div>
        ) : result ? (
          <motion.div key="result" {...motionProps}>
            <QuizResultView result={result} headingRef={headingRef} onRestart={restart} />
          </motion.div>
        ) : (
          <motion.div key="quiz" {...motionProps} className="p-7 sm:p-10">
            <div className="flex items-center justify-between gap-4 text-sm text-ink-muted">
              <span>
                Question {index + 1} of {total}
              </span>
              <button
                type="button"
                onClick={() => (index === 0 ? setStarted(false) : setIndex(index - 1))}
                className="inline-flex items-center gap-1.5 font-medium text-brand-forest underline-offset-4 hover:underline"
              >
                <ArrowLeft size={16} weight="bold" aria-hidden />
                Back
              </button>
            </div>
            <div
              role="progressbar"
              aria-label="Symptom check progress"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={index}
              className="mt-3 h-1.5 overflow-hidden rounded-full bg-brand-cream-deep"
            >
              <div
                className="h-full rounded-full bg-brand-forest transition-[width] duration-500 ease-out"
                style={{ width: `${(index / total) * 100}%` }}
              />
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.fieldset key={step.key} {...motionProps} className="mt-8">
                <legend className="contents">
                  <h3
                    ref={headingRef}
                    tabIndex={-1}
                    className="max-w-[34ch] text-balance font-serif text-2xl leading-snug outline-none sm:text-3xl"
                  >
                    {step.title}
                  </h3>
                </legend>
                <div className="mt-7 grid gap-3">
                  {step.options.map((option) => {
                    const selected = option.value === step.selected;
                    return (
                      <button
                        key={String(option.value)}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => choose(option.value)}
                        className={cn(
                          "flex min-h-14 items-center justify-between gap-4 rounded-2xl border px-5 py-3.5 text-left transition-colors duration-200",
                          selected
                            ? "border-brand-forest bg-brand-sage-soft"
                            : "border-line-strong bg-white hover:border-brand-forest hover:bg-brand-cream/60",
                        )}
                      >
                        <span>
                          <span className="block text-[17px] font-medium">{option.label}</span>
                          {option.hint && <span className="mt-0.5 block text-sm text-ink-muted">{option.hint}</span>}
                        </span>
                        <span
                          aria-hidden
                          className={cn(
                            "grid size-6 shrink-0 place-items-center rounded-full border",
                            selected ? "border-brand-forest bg-brand-forest text-white" : "border-line-strong",
                          )}
                        >
                          {selected && <Check size={13} weight="bold" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.fieldset>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type ResultViewProps = {
  result: QuizResult;
  headingRef: RefObject<HTMLHeadingElement | null>;
  onRestart: () => void;
};

function QuizResultView({ result, headingRef, onRestart }: ResultViewProps) {
  const reasons = [
    {
      title: "Only a provider can confirm it.",
      body: "Symptoms like these overlap with thyroid problems, low iron, sleep issues, and depression. Joanne reviews your history and may order lab work to find the real cause.",
    },
    {
      title: "Treatment is matched to you.",
      body: "Bio-identical hormones are prescription-only and dosed to your body and your symptoms, not a one-size-fits-all product.",
    },
    {
      title: "It’s safer with a review.",
      body: "Hormone therapy isn’t right for everyone. Joanne talks through the benefits and risks so you can decide together.",
    },
  ];

  return (
    <div>
      <div className="border-b border-line bg-brand-cream/70 p-7 sm:p-10">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand-forest">Your results</p>
        <h3
          ref={headingRef}
          tabIndex={-1}
          className="mt-3 max-w-[30ch] text-balance font-serif text-3xl leading-tight outline-none sm:text-4xl"
        >
          {result.headline}
        </h3>
        {result.stageNote && <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-ink-muted">{result.stageNote}</p>}
      </div>

      <div className="space-y-10 p-7 sm:p-10">
        {(result.postMenopausalBleeding || result.lowMood) && (
          <div className="space-y-3">
            {result.postMenopausalBleeding && (
              <Alert>
                Bleeding or spotting after menopause should always be checked. Please call your provider soon rather
                than waiting for a hormone consultation.
              </Alert>
            )}
            {result.lowMood && (
              <Alert>
                If low mood ever comes with thoughts of hurting yourself, call or text <strong>988</strong> (Suicide
                &amp; Crisis Lifeline) any time, day or night.
              </Alert>
            )}
          </div>
        )}

        <section aria-label="Hormone signs">
          <h4 className="font-serif text-2xl">What your answers point to</h4>
          <ul className="mt-5 space-y-4">
            {result.scores.map((entry) => (
              <li key={entry.hormone}>
                <div className="flex items-baseline justify-between gap-4 text-[15px]">
                  <span className="font-semibold">{hormoneInfo[entry.hormone].name}</span>
                  <span className={entry.flagged ? "font-semibold text-brand-forest" : "text-ink-muted"}>
                    {entry.level}
                  </span>
                </div>
                <div aria-hidden className="mt-2 h-2 overflow-hidden rounded-full bg-brand-cream-deep">
                  <div
                    className={cn("h-full rounded-full", entry.flagged ? "bg-brand-forest" : "bg-brand-sage/60")}
                    style={{ width: `${Math.max(4, Math.round(entry.score * 100))}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        {result.flagged.length > 0 && (
          <div className="grid gap-5 lg:grid-cols-2">
            {result.flagged.map((entry) => (
              <section key={entry.hormone} className="rounded-card border border-line bg-white p-6">
                <h4 className="font-serif text-2xl">{hormoneInfo[entry.hormone].name}</h4>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{hormoneInfo[entry.hormone].role}</p>
                <p className="mt-4 border-t border-line pt-4 text-sm font-semibold">Symptoms you mentioned</p>
                <ul className="mt-2 space-y-1.5">
                  {entry.matched.map((label) => (
                    <li key={label} className="flex gap-3 leading-snug">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-forest" />
                      {label}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}

        <section aria-label="Why book a consultation" className="rounded-card bg-brand-sage-soft p-6 sm:p-8">
          <h4 className="font-serif text-2xl sm:text-3xl">
            {result.flagged.length ? "Why book a consultation" : "Still worth a conversation"}
          </h4>
          {!result.flagged.length && (
            <p className="mt-3 max-w-[60ch] leading-relaxed text-ink-muted">
              Even mild symptoms can be the start of hormone changes. A consultation can set a baseline and rule other
              causes out.
            </p>
          )}
          <ol className="mt-6 grid gap-6 md:grid-cols-3">
            {reasons.map((reason, i) => (
              <li key={reason.title}>
                <span aria-hidden className="font-serif text-3xl text-brand-forest">
                  {i + 1}
                </span>
                <p className="mt-1 font-semibold">{reason.title}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-muted">{reason.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact" size="lg">
              {ctaLabel}
            </ButtonLink>
            <AnchorButton href={siteConfig.phone.tel} size="lg" variant="secondary">
              <Phone size={18} weight="bold" aria-hidden />
              Call {siteConfig.phone.display}
            </AnchorButton>
          </div>
        </section>

        <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[60ch] text-sm text-ink-muted">
            This check is for general information and isn&rsquo;t a diagnosis. Only a provider who knows your health
            history can tell you what&rsquo;s going on.
          </p>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex shrink-0 items-center gap-2 text-[15px] font-medium text-brand-forest underline-offset-4 hover:underline"
          >
            <ArrowCounterClockwise size={16} weight="bold" aria-hidden />
            Start over
          </button>
        </div>
      </div>
    </div>
  );
}

function Alert({ children }: { children: ReactNode }) {
  return (
    <p role="note" className="flex gap-3 rounded-2xl border border-brand-clay/40 bg-brand-clay/[0.07] p-4 leading-relaxed">
      <Warning size={20} weight="fill" aria-hidden className="mt-0.5 shrink-0 text-brand-clay" />
      <span>{children}</span>
    </p>
  );
}
