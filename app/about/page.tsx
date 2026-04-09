import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/Section";
import { site } from "@/lib/site-config";
import { ASSETS } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Güler Doğadan'ın 10 yılı aşkın deneyimle doğal köy ürünlerine odaklanan hikayesi ve Hatay'daki üretici ağı.",
};

export default function AboutPage() {
  return (
    <Section eyebrow="Biz Kimiz" title="Hakkımızda" className="pt-10">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-luxury-primary shadow-soft-lg ring-1 ring-luxury-accent/20 lg:aspect-square">
          <Image
            src={ASSETS.aboutVillage}
            alt="Doğal köy ürünleri seçimi"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="space-y-6 text-luxury-text/70">
          <p className="text-lg leading-relaxed text-luxury-text">
            <strong className="text-luxury-text">{site.name}</strong>, 10 yılı
            aşkın deneyimle şekillenen samimi bir köy ürünleri hikayesi.
            Üreticiden doğrudan gelen ürünleri seçerken doğallık, tazelik ve
            güvenilirlik ilkelerini esas alıyoruz.
          </p>
          <p className="leading-relaxed">
            Soğuk sıkım zeytinyağı, Hatay doğal nar ekşisi, ev usulu salçalar,
            seçme baharatlar, pekmez çeşitleri, Hatay kömbesi ve doğal incir gibi
            ürünlerde temiz içeriği ve izlenebilir kaynağı merkezde tutuyoruz.
            Her ürünün nereden geldiğini bilmek ve bu bilgiyi açıkça paylaşmak
            bizim için temel bir sorumluluk.
          </p>
          <p className="leading-relaxed">
            Vizyonumuz, {site.location} ve çevresinde doğal ürünlere ulaşımı
            kolaylaştırmak ve yerel üreticiyi destekleyen sürdürülebilir bir
            alışveriş kültürü oluşturmak. Sipariş sürecinde sizinle iletişimde
            kalarak ihtiyacınıza uygun yönlendirme yapmayı önemsiyoruz.
          </p>
        </div>
      </div>
    </Section>
  );
}
