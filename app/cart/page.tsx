import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Sepetim",
  description: "Crumbella - Sipariş sepetinizi görüntüleyin ve siparişinizi tamamlayın",
};

export default function CartPage() {
  return <CartView />;
}
