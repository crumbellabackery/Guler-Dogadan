import type { ReactNode } from "react";

type Props = {
  id?: string;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Consistent vertical section spacing + optional title block.
 */
export function Section({
  id,
  title,
  eyebrow,
  children,
  className = "",
}: Props) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24 ${className}`}
    >
      {(title || eyebrow) && (
        <header className="mb-10 text-center lg:mb-14">
          {eyebrow && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-luxury-accent">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-3xl font-semibold tracking-tight text-luxury-text sm:text-4xl">
              {title}
            </h2>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
