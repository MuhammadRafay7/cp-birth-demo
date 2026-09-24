import {
  FlowerLotus,
  Lightning,
  Plant,
  ShieldPlus,
  Sun,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon, IconProps } from "@phosphor-icons/react";
import type { ProductCategory } from "@/data/products";

const icons: Record<ProductCategory, Icon> = {
  "womens-health": FlowerLotus,
  "gut-health": Plant,
  mood: Sun,
  energy: Lightning,
  immunity: ShieldPlus,
};

export function CategoryIcon({ category, ...props }: IconProps & { category: ProductCategory }) {
  const CategoryGlyph = icons[category];
  return <CategoryGlyph weight="light" aria-hidden {...props} />;
}
