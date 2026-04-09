/**
 * Lokal görsel yönetimi
 * Tüm stok görseller public/images içinde tutulur
 * External link başarısızsa fallback kullanılır
 */

export const ASSETS = {
  brandLogo: "/images/G%C3%BCler%20Do%C4%9Fadan%20logosu%20ve%20zeytin%20dal%C4%B1.png",

  // About sayfası
  aboutVillage: "/images/Zeytin%20ve%20zeytinya%C4%9F%C4%B1%20ile%20do%C4%9Fall%C4%B1k.png",

  // Placeholder (hiçbir görsel yoksa)
  placeholder: "https://images.unsplash.com/photo-1514996937319-344454492b37?w=1200&q=80",
} as const;

/**
 * Google Drive linki varsa kullan, yoksa lokal fallback dön
 */
export function getImageUrl(externalUrl: string | undefined, localFallback: string): string {
  if (externalUrl && externalUrl.startsWith("http")) {
    return externalUrl;
  }
  return localFallback;
}
