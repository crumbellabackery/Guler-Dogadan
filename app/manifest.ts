import type { MetadataRoute } from "next";
import { site } from "@/lib/site-config";

/**
 * Web App Manifest — “Ana ekrana ekle” ile uygulama gibi tam ekran açılabilir.
 * İkon dosyalarını public/ altına ekleyebilirsiniz (ör. icon-192.png).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#faf6ee",
    theme_color: "#faf6ee",
    orientation: "portrait-primary",
    lang: "tr",
  };
}
