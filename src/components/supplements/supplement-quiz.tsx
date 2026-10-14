"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowCounterClockwise,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  MagnifyingGlass,
  Plus,
  Warning,
  X,
} from "@phosphor-icons/react/dist/ssr";
import { Button, ButtonLink } from "@/components/ui/button";
import {
  matchConcerns,
  popularConcerns,
  scoreQuiz,
  suggestConcerns,
  visibleQuestions,
  type Answers,
  type Flag,
  type Match,
  type Question,
  type QuizOutcome,
} from "@/data/supplement-quiz";
import { areas, formatPrice, imageUrl, productUrl, supplements, tiers, type TierKey } from "@/data/supplements";
import { cn } from "@/lib/format";
import { ctaLabel } from "@/lib/site";

const tierOrder: TierKey[] = ["foundations", "essentials", "ultimate"];
const priceRange = (tier: TierKey) => {
  const prices = supplements.filter((item) => item.tier === tier).map((item) => item.price);
  return `${formatPrice(Math.min(...prices))} – ${formatPrice(Math.max(...prices))}`;
};

const tierBadge: Record<TierKey, string> = {
  foundations: "bg-brand-sage-soft text-brand-forest",
  essentials: "bg-brand-forest text-white",
  ultimate: "bg-brand-clay text-white",
};

function TierBadge({ tier, className }: { tier: TierKey; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        tierBadge[tier],
        className,
      )}
    >
      {tiers[tier].label}
    </span>
  );
}

const optionClass = (selected: boolean) =>
  cn(
    "flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-colors duration-200",
    selected
      ? "border-brand-forest bg-brand-sage-soft"
      : "border-line-strong bg-white hover:border-brand-forest hover:bg-brand-cream/60",
  );

function Tick({ selected, square }: { selected: boolean; square?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-6 shrink-0 place-items-center border transition-colors",
        square ? "rounded-md" : "rounded-full",
        selected ? "border-brand-forest bg-brand-forest text-white" : "border-line-strong bg-white",
      )}
    >
      {selected && <Check size={13} weight="bold" />}
    </span>
  );
}

export function SupplementQuiz() {
  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);
  const [outcome, setOutcome] = useState<QuizOutcome | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const touched = useRef(false);
  const reduceMotion = useReducedMotion();

  const steps = useMemo(() => visibleQuestions(answers), [answers]);
  const question = steps[index];

  useEffect(() => {
    if (!touched.current) return;
    headingRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }, [index, outcome, reduceMotion]);

  const answer = (id: string, value: unknown, advance = true) => {
    const next = { ...answers, [id]: value };
    setAnswers(next);
    if (!advance) return;
    touched.current = true;
    const nextSteps = visibleQuestions(next);
    if (index + 1 < nextSteps.length) setIndex(index + 1);
    else setOutcome(scoreQuiz(next));
  };

  const restart = () => {
    touched.current = true;
    setAnswers({});
    setOutcome(null);
    setIndex(0);
  };

  const motionProps = {
    initial: reduceMotion ? false : { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, x: -16 },
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const },
  };

  if (outcome) {
    return (
      <Results outcome={outcome} tier={answers.tier ?? "foundations"} headingRef={headingRef} onRestart={restart} />
    );
  }

  const progress = (index / steps.length) * 100;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="rounded-[1.75rem] border border-white/80 bg-white/90 p-6 shadow-lift backdrop-blur sm:p-10">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="font-semibold uppercase tracking-[0.14em] text-brand-forest">
            Question {index + 1} <span className="text-ink-muted">/ {steps.length}</span>
          </span>
          {index > 0 && (
            <button
              type="button"
              onClick={() => {
                touched.current = true;
                setIndex(index - 1);
              }}
              className="inline-flex items-center gap-1.5 font-medium text-brand-forest underline-offset-4 hover:underline"
            >
              <ArrowLeft size={16} weight="bold" aria-hidden />
              Back
            </button>
          )}
        </div>
        <div
          role="progressbar"
          aria-label="Quiz progress"
          aria-valuemin={0}
          aria-valuemax={steps.length}
          aria-valuenow={index}
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-brand-cream-deep"
        >
          <div
            className="h-full rounded-full bg-brand-forest transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.fieldset key={question.id} {...motionProps} className="mt-9">
            <legend className="contents">
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="text-balance font-serif text-[1.75rem] leading-snug outline-none sm:text-[2rem]"
              >
                {question.title}
              </h2>
            </legend>
            {question.hint && <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{question.hint}</p>}
            <div className="mt-7">
              <QuestionBody question={question} value={answers[question.id]} onAnswer={answer} />
            </div>
          </motion.fieldset>
        </AnimatePresence>
      </div>
    </div>
  );
}

