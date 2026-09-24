export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

export type Faq = {
  question: string;
  answer: string;
  group: "Ordering" | "Protocols" | "Shipping & returns";
};

export const brandWords = [
  "Elanivra™",
  "Digessura™",
  "ProBiovera™",
  "Serenyva™",
  "Immunevia™",
  "Practitioner formulated",
  "Premium quality",
  "30-day supplies",
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "I trusted this team with my birth, so trying their protocol was easy. One packet with breakfast and I finally stay consistent.",
    name: "Kaylee M.",
    detail: "Foundations Women's Health Protocol",
    rating: 5,
  },
  {
    quote:
      "After my second baby my digestion was all over the place. A month into the gut protocol, things feel calm and predictable again.",
    name: "Brianna T.",
    detail: "Foundations Gut Health Protocol",
    rating: 5,
  },
  {
    quote:
      "I wanted something for stress that didn't leave me foggy. I feel steadier through the afternoon and still sharp.",
    name: "Alexis R.",
    detail: "Foundations Mood Health Protocol",
    rating: 5,
  },
];

export const faqs: Faq[] = [
  {
    group: "Ordering",
    question: "Where do I place an order?",
    answer:
      "All orders are placed through our secure online shop. Every “Buy Now” button on this site opens that protocol’s page in the shop, where you can check out.",
  },
  {
    group: "Ordering",
    question: "Can I subscribe instead of ordering each month?",
    answer:
      "Each protocol is a 30-day supply, so it fits naturally into a monthly routine. If you'd like recurring deliveries, contact our team and we'll help you set up a schedule that works for you.",
  },
  {
    group: "Protocols",
    question: "What is a protocol?",
    answer:
      "A protocol is a complete daily routine delivered in pre-portioned packets. Instead of lining up separate bottles, you open your packet and everything you need for that day is inside.",
  },
  {
    group: "Protocols",
    question: "What is the difference between Foundations, Essentials+, and Ultimate?",
    answer:
      "Foundations is a focused daily formula for one area of health. Essentials+ and Ultimate build a fuller morning and evening routine, adding support such as probiotics, bone-supporting minerals, omega-3s, and our Noctivida™ Sleep Blend.",
  },
  {
    group: "Protocols",
    question: "What ingredients are in each protocol?",
    answer:
      "Each protocol page lists its key blends and ingredients, such as the Elanivra™ Women’s Blend or the Digessura™ Digestive Blend. Full supplement facts are available on each product page in our shop.",
  },
  {
    group: "Protocols",
    question: "Can I take a protocol while pregnant or breastfeeding?",
    answer:
      "Some ingredients are not right for every stage. If you are pregnant, trying to conceive, breastfeeding, or taking medication, please talk with your provider before starting any protocol.",
  },
  {
    group: "Shipping & returns",
    question: "How does shipping work?",
    answer:
      "Orders are fulfilled and shipped by our online shop. Shipping options, costs, and delivery estimates are shown at checkout before you pay.",
  },
  {
    group: "Shipping & returns",
    question: "What if I need to return an order?",
    answer:
      "Returns and refunds are handled through our online shop. Reach out through the contact page with your order details and our team will walk you through the next steps.",
  },
];

export const faqGroups = ["Ordering", "Protocols", "Shipping & returns"] as const;
