"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "@phosphor-icons/react/dist/ssr";

type HeroVideoProps = {
  id: string;
  title: string;
};

// Shows the thumbnail until someone presses play, so YouTube's player only loads when it's wanted.
export function HeroVideo({ id, title }: HeroVideoProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-card border border-line bg-ink shadow-lift">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 size-full">
          <Image
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt=""
            fill
            preload
            sizes="(min-width: 64rem) 40vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
          <span aria-hidden className="absolute inset-0 bg-ink/15 transition-colors group-hover:bg-ink/25" />
          <span className="absolute left-1/2 top-1/2 grid size-18 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-clay text-white shadow-lift transition-transform duration-200 group-hover:scale-105">
            <Play size={28} weight="fill" aria-hidden className="ml-1" />
            <span className="sr-only">Play video: {title}</span>
          </span>
        </button>
      )}
    </div>
  );
}