type BodyProps = {
  question: Question;
  value: unknown;
  onAnswer: (id: string, value: unknown, advance?: boolean) => void;
};

function QuestionBody({ question, value, onAnswer }: BodyProps) {
  switch (question.kind) {
    case "choice":
      return (
        <div className={cn("grid gap-3", question.columns === 2 && "sm:grid-cols-2")}>
          {question.options.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={value === option.value}
              onClick={() => onAnswer(question.id, option.value)}
              className={optionClass(value === option.value)}
            >
              <span>
                <span className="block text-[17px] font-medium">{option.label}</span>
                {option.hint && <span className="mt-0.5 block text-sm text-ink-muted">{option.hint}</span>}
              </span>
              <Tick selected={value === option.value} />
            </button>
          ))}
        </div>
      );
    case "multi":
      return <MultiBody question={question} value={value as string[] | undefined} onAnswer={onAnswer} />;
    case "scale":
      return (
        <div>
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                aria-pressed={value === n}
                aria-label={`${n} of 5${n === 1 ? `, ${question.low}` : n === 5 ? `, ${question.high}` : ""}`}
                onClick={() => onAnswer(question.id, n)}
                className={cn(
                  "aspect-square rounded-2xl border font-serif text-2xl transition-colors duration-200 sm:text-3xl",
                  value === n
                    ? "border-brand-forest bg-brand-forest text-white"
                    : "border-line-strong bg-white text-brand-forest hover:border-brand-forest hover:bg-brand-cream/60",
                )}
              >
                {n}
              </button>
            ))}
          </div>
          <div aria-hidden className="mt-3 flex justify-between gap-6 text-sm text-ink-muted">
            <span>{question.low}</span>
            <span className="text-right">{question.high}</span>
          </div>
        </div>
      );
    case "age":
      return <AgeBody id={question.id} value={value as number | undefined} onAnswer={onAnswer} />;
    case "search":
      return <SearchBody id={question.id} value={value as string[] | undefined} onAnswer={onAnswer} />;
    case "tier":
      return (
        <div className="grid gap-3">
          {tierOrder.map((tier) => (
            <button
              key={tier}
              type="button"
              aria-pressed={value === tier}
              onClick={() => onAnswer(question.id, tier)}
              className={optionClass(value === tier)}
            >
              <span>
                <span className="flex flex-wrap items-center gap-2.5">
                  <TierBadge tier={tier} />
                  <span className="text-[17px] font-medium">{tiers[tier].summary}</span>
                </span>
                <span className="mt-1.5 block text-sm text-ink-muted">{tiers[tier].detail}</span>
              </span>
              <span className="shrink-0 text-right font-serif text-lg text-brand-forest">{priceRange(tier)}</span>
            </button>
          ))}
        </div>
      );
  }
}

function ContinueButton({
  onClick,
  disabled,
  label = "Continue",
}: {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}) {
  return (
    <Button size="lg" className="mt-7 w-full sm:w-auto" onClick={onClick} disabled={disabled}>
      {label}
      <ArrowRight size={18} weight="bold" aria-hidden />
    </Button>
  );
}

function MultiBody({
  question,
  value,
  onAnswer,
}: { question: Extract<Question, { kind: "multi" }> } & Omit<BodyProps, "question" | "value"> & { value?: string[] }) {
  const [selected, setSelected] = useState<string[]>(value ?? []);
  const NONE = "none";

  const toggle = (option: string) =>
    setSelected((current) =>
      option === NONE
        ? current.includes(NONE)
          ? []
          : [NONE]
        : current.includes(option)
          ? current.filter((v) => v !== option)
          : [...current.filter((v) => v !== NONE), option],
    );

  return (
    <div>
      <div className="grid gap-3">
        {[...question.options, { value: NONE, label: question.none }].map((option) => {
          const on = selected.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(option.value)}
              className={optionClass(on)}
            >
              <span className="text-[17px] font-medium">{option.label}</span>
              <Tick selected={on} square />
            </button>
          );
        })}
      </div>
      <ContinueButton
        disabled={!selected.length}
        onClick={() =>
          onAnswer(
            question.id,
            selected.filter((v) => v !== NONE),
          )
        }
      />
    </div>
  );
}

