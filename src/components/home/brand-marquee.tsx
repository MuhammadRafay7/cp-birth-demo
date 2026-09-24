import { Leaf } from "@phosphor-icons/react/dist/ssr";
import { brandWords } from "@/data/content";

function WordList({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {[...brandWords, ...brandWords].map((word, index) => (
        <li key={`${word}-${index}`} className="flex items-center gap-6 whitespace-nowrap pr-6 text-sm font-medium tracking-wide">
          {word}
          <Leaf size={14} weight="fill" className="text-brand-sage" aria-hidden />
        </li>
      ))}
    </ul>
  );
}

export function BrandMarquee() {
  return (
    <section aria-label="Our signature blends" className="overflow-hidden bg-brand-forest py-4 text-white">
      <div className="flex w-max motion-safe:animate-marquee motion-safe:hover:[animation-play-state:paused]">
        <WordList />
        <WordList hidden />
      </div>
    </section>
  );
}
