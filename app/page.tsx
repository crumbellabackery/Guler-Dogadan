import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { ASSETS } from "@/lib/assets";
import { site } from "@/lib/site-config";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-mesh">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1920&q=85"
            alt=""
            fill
            className="object-cover opacity-35"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-bg/90 via-luxury-bg/75 to-luxury-bg" />
        </div>

        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pb-24 pt-20 text-center sm:px-6 sm:pb-32 sm:pt-28 lg:px-8">
          <div
            className="animate-fade-up mb-6 rounded-[2rem] border border-luxury-accent/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(248,244,234,0.92))] p-3 shadow-soft-lg opacity-0 backdrop-blur-sm [animation-delay:0.02s]"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="relative h-[110px] w-[280px] sm:h-[130px] sm:w-[360px] lg:h-[150px] lg:w-[420px]">
              <Image
                src={ASSETS.brandLogo}
                alt={site.name}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 420px"
              />
            </div>
          </div>
          <p
            className="animate-fade-up mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-luxury-accent opacity-0 [animation-delay:0.05s]"
            style={{ animationFillMode: "forwards" }}
          >
            Köyden gelen ürünler özenle paketlenir
          </p>
          <p
            className="animate-fade-up mt-2 max-w-2xl text-lg leading-relaxed text-luxury-text/72 opacity-0 [animation-delay:0.2s] sm:text-xl"
            style={{ animationFillMode: "forwards" }}
          >
            {site.tagline}
          </p>
          <div
            className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-3 opacity-0 [animation-delay:0.24s]"
            style={{ animationFillMode: "forwards" }}
          >
            <span className="rounded-full border border-luxury-accent/20 bg-luxury-bg/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-luxury-text/70 backdrop-blur">
              Katkısız Seçki
            </span>
            <span className="rounded-full border border-luxury-accent/20 bg-luxury-bg/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-luxury-text/70 backdrop-blur">
              Hatay Yöresel Lezzetleri
            </span>
            <span className="rounded-full border border-luxury-accent/20 bg-luxury-bg/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-luxury-text/70 backdrop-blur">
              Özenli Paketleme
            </span>
          </div>
          <div
            className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-4 opacity-0 [animation-delay:0.28s] sm:flex-row sm:gap-5"
            style={{ animationFillMode: "forwards" }}
          >
            <Button href="/menu" className="min-w-[200px]">
              Ürünleri Keşfet
            </Button>
          </div>
          <p className="mt-8 text-sm text-luxury-text/60">
            <Link
              href="/menu"
              className="font-medium text-luxury-accent underline-offset-4 hover:underline"
            >
              Ürünleri incele
            </Link>
            <span className="mx-2 text-luxury-text/30">·</span>
            <Link
              href="/gallery"
              className="font-medium text-luxury-accent underline-offset-4 hover:underline"
            >
              Doğal paketlere göz at
            </Link>
          </p>
        </div>
      </section>

      <section className="mx-auto -mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-[2rem] border border-luxury-accent/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(231,223,200,0.55))] p-5 shadow-soft-lg backdrop-blur-sm sm:grid-cols-3 sm:p-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-luxury-accent/80">Seçim Anlayışımız</p>
            <p className="mt-2 text-sm leading-relaxed text-luxury-text/70">Mevsiminde toplanmış, içeriği temiz ve mutfakta karşılığı olan ürünler.</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-luxury-accent/80">Premium Sunum</p>
            <p className="mt-2 text-sm leading-relaxed text-luxury-text/70">Cam şişeler, özenli kavanozlar ve hediyelik sunuma uygun paketleme dili.</p>
          </div>
   
        </div>
      </section>

      {/* How it works */}
      <Section
        eyebrow="Pratik ve güvenli"
        title="Nasıl sipariş verilir?"
        className="pb-8"
      >
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-luxury-accent/30 to-luxury-secondary/30 ring-1 ring-luxury-accent/40">
              <span className="text-4xl font-bold text-luxury-accent">1</span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-luxury-text">
              Ürünleri Seç
            </h3>
            <p className="text-luxury-text/70">
              Zeytinyağı, nar ekşisi, salça, baharat, pekmez, doğal incir ve daha fazla seçeneği ürünler sayfasında inceleyin.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-luxury-accent/30 to-luxury-secondary/30 ring-1 ring-luxury-accent/40">
              <span className="text-4xl font-bold text-luxury-accent">2</span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-luxury-text">
              Sepete Ekle
            </h3>
            <p className="text-luxury-text/70">
              İstediğiniz ürünü seçin, miktarı belirleyin ve varsa teslimat notunuzu ekleyin.
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
              Siparişiniz onaylandığında size bilgi verilir ve ürünleriniz hazır edilir.
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Button href="/menu" className="min-w-[200px]">
            Ürünleri Aç
          </Button>
        </div>
      </Section>
    </>
  );
}
