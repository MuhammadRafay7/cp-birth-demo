export type FaqGroup = "Birth at the center" | "Hormone therapy" | "Getting started";

export type Faq = { group: FaqGroup; question: string; answer: string };

export const faqGroups: FaqGroup[] = ["Birth at the center", "Hormone therapy", "Getting started"];

export const faqs: Faq[] = [
  {
    group: "Birth at the center",
    question: "Can my partner and family be there?",
    answer: "Yes. The birth center is built around your family and the support people you choose.",
  },
  {
    group: "Birth at the center",
    question: "What happens if something changes during labor?",
    answer:
      "We’re affiliated with the OB/GYN providers at St. George Regional Hospital and will transfer your care there if a labor or birth becomes high-risk, so you move to hospital care without losing time.",
  },
  {
    group: "Birth at the center",
    question: "Is birth at the center right for me?",
    answer:
      "Birth centers are designed for healthy, low-risk pregnancies. At your first consultation, Joanne will talk through your health history and whether birth at the center is a good fit for you.",
  },
  {
    group: "Birth at the center",
    question: "What care do you provide before and after birth?",
    answer:
      "Care runs from pregnancy to postpartum: regular prenatal visits with Joanne, a midwife-attended birth at the center, and support for you and your baby in the weeks after birth.",
  },
  {
    group: "Birth at the center",
    question: "Why choose a birth center?",
    answer:
      "Many rural hospitals in the US are closing their maternity units because obstetric care has become so expensive. The birth center model answers many of these problems and offers birth at a significantly lower price, while honoring the wishes of each mom-to-be and her family.",
  },
  {
    group: "Hormone therapy",
    question: "What is perimenopause?",
    answer:
      "Perimenopause is the years leading up to menopause, often starting in your 40s, when hormone levels begin to shift. Menopause is reached after 12 months in a row without a period.",
  },
  {
    group: "Hormone therapy",
    question: "What are bio-identical hormones?",
    answer:
      "Bio-identical hormones are made from plant sources, mainly soy and wild yam, and are designed to have the same structure as the hormones your body makes. They’re different from the synthetic hormones used in birth control and in some traditional hormone therapy.",
  },
  {
    group: "Hormone therapy",
    question: "Is hormone therapy right for everyone?",
    answer:
      "No. Joanne talks through your symptoms, your health history, and the benefits and risks, so you can decide together whether bHRT fits you.",
  },
  {
    group: "Hormone therapy",
    question: "Do you offer hormone therapy for men?",
    answer:
      "Yes. Joanne prescribes bHRT for men with symptoms of low testosterone, such as fatigue, low libido, loss of muscle, and low mood.",
  },
  {
    group: "Getting started",
    question: "How do I book a consultation?",
    answer:
      "Call or text Katherine Naylor at 435-212-3206. Katherine handles all consultations, for birth care and hormone therapy, and will answer your questions and set up your first visit.",
  },
  {
    group: "Getting started",
    question: "What do the letters CNM and FNP mean?",
    answer:
      "A Certified Nurse-Midwife (CNM) is a registered nurse with graduate training in midwifery, licensed to provide prenatal, birth, and gynecologic care. A Family Nurse Practitioner (FNP) provides primary care for patients of all ages.",
  },
  {
    group: "Getting started",
    question: "What should I do in an emergency?",
    answer:
      "If you’re in labor or have a medical emergency, call 911 or go to the nearest emergency room. For everything else, call or text Katherine at 435-212-3206.",
  },
];
