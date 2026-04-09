"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import type { CatalogData } from "@/lib/catalog";
import { ASSETS } from "@/lib/assets";

const emptyCatalog: CatalogData = { products: [], packages: [] };

function slugifyProductName(value: string) {
  return value
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function createUniqueProductId(existingIds: string[], name: string) {
  const baseId = slugifyProductName(name) || "yeni-urun";
  let candidate = baseId;
  let counter = 2;

  while (existingIds.includes(candidate)) {
    candidate = `${baseId}-${counter}`;
    counter += 1;
  }

  return candidate;
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-luxury-accent/15 bg-white/80 p-5 shadow-soft">
      <h3 className="mb-4 text-lg font-semibold text-luxury-text">{title}</h3>
      {children}
    </div>
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-luxury-accent/20 bg-white px-3 py-2.5 text-sm text-luxury-text focus:border-luxury-accent/50 focus:outline-none focus:ring-2 focus:ring-luxury-accent/15"
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full rounded-xl border border-luxury-accent/20 bg-white px-3 py-2.5 text-sm text-luxury-text focus:border-luxury-accent/50 focus:outline-none focus:ring-2 focus:ring-luxury-accent/15"
    />
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [catalog, setCatalog] = useState<CatalogData>(emptyCatalog);
  const [newProductName, setNewProductName] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const persistCatalog = async (nextCatalog: CatalogData, successMessage = "Degisiklikler kaydedildi.") => {
    setSaving(true);
    setError("");
    setMessage("");

    const response = await fetch("/api/admin/catalog", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextCatalog),
    });

    setSaving(false);

    if (!response.ok) {
      setError("Kaydetme sırasında hata oluştu.");
      return false;
    }

    setCatalog(nextCatalog);
    setMessage(successMessage);
    return true;
  };

  const loadCatalog = async () => {
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/catalog", { cache: "no-store" });

    if (response.status === 401) {
      setAuthorized(false);
      setCatalog(emptyCatalog);
      setLoading(false);
      return;
    }

    if (!response.ok) {
      setError("Admin verisi okunamadı.");
      setLoading(false);
      return;
    }

    const data = (await response.json()) as CatalogData;
    setCatalog(data);
    setAuthorized(true);
    setLoading(false);
  };

  useEffect(() => {
    loadCatalog().catch(() => {
      setError("Admin paneli yüklenemedi.");
      setLoading(false);
    });
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setError("Şifre hatalı.");
      return;
    }

    setPassword("");
    await loadCatalog();
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthorized(false);
    setCatalog(emptyCatalog);
    setMessage("");
  };

  const updatePortion = (
    productIndex: number,
    optionIndex: number,
    value: string,
  ) => {
    setCatalog((prev) => {
      const next = structuredClone(prev);
      next.products[productIndex].portionOptions[optionIndex].unitPrice = Number(value) || 0;
      return next;
    });
  };

  const updateProductDescription = (productIndex: number, value: string) => {
    setCatalog((prev) => {
      const next = structuredClone(prev);
      next.products[productIndex].description = value;
      return next;
    });
  };

  const updatePackageField = (
    packageIndex: number,
    field: "description" | "items",
    value: string,
  ) => {
    setCatalog((prev) => {
      const next = structuredClone(prev);
      next.packages[packageIndex][field] = value;
      return next;
    });
  };

  const updatePackagePrice = (packageIndex: number, value: string) => {
    setCatalog((prev) => {
      const next = structuredClone(prev);
      next.packages[packageIndex].price = Number(value) || 0;
      return next;
    });
  };

  const addProduct = () => {
    const trimmedName = newProductName.trim();
    const trimmedDescription = newProductDescription.trim();
    const parsedPrice = Number(newProductPrice);

    if (!trimmedName) {
      setError("Yeni ürün için ürün adı girin.");
      setMessage("");
      return;
    }

    if (!trimmedDescription) {
      setError("Yeni ürün için açıklama girin.");
      setMessage("");
      return;
    }

    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      setError("Yeni ürün için geçerli bir fiyat girin.");
      setMessage("");
      return;
    }

    const nextCatalog = structuredClone(catalog);
    nextCatalog.products.push({
      id: createUniqueProductId(
        catalog.products.map((product) => product.id),
        trimmedName,
      ),
      name: trimmedName,
      description: trimmedDescription,
      image: ASSETS.brandLogo,
      active: true,
      portionOptions: [
        {
          portionType: "Standart",
          unitPrice: parsedPrice,
        },
      ],
    });

    persistCatalog(nextCatalog, "Yeni ürün eklendi.").then((saved) => {
      if (!saved) return;
      setNewProductName("");
      setNewProductDescription("");
      setNewProductPrice("");
    });
  };

  const toggleProductActive = async (productIndex: number) => {
    const nextCatalog = structuredClone(catalog);
    const product = nextCatalog.products[productIndex];
    product.active = !(product.active ?? true);
    await persistCatalog(
      nextCatalog,
      product.active ? `${product.name} yeniden aktif edildi.` : `${product.name} pasife alındı.`,
    );
  };

  const deleteProduct = async (productIndex: number) => {
    const product = catalog.products[productIndex];
    const confirmed = window.confirm(`${product.name} urununu silmek istiyor musunuz?`);
    if (!confirmed) return;

    const nextCatalog = structuredClone(catalog);
    nextCatalog.products.splice(productIndex, 1);
    await persistCatalog(nextCatalog, `${product.name} silindi.`);
  };

  const saveCatalog = async () => {
    await persistCatalog(catalog);
  };

  return (
    <Section eyebrow="Yönetim" title="Admin Paneli" className="pt-10">
      <div className="mx-auto max-w-4xl">
        {loading ? (
          <div className="rounded-2xl border border-luxury-accent/15 bg-luxury-bg/90 p-6 text-center text-sm text-luxury-text/70 shadow-soft">
            Panel yükleniyor...
          </div>
        ) : !authorized ? (
          <form onSubmit={handleLogin} className="mx-auto max-w-sm rounded-2xl border border-luxury-accent/15 bg-white/85 p-6 shadow-soft">
            <label className="mb-2 block text-sm font-medium text-luxury-text">Admin şifresi</label>
            <Field
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifre"
            />
            {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
            <div className="mt-4">
              <Button type="submit" className="w-full">Giriş Yap</Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <Card title="Fiyat Yönetimi">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-luxury-text/70">Ürün açıklamaları ve fiyatlar ile paket açıklaması, içeriği ve fiyatı bu ekrandan düzenlenir.</p>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={handleLogout}>Çıkış</Button>
                  <Button onClick={saveCatalog} disabled={saving}>
                    {saving ? "Kaydediliyor..." : "Kaydet"}
                  </Button>
                </div>
              </div>
              {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
              {message ? <p className="mt-3 text-sm text-green-700">{message}</p> : null}
            </Card>

            <Card title="Yeni Ürün Ekle">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-luxury-text">
                    Ürün adı
                  </label>
                  <Field
                    type="text"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder="Yeni ürün adı"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-luxury-text">
                    Ürün açıklaması
                  </label>
                  <TextArea
                    rows={3}
                    value={newProductDescription}
                    onChange={(e) => setNewProductDescription(e.target.value)}
                    placeholder="Yeni ürün açıklaması"
                  />
                </div>

                <div className="max-w-[240px]">
                  <label className="mb-2 block text-sm font-medium text-luxury-text">
                    Fiyat
                  </label>
                  <Field
                    type="number"
                    min="0"
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-luxury-text/65">
                  Yeni ürün varsayılan logo görseli ve <strong>Standart</strong> fiyat seçeneği ile eklenir.
                </p>
                <Button onClick={addProduct} disabled={saving}>Ürünü Ekle</Button>
              </div>
            </Card>

            <Card title="Ürünler">
              <div className="space-y-4">
                {catalog.products.map((product, productIndex) => (
                  <div key={product.id} className="rounded-xl border border-luxury-accent/10 bg-luxury-primary/15 p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-white/70">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-luxury-text/45">
                            Görsel yok
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-base font-semibold text-luxury-text">{product.name}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-luxury-text/55">
                          <span>Ürün adı ve görsel bilgi amaçlıdır. Açıklama ve fiyat alanları kaydedilir.</span>
                          <span className={`rounded-full px-2 py-0.5 font-medium ${product.active === false ? "bg-stone-200 text-stone-700" : "bg-emerald-100 text-emerald-700"}`}>
                            {product.active === false ? "Pasif" : "Aktif"}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 sm:self-start">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => toggleProductActive(productIndex)}
                          disabled={saving}
                        >
                          {product.active === false ? "Aktif Yap" : "Pasif Yap"}
                        </Button>
                        <button
                          type="button"
                          onClick={() => deleteProduct(productIndex)}
                          disabled={saving}
                          className="rounded-full border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Sil
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="mb-2 block text-sm font-medium text-luxury-text">
                        Ürün açıklaması
                      </label>
                      <TextArea
                        rows={3}
                        value={product.description ?? ""}
                        onChange={(e) => updateProductDescription(productIndex, e.target.value)}
                        placeholder="Ürün açıklaması"
                      />
                    </div>

                    <div className="mt-4 space-y-2">
                      {product.portionOptions.map((option, optionIndex) => (
                        <div key={`${product.id}-${optionIndex}`} className="grid gap-3 rounded-xl bg-white/70 p-3 sm:grid-cols-[1fr_180px] sm:items-center">
                          <div>
                            <p className="text-sm font-medium text-luxury-text">{option.portionType}</p>
                          </div>
                          <Field
                            type="number"
                            min="0"
                            value={option.unitPrice}
                            onChange={(e) => updatePortion(productIndex, optionIndex, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {catalog.packages.length > 0 ? (
              <Card title="Paketler">
                <div className="space-y-4">
                  {catalog.packages.map((pkg, packageIndex) => (
                    <div key={pkg.id} className="rounded-xl border border-luxury-accent/10 bg-luxury-primary/15 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium text-luxury-text">{pkg.name}</p>
                          <p className="mt-1 text-xs text-luxury-text/55">Paket açıklaması, içerik listesi ve fiyat kaydedilir.</p>
                        </div>
                        <p className="text-xl">{pkg.emoji}</p>
                      </div>

                      <div className="mt-4 grid gap-4">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-luxury-text">
                            Paket açıklaması
                          </label>
                          <TextArea
                            rows={2}
                            value={pkg.description}
                            onChange={(e) => updatePackageField(packageIndex, "description", e.target.value)}
                            placeholder="Paket açıklaması"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-luxury-text">
                            Paket içeriği
                          </label>
                          <TextArea
                            rows={4}
                            value={pkg.items}
                            onChange={(e) => updatePackageField(packageIndex, "items", e.target.value)}
                            placeholder="Ürünleri virgülle ayırarak yazın"
                          />
                        </div>

                        <div className="max-w-[220px]">
                          <label className="mb-2 block text-sm font-medium text-luxury-text">
                            Paket fiyatı
                          </label>
                          <Field
                            type="number"
                            min="0"
                            value={pkg.price}
                            onChange={(e) => updatePackagePrice(packageIndex, e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ) : null}
          </div>
        )}
      </div>
    </Section>
  );
}