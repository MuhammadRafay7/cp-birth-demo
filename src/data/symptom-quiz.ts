export type Hormone = "progesterone" | "estrogen" | "testosterone";
export type Sex = "woman" | "man";
export type AgeBand = "under-35" | "35-44" | "45-54" | "55-plus";
export type Periods = "regular" | "changing" | "stopped-recent" | "stopped-year" | "none";
export type Frequency = 0 | 1 | 2;

export type SymptomQuestion = {
  id: string;
  /** Asked as "How often do you…" style prompt. */
  prompt: string;
  /** Short label used when listing matched symptoms in the result. */
  label: string;
  weights: Partial<Record<Hormone, number>>;
  /** Only ask while periods are still happening. */
  needsPeriods?: boolean;
  /** Flags the mood safety note in the result when answered "Often". */
  mood?: boolean;
};

export const frequencyOptions: { value: Frequency; label: string }[] = [
  { value: 0, label: "Rarely or never" },
  { value: 1, label: "Sometimes" },
  { value: 2, label: "Often" },
];

export const sexOptions: { value: Sex; label: string; hint: string }[] = [
  { value: "woman", label: "I’m a woman", hint: "Perimenopause, menopause, and cycle changes" },
  { value: "man", label: "I’m a man", hint: "Signs of low testosterone" },
];

export const ageOptions: { value: AgeBand; label: string }[] = [
  { value: "under-35", label: "Under 35" },
  { value: "35-44", label: "35 to 44" },
  { value: "45-54", label: "45 to 54" },
  { value: "55-plus", label: "55 or older" },
];

export const periodOptions: { value: Periods; label: string; hint?: string }[] = [
  { value: "regular", label: "Regular, about the same as always" },
  { value: "changing", label: "Changing", hint: "Irregular, heavier, lighter, or sometimes skipped" },
  { value: "stopped-recent", label: "Stopped, less than 12 months ago" },
  { value: "stopped-year", label: "Stopped 12 months ago or more" },
  { value: "none", label: "I don’t have periods for another reason", hint: "Hysterectomy, IUD, or other" },
];

export const womenQuestions: SymptomQuestion[] = [
  {
    id: "hot-flashes",
    prompt: "How often do you get hot flashes or night sweats?",
    label: "Hot flashes or night sweats",
    weights: { estrogen: 2 },
  },
  {
    id: "sleep",
    prompt: "How often do you have trouble falling or staying asleep?",
    label: "Trouble sleeping",
    weights: { progesterone: 2 },
  },
  {
    id: "anxiety",
    prompt: "How often do you feel anxious, irritable, or have mood swings?",
    label: "Anxiety, irritability, or mood swings",
    weights: { progesterone: 2 },
  },
  {
    id: "cycle",
    prompt: "How often are your periods heavy or painful, or come with PMS or breast tenderness?",
    label: "Heavy or painful periods, PMS, or breast tenderness",
    weights: { progesterone: 2 },
    needsPeriods: true,
  },
  {
    id: "dryness",
    prompt: "How often do you notice vaginal dryness or discomfort during sex?",
    label: "Vaginal dryness or discomfort during sex",
    weights: { estrogen: 2 },
  },
  {
    id: "bladder",
    prompt: "How often do you feel a sudden urge to urinate, or get UTIs?",
    label: "Bladder urgency or UTIs",
    weights: { estrogen: 2 },
  },
  {
    id: "body",
    prompt: "How often do you notice joint aches, thinning hair, or drier skin?",
    label: "Joint aches, thinning hair, or drier skin",
    weights: { estrogen: 2 },
  },
  {
    id: "fog",
    prompt: "How often do you have brain fog or trouble remembering things?",
    label: "Brain fog or poor memory",
    weights: { testosterone: 2 },
  },
  {
    id: "energy",
    prompt: "How often do you feel low on energy, even after rest?",
    label: "Low energy and fatigue",
    weights: { testosterone: 2 },
  },
  {
    id: "libido",
    prompt: "How often do you notice a lower sex drive than you used to have?",
    label: "Low libido",
    weights: { testosterone: 2 },
  },
  {
    id: "mood",
    prompt: "How often do you feel low or unmotivated?",
    label: "Low mood or motivation",
    weights: { testosterone: 2 },
    mood: true,
  },
  {
    id: "weight",
    prompt: "How often do you struggle with weight gain around your middle?",
    label: "Weight gain around the abdomen",
    weights: { estrogen: 1, testosterone: 1 },
  },
];

export const menQuestions: SymptomQuestion[] = [
  {
    id: "energy",
    prompt: "How often do you feel tired, even after a full night’s sleep?",
    label: "Fatigue",
    weights: { testosterone: 2 },
  },
  {
    id: "libido",
    prompt: "How often do you notice a lower sex drive, or changes in erections?",
    label: "Low libido or erection changes",
    weights: { testosterone: 2 },
  },
  {
    id: "muscle",
    prompt: "How often do you notice you’re losing muscle or strength?",
    label: "Loss of muscle or strength",
    weights: { testosterone: 2 },
  },
  {
    id: "mood",
    prompt: "How often do you feel low, irritable, or unmotivated?",
    label: "Low mood, irritability, or low motivation",
    weights: { testosterone: 2 },
    mood: true,
  },
  {
    id: "fog",
    prompt: "How often do you have brain fog or trouble concentrating?",
    label: "Brain fog",
    weights: { testosterone: 2 },
  },
  {
    id: "weight",
    prompt: "How often do you struggle with weight gain around your middle?",
    label: "Weight gain around the abdomen",
    weights: { testosterone: 1 },
  },
  {
    id: "sleep",
    prompt: "How often do you sleep poorly?",
    label: "Poor sleep",
    weights: { testosterone: 1 },
  },
];

