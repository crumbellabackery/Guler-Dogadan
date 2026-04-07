"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { Section } from "@/components/Section";
import type { Package } from "@/app/api/packages/route";
import type { CartItem } from "@/lib/cart-types";

export function SpecialPackages() {
  const { addItem } = useCart();
  const [packages, setPackages] = useState<Package[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/packages")
      .then((res) => res.json())
      .then((data: Package[]) => {
        setPackages(data);
      })
      .catch((err) => {
        // Silent fail - show empty state
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddPackageToCart = (pkg: Package) => {
    const cartItem: CartItem = {
      id: pkg.id,
      type: "package",
      name: pkg.name,
      description: pkg.description,
      emoji: pkg.emoji,
      quantity: 1,
      unitPrice: pkg.price,
      totalPrice: pkg.price,
    };
    addItem(cartItem);
    setExpandedId(null);
  };

  return (
    <Section eyebrow="KOLEKSIYONUMUZ" title="Özel Paketler" className="pt-10">
      <div className="mx-auto max-w-4xl mb-12">
        <p className="text-center text-luxury-text/75 text-lg leading-relaxed mb-4">
          Özel anlarınızı daha tatlı ve unutulmaz kılmak için titizlikle tasarlanmış paketler. Her bir paket, sevginizi ve özeni yansıtan, el yapımı seçkin ürünlerden oluşur.
        </p>
        <div className="h-px bg-gradient-to-r from-transparent via-luxury-accent to-transparent opacity-30"></div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-luxury-text/70">
          <p>Koleksiyonumuz yükleniyor...</p>
        </div>
      ) : packages.length === 0 ? (
        <div className="text-center py-12 text-luxury-text/70">
          <p>Paket verisi bulunamadı.</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="group rounded-2xl overflow-hidden border border-luxury-accent/25 shadow-soft-md hover:shadow-soft-lg transition-all duration-300 hover:border-luxury-accent/50 bg-luxury-bg"
            >
              <button
                onClick={() => setExpandedId(expandedId === pkg.id ? null : pkg.id)}
                className="w-full text-left p-8 hover:bg-luxury-accent/3 transition-colors"
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {pkg.emoji}
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-luxury-accent/60 font-medium uppercase tracking-wider mb-1">
                      Fiyat
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-luxury-accent to-luxury-secondary bg-clip-text text-transparent">
                      ₺{pkg.price}
                    </div>
                  </div>
                </div>

                <h3 className="mb-3 text-2xl font-semibold text-luxury-text tracking-tight">
                  {pkg.name}
                </h3>
                <p className="text-sm text-luxury-text/70 leading-relaxed mb-4">
                  {pkg.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-luxury-accent/70 font-medium">
                  <span>
                    {expandedId === pkg.id ? "▲ Ayrıntıları Gizle" : "▼ Ayrıntıları Gör"}
                  </span>
                </div>
              </button>

              {expandedId === pkg.id && (
                <div className="border-t border-luxury-accent/20 px-8 py-6 bg-gradient-to-br from-luxury-accent/6 to-luxury-secondary/4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <p className="text-xs font-bold uppercase tracking-widest text-luxury-accent mb-4 block">
                    → İçerik Detayları
                  </p>
                  <ul className="space-y-2.5 text-sm text-luxury-text/80 mb-6">
                    {pkg.items.split(",").map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 pl-1">
                        <span className="text-luxury-accent mt-0.5 font-bold">✓</span>
                        <span className="leading-relaxed">{item.trim()}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddPackageToCart(pkg);
                    }}
                    className="w-full px-5 py-3 rounded-lg bg-gradient-to-r from-luxury-accent to-luxury-secondary text-luxury-bg font-bold text-sm hover:shadow-soft-md transition-all duration-200 transform hover:scale-[1.02] uppercase tracking-wide"
                  >
                    Sepete Ekle
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="rounded-2xl bg-gradient-to-br from-luxury-accent/12 to-luxury-secondary/8 border border-luxury-accent/25 p-8 text-center">
        <p className="text-luxury-text/75 leading-relaxed mb-2">
          <span className="font-semibold text-luxury-accent text-lg">Kendi özel paketinizi mi hayal ediyorsunuz?</span>
        </p>
        <p className="text-sm text-luxury-text/60">
          Bizimle iletişime geçin ve hayal ettiğiniz özel tasarımın gerçekleşmesini sağlayın.
        </p>
      </div>
    </Section>
  );
}
