import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Sepetim",
  description: "Güler Doğadan - Sepetinizi görüntüleyin ve köy ürünleri siparişinizi tamamlayın",
};

export default function CartPage() {
  return <CartView />;
}