export const hormoneInfo: Record<Hormone, { name: string; role: string }> = {
  progesterone: {
    name: "Low progesterone",
    role: "Progesterone is the calming hormone that balances your cycle and supports sleep. It’s often the first to drop in your late 30s and 40s.",
  },
  estrogen: {
    name: "Low estrogen",
    role: "Estrogen (estradiol) keeps your temperature, tissues, skin, and bones in balance. As it falls, hot flashes, dryness, and bladder changes often follow.",
  },
  testosterone: {
    name: "Low testosterone",
    role: "Testosterone supports energy, focus, desire, and muscle, in women as well as men. Low levels often show up as fatigue, brain fog, and low libido.",
  },
};

export type Answers = {
  sex?: Sex;
  age?: AgeBand;
  periods?: Periods;
  bleeding?: boolean;
  symptoms: Record<string, Frequency>;
};

export function questionsFor(answers: Answers): SymptomQuestion[] {
  if (answers.sex === "man") return menQuestions;
  const hasPeriods = answers.periods === "regular" || answers.periods === "changing";
  return womenQuestions.filter((question) => !question.needsPeriods || hasPeriods);
}

export type HormoneScore = {
  hormone: Hormone;
  score: number;
  level: "Few signs" | "Some signs" | "Clear signs" | "Strong signs";
  flagged: boolean;
  matched: string[];
};

export type QuizResult = {
  headline: string;
  stage?: string;
  stageNote?: string;
  scores: HormoneScore[];
  flagged: HormoneScore[];
  postMenopausalBleeding: boolean;
  lowMood: boolean;
};

const levelFor = (score: number): HormoneScore["level"] =>
  score >= 0.75 ? "Strong signs" : score >= 0.5 ? "Clear signs" : score >= 0.25 ? "Some signs" : "Few signs";

function stageFor({ age, periods }: Answers): { stage?: string; note?: string } {
  const younger = age === "under-35";
  const older = age === "45-54" || age === "55-plus";

  if (periods === "stopped-year") {
    return { stage: "menopause", note: "With no period for 12 months or more, you’ve likely reached menopause." };
  }
  if (periods === "stopped-recent" || periods === "changing") {
    if (younger) {
      return {
        stage: "hormone changes",
        note: "Cycle changes before 35 are less typical for perimenopause, so it’s worth checking for other causes too.",
      };
    }
    return {
      stage: "perimenopause",
      note: "Changing or recently stopped periods are the classic sign of perimenopause, the years before menopause.",
    };
  }
  if (periods === "regular") {
    if (younger) return {};
    return {
      stage: "early perimenopause",
      note: "Hormones can start shifting years before your periods change, so regular cycles don’t rule it out.",
    };
  }
  if (periods === "none" && older) {
    return {
      stage: "perimenopause or menopause",
      note: "Without periods to go by, a consultation and lab work are the best way to tell which stage you’re in.",
    };
  }
  return {};
}

const hormoneList = (names: string[]) =>
  names.length <= 1 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;

export function scoreQuiz(answers: Answers): QuizResult {
  const questions = questionsFor(answers);
  const hormones: Hormone[] = answers.sex === "man" ? ["testosterone"] : ["progesterone", "estrogen", "testosterone"];

  const scores = hormones
    .map((hormone) => {
      let total = 0;
      let max = 0;
      const matched: string[] = [];
      for (const question of questions) {
        const weight = question.weights[hormone];
        if (!weight) continue;
        const answer = answers.symptoms[question.id] ?? 0;
        total += answer * weight;
        max += 2 * weight;
        if (answer > 0) matched.push(question.label);
      }
      const score = max ? total / max : 0;
      return { hormone, score, level: levelFor(score), flagged: score >= 0.34, matched };
    })
    .sort((a, b) => b.score - a.score);

  const flagged = scores.filter((entry) => entry.flagged);
  const { stage, note } = answers.sex === "woman" ? stageFor(answers) : {};
  const flaggedNames = flagged.map((entry) => hormoneInfo[entry.hormone].name.toLowerCase());

  let headline: string;
  if (!flagged.length) {
    headline = stage
      ? `Your answers fit ${stage}, with only mild hormone symptoms right now.`
      : "Your answers don’t point to a strong hormone pattern right now.";
  } else if (stage) {
    headline = `Your answers fit a pattern of ${stage}, with signs of ${hormoneList(flaggedNames)}.`;
  } else {
    headline = `Your answers fit a pattern of ${hormoneList(flaggedNames)}.`;
  }

  return {
    headline,
    stage,
    stageNote: note,
    scores,
    flagged,
    postMenopausalBleeding: answers.periods === "stopped-year" && answers.bleeding === true,
    lowMood: questions.some((question) => question.mood && answers.symptoms[question.id] === 2),
  };
}
