"use client";

import Image from "next/image";
import { useState } from "react";
import type { GalleryItem } from "@/data/gallery";
import { GalleryModal } from "@/components/GalleryModal";

type Props = {
  items: GalleryItem[];
};

/**
 * Grid + mobil yatay kaydırma — premium kartlar, tıklanınca modal.
 */
export function GalleryView({ items }: Props) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <>
      {/* Desktop / tablet: grid */}
      <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item)}
            className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-luxury-primary text-left shadow-soft hover:shadow-soft-md ring-1 ring-luxury-accent/20 transition duration-500 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-luxury-accent"
          >
            <Image
              src={item.imageSrc}
              alt={item.imageAlt}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-text/60 via-luxury-text/5 to-transparent opacity-90 transition group-hover:from-luxury-text/70" />
            <span className="absolute bottom-4 left-4 right-4 text-base font-semibold text-white drop-shadow">
              {item.title}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile: horizontal scroll strip */}
      <div className="flex gap-4 overflow-x-auto pb-2 pt-1 sm:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item)}
            className="relative h-72 w-[min(85vw,320px)] shrink-0 overflow-hidden rounded-3xl bg-luxury-primary text-left shadow-soft ring-1 ring-luxury-accent/20"
          >
            <Image
              src={item.imageSrc}
              alt={item.imageAlt}
              fill
              className="object-cover"
              sizes="85vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/75 to-transparent" />
            <span className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white">
              {item.title}
            </span>
          </button>
        ))}
      </div>

      <GalleryModal item={active} onClose={() => setActive(null)} />
    </>
  );
}
