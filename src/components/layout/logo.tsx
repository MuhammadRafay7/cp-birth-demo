import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/format";
import logo from "../../../public/brand/logo.png";

export function Logo({
  className,
  imageClassName,
  onClick,
}: {
  className?: string;
  imageClassName?: string;
  onClick?: () => void;
}) {
  return (
    <Link href="/" onClick={onClick} className={cn("inline-flex shrink-0", className)}>
      <Image
        src={logo}
        alt={`${siteConfig.name} home`}
        preload
        sizes="180px"
        className={cn("h-11 w-auto sm:h-12", imageClassName)}
      />
    </Link>
  );
}
