import { ProductPlaceholder } from "@/components/brand/product-placeholder";
import { SmartImage } from "@/components/ui/smart-image";
import type { Product } from "@/data/products";
import { cn } from "@/lib/format";

type ProductVisualProps = {
  product: Product;
  sizes: string;
  className?: string;
  imageClassName?: string;
  preload?: boolean;
  decorative?: boolean;
};

export function ProductVisual({
  product,
  sizes,
  className,
  imageClassName,
  preload,
  decorative,
}: ProductVisualProps) {
  if (!product.image) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <ProductPlaceholder product={product} />
      </div>
    );
  }

  return (
    <SmartImage
      src={product.image.src}
      alt={decorative ? "" : product.image.alt}
      sizes={sizes}
      preload={preload}
      className={className}
      imageClassName={imageClassName}
      fallback={<ProductPlaceholder product={product} />}
    />
  );
}
