import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Sipariş Oluşturma",
  description:
    "Crumbella sipariş formu — Email ile hızlı ve güvenli sipariş alsın. Hatay İskenderun.",
};

export default function ContactPage() {
  return (
    <Section
      eyebrow="Sipariş"
      title="Sipariş Oluşturma"
      className="pt-10"
    >
      <p className="mx-auto mb-10 max-w-2xl text-center text-luxury-text/70">
        Aşağıdaki formu doldurun ve siparişinizi gönderin. En kısa sürede cevap vereceğiz ve tatlı tercihlerinizi hazırlayacağız.
      </p>

      <div className="mb-12 flex flex-wrap justify-center gap-4">
        <Button href="/menu" variant="secondary">
          Menüye dön
        </Button>
      </div>

      <ContactForm />
    </Section>
  );
}