function AgeBody({ id, value, onAnswer }: { id: string; value?: number } & Pick<BodyProps, "onAnswer">) {
  const [age, setAge] = useState(value ?? 40);
  const inputId = useId();
  const fill = ((age - 18) / (85 - 18)) * 100;

  return (
    <div>
      <p className="text-center font-serif text-7xl text-brand-forest" aria-hidden>
        {age}
        <span className="ml-2 font-sans text-lg text-ink-muted">years</span>
      </p>
      <label htmlFor={inputId} className="sr-only">
        Your age
      </label>
      <input
        id={inputId}
        type="range"
        min={18}
        max={85}
        value={age}
        onChange={(event) => setAge(Number(event.target.value))}
        aria-valuetext={`${age} years`}
        className="mt-6 h-2 w-full cursor-pointer appearance-none rounded-full accent-brand-forest [&::-moz-range-thumb]:size-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-brand-forest [&::-webkit-slider-thumb]:size-7 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-brand-forest [&::-webkit-slider-thumb]:shadow-soft"
        style={{
          background: `linear-gradient(to right, var(--brand-forest) ${fill}%, var(--brand-cream-deep) ${fill}%)`,
        }}
      />
      <div aria-hidden className="mt-2 flex justify-between text-sm text-ink-muted">
        <span>18</span>
        <span>85</span>
      </div>
      <ContinueButton onClick={() => onAnswer(id, age)} />
    </div>
  );
}

