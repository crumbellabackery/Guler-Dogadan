import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site-config";
import { ASSETS } from "@/lib/assets";

type Props = {
  className?: string;
  showWordmark?: boolean;
};

/**
 * Brand mark using uploaded logo artwork.
 */
export function Logo({ className = "", showWordmark = true }: Props) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center ${className}`}
    >
      <div className="relative overflow-hidden rounded-[1.6rem] border border-luxury-accent/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(248,244,234,0.94))] px-3 py-2 shadow-soft transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-soft-md">
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-luxury-accent/40 to-transparent" />
        <div className="relative h-[52px] w-[160px] sm:h-[60px] sm:w-[200px] lg:h-[66px] lg:w-[220px]">
          <Image
            src={ASSETS.brandLogo}
            alt={site.name}
            fill
            priority
            className="object-contain"
            sizes="(max-width: 640px) 160px, 220px"
          />
        </div>
      </div>
      {showWordmark && (
        <span className="sr-only">{site.name}</span>
      )}
    </Link>
  );
}
