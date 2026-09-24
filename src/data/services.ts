export type Service = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  details: string[];
  includes: { title: string; body: string }[];
  image: { src: string; alt: string };
  href: string;
  linkLabel: string;
};

export const services: Service[] = [
  {
    slug: "birth",
    title: "Birth at the center",
    kicker: "Birth",
    summary:
      "Prenatal visits, labor and birth, and postpartum care in a quiet, family-centered setting, with minimal medical intervention and a hospital team ready if you need one.",
    details: [
      "CP Birth Center is a stand-alone birthing center. Our guiding principle is a woman’s right to choose a high-quality, low-risk birth outside the hospital, with minimal medical intervention.",
      "Birth centers are designed for healthy, low-risk pregnancies. At your first consultation, Joanne will talk through your health history and whether birth at the center is a good fit for you.",
    ],
    includes: [
      { title: "Prenatal care", body: "Regular visits with Joanne through your pregnancy." },
      { title: "Labor & birth", body: "A midwife-attended birth at the center, surrounded by the people you choose." },
      { title: "Postpartum care", body: "Support for you and your baby in the weeks after birth." },
    ],
    image: {
      src: "/images/birth-room.jpg",
      alt: "A pregnant woman leaning forward on a birthing ball beside a low bed while her partner rests a hand on her back",
    },
    href: "/birth-center",
    linkLabel: "How birth at the center works",
  },
  {
    slug: "hormone-therapy",
    title: "Hormone therapy for women",
    kicker: "Hormones",
    summary:
      "Bio-identical hormone therapy for the changes of perimenopause and menopause, prescribed by Joanne after a one-on-one consultation.",
    details: [
      "Hot flashes, broken sleep, brain fog, and mood you don’t recognize are common signs of shifting hormones, and they’re treatable.",
      "Bio-identical hormones are made from plant sources, mainly soy and wild yam, and are designed to have the same structure as the hormones your body makes. Hormone therapy isn’t right for everyone, so Joanne talks through your symptoms, health history, and the benefits and risks with you first.",
    ],
    includes: [
      { title: "Consultation", body: "Talk through your symptoms and health history with Joanne." },
      { title: "A clear plan", body: "If bHRT is a good fit, Joanne prescribes it." },
      { title: "Follow-up", body: "Joanne follows up with you as your treatment continues." },
    ],
    image: {
      src: "/images/hormone-header.jpg",
      alt: "A woman with short silver hair wrapped in a blanket on a porch step, face turned toward the morning sun",
    },
    href: "/hormone-therapy",
    linkLabel: "See symptoms and options",
  },
  {
    slug: "mens-hormones",
    title: "Hormone therapy for men",
    kicker: "Men’s health",
    summary:
      "Joanne also prescribes bHRT for men with symptoms of low testosterone, such as fatigue, low libido, loss of muscle, and low mood.",
    details: [
      "For the last five years Joanne has offered bio-identical hormone replacement therapy, a natural approach to hormone support, for both women and men.",
    ],
    includes: [
      { title: "Consultation", body: "A one-on-one conversation about your symptoms and health history." },
      { title: "Prescription if appropriate", body: "bHRT is prescribed only when it’s a good fit for you." },
    ],
    image: {
      src: "/images/men-hormones.jpg",
      alt: "A man with a greying beard pausing on a hiking trail in red rock country",
    },
    href: "/hormone-therapy#men",
    linkLabel: "Hormone therapy for men",
  },
  {
    slug: "womens-health",
    title: "Women’s health, every stage",
    kicker: "Women’s health",
    summary:
      "Joanne has spent 33 years caring for women across their lifespan, including urinary, menstrual, and gynecologic concerns.",
    details: [
      "Care at CP Birth Center isn’t only for pregnancy. If something doesn’t feel right, start with a conversation.",
    ],
    includes: [
      { title: "Gynecologic care", body: "Help with gynecologic concerns at any age." },
      { title: "Menstrual concerns", body: "Heavy, painful, or irregular cycles and other changes." },
      { title: "Urinary concerns", body: "Bladder changes, urgency, and recurrent UTIs." },
    ],
    image: {
      src: "/images/home-hormones-path.jpg",
      alt: "A woman in her fifties laughing at an outdoor table, holding a mug",
    },
    href: "/contact",
    linkLabel: "Book a consultation",
  },
];
