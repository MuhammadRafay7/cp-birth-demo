import { tenant } from "@/lib/site";

export type ProductCategory = "womens-health" | "gut-health" | "mood" | "energy" | "immunity";

export type ProductTier = "Foundations" | "Essentials+" | "Ultimate";

export type Product = {
  slug: string;
  name: string;
  tier: ProductTier;
  category: ProductCategory;
  tagline: string;
  summary: string;
  description: string[];
  benefits: string[];
  blends: string[];
  routine: string;
  priceCents: number;
  supplyDays: number;
  bestSeller?: boolean;
  shopUrl: string;
  image: { src: string; alt: string } | null;
};

export const categories: Record<ProductCategory, { label: string; short: string; blurb: string }> = {
  "womens-health": {
    label: "Women's Health",
    short: "Women's",
    blurb: "Hormonal rhythm, cycle comfort, and bone health.",
  },
  "gut-health": {
    label: "Gut Health",
    short: "Gut",
    blurb: "Digestive ease and a balanced microbiome.",
  },
  mood: {
    label: "Mood",
    short: "Mood",
    blurb: "Calmer days and clearer thinking.",
  },
  energy: {
    label: "Energy",
    short: "Energy",
    blurb: "Steady, sustained daily vitality.",
  },
  immunity: {
    label: "Immunity",
    short: "Immunity",
    blurb: "Everyday defenses through every season.",
  },
};

export const categoryOrder = Object.keys(categories) as ProductCategory[];

const productUrl = (slug: string) => `${tenant.url}/shop/products/${slug}`;
const bundleUrl = (slug: string) => `${tenant.url}/shop/bundles/${slug}`;

const productImage = (file: string, name: string) => ({
  src: `/products/${file}.jpg`,
  alt: `${name} daily supplement packets and box`,
});

const womensEveningSystem = [
  "The morning formula pairs Evening Primrose Oil, a concentrated source of gamma-linolenic acid (GLA) that helps maintain hormonal balance and skin health, with the Elanivra™ Women’s Blend. Elanivra™ combines choline, maca root, D-mannose, DIM, and beta-hydroxybutyrate to promote metabolic energy, urinary tract health, and healthy estrogen metabolism.",
  "A full spectrum of B vitamins, along with vitamins A, C, D3, E, and K2, provides antioxidant defense, cellular energy, and immune support. Minerals like calcium, magnesium, iodine, and selenium further strengthen bone health, thyroid function, and resilience against oxidative stress. VioraBiome™10 completes the foundation with 10 billion CFU of diverse probiotic strains for digestive balance, microbiome health, and immune function.",
  "In the evening, the Noctivida™ Sleep Blend helps calm the mind and body for restorative rest with GABA, valerian root, theanine, and 5-HTP, while replenishing essential electrolytes and trace minerals. Magnesium bis-glycinate eases muscle tension, a Calcium Blend with vitamin D3 and K2 contributes to strong bones and cardiovascular health, and Omega-3 fish oil delivers heart, brain, and joint support.",
  "Together, this morning and evening system provides comprehensive nutritional care for energy, digestion, mood, sleep, and long-term women’s wellness.",
];

