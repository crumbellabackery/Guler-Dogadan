import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Sipariş Formu",
  description:
    "Güler Doğadan sipariş formu - doğal köy ürünleri için hızlı ve güvenli talep oluşturun.",
};

export default function ContactPage() {
  return (
    <Section
      eyebrow="Sipariş"
      title="Sipariş Formu"
      className="pt-10"
    >
      <p className="mx-auto mb-10 max-w-2xl text-center text-luxury-text/70">
        Aşağıdaki formu doldurun ve siparişinizi gönderin. En kısa sürede dönüş yaparak seçilen köy ürünleri için sizi bilgilendireceğiz.
      </p>
      <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-luxury-text/65">
        WhatsApp üzerinden de <span className="font-semibold text-luxury-accent">0533 319 98 36</span> numarasıyla iletişime geçebilirsiniz.
      </p>

      <div className="mb-12 flex flex-wrap justify-center gap-4">
        <Button href="/menu" variant="secondary">
          Ürünlere dön
        </Button>
      </div>

      <ContactForm />
    </Section>
  );
}
