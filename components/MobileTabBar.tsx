"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav, isNavActive } from "@/lib/navigation";

type NavHref = (typeof mainNav)[number]["href"];

function Icon({ name, active }: { name: NavHref; active: boolean }) {
  const stroke = active ? "stroke-luxury-accent" : "stroke-luxury-text/50";
  const className = `h-6 w-6 ${stroke}`;
  switch (name) {
    case "/":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z"
          />
        </svg>
      );
    case "/menu":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h10M4 18h16"
          />
        </svg>
      );
    case "/gallery":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" aria-hidden>
          <rect
            x="3"
            y="3"
            width="7"
            height="7"
            rx="1.5"
            strokeWidth={1.75}
          />
          <rect
            x="14"
            y="3"
            width="7"
            height="7"
            rx="1.5"
            strokeWidth={1.75}
          />
          <rect
            x="3"
            y="14"
            width="7"
            height="7"
            rx="1.5"
            strokeWidth={1.75}
          />
          <rect
            x="14"
            y="14"
            width="7"
            height="7"
            rx="1.5"
            strokeWidth={1.75}
          />
        </svg>
      );
    case "/about":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9 9 0 100-18 9 9 0 000 18z"
          />
          <path
            strokeWidth={1.75}
            strokeLinecap="round"
            d="M12 16v-1M12 8v5"
          />
        </svg>
      );
    case "/cart":
      return (
        <svg className={className} fill={active ? "rgb(200, 155, 123)" : "rgba(43, 43, 43, 0.6)"} viewBox="0 0 24 24" aria-hidden>
          <path d="M7 4V2c0-.55-.45-1-1-1s-1 .45-1 1v2H2c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h1.46l1.41 14.73C4.01 21.21 5.18 22 6.54 22h10.92c1.36 0 2.53-.79 2.67-2.27L20.54 8H21c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1h-3V2c0-.55-.45-1-1-1s-1 .45-1 1v2H7zm10.5 14H6.5L5.13 8h13.74l-1.37 10z" />
        </svg>
      );
    default:
      return null;
  }
}

/**
 * Mobil “native app” alt sekme çubuğu — md ve üzeri ekranlarda gizlenir.
 */
export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 select-none md:hidden"
      aria-label="Mobil sekme menüsü"
      style={{
        background: "linear-gradient(to top, rgb(234, 215, 197), rgba(234, 215, 197, 0.95))",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
        paddingTop: "0.75rem",
        paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
        boxShadow: "0 -1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <ul
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "32rem",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "space-between",
          gap: "0",
        }}
      >
        {mainNav.map((item) => {
          const active = isNavActive(pathname, item.href);
          return (
            <li key={item.href} style={{ minWidth: 0, flex: 1 }}>
              <Link
                href={item.href}
                style={{
                  display: "flex",
                  minHeight: "3rem",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.125rem",
                  paddingLeft: "0.5rem",
                  paddingRight: "0.5rem",
                  paddingTop: "0.25rem",
                  paddingBottom: "0.25rem",
                  fontSize: "10px",
                  fontWeight: 600,
                  color: active ? "rgb(200, 155, 123)" : "rgba(43, 43, 43, 0.6)",
                } as React.CSSProperties}
              >
                <span
                  style={{
                    display: "flex",
                    height: "2rem",
                    width: "2rem",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "0.75rem",
                    color: active ? "rgb(200, 155, 123)" : "rgba(43, 43, 43, 0.6)",
                  }}
                >
                  <Icon name={item.href} active={active} />
                </span>
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: 1.25,
                  }}
                >
                  {item.shortLabel}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
