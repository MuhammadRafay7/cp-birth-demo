import { areas, findSupplement, type AreaKey, type Supplement, type TierKey } from "@/data/supplements";

/** "hormones" resolves to the women's or men's protocol once we know who the quiz is for. */
export type Target = Exclude<AreaKey, "womens" | "mens"> | "hormones";
export type Sex = "woman" | "man";
export type Weights = Partial<Record<Target, number>>;
export type Flag = "pregnancy" | "medication" | "condition" | "mood";

type Base = { id: string; title: string; hint?: string; showFor?: Sex };

export type ChoiceOption = { value: string; label: string; hint?: string; weights?: Weights; reason?: string };

export type ChoiceQuestion = Base & { kind: "choice"; options: ChoiceOption[]; columns?: 1 | 2 };
export type MultiQuestion = Base & { kind: "multi"; options: ChoiceOption[]; none: string };
export type ScaleQuestion = Base & {
  kind: "scale";
  low: string;
  high: string;
  /** Points per step away from the healthy end of the scale. */
  weights: Weights;
  /** Which end of the 1–5 scale is the healthy one. */
  healthy: 1 | 5;
  reason: string;
};
export type AgeQuestion = Base & { kind: "age" };
export type SearchQuestion = Base & { kind: "search" };
export type TierQuestion = Base & { kind: "tier" };

export type Question = ChoiceQuestion | MultiQuestion | ScaleQuestion | AgeQuestion | SearchQuestion | TierQuestion;

export type Concern = { label: string; terms: string[]; weights?: Weights; flag?: Flag };

