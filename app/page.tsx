import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { site } from "@/lib/site-config";

export default function HomePage() {
  return (
    <>
      {/* Hero — premium gradient + optional full-bleed photo */}
      <section className="relative overflow-hidden bg-hero-mesh">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1920&q=85"
            alt=""
            fill
            className="object-cover opacity-35"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-bg/90 via-luxury-bg/75 to-luxury-bg" />
        </div>

        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pb-24 pt-20 text-center sm:px-6 sm:pb-32 sm:pt-28 lg:px-8">
          <p
            className="animate-fade-up mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-luxury-accent opacity-0 [animation-delay:0.05s]"
            style={{ animationFillMode: "forwards" }}
          >
            Tüm ürünlerimiz sipariş üzerine hazırlanır
          </p>
          <h1
            className="animate-fade-up max-w-3xl font-semibold tracking-tight text-luxury-text opacity-0 [animation-delay:0.12s]"
            style={{ animationFillMode: "forwards" }}
          >
            <span className="block text-4xl sm:text-5xl lg:text-6xl">
              {site.name}
            </span>
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-luxury-text/70 opacity-0 [animation-delay:0.2s] sm:text-xl"
            style={{ animationFillMode: "forwards" }}
          >
            {site.tagline}
          </p>
          <div
            className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-4 opacity-0 [animation-delay:0.28s] sm:flex-row sm:gap-5"
            style={{ animationFillMode: "forwards" }}
          >
            <Button href="/menu" className="min-w-[200px]">
              Sipariş Ver
            </Button>
          </div>
          <p className="mt-8 text-sm text-luxury-text/60">
            <Link
              href="/menu"
              className="font-medium text-luxury-accent underline-offset-4 hover:underline"
            >
              Menüyü incele
            </Link>
            <span className="mx-2 text-luxury-text/30">·</span>
            <Link
              href="/gallery"
              className="font-medium text-luxury-accent underline-offset-4 hover:underline"
            >
              Özel Paketleri göz at
            </Link>
          </p>
        </div>
      </section>

      {/* How it works */}
      <Section
        eyebrow="Basit ve hızlı"
        title="Nasıl çalışır?"
        className="pb-8"
      >
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-luxury-accent/30 to-luxury-secondary/30 ring-1 ring-luxury-accent/40">
              <span className="text-4xl font-bold text-luxury-accent">1</span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-luxury-text">
              Menüyü İncele
            </h3>
            <p className="text-luxury-text/70">
              Tüm ürünlerimizi, porsiyon seçeneklerini ve fiyatlarını görmek için menümüzü açın.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-luxury-accent/30 to-luxury-secondary/30 ring-1 ring-luxury-accent/40">
              <span className="text-4xl font-bold text-luxury-accent">2</span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-luxury-text">
              Sipariş Ver
            </h3>
            <p className="text-luxury-text/70">
              İstediğiniz ürünü seçin, miktarı belirleyin ve kişisel notlarınızı ekleyin.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-luxury-accent/30 to-luxury-secondary/30 ring-1 ring-luxury-accent/40">
              <span className="text-4xl font-bold text-luxury-accent">3</span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-luxury-text">
              Teslim Al
            </h3>
            <p className="text-luxury-text/70">
              Ürünleriniz özenle hazırlanıp, belirtilen saatte hazır olacak.
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Button href="/menu" className="min-w-[200px]">
            Menüyü Aç
          </Button>
        </div>
      </Section>
    </>
  );
}
