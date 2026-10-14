---
inclusion: auto
name: Responsive Rules
description: Rules and target breakpoints to follow whenever the user asks for responsive work, responsiveness, mobile/tablet/desktop layouts, media queries, or breakpoint adjustments. Read and apply this before starting any responsive implementation.
---

# Responsive Rules

Read this file first, before starting ANY responsive work. Do not begin
changing CSS until these rules are confirmed against the request.

## 1. Target breakpoints (the ONLY allowed sizes)

Use only these 10 `max-width` breakpoints. Never add any other breakpoint.

| Breakpoint | Purpose |
|-----------|---------|
| 1799px | large desktop |
| 1599px | desktop |
| 1408px | small desktop — **font-size reduction starts here** |
| 1216px | laptop |
| 1024px | small laptop / large tablet |
| 768px  | tablet |
| 575px  | large phone |
| 480px  | phone |
| 420px  | small phone |
| 360px  | smallest phone |

- All breakpoints are `@media (max-width: …)` (desktop-first).
- Do NOT introduce off-list values such as 900, 680, 640, 1200, etc.
  If existing CSS uses an off-list breakpoint, migrate it onto the
  nearest value in this list instead of keeping it.

## 2. Font sizing

- From **1408px and below**, header/nav font sizes MUST be reduced.
- The reduction continues (steps down) across every smaller breakpoint —
  never let a desktop font size carry onto smaller screens.
- Build a strictly descending ladder (each size smaller than the one above).
- Keep font sizes visually balanced with logo, buttons, icons, and spacing.
  Do not shrink below a readable/touch-friendly floor on small phones.

## 3. Layout column rules (drawerContent / nav grids)

- Keep multi-column nav layouts as **2 columns from desktop down to 768px**.
- Switch to **1 column only from 575px and below** (575, 480, 420, 360).
- Do NOT collapse to 1 column at 768px.

## 4. What to adjust at every size

Do not simply scale everything down. Deliberately review and adjust:
margin, padding, gap, font size, line height, logo size, image size,
icon size, button size, element width/height, header height, alignment,
positioning, container width, horizontal/vertical spacing, text wrapping,
and item positioning. Maintain clean, intentional visual hierarchy — nothing
overly compressed or too widely spaced, no overlap or awkward wrapping.

## 5. Fluid values

Use `clamp()`, `%`, `vw`, `rem` etc. only when they genuinely improve
responsiveness. If the base fluid values already handle a given width
correctly, do NOT add a redundant media query for it.

## 6. Code rules

- Inspect the existing JSX/HTML and CSS FIRST. Reuse existing classes,
  tokens, and styles wherever possible.
- Modify existing rules instead of creating duplicates.
- One `@media` block per breakpoint per file — never duplicate a breakpoint.
- Do not create unnecessary CSS, classes, or files.
- Do not use `!important` unless truly unavoidable.
- Do not redesign; preserve existing design, typography, colors, logo,
  navigation, buttons, animations, and functionality.
- Do not modify unrelated sections when the task targets one component.
- Keep the final CSS clean, organized, and maintainable (group all
  breakpoints in one descending RESPONSIVE section per file).

## 7. Mandatory final check

After changes, verify the layout at every target width in order:

**1799 → 1599 → 1408 → 1216 → 1024 → 768 → 575 → 480 → 420 → 360**

At each width check the full visual composition, not just whether it fits.
Then run the build to confirm nothing breaks.