/** Symptoms and conditions people can type into the search question. */
export const concerns: Concern[] = [
  {
    label: "Hot flashes or night sweats",
    terms: ["hot flash", "hot flush", "night sweat", "sweating at night"],
    weights: { hormones: 4 },
  },
  {
    label: "Menopause",
    terms: ["menopause", "perimenopause", "peri menopause", "change of life"],
    weights: { hormones: 4, "anti-aging": 1 },
  },
  {
    label: "Irregular or heavy periods",
    terms: ["irregular period", "heavy period", "missed period", "period", "menstrual"],
    weights: { hormones: 3 },
  },
  {
    label: "PMS or mood swings",
    terms: ["pms", "pmdd", "mood swing", "premenstrual"],
    weights: { hormones: 3, mood: 1 },
  },
  { label: "PCOS", terms: ["pcos", "polycystic"], weights: { hormones: 2, "blood-sugar": 2, glp1: 1 } },
  { label: "Low libido", terms: ["libido", "sex drive", "no desire", "low desire"], weights: { hormones: 3 } },
  { label: "Low testosterone", terms: ["low t", "testosterone", "andropause"], weights: { hormones: 4 } },
  { label: "Erectile problems", terms: ["erectile", "erection", "ed"], weights: { hormones: 3 } },
  { label: "Vaginal dryness", terms: ["vaginal dryness", "dryness", "painful sex"], weights: { hormones: 3 } },
  {
    label: "Fatigue or exhaustion",
    terms: ["fatigue", "tired", "exhaust", "no energy", "low energy", "sluggish", "drained"],
    weights: { energy: 4 },
  },
  {
    label: "Afternoon energy crashes",
    terms: ["crash", "slump", "tired after eating", "sleepy after meals"],
    weights: { energy: 2, "blood-sugar": 2 },
  },
  { label: "Brain fog", terms: ["brain fog", "foggy", "fog"], weights: { brain: 4 } },
  { label: "Poor memory", terms: ["memory", "forget", "forgetful"], weights: { brain: 4 } },
  {
    label: "Trouble focusing",
    terms: ["focus", "concentrat", "adhd", "distracted", "attention"],
    weights: { brain: 3 },
  },
  { label: "Anxiety or worry", terms: ["anxiety", "anxious", "worry", "panic", "nervous"], weights: { mood: 4 } },
  {
    label: "Low mood or depression",
    terms: ["depress", "low mood", "sad", "down", "unmotivated"],
    weights: { mood: 4 },
    flag: "mood",
  },
  {
    label: "Stress or burnout",
    terms: ["stress", "burnout", "burned out", "overwhelm"],
    weights: { mood: 3, energy: 1 },
  },
  { label: "Irritability", terms: ["irritab", "short temper", "angry", "snappy"], weights: { mood: 2, hormones: 1 } },
  {
    label: "Trouble sleeping",
    terms: ["insomnia", "sleep", "can't sleep", "cant sleep", "waking up"],
    weights: { mood: 2, hormones: 1, energy: 1 },
  },
  { label: "Bloating or gas", terms: ["bloat", "gas", "gassy", "puffy"], weights: { gut: 4 } },
  { label: "IBS", terms: ["ibs", "irritable bowel"], weights: { gut: 4 } },
  { label: "Constipation", terms: ["constipat", "irregular bowel"], weights: { gut: 3 } },
  { label: "Diarrhea or loose stools", terms: ["diarrh", "loose stool"], weights: { gut: 3 } },
  { label: "Acid reflux or heartburn", terms: ["reflux", "heartburn", "gerd", "indigestion"], weights: { gut: 3 } },
  {
    label: "Food sensitivities",
    terms: ["food sensitiv", "intoleran", "leaky gut", "lactose"],
    weights: { gut: 3, immunity: 1 },
  },
  {
    label: "Weight gain",
    terms: ["weight", "overweight", "obes", "belly fat", "lose weight", "losing weight"],
    weights: { glp1: 4, "blood-sugar": 1 },
  },
  {
    label: "Cravings or constant hunger",
    terms: ["craving", "hungry", "hunger", "appetite", "overeat", "sugar craving", "snack"],
    weights: { glp1: 3, "blood-sugar": 2 },
  },
  {
    label: "Prediabetes or insulin resistance",
    terms: ["prediabet", "pre-diabet", "insulin resist", "a1c", "high blood sugar", "glucose"],
    weights: { "blood-sugar": 5 },
  },
  { label: "Type 2 diabetes", terms: ["diabet", "type 2"], weights: { "blood-sugar": 4 }, flag: "medication" },
  {
    label: "Getting sick often",
    terms: ["sick often", "always sick", "cold", "flu", "infection", "immune", "immunity"],
    weights: { immunity: 4 },
  },
  { label: "Allergies", terms: ["allerg", "hay fever", "sinus"], weights: { immunity: 2 } },
  {
    label: "Slow recovery",
    terms: ["recover", "slow healing", "heal slow"],
    weights: { immunity: 2, "anti-aging": 1 },
  },
  {
    label: "Joint or muscle aches",
    terms: ["joint", "aches", "stiff", "arthritis", "inflammation"],
    weights: { "anti-aging": 3, hormones: 1 },
  },
  {
    label: "Thinning hair",
    terms: ["hair loss", "thinning hair", "hair thin", "balding", "hair"],
    weights: { hormones: 2, "anti-aging": 2 },
  },
  {
    label: "Aging skin",
    terms: ["wrinkle", "skin", "aging", "ageing", "anti aging", "anti-aging", "longevity"],
    weights: { "anti-aging": 4 },
  },
  { label: "Bone loss", terms: ["osteopor", "osteopen", "bone"], weights: { hormones: 2, "anti-aging": 2 } },
  {
    label: "Losing muscle",
    terms: ["muscle loss", "losing muscle", "weak", "strength"],
    weights: { hormones: 2, "anti-aging": 2 },
  },
  {
    label: "Pregnant or breastfeeding",
    terms: ["pregnan", "breastfeed", "nursing", "expecting", "trying to conceive", "ttc", "postpartum"],
    flag: "pregnancy",
  },
  {
    label: "Taking prescription medication",
    terms: ["medication", "blood thinner", "warfarin", "prescription", "meds"],
    flag: "medication",
  },
  { label: "Thyroid condition", terms: ["thyroid", "hashimoto", "graves"], weights: { energy: 1 }, flag: "condition" },
  {
    label: "Heart or blood pressure condition",
    terms: [
      "heart disease",
      "heart condition",
      "heart problem",
      "heart attack",
      "blood pressure",
      "hypertension",
      "cholesterol",
    ],
    flag: "condition",
  },
  { label: "Kidney or liver condition", terms: ["kidney", "liver"], flag: "condition" },
  { label: "Cancer", terms: ["cancer", "chemo", "tumor"], flag: "condition" },
];

