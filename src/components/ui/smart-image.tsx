"use client";

import Image, { type ImageProps } from "next/image";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/format";

type SmartImageProps = Omit<ImageProps, "fill" | "onLoad" | "onError"> & {
  className?: string;
  imageClassName?: string;
  fallback: ReactNode;
};

export function SmartImage({
  className,
  imageClassName,
  preload,
  fallback,
  alt,
  ...props
}: SmartImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  if (status === "error") return <div className={cn("relative overflow-hidden", className)}>{fallback}</div>;

  return (
    <div className={cn("relative overflow-hidden bg-brand-cream", className)}>
      {status === "loading" && (
        <div aria-hidden className="skeleton absolute inset-0 motion-safe:animate-shimmer" />
      )}
      <Image
        {...props}
        alt={alt}
        fill
        preload={preload}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        className={cn(
          "object-cover",
          !preload && "transition-opacity duration-700 ease-out",
          !preload && status !== "loaded" && "opacity-0",
          imageClassName,
        )}
      />
    </div>
  );
}