function SearchBody({ id, value, onAnswer }: { id: string; value?: string[] } & Pick<BodyProps, "onAnswer">) {
  const [items, setItems] = useState<string[]>(value ?? []);
  const [query, setQuery] = useState("");
  // -1 means no suggestion is highlighted, so Enter adds what was typed.
  const [active, setActive] = useState(-1);
  const [open, setOpen] = useState(false);
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(
    () => suggestConcerns(query).filter((concern) => !items.includes(concern.label)),
    [query, items],
  );
  const picked = useMemo(() => {
    const labels = new Set<string>();
    for (const item of items) for (const concern of matchConcerns(item)) labels.add(concern.label);
    return [...labels];
  }, [items]);
  const showList = open && query.trim().length > 0;

  const add = (text: string) => {
    const clean = text.trim();
    if (!clean || items.some((item) => item.toLowerCase() === clean.toLowerCase())) return;
    setItems((current) => [...current, clean]);
    setQuery("");
    setActive(-1);
    inputRef.current?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const count = suggestions.length + 1;
    if (event.key === "ArrowDown" && query.trim()) {
      event.preventDefault();
      setOpen(true);
      setActive((a) => (a + 1) % count);
    } else if (event.key === "ArrowUp" && query.trim()) {
      event.preventDefault();
      setActive((a) => (a <= 0 ? count - 1 : a - 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (showList && active >= 0 && active < suggestions.length) add(suggestions[active].label);
      // A sentence like "tired and bloated" is kept whole so every concern in it counts;
      // a partial word like "hot fl" becomes the first suggestion.
      else if (active === -1 && !matchConcerns(query).length && suggestions.length) add(suggestions[0].label);
      else add(query);
    } else if (event.key === "Escape") {
      setOpen(false);
    } else if (event.key === "Backspace" && !query && items.length) {
      setItems((current) => current.slice(0, -1));
    }
  };

  return (
    <div>
      <div className="relative">
        <MagnifyingGlass
          size={20}
          aria-hidden
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
        />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-label="Type a symptom or health concern"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={showList && active < suggestions.length ? `${listId}-${active}` : undefined}
          value={query}
          placeholder="e.g. always tired, bloating, can’t sleep"
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(-1);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          onKeyDown={onKeyDown}
          className="h-14 w-full rounded-2xl border border-line-strong bg-white pl-12 pr-4 text-[17px] outline-none transition-colors placeholder:text-ink-muted/70 focus:border-brand-forest focus:ring-4 focus:ring-brand-sage/20"
        />
        {showList && (
          <ul
            id={listId}
            role="listbox"
            className="absolute inset-x-0 top-full z-10 mt-2 overflow-hidden rounded-2xl border border-line bg-white py-1.5 shadow-lift"
          >
            {suggestions.map((concern, i) => (
              <li
                key={concern.label}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => add(concern.label)}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 px-4 py-2.5",
                  i === active && "bg-brand-sage-soft",
                )}
              >
                <MagnifyingGlass size={16} aria-hidden className="text-ink-muted" />
                {concern.label}
              </li>
            ))}
            <li
              id={`${listId}-${suggestions.length}`}
              role="option"
              aria-selected={active === suggestions.length}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => add(query)}
              onMouseEnter={() => setActive(suggestions.length)}
              className={cn(
                "flex cursor-pointer items-center gap-3 px-4 py-2.5 text-brand-forest",
                active === suggestions.length && "bg-brand-sage-soft",
              )}
            >
              <Plus size={16} weight="bold" aria-hidden />
              Add &ldquo;{query.trim()}&rdquo;
            </li>
          </ul>
        )}
      </div>

      {items.length > 0 ? (
        <ul aria-label="Your concerns" className="mt-5 flex flex-wrap gap-2">
          {items.map((item) => {
            const known = matchConcerns(item).length > 0;
            return (
              <li
                key={item}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full py-1.5 pl-4 pr-1.5 text-[15px]",
                  known ? "bg-brand-forest text-white" : "border border-line-strong bg-white text-ink-muted",
                )}
              >
                {item}
                <button
                  type="button"
                  onClick={() => setItems((current) => current.filter((v) => v !== item))}
                  className={cn(
                    "grid size-6 place-items-center rounded-full",
                    known ? "hover:bg-white/20" : "hover:bg-brand-cream",
                  )}
                >
                  <X size={13} weight="bold" aria-hidden />
                  <span className="sr-only">Remove {item}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-5">
          <p className="text-sm text-ink-muted">Common concerns:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {popularConcerns.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => add(label)}
                className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-white px-4 py-1.5 text-[15px] transition-colors hover:border-brand-forest hover:bg-brand-cream/60"
              >
                <Plus size={13} weight="bold" aria-hidden className="text-brand-forest" />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {picked.length > 0 && (
        <p className="mt-4 text-sm leading-relaxed text-ink-muted" aria-live="polite">
          <span className="font-semibold text-brand-forest">We picked up:</span> {picked.join(", ")}
        </p>
      )}

      <ContinueButton
        label={items.length || query.trim() ? "Continue" : "Skip this question"}
        onClick={() => onAnswer(id, query.trim() ? [...items, query.trim()] : items)}
      />
    </div>
  );
}

function MatchRing({ percent, size = 76 }: { percent: number; size?: number }) {
  const radius = 15.5;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 36 36" className="size-full -rotate-90" aria-hidden>
        <circle cx="18" cy="18" r={radius} fill="none" strokeWidth="3" className="stroke-brand-cream-deep" />
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${(percent / 100) * circumference} ${circumference}`}
          className="stroke-brand-clay"
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center font-serif text-xl text-ink">{percent}%</span>
    </div>
  );
}

function MatchCard({ match, featured }: { match: Match; featured?: boolean }) {
  const { product, percent, reasons } = match;
  const area = areas[match.area];

  return (
    <article className="group flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-soft">
      <div
        className={cn(
          "relative overflow-hidden bg-brand-cream",
          featured ? "aspect-video md:aspect-[21/9]" : "aspect-video",
        )}
      >
        <Image
          src={imageUrl(product)}
          alt={`${product.name} box and daily packets`}
          fill
          sizes={featured ? "(min-width: 64rem) 64rem, 100vw" : "(min-width: 48rem) 32rem, 100vw"}
          className="object-cover object-[center_75%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <TierBadge tier={product.tier} className="absolute left-4 top-4 shadow-soft" />
        {featured && (
          <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold tracking-wide text-brand-forest shadow-soft">
            Best match
          </span>
        )}
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col",
          featured ? "p-7 sm:p-9 md:grid md:grid-cols-[1.2fr_1fr] md:gap-x-12" : "p-6",
        )}
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <MatchRing percent={percent} size={featured ? 84 : 68} />
            <p className="text-[15px] leading-snug text-ink-muted">
              <span className="block font-semibold text-ink">{percent}% match</span>
              for {area.label.toLowerCase()}
            </p>
          </div>
          <h3
            className={cn("mt-5 text-balance font-serif leading-tight", featured ? "text-3xl sm:text-4xl" : "text-2xl")}
          >
            {product.name}
          </h3>
          <p className="mt-2 leading-relaxed text-ink-muted">{area.description}</p>
        </div>

        <div className={cn("flex flex-col", featured && "md:border-l md:border-line md:pl-12")}>
          <p className={cn("mt-5 text-sm font-semibold", featured && "md:mt-0")}>Why it matches you</p>
          <ul className="mt-2 space-y-1.5">
            {reasons.map((reason) => (
              <li key={reason} className="flex gap-2.5 text-[15px] leading-snug">
                <Check size={16} weight="bold" aria-hidden className="mt-0.5 shrink-0 text-brand-forest" />
                {reason}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-7">
            <p className={cn("font-serif text-brand-forest", featured ? "text-4xl" : "text-3xl")}>
              {formatPrice(product.price)}
            </p>
            <a
              href={productUrl(product)}
              target="_blank"
              rel="noopener"
              className="inline-flex h-12 items-center gap-1.5 rounded-full bg-brand-clay px-6 font-medium text-white transition-colors hover:bg-brand-clay-deep"
            >
              View in store
              <ArrowUpRight size={16} weight="bold" aria-hidden />
              <span className="sr-only">: {product.name} (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

const flagNotes: Record<Flag, string> = {
  pregnancy:
    "You mentioned pregnancy, trying to conceive, or breastfeeding. Please talk with Joanne before taking any supplement.",
  medication:
    "Some supplements can interact with prescription medication, including diabetes medicines. Check with Joanne or your prescriber first.",
  condition:
    "You mentioned an ongoing health condition. Please check with Joanne or your doctor before starting a new supplement.",
  mood: "If low mood ever comes with thoughts of hurting yourself, call or text 988 (Suicide & Crisis Lifeline), any time.",
};

type ResultsProps = {
  outcome: QuizOutcome;
  tier: TierKey;
  headingRef: RefObject<HTMLHeadingElement | null>;
  onRestart: () => void;
};

function Results({ outcome, tier, headingRef, onRestart }: ResultsProps) {
  const reduceMotion = useReducedMotion();
  const [best, ...rest] = outcome.matches;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-5xl"
    >
      <div className="text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand-forest">Your results</p>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mt-3 text-balance font-serif text-4xl leading-tight outline-none sm:text-5xl"
        >
          {outcome.matches.length > 1
            ? `Your top ${outcome.matches.length} supplement matches`
            : "Your supplement match"}
        </h2>
        <p className="mx-auto mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-muted">
          Ranked by how closely each protocol fits your answers, at the {tiers[tier].label} level you chose.
        </p>
      </div>

      {outcome.flags.length > 0 && (
        <div className="mx-auto mt-8 max-w-3xl space-y-3">
          {outcome.flags.map((flag) => (
            <p
              key={flag}
              role="note"
              className="flex gap-3 rounded-2xl border border-brand-clay/40 bg-brand-clay/[0.07] p-4 leading-relaxed"
            >
              <Warning size={20} weight="fill" aria-hidden className="mt-0.5 shrink-0 text-brand-clay" />
              {flagNotes[flag]}
            </p>
          ))}
        </div>
      )}

      <div className="mt-10 space-y-6">
        <MatchCard match={best} featured />
        {rest.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((match) => (
              <MatchCard key={match.area} match={match} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-10 flex flex-col items-center gap-6 rounded-card bg-white/70 p-7 text-center sm:p-10">
        <p className="max-w-[52ch] text-lg leading-relaxed text-ink-muted">
          Want a second opinion? Joanne can look at your symptoms and health history and help you choose.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/contact" size="lg">
            {ctaLabel}
          </ButtonLink>
          <Button size="lg" variant="secondary" onClick={onRestart}>
            <ArrowCounterClockwise size={18} weight="bold" aria-hidden />
            Retake the quiz
          </Button>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-[80ch] text-center text-xs leading-relaxed text-ink-muted">
        Match percentages show how well each protocol fits your answers. They aren&rsquo;t a diagnosis. Supplements are
        sold and shipped by PharmaBuilt, and prices may change. These statements have not been evaluated by the Food and
        Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease.{" "}
        <Link href="/medical-disclaimer" className="text-brand-forest underline underline-offset-4">
          Medical disclaimer
        </Link>
      </p>
    </motion.div>
  );
}