export const products: Product[] = [
  {
    slug: "foundations-womens-health-protocol",
    name: "Foundations Women's Health Protocol",
    tier: "Foundations",
    category: "womens-health",
    tagline: "Everyday support for hormonal rhythm, cycle comfort, and vitality.",
    summary:
      "Evening Primrose plus our Elanivra™ Women’s Blend: a daily, full-spectrum formula for hormone harmony, comfortable cycles, and steady energy.",
    description: [
      "Foundations Women’s Health Support includes Evening Primrose plus our Elanivra™ Women’s Blend, a daily, full-spectrum formula created to support women’s hormonal rhythm, monthly comfort, and overall vitality. High-potency evening primrose oil delivers natural gamma-linolenic acid (GLA), an omega-6 fatty acid known for supporting a healthy inflammatory balance, breast and cycle comfort, and skin hydration.",
      "Elanivra™ builds on that foundation with DIM to promote balanced estrogen metabolism, maca root to support libido, energy, and mood steadiness, and choline to aid liver function, an important part of healthy hormone processing. Together, these core ingredients help women feel more even-keeled and supported through natural hormonal shifts.",
      "The blend also targets everyday wellness needs that often ride alongside hormone health. D-mannose provides focused urinary tract support, while a 10-billion-CFU multi-strain probiotic blend nurtures the microbiome for digestive ease and immune resilience.",
      "A complete B-complex (including methylfolate and methylcobalamin), inositol, vitamin D3, K2, and antioxidants like vitamins C and E plus CoQ10 support energy production, stress resilience, bone and cardiovascular health, and overall cellular renewal. Minerals such as zinc, selenium, iodine, chromium, and manganese round out comprehensive daily support.",
    ],
    benefits: [
      "Supports hormonal rhythm and balanced estrogen metabolism",
      "Encourages breast and cycle comfort",
      "Focused urinary tract support with D-mannose",
      "10-billion-CFU probiotic for digestion and immunity",
    ],
    blends: ["Elanivra™ Women’s Blend", "Evening Primrose Oil"],
    routine: "One daily packet",
    priceCents: 5883,
    supplyDays: 30,
    bestSeller: true,
    shopUrl: productUrl("foundations-womens-health-protocol"),
    image: productImage("foundations-womens-health-protocol", "Foundations Women's Health Protocol"),
  },
  {
    slug: "essentials-plus-womens-health-protocol",
    name: "Essentials+ Women's Health Protocol",
    tier: "Essentials+",
    category: "womens-health",
    tagline: "Hormonal balance, bone health, and overall well-being, morning and night.",
    summary:
      "A morning and evening system that promotes hormonal balance, bone health, and overall well-being, with packets taken twice a day.",
    description: womensEveningSystem,
    benefits: [
      "Promotes hormonal balance and healthy estrogen metabolism",
      "Calcium, D3, and K2 for strong bones",
      "Evening sleep blend for restorative rest",
      "Omega-3s for heart, brain, and joint support",
    ],
    blends: ["Elanivra™ Women’s Blend", "VioraBiome™10", "Noctivida™ Sleep Blend"],
    routine: "Two packets daily, morning and evening",
    priceCents: 10372,
    supplyDays: 30,
    shopUrl: bundleUrl("essentials-womens-health-support"),
    image: productImage("essentials-plus-womens-health-protocol", "Essentials+ Women's Health Protocol"),
  },
  {
    slug: "ultimate-womens-health-protocol",
    name: "Ultimate Women's Health Protocol",
    tier: "Ultimate",
    category: "womens-health",
    tagline: "Our most complete support for hormones, bones, and radiant skin.",
    summary:
      "Radiance and resilience. Specially formulated for women to support hormonal balance, bone health, and radiant skin.",
    description: [
      "Radiance and resilience. Specially formulated for women, the Ultimate protocol supports hormonal balance, bone health, and radiant skin as part of a complete morning and evening routine.",
      ...womensEveningSystem,
    ],
    benefits: [
      "Supports hormonal balance and radiant skin",
      "Strengthens bone health and thyroid function",
      "Probiotic support for digestion and immunity",
      "Calming evening blend for deeper rest",
    ],
    blends: ["Elanivra™ Women’s Blend", "VioraBiome™10", "Noctivida™ Sleep Blend"],
    routine: "Morning and evening packets",
    priceCents: 12889,
    supplyDays: 30,
    shopUrl: bundleUrl("women-booster"),
    image: productImage("ultimate-womens-health-protocol", "Ultimate Women's Health Protocol"),
  },
  {
    slug: "foundations-gut-health-protocol",
    name: "Foundations Gut Health Protocol",
    tier: "Foundations",
    category: "gut-health",
    tagline: "Daily digestive ease and full-spectrum microbiome support.",
    summary:
      "Our Digessura™ Digestive Blend and ProBiovera™ Gut Blend work together as a full-spectrum system for comfortable, regular digestion.",
    description: [
      "Foundations Gut Health Support incorporates our proprietary Digessura™ Digestive Blend and ProBiovera™ Gut Blend, which work together as a full-spectrum system for daily digestive ease and microbiome support.",
      "The Enzynera™ enzyme complex supplies targeted protease, bromelain, papain, lipase, lactase, and alpha-galactosidase to help break down proteins, fats, dairy sugars, and gas-forming carbs, supporting smoother digestion after meals and reducing that heavy, bloated feeling. Probiotic strains like Lactobacillus acidophilus, L. casei, and L. plantarum add an extra layer of digestive and immune support.",
      "On the microbiome side, VioraBiome™40 delivers a high-potency 40-billion-CFU, multi-strain probiotic blend paired with prebiotic FOS to nourish beneficial bacteria, and psyllium husk fiber to promote regularity. This synbiotic foundation supports comfortable motility, better nutrient absorption, and a stronger gut barrier.",
      "Licorice root offers soothing gastrointestinal comfort, 5-HTP supports the gut-brain connection, and vitamin C, BHB, and essential trace minerals round out the formula, so you feel lighter, more regular, and more energized from the inside out.",
    ],
    benefits: [
      "Digestive enzymes for smoother digestion after meals",
      "40-billion-CFU probiotic with prebiotic fiber",
      "Supports regularity and a stronger gut barrier",
      "Soothing licorice root for GI comfort",
    ],
    blends: ["Digessura™ Digestive Blend", "ProBiovera™ Gut Blend", "VioraBiome™40"],
    routine: "One daily packet",
    priceCents: 6683,
    supplyDays: 30,
    bestSeller: true,
    shopUrl: productUrl("foundations-gut-health-protocol"),
    image: productImage("foundations-gut-health-protocol", "Foundations Gut Health Protocol"),
  },
  {
    slug: "ultimate-gut-health-protocol",
    name: "Ultimate Gut Health Protocol",
    tier: "Ultimate",
    category: "gut-health",
    tagline: "Complete support for digestion, absorption, and microbiome balance.",
    summary:
      "Designed to support digestion, nutrient absorption, and balanced microbiome function throughout the day and overnight.",
    description: [
      "Ultimate Gut Health Support is designed to support digestion, nutrient absorption, and balanced microbiome function throughout the day.",
      "Our Digessura™ Digestive Blend combines advanced digestive enzymes, probiotics, prebiotic fibers, and targeted nutrients to help break down food efficiently, reduce occasional bloating, and maintain intestinal integrity. L-Glutamine and Immunolin provide structural support for the gut lining, while the ProBiovera™ Gut Blend with VioraBiome™40 delivers a diverse range of beneficial bacteria for healthy flora balance and immune resilience.",
      "In the evening, the formula transitions to restorative support. Magnesium, fish oil, and trace minerals work together to calm the system, while the Noctivida™ Sleep Blend nurtures restorative rest so the gut can reset overnight.",
      "This holistic approach supports both digestive comfort and metabolic health, making Ultimate Gut Health a daily foundation for improved energy, immunity, and long-term well-being.",
    ],
    benefits: [
      "Helps reduce occasional bloating",
      "L-Glutamine to support the gut lining",
      "Diverse probiotics for healthy flora balance",
      "Evening support so the gut can reset overnight",
    ],
    blends: ["Digessura™ Digestive Blend", "ProBiovera™ Gut Blend", "Noctivida™ Sleep Blend"],
    routine: "Morning and evening packets",
    priceCents: 16689,
    supplyDays: 30,
    shopUrl: bundleUrl("gut-health"),
    image: productImage("ultimate-gut-health-protocol", "Ultimate Gut Health Protocol"),
  },
  {
    slug: "foundations-mood-health-protocol",
    name: "Foundations Mood Health Protocol",
    tier: "Foundations",
    category: "mood",
    tagline: "A calm-and-clarity formula to feel centered, not dulled.",
    summary:
      "Our Serenyva™ Mood Blend is a daily calm-and-clarity formula for calmer days, steadier motivation, and clearer thinking.",
    description: [
      "Foundations Mood Health Support incorporates our Serenyva™ Mood Blend, a daily calm-and-clarity formula designed to help you feel more centered without feeling dulled.",
      "A synergistic trio of GABA, L-theanine, and taurine supports relaxed nervous-system signaling and a smooth stress response, helping quiet mental chatter and promote an easy, balanced mood. 5-HTP and Mucuna pruriens provide natural precursors for serotonin and dopamine pathways, supporting emotional steadiness, motivation, and a brighter outlook, especially during demanding weeks or low-energy seasons.",
      "To round out mood support with resilience and cognitive lift, Serenyva™ adds SAMe and pregnenolone, nutrients often used to support healthy neurotransmitter activity, memory, and stress adaptation. A targeted amount of methylene blue and beta-hydroxybutyrate (BHB) supports cellular energy and mental sharpness.",
      "Gentle minerals and vitamin C provide foundational micronutrient support for brain and adrenal health, for calmer days, steadier motivation, and clearer thinking from morning to night.",
    ],
    benefits: [
      "GABA, L-theanine, and taurine for a smooth stress response",
      "Supports emotional steadiness and motivation",
      "Cognitive lift for memory and focus",
      "Brain and adrenal micronutrient support",
    ],
    blends: ["Serenyva™ Mood Blend"],
    routine: "One daily packet",
    priceCents: 5622,
    supplyDays: 30,
    shopUrl: productUrl("foundations-mood-health-protocol"),
    image: productImage("foundations-mood-health-protocol", "Foundations Mood Health Protocol"),
  },
  {
    slug: "foundations-energy-health-protocol",
    name: "Foundations Energy Health Protocol",
    tier: "Foundations",
    category: "energy",
    tagline: "Smooth, sustained energy that helps combat daily fatigue.",
    summary:
      "Increases energy levels, combats fatigue, and supports daily vitality without the jitters of harsh stimulants.",
    description: [
      "Foundations Energy Health Support increases energy levels, combats fatigue, and supports daily vitality. The formula is designed to provide smooth, sustained energy by supporting both cellular vitality and mental performance.",
      "Green Tea Extract (EGCG), CoQ10, and Omega-3s help fuel mitochondrial function, optimize circulation, and enhance focus without the jittery side effects of harsh stimulants. Adaptogens such as Rhodiola Rosea, Ashwagandha, and Astragalus Root work alongside our Cordivra™ Mushroom Blend (including Cordyceps, Reishi, and Lion’s Mane) to strengthen stress resilience, improve oxygen utilization, and support long-term stamina.",
      "The Enerivus™ Energy Blend, featuring Taurine, Alpha Lipoic Acid, Ginseng Extract, and S7 Vasodilator, further promotes alertness, endurance, and efficient nutrient delivery. Probiotics from the VioraBiome™ 10 Blend support gut health, which plays a key role in energy metabolism and overall wellness.",
    ],
    benefits: [
      "Sustained energy without harsh stimulants",
      "Adaptogens for stress resilience and stamina",
      "Functional mushrooms for focus and endurance",
      "Gut support for healthy energy metabolism",
    ],
    blends: ["Enerivus™ Energy Blend", "Cordivra™ Mushroom Blend", "VioraBiome™ 10"],
    routine: "One daily packet",
    priceCents: 7478,
    supplyDays: 30,
    shopUrl: productUrl("foundations-energy-health-protocol"),
    image: productImage("foundations-energy-health-protocol", "Foundations Energy Health Protocol"),
  },
  {
    slug: "foundations-immunity-health-protocol",
    name: "Foundations Immunity Health Protocol",
    tier: "Foundations",
    category: "immunity",
    tagline: "Everyday immune defenses, supported from multiple angles.",
    summary:
      "Our Immunity Foundation and Immunevia™ Immunity Boost blends support your body’s everyday defenses, especially through stress, travel, and seasonal shifts.",
    description: [
      "Foundations Immunity Health Support incorporates our Immunity Foundation and Immunevia™ Immunity Boost blends, built to support your body’s everyday defenses from multiple angles.",
      "A strong base of vitamin C, E, B6, and zinc helps maintain normal immune cell function and antioxidant protection, while L-glutamine supports the gut lining and the immune tissues that live there. Elderberry, echinacea, garlic, and a touch of turmeric bring traditional botanical support for seasonal wellness, and Lactobacillus acidophilus reinforces the microbiome-immune connection.",
      "For deeper whole-body support, the stack layers in Curcumin and the Adaptivra™ Adaptogen Blend. Concentrated turmeric (95% curcuminoids) paired with piperine promotes a healthy inflammatory response, while Adaptivra™ combines functional mushrooms with rhodiola, ashwagandha, astragalus, mucuna, and phosphatidylserine to support stress balance, energy, focus, and immune readiness.",
      "Immunevia™ adds quercetin for antioxidant and histamine balance, melatonin for restorative sleep, and a 10-billion-CFU multi-strain probiotic blend plus collagen, trace minerals, and BHB, so you feel steady, protected, and recharged day after day.",
    ],
    benefits: [
      "Vitamin C, E, B6, and zinc for immune cell function",
      "Elderberry and echinacea for seasonal wellness",
      "Curcumin with piperine for a healthy inflammatory response",
      "Melatonin and adaptogens for rest and recovery",
    ],
    blends: ["Immunevia™ Immunity Boost", "Adaptivra™ Adaptogen Blend", "Immunity Foundation"],
    routine: "One daily packet",
    priceCents: 6894,
    supplyDays: 30,
    shopUrl: productUrl("foundations-immunity-health-protocol"),
    image: productImage("foundations-immunity-health-protocol", "Foundations Immunity Health Protocol"),
  },
];

export const featuredSlugs = [
  "foundations-womens-health-protocol",
  "foundations-gut-health-protocol",
  "ultimate-womens-health-protocol",
  "foundations-mood-health-protocol",
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return featuredSlugs.flatMap((slug) => getProductBySlug(slug) ?? []);
}

export function isProductCategory(value: string | null | undefined): value is ProductCategory {
  return !!value && value in categories;
}
