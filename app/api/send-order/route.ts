/**
 * Cart order email API endpoint
 */

import { Resend } from "resend";
import type { CartItem } from "@/lib/cart-types";

export type CartOrderRequest = {
  firstName: string;
  lastName: string;
  phone: string;
  cartItems?: CartItem[];
  cartTotal?: number;
  productName?: string;
  portionType?: string;
  quantity?: number;
  unitPrice?: number;
  totalPrice?: number;
  note?: string;
};

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // API key missing
      return Response.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const body: CartOrderRequest = await request.json();

    const {
      firstName,
      lastName,
      phone,
      cartItems,
      cartTotal,
      productName,
      portionType,
      quantity,
      unitPrice,
      totalPrice,
      note,
    } = body;

    const hasCartItems = Array.isArray(cartItems) && cartItems.length > 0;
    const hasSingleProduct = Boolean(
      productName && portionType && quantity && unitPrice !== undefined && totalPrice !== undefined,
    );

    if (!firstName || !lastName || !phone || (!hasCartItems && !hasSingleProduct)) {
      // Validation failed
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const normalizedItems: CartItem[] = hasCartItems
      ? cartItems
      : [
          {
            id: `${productName}-${portionType}`,
            type: "product",
            name: productName!,
            quantity: quantity!,
            unitPrice: unitPrice!,
            totalPrice: totalPrice!,
            portionType,
          },
        ];

    const normalizedTotal = hasCartItems ? cartTotal ?? 0 : totalPrice ?? 0;

    const itemsHtml = normalizedItems
      .map((item) => {
        const itemType = item.type === "package" ? "📦 Paket" : "🧺 Ürün";
        const portion = item.portionType ? ` (${item.portionType})` : "";
        return `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">
              ${itemType}: ${item.name}${portion}
            </td>
            <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; text-align: center;">
              ${item.quantity}
            </td>
            <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; text-align: right;">
              ₺${item.unitPrice}
            </td>
            <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; text-align: right; font-weight: bold;">
              ₺${item.totalPrice}
            </td>
          </tr>
        `;
      })
      .join("");

    // Send email
    const response = await resend.emails.send({
      from: "Güler Doğadan <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "siparis@gulerdogadan.com",
      subject: `🧺 Yeni Sipariş - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #5f7f4f; border-bottom: 2px solid #5f7f4f; padding-bottom: 10px;">
            📋 Ürün Sipariş Talebi
          </h2>
          
          <h3 style="color: #333; margin-top: 20px;">Müşteri Bilgileri</h3>
          <p><strong>İsim:</strong> ${firstName} ${lastName}</p>
          <p><strong>Telefon:</strong> ${phone}</p>
          
          <h3 style="color: #333; margin-top: 20px;">Sipariş Detayları</h3>
          <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #5f7f4f;">Ürün</th>
                <th style="padding: 10px; text-align: center; border-bottom: 2px solid #5f7f4f;">Miktar</th>
                <th style="padding: 10px; text-align: right; border-bottom: 2px solid #5f7f4f;">Birim Fiyatı</th>
                <th style="padding: 10px; text-align: right; border-bottom: 2px solid #5f7f4f;">Toplam</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          
          <div style="background-color: #f2f7ef; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #d7e4d0;">
            <div style="display: flex; justify-content: space-between; font-size: 18px;">
              <strong>Genel Toplam:</strong>
              <strong style="color: #5f7f4f; font-size: 24px;">₺${normalizedTotal}</strong>
            </div>
          </div>
          
          ${note ? `
            <h3 style="color: #333; margin-top: 20px;">Özel Notlar</h3>
            <p style="background-color: #f6f9f4; padding: 10px; border-left: 4px solid #5f7f4f;">
              ${note}
            </p>
          ` : ""}
          
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #e0e0e0;" />
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            ✉️ Lütfen müşteriyle yukarıdaki telefon numarası üzerinden en kısa sürede iletişime geçerek sipariş detaylarını teyit ediniz.
          </p>
        </div>
      `,
    });

    if (response.error) {
      // Email send failed
      return Response.json(
        { error: response.error.message || "Failed to send email" },
        { status: 500 }
      );
    }

    // Order processed
    return Response.json({ success: true, id: response.data?.id });
  } catch (error) {
    // Error logged internally
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