export const popularConcerns = [
  "Fatigue or exhaustion",
  "Hot flashes or night sweats",
  "Bloating or gas",
  "Anxiety or worry",
  "Brain fog",
  "Weight gain",
];

// Short terms ("gas", "sad") must match a whole word; longer ones may be word stems ("constipat").
const termPattern = (term: string) => {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(term.length <= 4 ? `\\b${escaped}\\b` : `\\b${escaped}`, "i");
};

/** Finds every concern mentioned in free text, e.g. "always tired and bloated". */
export function matchConcerns(text: string): Concern[] {
  const value = text.trim().toLowerCase();
  return concerns.filter(
    (concern) => concern.label.toLowerCase() === value || concern.terms.some((term) => termPattern(term).test(value)),
  );
}

export function suggestConcerns(query: string): Concern[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return concerns
    .filter(
      (concern) =>
        concern.label.toLowerCase().includes(q) ||
        concern.terms.some((term) => term.startsWith(q) || termPattern(term).test(q)),
    )
    .slice(0, 6);
}

export const questions: Question[] = [
  {
    id: "sex",
    kind: "choice",
    title: "Who is this quiz for?",
    columns: 2,
    options: [
      { value: "woman", label: "A woman" },
      { value: "man", label: "A man" },
    ],
  },
  { id: "age", kind: "age", title: "How old are you?", hint: "Drag the slider, or use the arrow keys." },
  {
    id: "concerns",
    kind: "search",
    title: "What’s going on? Tell us in your own words.",
    hint: "Type a symptom or health concern, like “always tired” or “hot flashes”. Add as many as you like.",
  },
  {
    id: "energy",
    kind: "scale",
    title: "How are your energy levels on a typical day?",
    low: "Running on empty",
    high: "Full of energy",
    healthy: 5,
    weights: { energy: 1.2 },
    reason: "You rated your energy as low",
  },
  {
    id: "stress",
    kind: "scale",
    title: "How often do you feel stressed, anxious, or low?",
    low: "Rarely",
    high: "Almost always",
    healthy: 1,
    weights: { mood: 1.2 },
    reason: "You often feel stressed, anxious, or low",
  },
  {
    id: "focus",
    kind: "scale",
    title: "How sharp does your mind feel lately?",
    low: "Foggy and forgetful",
    high: "Clear and focused",
    healthy: 5,
    weights: { brain: 1.2 },
    reason: "You’ve noticed brain fog or trouble focusing",
  },
  {
    id: "sleep",
    kind: "choice",
    title: "How do you usually sleep?",
    options: [
      { value: "well", label: "I sleep well" },
      {
        value: "falling",
        label: "It’s hard to fall asleep",
        hint: "A busy mind at bedtime",
        weights: { mood: 2 },
        reason: "You have trouble falling asleep",
      },
      {
        value: "waking",
        label: "I wake up during the night",
        hint: "Often hot, restless, or wide awake",
        weights: { hormones: 2, mood: 1 },
        reason: "You wake up during the night",
      },
      { value: "tired", label: "I sleep, but wake up tired", weights: { energy: 2.5 }, reason: "You wake up tired" },
    ],
  },
  {
    id: "hormones-women",
    kind: "multi",
    showFor: "woman",
    title: "Have you noticed any of these changes?",
    hint: "Choose all that apply.",
    none: "None of these",
    options: [
      {
        value: "flashes",
        label: "Hot flashes or night sweats",
        weights: { hormones: 3 },
        reason: "Hot flashes or night sweats",
      },
      {
        value: "periods",
        label: "Irregular, heavy, or changing periods",
        weights: { hormones: 2.5 },
        reason: "Changing periods",
      },
      {
        value: "pms",
        label: "PMS, mood swings, or breast tenderness",
        weights: { hormones: 2, mood: 1 },
        reason: "PMS or mood swings",
      },
      { value: "libido", label: "Lower sex drive", weights: { hormones: 2 }, reason: "A lower sex drive" },
      {
        value: "dryness",
        label: "Vaginal dryness or bladder changes",
        weights: { hormones: 2 },
        reason: "Dryness or bladder changes",
      },
    ],
  },
  {
    id: "hormones-men",
    kind: "multi",
    showFor: "man",
    title: "Have you noticed any of these changes?",
    hint: "Choose all that apply.",
    none: "None of these",
    options: [
      {
        value: "drive",
        label: "Lower sex drive or performance",
        weights: { hormones: 3 },
        reason: "Lower drive or performance",
      },
      {
        value: "muscle",
        label: "Losing muscle or strength",
        weights: { hormones: 2, "anti-aging": 1 },
        reason: "Losing muscle or strength",
      },
      {
        value: "stamina",
        label: "Less stamina than you used to have",
        weights: { hormones: 2, energy: 1 },
        reason: "Less stamina",
      },
      {
        value: "irritable",
        label: "More irritable or unmotivated",
        weights: { hormones: 1.5, mood: 1 },
        reason: "Feeling irritable or unmotivated",
      },
    ],
  },
  {
    id: "digestion",
    kind: "multi",
    title: "Any digestive troubles?",
    hint: "Choose all that apply.",
    none: "My digestion is fine",
    options: [
      { value: "bloating", label: "Bloating or gas", weights: { gut: 2.5 }, reason: "Bloating or gas" },
      { value: "constipation", label: "Constipation", weights: { gut: 2 }, reason: "Constipation" },
      { value: "loose", label: "Loose stools", weights: { gut: 2 }, reason: "Loose stools" },
      { value: "heartburn", label: "Heartburn or reflux", weights: { gut: 1.5 }, reason: "Heartburn or reflux" },
      {
        value: "heavy",
        label: "Feeling heavy after meals",
        weights: { gut: 1.5 },
        reason: "Feeling heavy after meals",
      },
    ],
  },
  {
    id: "weight",
    kind: "choice",
    title: "Which best describes your weight and appetite?",
    options: [
      { value: "happy", label: "I’m happy with my weight" },
      {
        value: "cravings",
        label: "I fight cravings or always feel hungry",
        weights: { glp1: 3, "blood-sugar": 1 },
        reason: "Cravings or constant hunger",
      },
      {
        value: "middle",
        label: "I’ve gained weight around my middle",
        weights: { glp1: 3, "blood-sugar": 1, hormones: 1 },
        reason: "Weight gain around the middle",
      },
      {
        value: "stuck",
        label: "I’m trying to lose weight, but it won’t budge",
        weights: { glp1: 3.5 },
        reason: "Weight that won’t budge",
      },
    ],
  },
  {
    id: "blood-sugar",
    kind: "choice",
    title: "Do you feel shaky, tired, or foggy a couple of hours after eating?",
    options: [
      { value: "rarely", label: "Rarely or never" },
      { value: "sometimes", label: "Sometimes", weights: { "blood-sugar": 1.5 }, reason: "Energy dips after meals" },
      {
        value: "often",
        label: "Often",
        weights: { "blood-sugar": 3, energy: 1 },
        reason: "Frequent energy dips after meals",
      },
      {
        value: "told",
        label: "A doctor has said my blood sugar is high",
        weights: { "blood-sugar": 4.5 },
        reason: "High blood sugar",
      },
    ],
  },
  {
    id: "immunity",
    kind: "choice",
    title: "How many colds or infections do you get in a year?",
    columns: 2,
    options: [
      { value: "0-1", label: "0 to 1" },
      { value: "2-3", label: "2 to 3", weights: { immunity: 2 }, reason: "A few colds or infections a year" },
      { value: "4+", label: "4 or more", weights: { immunity: 4 }, reason: "Frequent colds or infections" },
      {
        value: "slow",
        label: "Not many, but slow to recover",
        weights: { immunity: 2.5 },
        reason: "Slow to recover when sick",
      },
    ],
  },
  {
    id: "aging",
    kind: "choice",
    title: "How important is long-term health and aging well to you?",
    options: [
      { value: "top", label: "A top priority", weights: { "anti-aging": 3 }, reason: "Aging well is a top priority" },
      {
        value: "some",
        label: "Somewhat important",
        weights: { "anti-aging": 1.5 },
        reason: "You care about aging well",
      },
      { value: "not", label: "Not a focus right now" },
    ],
  },
  {
    id: "tier",
    kind: "tier",
    title: "How much support would you like to start with?",
    hint: "Every protocol comes in three levels.",
  },
];

