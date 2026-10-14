"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type AnimatedTitleProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  id?: string;
};

/**
 * Renders a heading whose letters reveal with a staggered "back.out"
 * pop when the element scrolls into view (matches the hero title style).
 */
export default function AnimatedTitle({
  children,
  as: Tag = "h2",
  className,
  id,
}: AnimatedTitleProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let split: SplitText | null = null;

    const ctx = gsap.context(() => {
      split = SplitText.create(el, { type: "words,chars" });
      gsap.from(split.chars, {
        y: 50,
        opacity: 0,
        duration: reduceMotion ? 0.01 : 1.1,
        ease: reduceMotion ? "none" : "back.out(1.7)",
        stagger: reduceMotion ? 0 : 0.08,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, ref);

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}
