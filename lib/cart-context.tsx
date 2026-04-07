"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { CartItem, Cart } from "@/lib/cart-types";

interface CartContextType {
  cart: Cart;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  });

  const [mounted, setMounted] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCart(parsed);
      } catch (e) {
        // Silent fail - start with empty cart
      }
    }
    setMounted(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, mounted]);

  const calculateTotals = (items: CartItem[]) => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);
    return { totalQuantity, totalPrice };
  };

  const addItem = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find((item) => item.id === newItem.id);

      let updatedItems: CartItem[];

      if (existingItem) {
        // Ürün zaten sepette varsa, miktarı artır
        updatedItems = prevCart.items.map((item) =>
          item.id === newItem.id
            ? {
                ...item,
                quantity: item.quantity + newItem.quantity,
                totalPrice:
                  (item.quantity + newItem.quantity) * item.unitPrice,
              }
            : item
        );
      } else {
        // Yeni ürün ekle
        updatedItems = [...prevCart.items, newItem];
      }

      const { totalQuantity, totalPrice } = calculateTotals(updatedItems);

      return {
        items: updatedItems,
        totalQuantity,
        totalPrice,
      };
    });
  };

  const removeItem = (id: string) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter((item) => item.id !== id);
      const { totalQuantity, totalPrice } = calculateTotals(updatedItems);

      return {
        items: updatedItems,
        totalQuantity,
        totalPrice,
      };
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
              totalPrice: quantity * item.unitPrice,
            }
          : item
      );

      const { totalQuantity, totalPrice } = calculateTotals(updatedItems);

      return {
        items: updatedItems,
        totalQuantity,
        totalPrice,
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
    });
  };

  const getTotal = () => cart.totalPrice;

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
