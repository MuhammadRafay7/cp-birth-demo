// Product catalog from the CP Birth Center PharmaBuilt storefront (cpbirth.pharmabuilt.com).
// Prices are in USD and were copied from the store on 2026-10-14. Update them here if the store changes.

export type AreaKey =
  | "womens"
  | "mens"
  | "energy"
  | "brain"
  | "mood"
  | "gut"
  | "glp1"
  | "blood-sugar"
  | "immunity"
  | "anti-aging";

export type TierKey = "foundations" | "essentials" | "ultimate";

export type Supplement = {
  area: AreaKey;
  tier: TierKey;
  name: string;
  price: number;
  image: string;
  path: string;
};

export const shopOrigin = "https://cpbirth.pharmabuilt.com";
export const imageOrigin = "https://cdn.corespeedhealth.com";

export const tiers: Record<TierKey, { label: string; summary: string; detail: string }> = {
  foundations: {
    label: "Foundations",
    summary: "A simple daily start",
    detail: "The core daily formula for one goal, at the lowest price.",
  },
  essentials: {
    label: "Essentials+",
    summary: "Fuller daily packets",
    detail: "A 30-day supply of packets you take twice a day.",
  },
  ultimate: {
    label: "Ultimate",
    summary: "The most complete support",
    detail: "PharmaBuilt’s most complete protocol for the goal. A 30-day supply.",
  },
};

export const areas: Record<AreaKey, { label: string; description: string }> = {
  womens: {
    label: "Women’s health",
    description: "Supports hormonal balance through cycle changes, plus bone health and overall well-being.",
  },
  mens: {
    label: "Men’s health",
    description: "Supports healthy testosterone balance, energy, stamina, and drive.",
  },
  energy: {
    label: "Energy",
    description: "Increases energy levels, helps combat fatigue, and supports daily vitality.",
  },
  brain: {
    label: "Brain health",
    description: "Supports focus, memory, and mental clarity, and helps you handle stress.",
  },
  mood: {
    label: "Mood",
    description: "Promotes emotional balance and relaxation, helping you feel centered without feeling dulled.",
  },
  gut: {
    label: "Gut health",
    description: "Supports digestion, nutrient absorption, and a balanced microbiome.",
  },
  glp1: {
    label: "GLP-1 support",
    description: "Helps regulate appetite and keep energy steady, to support weight management.",
  },
  "blood-sugar": {
    label: "Blood sugar",
    description: "Helps maintain healthy blood sugar for anyone concerned about glucose swings and energy dips.",
  },
  immunity: {
    label: "Immunity",
    description: "Strengthens your body’s everyday defenses with essential vitamins, minerals, and nutrients.",
  },
  "anti-aging": {
    label: "Healthy aging",
    description: "Cellular support for energy, vitality, and long-term health.",
  },
};

