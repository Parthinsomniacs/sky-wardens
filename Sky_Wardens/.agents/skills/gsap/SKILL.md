---
name: gsap
description: Official GSAP (GreenSock Animation Platform) comprehensive skill. Master guide for high-performance JavaScript animations, GSAP Core (gsap.to, from, fromTo, staggers, easing), GSAP Timelines (sequencing, playback controls), ScrollTrigger (pinning, scrub, parallax), GSAP React (useGSAP hook, Next.js, proper cleanup), all plugins (Flip, Draggable, SplitText, ScrollSmoother, MotionPath), and 60fps performance optimizations.
---

# GSAP (GreenSock Animation Platform) Skills

Comprehensive official guidance for creating smooth, performant, professional animations across vanilla JS, React, Next.js, Vue, and modern web applications using GSAP.

> **Note:** GSAP and all its plugins (SplitText, ScrollSmoother, Flip, Draggable, MorphSVG, etc.) are 100% free and open for commercial use. Install from the public npm package: `npm install gsap @gsap/react`.

---

## Quick Reference & Canonical Patterns

### 1. Setup & Registration (Once per project / module)
```javascript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react"; // If using React / Next.js

gsap.registerPlugin(ScrollTrigger, useGSAP);
```

### 2. Basic Tweens (Prefer Transforms & autoAlpha)
Always animate `x`, `y`, `scale`, `rotation`, and `autoAlpha` instead of `left`, `top`, `width`, `height`, or `opacity` (prevents layout thrashing and visibility bugs):
```javascript
gsap.to(".card", {
  x: 100,
  autoAlpha: 1, // handles visibility + opacity automatically
  duration: 0.8,
  ease: "power2.out",
  stagger: 0.1
});
```

### 3. Timelines (Choreography & Sequencing)
Avoid chained delays. Use `gsap.timeline()` with position parameters (`"<"`, `"-=0.2"`, `"+=0.5"`):
```javascript
const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power3.out" } });

tl.from(".hero-title", { y: 40, autoAlpha: 0 })
  .from(".hero-subtitle", { y: 20, autoAlpha: 0 }, "-=0.3")
  .from(".cta-button", { scale: 0.9, autoAlpha: 0 }, "-=0.2");
```

### 4. ScrollTrigger (Scroll-Linked & Pinning Animations)
```javascript
gsap.timeline({
  scrollTrigger: {
    trigger: ".feature-section",
    start: "top 80%", // when top of trigger hits 80% of viewport
    end: "bottom 20%",
    scrub: 1,         // smooth scrubbing with 1s catchup
    pin: true,        // pins section during scroll
    toggleActions: "play none none reverse"
  }
})
.to(".feature-item", { x: 0, autoAlpha: 1, stagger: 0.15 });

// If content height changes dynamically:
// ScrollTrigger.refresh();
```

### 5. React & Next.js Best Practices (`useGSAP`)
Always scope animations to a parent ref and let `useGSAP` handle automatic cleanup:
```tsx
"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function AnimatedComponent() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Selector text is safely scoped to container
    gsap.from(".box", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    });
  }, { scope: container });

  return (
    <div ref={container}>
      <div className="box">Item 1</div>
      <div className="box">Item 2</div>
    </div>
  );
}
```

---

## Detailed Sub-Skills Available

For specific tasks, the following focused sub-skills are installed and available:

- **`gsap-core`**: Core API methods (`to`, `from`, `fromTo`, `set`), easing equations, duration rules, staggers, and `gsap.matchMedia()` for responsive and `prefers-reduced-motion` compliance.
- **`gsap-timeline`**: Complex sequencing, labels, relative timeline offsets, nesting timelines, and timeline controls (`play`, `pause`, `reverse`, `restart`, `seek`).
- **`gsap-scrolltrigger`**: Comprehensive scroll animation, scrub settings, pinning elements, snap points, horizontal scrolling, and lifecycle/refresh methods.
- **`gsap-react`**: React 18/19 & Next.js App Router idioms, `useGSAP`, SSR considerations, ref handling, and memory leak prevention.
- **`gsap-plugins`**: ScrollSmoother, Flip (layout animations), Draggable, SplitText (text reveal/typing animations), Observer, MotionPath, and CustomEase.
- **`gsap-performance`**: Hardware acceleration, avoiding layout thrashing, `will-change`, batching transforms, and 60fps mobile optimization.
- **`gsap-utils`**: Utility functions (`gsap.utils.clamp`, `mapRange`, `normalize`, `interpolate`, `random`, `snap`, `toArray`, `wrap`).
- **`gsap-frameworks`**: Patterns for Vue, Svelte, Nuxt, and SvelteKit.
