/**
 * Site-wide settings — update phone, email, and social URLs for production.
 * You can also set NEXT_PUBLIC_WHATSAPP_NUMBER and NEXT_PUBLIC_CONTACT_EMAIL in .env
 */

const rawWhatsapp =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+90 533 319 98 36";
const rawEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "siparis@gulerdogadan.com";

/** Digits only, with country code (e.g. Turkey 90...) */
export const whatsappNumber = rawWhatsapp.replace(/\D/g, "");

export const contactEmail = rawEmail;

export const site = {
  name: "Güler Doğadan",
  /** Short line under the logo on the home hero */
  tagline: "Köyden sofranıza doğal, katkısız ve özenle seçilmiş ürünler",
  /** City / region shown in footer */
  location: "Hatay",
  /** Display phone (footer); can differ from WhatsApp */
  phoneDisplay: "0533 319 98 36",
  /**
   * Use E.164-style digits for tel: links — set NEXT_PUBLIC_PHONE_TEL or edit here.
   */
  phoneTel:
    process.env.NEXT_PUBLIC_PHONE_TEL?.replace(/\s/g, "") ?? "+905333199836",
} as const;

/**
 * Social profile URLs — replace with your real handles.
 */
export const social = {
  instagram: "https://www.instagram.com/gulerdogadan/",
  /** Optional: set to empty string to hide icon */
  facebook: "",
  tiktok: "",
} as const;

/** Builds a WhatsApp chat URL with optional prefilled text */
export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${whatsappNumber}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

/** Opens default mail client with subject + body */
export function mailtoUrl(subject: string, body: string) {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${contactEmail}?${params.toString()}`;
}
