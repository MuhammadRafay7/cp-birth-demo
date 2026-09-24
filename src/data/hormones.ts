export type Stage = "perimenopause" | "menopause";

export type HormoneGroup = {
  hormone: string;
  role: string;
  symptoms: { label: string; note?: string }[];
};

export const stages: Record<Stage, { label: string; groups: HormoneGroup[]; alsoCommon: string }> = {
  perimenopause: {
    label: "Perimenopause",
    alsoCommon: "Digestive changes",
    groups: [
      {
        hormone: "Low progesterone",
        role: "The calming hormone that balances your cycle and supports sleep.",
        symptoms: [
          { label: "Heavy or painful periods" },
          { label: "Irregular cycles", note: "longer, shorter, or skipped" },
          { label: "Trouble falling or staying asleep" },
          { label: "Anxiety" },
          { label: "Irritability and mood swings" },
          { label: "PMS and breast tenderness" },
        ],
      },
      {
        hormone: "Low estrogen (estradiol)",
        role: "Keeps temperature, tissues, skin, and bones in balance.",
        symptoms: [
          { label: "Lighter or skipped periods" },
          { label: "Hot flashes and night sweats" },
          { label: "Vaginal dryness", note: "discomfort during sex" },
          { label: "Bladder changes", note: "a sudden need to urinate more often" },
          { label: "Recurrent UTIs" },
          { label: "Weight gain around the abdomen" },
          { label: "Joint and muscle aches" },
          { label: "Thinning hair" },
          { label: "Dry, less elastic skin" },
          { label: "Headaches" },
        ],
      },
      {
        hormone: "Low testosterone",
        role: "Supports energy, focus, desire, and muscle, in women too.",
        symptoms: [
          { label: "Brain fog", note: "trouble concentrating" },
          { label: "Poor memory" },
          { label: "Low energy and fatigue" },
          { label: "Low libido" },
          { label: "Low mood", note: "and a higher risk of depression" },
          { label: "Lack of motivation" },
          { label: "Loss of muscle" },
          { label: "Difficulty losing weight" },
        ],
      },
    ],
  },
  menopause: {
    label: "Menopause",
    alsoCommon: "Periods have stopped for 12 months or more",
    groups: [
      {
        hormone: "Low progesterone",
        role: "The calming hormone that balances your cycle and supports sleep.",
        symptoms: [{ label: "Trouble falling or staying asleep" }, { label: "Anxiety" }, { label: "Irritability" }],
      },
      {
        hormone: "Low estrogen (estradiol)",
        role: "Keeps temperature, tissues, skin, and bones in balance.",
        symptoms: [
          { label: "Hot flashes and night sweats", note: "can continue for years" },
          { label: "Vaginal dryness", note: "pain during sex" },
          { label: "Bladder urgency and recurrent UTIs" },
          { label: "Bone density loss" },
          { label: "Joint pain" },
          { label: "Thinning hair" },
          { label: "Dry, thinner skin" },
          { label: "Weight gain around the abdomen" },
        ],
      },
      {
        hormone: "Low testosterone",
        role: "Supports energy, focus, desire, and muscle, in women too.",
        symptoms: [
          { label: "Low libido" },
          { label: "Fatigue" },
          { label: "Brain fog and poor memory" },
          { label: "Low mood and motivation" },
          { label: "Loss of muscle" },
        ],
      },
    ],
  },
};