export const supplements: Supplement[] = [
  {
    area: "womens",
    tier: "foundations",
    name: "Foundations Women's Health Protocol",
    price: 58.83,
    image: "product_images/4b273cc7-b165-49b7-8f53-4183cf2ebcce.jpg",
    path: "/shop/products/foundations-womens-health-protocol",
  },
  {
    area: "womens",
    tier: "essentials",
    name: "Essentials+ Women's Health Protocol",
    price: 103.72,
    image: "bundle_images/941a32ed-e1d2-43f4-8983-b7301d830fb5.jpg",
    path: "/shop/bundles/essentials-womens-health-support",
  },
  {
    area: "womens",
    tier: "ultimate",
    name: "Ultimate Women's Health Protocol",
    price: 128.89,
    image: "bundle_images/fa062ca7-09d5-4a01-9e40-15e6342774e4.jpg",
    path: "/shop/bundles/women-booster",
  },
  {
    area: "mens",
    tier: "foundations",
    name: "Foundations Men's Health Protocol",
    price: 78.56,
    image: "product_images/415cd39c-a3ec-4744-90a0-144c3ebb4721.jpg",
    path: "/shop/products/foundations-mens-health-protocol",
  },
  {
    area: "mens",
    tier: "essentials",
    name: "Essentials+ Men's Health Protocol",
    price: 119.5,
    image: "bundle_images/02d88bb5-2950-4867-a4cc-5454c365b3ae.jpg",
    path: "/shop/bundles/essentials-mens-health-support",
  },
  {
    area: "mens",
    tier: "ultimate",
    name: "Ultimate Men's Protocol",
    price: 176.11,
    image: "bundle_images/ae3f5403-9caf-4643-bf6f-e5b3f1328be5.jpg",
    path: "/shop/bundles/men-booster",
  },
  {
    area: "energy",
    tier: "foundations",
    name: "Foundations Energy Health Protocol",
    price: 74.78,
    image: "product_images/b2d11284-fd77-4df5-9768-692fb5d0e83f.jpg",
    path: "/shop/products/foundations-energy-health-protocol",
  },
  {
    area: "energy",
    tier: "essentials",
    name: "Essentials+ Energy Health Protocol",
    price: 99.72,
    image: "bundle_images/3168e21b-f94f-4d58-b192-f1d292895110.jpg",
    path: "/shop/bundles/essentials-energy-health-support",
  },
  {
    area: "energy",
    tier: "ultimate",
    name: "Ultimate Energy Health Protocol",
    price: 113.83,
    image: "bundle_images/b246fc59-25d3-4280-8d4d-37497745b5fa.jpg",
    path: "/shop/bundles/energy-support",
  },
  {
    area: "brain",
    tier: "foundations",
    name: "Foundations Brain Health Protocol",
    price: 81.17,
    image: "product_images/b4ce346e-1aff-417f-bc3f-bbfed3e950c6.jpg",
    path: "/shop/products/foundations-brain-health-protocol",
  },
  {
    area: "brain",
    tier: "essentials",
    name: "Essentials+ Brain Health Protocol",
    price: 113.89,
    image: "bundle_images/2d91d368-9282-4823-a03e-d0a2e4b741f9.jpg",
    path: "/shop/bundles/essentials-brain-health-support",
  },
  {
    area: "brain",
    tier: "ultimate",
    name: "Ultimate Brain Health Protocol",
    price: 179.22,
    image: "bundle_images/bf3d30dd-53dd-45c8-a8c8-78e1939a648c.jpg",
    path: "/shop/bundles/brain-health",
  },
  {
    area: "mood",
    tier: "foundations",
    name: "Foundations Mood Health Protocol",
    price: 56.22,
    image: "product_images/45684c5c-b121-482b-b293-ca2d49f46611.jpg",
    path: "/shop/products/foundations-mood-health-protocol",
  },
  {
    area: "mood",
    tier: "essentials",
    name: "Essentials+ Mood Health Protocol",
    price: 102.94,
    image: "bundle_images/6731d5fd-85eb-40ae-ac00-f52991eff576.jpg",
    path: "/shop/bundles/essentials-mood-health-support",
  },
  {
    area: "mood",
    tier: "ultimate",
    name: "Ultimate Mood Protocol",
    price: 126.28,
    image: "bundle_images/f1bdfff8-1e2a-48f6-bdcf-d36b63568689.jpg",
    path: "/shop/bundles/mood-support",
  },
  {
    area: "gut",
    tier: "foundations",
    name: "Foundations Gut Health Protocol",
    price: 66.83,
    image: "product_images/c9155c9b-1711-428d-b35a-bba530808506.jpg",
    path: "/shop/products/foundations-gut-health-protocol",
  },
  {
    area: "gut",
    tier: "essentials",
    name: "Essentials+ Gut Health Protocol",
    price: 97.89,
    image: "bundle_images/7c07c7a9-0c72-4db0-895d-82dbe754c439.jpg",
    path: "/shop/bundles/essentials-gut-health-support",
  },
  {
    area: "gut",
    tier: "ultimate",
    name: "Ultimate Gut Health Protocol",
    price: 166.89,
    image: "bundle_images/b080fd83-a72e-40ad-9217-8182b4229bb9.jpg",
    path: "/shop/bundles/gut-health",
  },
  {
    area: "glp1",
    tier: "foundations",
    name: "Foundations GLP-1 Health Protocol",
    price: 78.61,
    image: "product_images/c286439d-21ce-4818-bd70-8c8294ceebb0.jpg",
    path: "/shop/products/foundations-glp-1-health-protocol",
  },
  {
    area: "glp1",
    tier: "essentials",
    name: "Essentials+ GLP-1 Health Protocol",
    price: 111.22,
    image: "bundle_images/f69f631c-5cbf-40e8-909f-f0f05f43076f.jpg",
    path: "/shop/bundles/essentials-glp-1-support",
  },
  {
    area: "glp1",
    tier: "ultimate",
    name: "Ultimate GLP-1 Health Protocol",
    price: 194.89,
    image: "bundle_images/9c9aee94-3bbd-4acf-8d87-d9761371f2fd.jpg",
    path: "/shop/bundles/glp-1-weight-loss",
  },
  {
    area: "blood-sugar",
    tier: "foundations",
    name: "Foundations Blood Sugar Protocol",
    price: 85.67,
    image: "product_images/a7a3d3c4-3e45-4fbb-8010-fff665f6edb5.jpg",
    path: "/shop/products/foundations-blood-sugar-protocol",
  },
  {
    area: "blood-sugar",
    tier: "essentials",
    name: "Essentials+ Blood Sugar Health Protocol",
    price: 115.56,
    image: "bundle_images/46370e1e-5136-469b-899c-630999c39fb8.jpg",
    path: "/shop/bundles/essentials-blood-sugar-support",
  },
  {
    area: "blood-sugar",
    tier: "ultimate",
    name: "Ultimate Blood Sugar Health Protocol",
    price: 177.56,
    image: "bundle_images/18943d79-ddb0-4878-9a42-abe109e080e7.jpg",
    path: "/shop/bundles/blood-sugar",
  },
  {
    area: "immunity",
    tier: "foundations",
    name: "Foundations Immunity Health Protocol",
    price: 68.94,
    image: "product_images/b2b6274d-f063-4a1f-b3b5-24ec97136086.jpg",
    path: "/shop/products/foundations-immunity-health-protocol",
  },
  {
    area: "immunity",
    tier: "essentials",
    name: "Essentials+ Immunity Health Protocol",
    price: 114.89,
    image: "bundle_images/61b9e92d-581f-4271-8092-1f34527b2b0d.jpg",
    path: "/shop/bundles/essentials-immunity-health-support",
  },
  {
    area: "immunity",
    tier: "ultimate",
    name: "Ultimate Immunity Protocol",
    price: 178.72,
    image: "bundle_images/013afa3d-afbc-453e-b4ac-d82b45e3b6dc.jpg",
    path: "/shop/bundles/immunity",
  },
  {
    area: "anti-aging",
    tier: "foundations",
    name: "Foundations AntiAging Health Protocol",
    price: 56.0,
    image: "product_images/f1fafe8f-33b0-485f-9454-028b5221932b.jpg",
    path: "/shop/products/foundations-antiaging-health-protocol",
  },
  {
    area: "anti-aging",
    tier: "essentials",
    name: "Essentials+ AntiAging Health Protocol",
    price: 141.89,
    image: "bundle_images/6e4dd1d1-af8b-4c5c-a701-9d597c37bafc.jpg",
    path: "/shop/bundles/essentials-antiaging",
  },
  {
    area: "anti-aging",
    tier: "ultimate",
    name: "Ultimate AntiAging Health Protocol",
    price: 196.5,
    image: "bundle_images/59e09e2e-89c0-419a-a5d9-33e5ebe260cc.jpg",
    path: "/shop/bundles/anti-aging",
  },
];

export const productUrl = (item: Supplement) => `${shopOrigin}${item.path}`;
export const imageUrl = (item: Supplement) => `${imageOrigin}/${item.image}`;
export const findSupplement = (area: AreaKey, tier: TierKey) =>
  supplements.find((item) => item.area === area && item.tier === tier);

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
