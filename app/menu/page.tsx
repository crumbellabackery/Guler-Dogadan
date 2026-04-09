"use client";

import Image from "next/image";
import { Section } from "@/components/Section";
import { AddToCartModal } from "@/components/AddToCartModal";
import { useEffect, useState } from "react";
import type { PricingData, ProductItem } from "@/lib/catalog";

export default function MenuPage() {
  const [pricing, setPricing] = useState<PricingData>({});
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    fetch("/api/pricing", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: PricingData) => setPricing(data))
      .catch(() => setPricing({}));
  }, []);

  return (
    <Section
      eyebrow="Ürün listesi"
      title="Ürünlerimiz"
      className="pt-6"
    >
      <p className="mx-auto mb-4 max-w-2xl text-center text-luxury-text/70">
        Doğal ve katkısız köy ürünlerini ürün bazlı miktar seçenekleriyle inceleyebilirsiniz.{" "}
        <span className="font-medium text-luxury-accent">Mevsimlik</span> ürünler ayrıca belirtilir.
      </p>
      <p className="mx-auto mb-8 max-w-2xl text-center text-xs text-luxury-text/50">
        📸 Fotoğraflar ürün sunumunu temsil eder
      </p>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-24 sm:pb-6">
        {Object.values(pricing).map((product) => (
          <li
            key={product.id}
            className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,rgba(248,244,234,0.98),rgba(231,223,200,0.86))] shadow-soft-lg ring-1 ring-luxury-accent/20 transition duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg"
          >
            <div className="relative aspect-[5/4] overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(243,238,228,0.92))]">
              <Image
                src={product.image || "https://images.unsplash.com/photo-1514996937319-344454492b37?w=1200&q=80"}
                alt=""
                fill
                aria-hidden
                className="object-cover scale-110 blur-sm opacity-35 transition duration-500 group-hover:scale-[1.14]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <Image
                src={product.image || "https://images.unsplash.com/photo-1514996937319-344454492b37?w=1200&q=80"}
                alt={product.name || "Güler Doğadan ürünü"}
                fill
                className="object-contain object-center scale-[1.12] p-2 transition duration-500 group-hover:scale-[1.15]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-stone-900/28 via-stone-900/8 to-transparent" />
              <div className="absolute left-4 top-4 rounded-full bg-luxury-bg/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-luxury-accent backdrop-blur-sm">
                Premium Seçki
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-semibold text-luxury-text">
                {product.name}
              </h3>
              <p className="mt-2 text-sm text-luxury-text/70 flex-1">
                {product.description}
              </p>

              {/* Fiyat Listesi */}
              <div className="mt-4 space-y-2 rounded-2xl border border-luxury-accent/10 bg-luxury-primary/35 p-3.5">
                {product.portionOptions?.map((portion, idx) => (
                  <div key={idx} className="flex justify-between text-sm text-luxury-text/80">
                    <span>{portion.portionType}</span>
                    <span className="font-semibold text-luxury-accent">₺{portion.unitPrice}</span>
                  </div>
                ))}
              </div>

              {/* Sepete Ekle Butonu */}
              <button
                onClick={() => setSelectedProduct(product)}
                className="mt-3 w-full rounded-lg bg-gradient-to-r from-luxury-accent to-luxury-secondary text-luxury-bg px-4 py-2.5 font-semibold hover:shadow-soft-md transition flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m10 0l2-9m-10 9h14m-7-7l.4-2H5.4" />
                </svg>
                Sepete Ekle
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedProduct && (
        <AddToCartModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </Section>
  );
}
