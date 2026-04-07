"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { GalleryItem } from "@/data/gallery";

type Props = {
  item: GalleryItem | null;
  onClose: () => void;
};

/**
 * Lightbox — Escape ve dış tıklama ile kapanır (erişilebilirlik için odak tuzağı basit tutuldu).
 */
export function GalleryModal({ item, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (item) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-luxury-text/60 backdrop-blur-sm transition"
        aria-label="Kapat"
        onClick={onClose}
      />
      <div className="relative z-[101] w-full max-w-3xl overflow-hidden rounded-3xl bg-luxury-bg shadow-soft-lg ring-1 ring-luxury-accent/20">
        <div className="relative aspect-[16/10] bg-luxury-primary">
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
        <div className="p-6 sm:p-8">
          <h2
            id="gallery-modal-title"
            className="text-xl font-semibold text-luxury-text sm:text-2xl"
          >
            {item.title}
          </h2>
          <p className="mt-2 text-luxury-text/70">{item.description}</p>
          <button
            type="button"
            onClick={onClose}
            className="mt-6 rounded-full bg-luxury-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-luxury-accent/90"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
