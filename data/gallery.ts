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
    title: "Fırından Taze",
    description: "Her gün sınırlı miktar; sıcak servis.",
    imageSrc:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80",
    imageAlt: "Fırından taze hamur işleri",
  },
  {
    id: "g2",
    title: "Pastalar",
    description: "Krema ve mevsim meyveleriyle.",
    imageSrc:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200&q=80",
    imageAlt: "Pasta çeşitleri",
  },
  {
    id: "g3",
    title: "Tatlı Anı",
    description: "Kahve eşlikçisi tatlılar.",
    imageSrc:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&q=80",
    imageAlt: "Tatlı tabağı",
  },
  {
    id: "g4",
    title: "Kurabiye & Cookie",
    description: "Çay saatine özel.",
    imageSrc:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1200&q=80",
    imageAlt: "Kurabiye ve kurabiye çeşitleri",
  },
  {
    id: "g5",
    title: "Tuzlu Lezzetler",
    description: "Poğaça ve çörekler.",
    imageSrc:
      "https://images.unsplash.com/photo-1608198093002-ad4e155949bc?w=1200&q=80",
    imageAlt: "Tuzlu hamur işleri",
  },
  {
    id: "g6",
    title: "Özel Gün",
    description: "Doğum günü ve kutlamalar.",
    imageSrc:
      "https://images.unsplash.com/photo-1535254973040-607b474ea50c?w=1200&q=80",
    imageAlt: "Özel gün pastası",
  },
];
