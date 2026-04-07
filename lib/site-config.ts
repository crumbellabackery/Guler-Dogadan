/**
 * Site-wide settings — update phone, email, and social URLs for production.
 * You can also set NEXT_PUBLIC_WHATSAPP_NUMBER and NEXT_PUBLIC_CONTACT_EMAIL in .env
 */

const rawWhatsapp =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+90 555 xxx xx xx";
const rawEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "crumbellabackery@gmail.com";

/** Digits only, with country code (e.g. Turkey 90...) */
export const whatsappNumber = rawWhatsapp.replace(/\D/g, "");

export const contactEmail = rawEmail;

export const site = {
  name: "Crumbella",
  /** Short line under the logo on the home hero */
  tagline: "Her ısırıkta ev sıcaklığı, taptaze lezzetler",
  /** City / region shown in footer */
  location: "Hatay · İskenderun",
  /** Display phone (footer); can differ from WhatsApp */
  phoneDisplay: "crumbellabackery@gmail.com",
  /**
   * Use E.164-style digits for tel: links — set NEXT_PUBLIC_PHONE_TEL or edit here.
   */
  phoneTel:
    process.env.NEXT_PUBLIC_PHONE_TEL?.replace(/\s/g, "") ?? "+90555xxxxxxx",
} as const;

/**
 * Social profile URLs — replace with your real handles.
 */
export const social = {
  instagram: "https://www.instagram.com/crumbella.backery/",
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
