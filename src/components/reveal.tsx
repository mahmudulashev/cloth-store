"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** Stagger, in milliseconds. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Fades content up as it scrolls into view.
 *
 * The server renders everything visible and the hidden state is only applied
 * after mount, and only to elements that start below the fold — so a slow or
 * failed hydration can never leave the page blank.
 */
export function Reveal({ children, delay = 0, className = "", as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already on screen at first paint: leave it alone rather than flashing it out.
    const threshold = () => window.innerHeight * 0.92;
    if (node.getBoundingClientRect().top < threshold()) return;

    setHidden(true);

    let frame = 0;
    const check = () => {
      frame = 0;
      if (!ref.current) return;
      if (ref.current.getBoundingClientRect().top < threshold()) {
        setHidden(false);
        detach();
      }
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(check);
    };

    function detach() {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();

    return detach;
  }, []);

  const Tag = as as "div";

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={`transition-[opacity,translate] duration-[900ms] ease-[var(--ease-out-quint)] ${
        hidden ? "translate-y-6 opacity-0" : "translate-y-0 opacity-100"
      } ${className}`}
      style={{ transitionDelay: hidden ? "0ms" : `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