export type Answers = {
  sex?: Sex;
  age?: number;
  concerns?: string[];
  tier?: TierKey;
  [id: string]: unknown;
};

export const visibleQuestions = (answers: Answers) =>
  questions.filter((question) => !question.showFor || question.showFor === answers.sex);

export type Match = {
  area: AreaKey;
  percent: number;
  product: Supplement;
  reasons: string[];
};

export type QuizOutcome = { matches: Match[]; flags: Flag[]; concerns: string[] };

const resolve = (target: Target, sex: Sex): AreaKey =>
  target === "hormones" ? (sex === "woman" ? "womens" : "mens") : target;

/** Turns a raw score into a match percentage that rises quickly at first, then levels off below 100. */
const toPercent = (score: number) => Math.min(97, Math.round(100 * (1 - Math.exp(-score / 4.5))));

export function scoreQuiz(answers: Answers): QuizOutcome {
  const sex = answers.sex ?? "woman";
  const tier = answers.tier ?? "foundations";
  const scores = new Map<AreaKey, { score: number; reasons: string[] }>();
  const flags = new Set<Flag>();

  const add = (weights: Weights | undefined, reason: string | undefined, factor = 1) => {
    if (!weights) return;
    for (const [target, points] of Object.entries(weights) as [Target, number][]) {
      const area = resolve(target, sex);
      const entry = scores.get(area) ?? { score: 0, reasons: [] };
      entry.score += points * factor;
      // Skip a reason that repeats one we already have ("Hot flashes…" vs "You mentioned hot flashes…").
      const same = (other: string) =>
        other.toLowerCase().includes(reason!.toLowerCase()) || reason!.toLowerCase().includes(other.toLowerCase());
      if (reason && !entry.reasons.some(same)) entry.reasons.push(reason);
      scores.set(area, entry);
    }
  };

  for (const question of visibleQuestions(answers)) {
    const answer = answers[question.id];
    if (answer === undefined) continue;

    if (question.kind === "choice") {
      const option = question.options.find((o) => o.value === answer);
      add(option?.weights, option?.reason);
    } else if (question.kind === "multi") {
      for (const option of question.options) {
        if ((answer as string[]).includes(option.value)) add(option.weights, option.reason);
      }
    } else if (question.kind === "scale") {
      const steps = Math.abs((answer as number) - question.healthy);
      if (steps >= 2) add(question.weights, question.reason, steps);
      else add(question.weights, undefined, steps);
    } else if (question.kind === "age") {
      const age = answer as number;
      if (age >= 50) add({ "anti-aging": 2, hormones: 1.5 }, `Common needs at ${age}`);
      else if (age >= 38) add({ "anti-aging": 1, hormones: 1 }, `Common needs at ${age}`);
    } else if (question.kind === "search") {
      for (const text of answer as string[]) {
        for (const concern of matchConcerns(text)) {
          add(concern.weights, `You mentioned ${concern.label.toLowerCase()}`);
          if (concern.flag) flags.add(concern.flag);
        }
      }
    }
  }

  const ranked = [...scores.entries()]
    .map(([area, { score, reasons }]) => ({ area, percent: toPercent(score), reasons }))
    .filter((entry) => entry.percent >= 20)
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 3);

  if (!ranked.length) {
    ranked.push({ area: "anti-aging", percent: 40, reasons: ["General daily support for long-term health"] });
  }

  return {
    matches: ranked.map((entry) => ({
      ...entry,
      reasons: entry.reasons.slice(0, 4),
      product: findSupplement(entry.area, tier)!,
    })),
    flags: [...flags],
    concerns: answers.concerns ?? [],
  };
}

export const areaLabel = (area: AreaKey) => areas[area].label;
