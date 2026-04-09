import Link from "next/link";
import type { ReactNode } from "react";

type Base = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
};

type ButtonAsButton = Base &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

type ButtonAsLink = Base & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

const variants = {
  primary:
    "bg-[linear-gradient(135deg,#6F8450,#C98C58)] text-white shadow-soft hover:shadow-soft-md hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "bg-white/40 text-luxury-text border border-luxury-accent/25 shadow-soft hover:bg-luxury-primary/35 hover:border-luxury-accent/50 hover:-translate-y-0.5 backdrop-blur-sm",
  ghost:
    "bg-transparent text-luxury-text hover:bg-luxury-primary/15 hover:text-luxury-accent",
};

/**
 * Primary CTA / secondary actions — `href` verilirse Next.js Link, aksi halde <button>.
 */
export function Button(props: ButtonAsButton | ButtonAsLink) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none";

  if ("href" in props && props.href) {
    const {
      children,
      className = "",
      variant = "primary",
      href,
      ...rest
    } = props as ButtonAsLink;
    return (
      <Link
        href={href}
        className={`${base} ${variants[variant]} ${className}`}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  const {
    children,
    className = "",
    variant = "primary",
    type,
    ...rest
  } = props as ButtonAsButton;

  return (
    <button
      type={type ?? "button"}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
