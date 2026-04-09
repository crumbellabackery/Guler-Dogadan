/**
 * Gallery — used on /gallery and optionally linked from home.
 */

export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Soğuk Sıkım Zeytinyağı",
    description: "Meyvemsi aroması ve premium cam şişe sunumuyla özel seçki.",
    imageSrc:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=80",
    imageAlt: "Premium zeytinyağı sunumu",
  },
  {
    id: "g2",
    title: "Hatay Doğal Nar Ekşisi",
    description: "Gerçek narla hazırlanan yoğun kıvamlı yöresel lezzet.",
    imageSrc:
      "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?w=1200&q=80",
    imageAlt: "Nar ekşisi sunumu",
  },
  {
    id: "g3",
    title: "Domates ve Biber Salçaları",
    description: "Hatay mutfağının temelini oluşturan yoğun aromalı kavanozlar.",
    imageSrc:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&q=80",
    imageAlt: "Domates ve biber salçaları",
  },
  {
    id: "g4",
    title: "Baharat Seçkisi",
    description: "Kimyon, kekik, karabiber, nane, pul biber ve kori ile güçlü aroma.",
    imageSrc:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&q=80",
    imageAlt: "Baharat seçkisi",
  },
  {
    id: "g5",
    title: "Pekmez Çeşitleri",
    description: "Üzüm ve keçiboynuzu pekmezinde geleneksel usul ve dengeli kıvam.",
    imageSrc:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=1200&q=80",
    imageAlt: "Pekmez çeşitleri",
  },
  {
    id: "g6",
    title: "Hatay Kömbesi ve Doğal İncir",
    description: "Çay saatine ve hediyelik seçimlere yakışan premium ikili.",
    imageSrc:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80",
    imageAlt: "Hatay kömbesi ve doğal incir sunumu",
  },
];
