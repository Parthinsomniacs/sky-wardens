"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./FeaturedPlatform.module.css";

const FRAME_COUNT = 50;
const framePath = (i: number) =>
  `/images/featured/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;

/**
 * Featured Platform — cinematic scrollytelling section.
 * A pinned full-screen canvas scrubs through a 50-frame image sequence
 * as the user scrolls. Drawing is decoupled from scroll events via the
 * GSAP ticker so the sequence plays back smoothly.
 */
export default function FeaturedPlatform() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    gsap.registerPlugin(ScrollTrigger);

    const images: HTMLImageElement[] = [];
    const state = { frame: 0 };
    let currentFrame = -1;

    // Size the canvas backing store to its CSS box × DPR (called on resize).
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      currentFrame = -1; // force a redraw at the new size
    };

    // Draw a frame with clean 1:1 aspect fit and clearRect.
    const render = () => {
      const index = Math.round(state.frame);
      if (index === currentFrame) return;

      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const scale = Math.max(
        canvas.width / img.naturalWidth,
        canvas.height / img.naturalHeight
      );
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      const dx = (canvas.width - dw) / 2;
      const dy = (canvas.height - dh) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, dx, dy, dw, dh);
      currentFrame = index;
    };

    // Preload + decode every frame so drawing never stalls mid-scroll.
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(i);
      img.decode?.().catch(() => {});
      img.onload = () => {
        if (i === 0) {
          resize();
          render();
        }
      };
      images[i] = img;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        resize();
        render();
        return;
      }

      const mm = gsap.matchMedia();

      // Desktop: Full-bleed pinned scrollytelling
      mm.add("(min-width: 769px)", () => {
        gsap.to(state, {
          frame: FRAME_COUNT - 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=500%",
            scrub: 1,
            pin: stageRef.current,
            anticipatePin: 1,
          },
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=30%",
              scrub: true,
            },
          })
          .to(introRef.current, { autoAlpha: 0, y: -20, ease: "none" }, 0)
          .to(canvasRef.current, { opacity: 1, ease: "none" }, 0)
          .to(scrimRef.current, { autoAlpha: 0, ease: "none" }, 0);
      });

      // Mobile: Compact section with title above video and smooth scrubbing
      mm.add("(max-width: 768px)", () => {
        gsap.to(state, {
          frame: FRAME_COUNT - 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    // Decouple drawing from scroll: the ticker draws the latest frame once
    // per animation frame, which removes the per-scroll-event jerk.
    gsap.ticker.add(render);
    window.addEventListener("resize", resize);

    return () => {
      gsap.ticker.remove(render);
      window.removeEventListener("resize", resize);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Featured Platform"
    >
      <div ref={stageRef} className={styles.stage}>
        <div ref={introRef} className={styles.intro}>
          <span className={styles.eyebrow}>FEATURED PLATFORM</span>
          <h2 className={styles.title}>A Glimpse of What We Build</h2>
          <p className={styles.subline}>
            The details are classified, the capability is not.
          </p>
        </div>

        <div className={styles.canvasWrapper}>
          <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
          <div ref={scrimRef} className={styles.scrim} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
