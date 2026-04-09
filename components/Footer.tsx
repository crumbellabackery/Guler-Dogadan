import Link from "next/link";
import Image from "next/image";
import { site, social, whatsappUrl } from "@/lib/site-config";
import { ASSETS } from "@/lib/assets";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-luxury-accent/15 bg-[linear-gradient(180deg,rgba(231,223,200,0.3),rgba(248,244,234,0.92))] shadow-soft">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="relative h-[72px] w-[220px] max-w-full overflow-hidden rounded-[1.5rem] border border-luxury-accent/10 bg-white/55 px-3 py-2 shadow-soft">
            <Image
              src={ASSETS.brandLogo}
              alt={site.name}
              fill
              className="object-contain p-2"
              sizes="220px"
            />
          </div>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-luxury-text/70">
            {site.tagline}
          </p>
          <p className="mt-4 text-sm text-luxury-text/60">{site.location}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-luxury-accent">
            Hızlı bağlantılar
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                href="/menu"
                className="text-luxury-text/70 transition hover:text-luxury-accent"
              >
                Ürünler & fiyatlar
              </Link>
            </li>
            <li>
              <Link
                href="/gallery"
                className="text-luxury-text/70 transition hover:text-luxury-accent"
              >
                Özel Paketler
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-luxury-text/70 transition hover:text-luxury-accent"
              >
                Sipariş / İletişim
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-luxury-accent">
            Bize ulaşın
          </p>
          <ul className="mt-3 space-y-3 text-sm text-luxury-text/70">
            <li className="flex items-center gap-2">
              <span className="text-luxury-text/40" aria-hidden>
                ☎
              </span>
              <a href={`tel:${site.phoneTel}`} className="hover:text-luxury-accent">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-luxury-text/40" aria-hidden>
                ✆
              </span>
              <a
                href={whatsappUrl("Merhaba, ürünler hakkında bilgi almak istiyorum.")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-luxury-accent"
              >
                WhatsApp&apos;tan 0533 319 98 36 ile iletişime geçebilirsiniz
              </a>
            </li>
            <li className="flex flex-wrap gap-3 pt-1">
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-luxury-primary px-3 py-1.5 text-xs font-medium text-luxury-accent shadow-soft ring-1 ring-luxury-accent/30 transition hover:ring-luxury-accent/60"
              >
                <span aria-hidden>Instagram</span>
                <span className="sr-only">(yeni sekme)</span>
              </a>
              {social.facebook ? (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full bg-luxury-primary px-3 py-1.5 text-xs font-medium text-luxury-accent shadow-soft ring-1 ring-luxury-accent/30"
                >
                  Facebook
                </a>
              ) : null}
              {social.tiktok ? (
                <a
                  href={social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full bg-luxury-primary px-3 py-1.5 text-xs font-medium text-luxury-accent shadow-soft ring-1 ring-luxury-accent/30"
                >
                  TikTok
                </a>
              ) : null}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-luxury-secondary/20 py-6 text-center text-xs text-luxury-text/60">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4">
          <span>© {year} {site.name}. Tüm hakları saklıdır.</span>
          <Link href="/admin" className="font-semibold text-luxury-accent hover:underline">
            Admin Girişi
          </Link>
        </div>
      </div>
    </footer>
  );
}
