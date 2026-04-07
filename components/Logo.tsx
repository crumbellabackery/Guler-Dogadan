import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site-config";

type Props = {
  className?: string;
  showWordmark?: boolean;
};

/**
 * Brand logo with custom PNG mark and optional wordmark.
 */
export function Logo({ className = "", showWordmark = true }: Props) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <div className="relative h-12 w-12 transition group-hover:scale-105">
        <Image
          src="/logo.png"
          alt={site.name}
          fill
          className="object-contain drop-shadow-sm"
          priority
        />
      </div>
      {showWordmark && (
        <span className="hidden text-lg font-semibold tracking-tight text-luxury-text transition group-hover:text-luxury-accent sm:inline">
          {site.name}
        </span>
      )}
    </Link>
  );
}
