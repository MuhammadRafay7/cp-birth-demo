import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteConfig.url).toString();

  return [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/protocols"), changeFrequency: "weekly", priority: 0.9 },
    ...products.map((product) => ({
      url: url(`/protocols/${product.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: url("/about"), changeFrequency: "yearly", priority: 0.6 },
    { url: url("/faq"), changeFrequency: "monthly", priority: 0.5 },
    { url: url("/contact"), changeFrequency: "yearly", priority: 0.4 },
  ];
}
