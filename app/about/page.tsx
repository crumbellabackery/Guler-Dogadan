import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { site } from "@/lib/site-config";
import { ASSETS } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Crumbella’nın ev yapımı yaklaşımı, vizyonu ve Hatay İskenderun’daki samimi hikayesi.",
};

export default function AboutPage() {
  return (
    <Section eyebrow="Marka hikayesi" title="Hakkımızda" className="pt-10">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-luxury-primary shadow-soft-lg ring-1 ring-luxury-accent/20 lg:aspect-square">
          <Image
            src={ASSETS.aboutBakery}
            alt="Sıcak ev ortamında tatlı hazırlığı"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="space-y-6 text-luxury-text/70">
          <p className="text-lg leading-relaxed text-luxury-text">
            <strong className="text-luxury-text">{site.name}</strong>, küçük bir
            mutfaktan doğan büyük bir sevgi hikayesi. Her tarifimizde ev
            sıcaklığını, taze malzemeyi ve sizin için ayırdığımız zamanı
            birleştiriyoruz.
          </p>
          <p className="leading-relaxed">
            Poğaçadan yaş pastaya, kurabiyeden tiramisuya kadar her ürünümüzde
            “bugün yapıldı” hissini korumayı hedefliyoruz. Hazır endüstriyel
            tatların ötesinde; tanıdığınız, güvendiğiniz bir lezzet arıyorsanız
            doğru yerdesiniz.
          </p>
          <p className="leading-relaxed">
            Vizyonumuz, {site.location} ve çevresinde özel günlerinizi ve günlük
            kaçamaklarınızı daha tatlı kılmak. Siparişlerinizi özenle hazırlıyor,
            mümkün olduğunca sizinle iletişimde kalarak beklentinizi aşmayı
            önemsiyoruz.
          </p>
          
        </div>
      </div>
    </Section>
  );
}
