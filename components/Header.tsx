"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";
import { mainNav, isNavActive } from "@/lib/navigation";

export function Header() {
  const pathname = usePathname();
  const { cart } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-luxury-secondary/30 bg-luxury-primary/70 pt-[env(safe-area-inset-top,0px)] shadow-soft backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

        {/* Masaüstü: tam menü + CTA */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Ana navigasyon"
        >
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                isNavActive(pathname, item.href)
                  ? "bg-luxury-accent/20 text-luxury-accent"
                  : "text-luxury-text/70 hover:bg-luxury-secondary/15 hover:text-luxury-text"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/cart"
            className="relative p-2 rounded-full hover:bg-luxury-accent/10 transition"
            title="Sepetim"
          >
            <svg
              className="w-6 h-6 text-luxury-text"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7 4V2c0-.55-.45-1-1-1s-1 .45-1 1v2H2c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h1.46l1.41 14.73C4.01 21.21 5.18 22 6.54 22h10.92c1.36 0 2.53-.79 2.67-2.27L20.54 8H21c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1h-3V2c0-.55-.45-1-1-1s-1 .45-1 1v2H7zm10.5 14H6.5L5.13 8h13.74l-1.37 10z" />
            </svg>
            {cart.totalQuantity > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-luxury-bg bg-luxury-accent rounded-full">
                {cart.totalQuantity}
              </span>
            )}
          </Link>
          <Button href="/cart" className="!px-5 !py-2 !text-xs">
            Sepetim
          </Button>
        </div>

        {/* Mobil: kompakt üst bar — ana gezinme alttaki sekme çubuğunda */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/cart"
            className="relative p-2 rounded-full hover:bg-luxury-accent/10 transition"
            title="Sepetim"
          >
            <svg
              className="w-5 h-5 text-luxury-text"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7 4V2c0-.55-.45-1-1-1s-1 .45-1 1v2H2c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h1.46l1.41 14.73C4.01 21.21 5.18 22 6.54 22h10.92c1.36 0 2.53-.79 2.67-2.27L20.54 8H21c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1h-3V2c0-.55-.45-1-1-1s-1 .45-1 1v2H7zm10.5 14H6.5L5.13 8h13.74l-1.37 10z" />
            </svg>
            {cart.totalQuantity > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-luxury-bg bg-luxury-accent rounded-full">
                {cart.totalQuantity}
              </span>
            )}
          </Link>
          {/* <Button href="/cart" className="!px-4 !py-2.5 !text-xs">
            Sepetim
          </Button> */}
        </div>
      </div>
    </header>
  );
}
