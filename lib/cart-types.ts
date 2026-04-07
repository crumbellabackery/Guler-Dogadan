/**
 * Cart types - menü ürünleri ve paketler için
 */

export type CartItemType = "product" | "package";

export interface CartItem {
  id: string;
  type: CartItemType;
  name: string;
  description?: string;
  emoji?: string;
  quantity: number;
  unitPrice: number;
  portionType?: string; // Sadece ürünler için (Adet/Tepsi vs)
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}
