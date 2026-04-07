/**
 * Lokal görsel yönetimi
 * Tüm stok görseller public/images içinde tutulur
 * External link başarısızsa fallback kullanılır
 */

export const ASSETS = {
  // About sayfası
  aboutBakery: "/images/Berkelti%20ev%20mutfa%C4%9F%C4%B1%20ve%20tatl%C4%B1lar.png",
  
  // Logo fallback
  logo: "/logo.png",
  
  // Placeholder (hiçbir görsel yoksa)
  placeholder: "/logo.png",
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
