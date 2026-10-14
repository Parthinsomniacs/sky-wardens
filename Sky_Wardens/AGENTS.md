<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- CSS Rule -->

# CSS & Design System Rules

## Core Principle

Write clean, intentional, scalable CSS.

Do NOT generate CSS just to make something work temporarily.
Every CSS rule must have a clear purpose.

The design should feel:
- Premium
- Modern
- Minimal
- Consistent
- Awwwards-quality
- Visually intentional
- Responsive
- Performance-conscious

Avoid generic AI-generated website styling.

---

## 1. NO !important

NEVER use `!important`.

Do not add:

!important

under any circumstances.

If a style is not applying correctly:

1. Inspect the CSS cascade.
2. Check selector specificity.
3. Check component structure.
4. Check inherited styles.
5. Fix the source of the conflict.

Never solve CSS conflicts using `!important`.

---

## 2. NO DUPLICATE CSS

Do not create the same CSS rule multiple times.

Bad:

.card {
  padding: 20px;
}

.card {
  padding: 20px;
  border-radius: 10px;
}

Instead, combine the styles:

.card {
  padding: 20px;
  border-radius: 10px;
}

Before adding CSS, inspect existing styles and reuse them whenever possible.

---

## 3. NO UNUSED CSS

Do not create CSS for:

- Components that do not exist
- Old layouts
- Removed elements
- Future features
- Hypothetical states
- Unused utility classes

Every CSS class should be actively used.

---

## 4. NO RANDOM CLASS CREATION

Do not create unnecessary classes such as:

.text-wrapper-1
.text-wrapper-2
.hero-content-new
.hero-content-final
.hero-content-final-2
.section-box
.section-box-new

Use meaningful semantic names.

Example:

.hero
.hero__content
.hero__title
.hero__description
.hero__actions

---

## 5. REUSE EXISTING DESIGN TOKENS

Before creating a new:

- color
- font size
- spacing
- border radius
- shadow
- transition
- breakpoint

check whether an existing design token already provides the same value.

Do not create slightly different values unnecessarily.

Example:

Avoid:

margin: 19px;
margin: 20px;
margin: 21px;

Prefer a consistent spacing system.

---

## 6. DESIGN TOKENS

Use centralized variables for repeated design values.

Example:

:root {
  --color-bg: #000;
  --color-surface: #111;
  --color-text: #f5f5f5;
  --color-muted: #999;

  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 48px;
  --space-xl: 96px;

  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
}

Do not repeatedly hardcode the same values throughout the project.

---

## 7. AVOID INLINE STYLES

Do not use inline styles unless there is a genuine dynamic requirement.

Avoid:

<div style={{ marginTop: "20px" }} />

Prefer reusable CSS classes or CSS Modules.

---

## 8. CSS MODULES / SCOPED STYLES

Prefer component-scoped styling.

Use:

Component.module.css

instead of creating large global CSS files.

Global CSS should contain only:

- Reset
- Typography defaults
- Root variables
- Global utilities
- Global accessibility rules
- Global layout foundations

Do not put component-specific styling into global CSS.

---

## 9. NO OVER-STYLING

Do not add CSS that does not contribute to the design.

Avoid automatically adding:

- Excessive shadows
- Excessive gradients
- Glassmorphism everywhere
- Random borders
- Random rounded corners
- Excessive animations
- Multiple unnecessary hover effects
- Decorative elements without design purpose

Every visual effect must support the design.

---

## 10. RESPONSIVE DESIGN

Do not create separate desktop and mobile versions of the same component unless absolutely necessary.

Use responsive CSS.

Follow a mobile-first or clearly structured responsive strategy.

Do not randomly add many breakpoints.

Avoid:

@media (max-width: 1399px)
@media (max-width: 1299px)
@media (max-width: 1199px)
@media (max-width: 1099px)
@media (max-width: 999px)
@media (max-width: 899px)

Use only breakpoints that are actually required.

---

## 11. RESPONSIVE VALIDATION

Every component must be considered for:

- Mobile
- Tablet
- Laptop
- Desktop
- Large desktop

Do not fix one viewport by breaking another viewport.

---

## 12. NO CSS HACKS

Do not use:

- Negative margins as a primary layout system
- Arbitrary transforms to fix positioning
- Excessive absolute positioning
- Invisible elements to create spacing
- Giant fixed heights
- Magic numbers without purpose

If layout is wrong, fix the layout structure.

---

## 13. LAYOUT

Prefer:

- CSS Grid
- Flexbox
- Container systems
- Gap
- Proper padding/margin
- CSS variables

Do not use absolute positioning for normal page layout.

Absolute positioning should only be used when the design genuinely requires layered positioning.

---

## 14. TYPOGRAPHY

Typography must be intentional.

Define a clear hierarchy:

- Display
- H1
- H2
- H3
- Body
- Small
- Caption

Do not randomly change font sizes between sections.

Avoid excessive font-weight variation.

---

## 15. ANIMATIONS

Animations must be purposeful.

Prefer subtle:

- Transform
- Opacity
- Scale
- Clip-path
- Reveal
- Parallax
- Scroll-based transitions

Avoid animating everything.

Do not add animation merely because the website is being described as "modern".

Animations must not hurt:

- Performance
- Accessibility
- Readability
- UX

Respect:

prefers-reduced-motion

---

## 16. HOVER STATES

Do not automatically add hover effects to every element.

Interactive elements should have intentional states:

- Default
- Hover
- Focus
- Active
- Disabled

---

## 17. ACCESSIBILITY

Do not sacrifice accessibility for visual design.

Maintain:

- Proper contrast
- Visible focus states
- Semantic HTML
- Keyboard accessibility
- Reduced motion support
- Readable typography

---

## 18. BEFORE ADDING CSS

Before writing new CSS:

1. Inspect existing styles.
2. Search for reusable classes/tokens.
3. Check whether the component already has styling.
4. Reuse existing patterns.
5. Only create new CSS if necessary.

---

## 19. CSS CLEANUP

After implementing a component:

Check for:

- Duplicate selectors
- Duplicate properties
- Unused classes
- Conflicting rules
- Unnecessary media queries
- `!important`
- Inline styles
- Magic numbers
- Repeated values
- Dead CSS

Remove unnecessary code before finishing.

---

## 20. FINAL CSS RULE

The amount of CSS is NOT a measure of quality.

Prefer:

Less CSS + better structure + reusable patterns

over:

More CSS + more overrides + more hacks.

Never generate CSS just because an AI-generated design "usually" contains it.

<!-- End CSS Rule -->

<!-- JS Rule -->
# JavaScript & Next.js Rules

## Core Principle

Write simple, predictable and maintainable JavaScript.

Do NOT over-engineer components.

Do NOT add JavaScript when CSS or HTML can solve the problem.

---

## 1. NO UNNECESSARY JAVASCRIPT

Before adding JavaScript, ask:

"Can this be solved with HTML/CSS?"

If yes, use HTML/CSS.

Do not use JS for:

- Simple hover effects
- Basic responsive behavior
- Simple spacing
- Simple visual states
- CSS animations
- Basic layouts

---

## 2. NEXT.JS SERVER COMPONENTS BY DEFAULT

Use Server Components by default.

Do NOT add:

"use client";

unless the component genuinely requires client-side functionality.

Use Client Components only when needed for:

- useState
- useEffect
- useRef
- Browser APIs
- Event-driven client interaction
- Client-side libraries

---

## 3. NO RANDOM useEffect

Do not use `useEffect` automatically.

Before using it, determine whether the operation actually needs an effect.

Avoid using useEffect for:

- Derived values
- Simple calculations
- Rendering logic
- Static data
- Values that can be calculated directly

---

## 4. NO UNNECESSARY STATE

Do not create state for values that can be derived.

Bad:

const [fullName, setFullName] = useState("");

if fullName can be calculated from existing data.

Prefer:

const fullName = `${firstName} ${lastName}`;

Keep state minimal.

---

## 5. NO DUPLICATE LOGIC

Do not copy the same logic into multiple components.

If the same logic appears repeatedly:

1. Extract a reusable function.
2. Extract a custom hook if appropriate.
3. Extract a reusable component if UI is repeated.

---

## 6. COMPONENT REUSE

Do not create separate components for every tiny element.

Avoid unnecessary components such as:

HeroTitleWrapper
HeroTextContainer
HeroTextInner
HeroTitleBox

unless they have actual reusable or logical value.

Create components based on meaningful UI responsibility.

---

## 7. COMPONENT SIZE

Do not allow components to become unnecessarily huge.

If a component contains multiple independent sections with their own logic, extract meaningful components.

Example:

Page
├── Header
├── Hero
├── About
├── Services
├── Projects
├── Testimonials
└── Footer

Do not split every `<div>` into a component.

---

## 8. PROPS

Pass only required props.

Avoid huge prop objects when only a few values are needed.

Bad:

<Component data={everything} />

Prefer:

<Component
  title={title}
  description={description}
/>

---

## 9. NO PROP DRILLING WITHOUT REASON

If the same data must pass through many unrelated component levels, reconsider the architecture.

Use appropriate patterns instead of repeatedly passing props through components that do not use them.

---

## 10. NO UNNECESSARY LIBRARIES

Do not install a package just to solve a simple problem.

Before adding a dependency:

1. Check whether Next.js supports it.
2. Check whether React supports it.
3. Check whether native browser APIs can solve it.
4. Check whether an existing installed package already solves it.

Do not add libraries automatically.

---

## 11. NO DUPLICATE DATA

Do not hardcode the same content repeatedly.

For repeated UI:

const services = [
  {...},
  {...},
  {...}
];

Then map over the data.

But do NOT force arrays/maps where the content genuinely needs unique markup.

---

## 12. MAP ONLY WHEN APPROPRIATE

Do not use `.map()` simply to make code look reusable.

If two elements are genuinely different, write them normally.

Use `.map()` when:

- Items share structure
- Data is repeated
- The number of items may change
- Reusability provides actual value

---

## 13. EVENT HANDLERS

Do not create unnecessary event handlers.

Avoid JavaScript handlers for behavior that CSS can handle.

Use event handlers only for actual interaction.

---

## 14. DOM MANIPULATION

Avoid direct DOM manipulation.

Do not use:

document.querySelector()
document.getElementById()
element.style...
innerHTML

unless there is a legitimate requirement.

Prefer React state, refs, and declarative rendering.

---

## 15. ANIMATION LIBRARIES

Do not add GSAP / Framer Motion / other animation libraries automatically.

First determine whether CSS can achieve the effect.

Use an animation library only when the required interaction genuinely needs it.

---

## 16. PERFORMANCE

Avoid:

- Unnecessary re-renders
- Large client components
- Huge dependencies
- Excessive event listeners
- Unnecessary effects
- Repeated expensive calculations

Do not optimize prematurely.

Optimize actual bottlenecks.

---

## 17. IMAGE HANDLING

Use Next.js image optimization where appropriate.

Prefer:

next/image

over raw `<img>` when the project architecture allows it.

Do not load unnecessarily huge images.

---

## 18. DATA FETCHING

Follow Next.js's recommended data-fetching architecture.

Do not create unnecessary client-side fetching when server-side fetching is appropriate.

Do not fetch the same data multiple times unnecessarily.

---

## 19. ERROR HANDLING

Handle actual failure cases.

Do not add huge try/catch blocks everywhere.

Do not silently swallow errors.

---

## 20. NO AI OVER-ENGINEERING

Never create:

- Unnecessary abstractions
- Unnecessary hooks
- Unnecessary providers
- Unnecessary utilities
- Unnecessary context
- Unnecessary state
- Unnecessary dependencies

The simplest correct architecture is preferred.

---

## 21. BEFORE ADDING JAVASCRIPT

Ask:

1. Can HTML solve it?
2. Can CSS solve it?
3. Can existing component logic solve it?
4. Can existing utility/function solve it?
5. Is client-side JavaScript actually required?

Only then add JavaScript.

---

## 22. FINAL CODE QUALITY CHECK

Before finishing:

Check for:

- Unused imports
- Unused variables
- Duplicate logic
- Duplicate components
- Unnecessary state
- Unnecessary effects
- Unnecessary client components
- Unnecessary dependencies
- Console logs
- Dead code
- Repeated API calls
- Poor component boundaries

Remove anything that does not have a clear purpose.

---

## FINAL RULE

Do not write code based on "what AI usually generates".

Write only what the project actually needs.

Every line of JavaScript must have a reason to exist.
<!-- End JS Rule -->

<!-- Desing Rule -->

# AGENTS.md

# AI DEVELOPMENT & DESIGN SYSTEM RULES

You are working inside an existing Next.js project.

Your job is NOT to generate generic AI-looking websites.

You must behave like a senior:

* UI/UX Designer
* Visual Designer
* Frontend Engineer
* Next.js Engineer
* CSS Architect
* Interaction Designer
* Accessibility Engineer

The primary goal is:

**Clean code + intentional design + reusable architecture + premium visual quality.**

---

# 1. BEFORE WRITING CODE

This is a strict requirement.

Before creating or modifying anything:

1. Inspect the existing project structure.
2. Inspect relevant existing components.
3. Inspect existing CSS / CSS Modules.
4. Inspect existing design tokens.
5. Inspect existing fonts.
6. Inspect existing reusable components.
7. Inspect existing dependencies.
8. Inspect existing animations.
9. Inspect existing responsive behavior.
10. Understand how the requested feature fits into the current architecture.

Do NOT immediately start generating new code.

### Reuse before creating.

Before adding:

* CSS
* components
* utilities
* hooks
* animations
* dependencies
* design tokens

first check whether an existing implementation can be reused.

---

# 2. DO NOT DESTROY EXISTING WORK

When modifying an existing project:

* Do not rewrite unrelated files.
* Do not replace working components unnecessarily.
* Do not remove existing functionality without a reason.
* Do not change the header unless requested.
* Do not change the footer unless requested.
* Do not change global styles unless required.
* Do not change routing unnecessarily.
* Do not change dependencies unnecessarily.
* Do not restructure the entire project for a small feature.

Make the smallest clean change that solves the requirement.

---

# 3. ANTI-AI-SLOP DESIGN RULE

Do NOT create generic AI-generated website designs.

Avoid automatically generating:

* Generic card grids
* Repetitive rounded cards
* Excessive gradients
* Excessive glassmorphism
* Random blobs
* Random floating shapes
* Excessive shadows
* Random glow effects
* Huge gradient text
* Generic hero sections
* Repetitive sections
* Stock-looking layouts
* Excessive pill buttons
* Same visual treatment for every section
* Random decorative elements

Every visual element must have a design reason.

The design must feel:

* Intentional
* Editorial
* Premium
* Modern
* Distinctive
* Balanced
* Visually memorable

Do not use visual effects simply because they are popular in AI-generated websites.

---

# 4. DESIGN HIERARCHY

Every page must have a clear visual hierarchy.

Consider:

* Typography
* Scale
* Spacing
* Contrast
* Composition
* Alignment
* Rhythm
* White space
* Image treatment
* Motion

Do not make every section visually loud.

A premium website should contain:

* Strong moments
* Quiet moments
* Contrast
* Visual pacing
* Clear content hierarchy

---

# 5. TYPOGRAPHY

Typography must be intentional.

Use a controlled type hierarchy:

* Display
* H1
* H2
* H3
* Body
* Small
* Caption

Do not randomly change font sizes.

Do not use excessive font weights.

Do not use more than necessary font families.

Respect the project's existing typography system.

If no typography system exists, establish one before creating many arbitrary values.

---

# 6. DESIGN TOKENS

Repeated design values must be centralized.

Prefer variables such as:

```css
:root {
  --color-bg: #000;
  --color-surface: #111;
  --color-text: #f5f5f5;
  --color-muted: #999;

  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 48px;
  --space-xl: 96px;

  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
}
```

Do not create slightly different values for the same purpose.

Avoid:

```css
margin: 19px;
margin: 20px;
margin: 21px;
```

when one spacing token can be used.

---

# 7. CSS ARCHITECTURE

Prefer component-scoped CSS.

Use:

```text
Component.module.css
```

for component-specific styling.

Global CSS should primarily contain:

* Reset
* Root variables
* Base typography
* Global utilities
* Accessibility rules
* Global foundations

Do not put large amounts of component-specific styling into global CSS.

---

# 8. !IMPORTANT IS FORBIDDEN

NEVER use:

```css
!important
```

Do not use `!important` to solve:

* specificity problems
* responsive problems
* component conflicts
* inherited styles
* animation conflicts
* third-party styles

Instead:

1. Inspect specificity.
2. Inspect source order.
3. Inspect inheritance.
4. Fix the selector.
5. Fix the component architecture.

There must be ZERO unnecessary `!important` declarations.

---

# 9. NO DUPLICATE CSS

Never duplicate selectors unnecessarily.

Bad:

```css
.card {
  padding: 20px;
}

.card {
  border-radius: 16px;
}

.card {
  padding: 20px;
}
```

Combine them.

Before adding CSS, search the existing stylesheet.

Reuse existing classes and variables whenever possible.

---

# 10. NO UNUSED CSS

Do not create CSS for:

* Removed components
* Future features
* Hypothetical states
* Unused classes
* Old layouts
* Components that do not exist

Every class must have a purpose.

---

# 11. NO RANDOM CLASS NAMES

Avoid names such as:

```text
box1
box2
new-box
new-box-final
hero-new
hero-final
wrapper2
section-test
card-new
```

Use semantic names.

Example:

```text
hero
hero__content
hero__title
hero__description
hero__actions
```

Follow the existing project's naming convention if one already exists.

---

# 12. NO CSS HACKS

Avoid:

* Excessive negative margins
* Random transforms
* Arbitrary absolute positioning
* Giant fixed heights
* Invisible elements for spacing
* Magic numbers
* Excessive z-index values

If a layout is broken, fix the layout structure.

Do not patch the problem with random CSS.

---

# 13. LAYOUT

Prefer:

* CSS Grid
* Flexbox
* Container systems
* Gap
* Padding
* Margin
* CSS variables

Use absolute positioning only when the design actually requires layered positioning.

Do not use absolute positioning as the primary page layout system.

---

# 14. RESPONSIVE DESIGN

The website must work across:

* Mobile
* Tablet
* Laptop
* Desktop
* Large desktop

Do not create separate duplicated versions of the same component for every viewport.

Prefer responsive CSS.

Do not create excessive breakpoints.

Only add a breakpoint when the design actually requires one.

---

# 15. RESPONSIVE BREAKPOINT RULE

Do not blindly generate:

```css
@media (max-width: 1399px)
@media (max-width: 1299px)
@media (max-width: 1199px)
@media (max-width: 1099px)
@media (max-width: 999px)
@media (max-width: 899px)
@media (max-width: 799px)
```

This is usually a sign of poor responsive architecture.

Use a small, intentional breakpoint system.

---

# 16. ANIMATION RULES

Animation must support:

* Hierarchy
* Storytelling
* Interaction
* Feedback
* Visual continuity

Do not animate everything.

Avoid excessive:

* Bounce
* Rotation
* Scaling
* Blinking
* Floating
* Glow
* Parallax

Do not add an animation library when CSS is sufficient.

Use GSAP / Framer Motion / another library only when the interaction genuinely requires it.

Respect:

```css
prefers-reduced-motion
```

---

# 17. HOVER & INTERACTION

Do not add hover animations to every element.

Interactive elements should have intentional states:

* Default
* Hover
* Focus
* Active
* Disabled

Hover effects should communicate interaction, not simply add decoration.

---

# 18. JAVASCRIPT PRINCIPLE

Do not use JavaScript when HTML/CSS can solve the problem.

Before adding JavaScript ask:

1. Can HTML solve this?
2. Can CSS solve this?
3. Can an existing component solve this?
4. Is client-side JavaScript actually required?

Only then add JavaScript.

---

# 19. NEXT.JS SERVER COMPONENTS

Use Server Components by default.

Do NOT add:

```tsx
"use client";
```

unless the component genuinely requires client-side functionality.

Use Client Components for things such as:

* useState
* useEffect
* useRef
* Browser APIs
* Client-only interaction
* Client-only libraries

Do not make the entire page a Client Component unnecessarily.

---

# 20. NO RANDOM useEffect

Do not use `useEffect` automatically.

Do not use it for:

* Derived values
* Simple calculations
* Rendering logic
* Static data
* Things that can be calculated directly

Only use effects for actual side effects.

---

# 21. MINIMAL STATE

Do not create state for values that can be derived.

Bad architecture:

```tsx
const [fullName, setFullName] = useState("");
```

when:

```tsx
const fullName = `${firstName} ${lastName}`;
```

is sufficient.

Keep state minimal.

---

# 22. COMPONENT ARCHITECTURE

Create components based on meaningful responsibilities.

Example:

```text
Page
├── Header
├── Hero
├── About
├── Services
├── Projects
├── Testimonials
└── Footer
```

Do not create components for every `<div>`.

Avoid unnecessary components such as:

```text
HeroWrapper
HeroInnerWrapper
HeroTextWrapper
HeroTextInnerWrapper
HeroTitleContainer
```

unless they have actual architectural value.

---

# 23. REUSABILITY

If the same UI structure appears repeatedly:

Create a reusable component.

If the same logic appears repeatedly:

Create a reusable function or hook when appropriate.

Do not duplicate large blocks of code.

But do not force abstraction where it makes the code harder to understand.

---

# 24. DATA-DRIVEN UI

Use arrays and `.map()` when multiple items share the same structure.

Example:

```tsx
const services = [
  {
    title: "Service One",
    description: "..."
  },
  {
    title: "Service Two",
    description: "..."
  }
];
```

Do not use `.map()` simply to appear more "advanced".

If content is genuinely unique, use explicit markup.

---

# 25. PROPS

Pass only required data.

Avoid unnecessarily large objects.

Prefer:

```tsx
<Component
  title={title}
  description={description}
/>
```

instead of passing the entire page data object when it is unnecessary.

---

# 26. DEPENDENCIES

Do not install packages automatically.

Before installing a dependency:

1. Check whether Next.js already provides the functionality.
2. Check whether React provides it.
3. Check whether native browser APIs provide it.
4. Check whether the project already has a suitable dependency.

Avoid dependency bloat.

---

# 27. DOM MANIPULATION

Avoid direct DOM manipulation.

Do not unnecessarily use:

```js
document.querySelector()
document.getElementById()
element.style
innerHTML
```

Prefer React's declarative architecture.

Use refs only when there is a legitimate requirement.

---

# 28. IMAGES

Use Next.js image optimization where appropriate.

Prefer:

```tsx
next/image
```

instead of raw `<img>` when suitable for the project.

Do not load unnecessarily large images.

Use correct:

* dimensions
* aspect ratio
* loading strategy
* object positioning

---

# 29. ACCESSIBILITY

Accessibility is part of the design.

Use:

* Semantic HTML
* Correct heading hierarchy
* Accessible buttons
* Keyboard navigation
* Visible focus states
* Meaningful alt text
* Sufficient contrast
* Reduced motion support

Do not use a `<div>` as a button when a `<button>` is appropriate.

---

# 30. CONTENT & VISUAL DESIGN

Do not invent excessive content merely to fill space.

Do not add:

* fake statistics
* fake testimonials
* fake client logos
* fake awards
* fake company information

unless explicitly requested or clearly marked as placeholder content.

Design should serve the actual content.

---

# 31. ICONS

Do not use random emoji as UI icons.

Prefer the project's existing icon system.

If an icon library already exists, reuse it.

Do not install another icon library unnecessarily.

---

# 32. FORMS

Forms must have:

* Proper labels
* Validation
* Clear error states
* Accessible inputs
* Loading states where appropriate
* Success states where appropriate

Do not build fake form interactions that do not actually work unless explicitly requested as a visual prototype.

---

# 33. PERFORMANCE

Avoid unnecessary:

* Client Components
* JavaScript
* Dependencies
* Re-renders
* Event listeners
* Large images
* API requests
* Effects

Do not optimize prematurely.

But do not introduce obvious performance problems.

---

# 34. CODE CLEANUP

After implementing a feature, inspect the changed code.

Remove:

* Unused imports
* Unused variables
* Dead code
* Duplicate CSS
* Duplicate logic
* Temporary console logs
* Unused classes
* Unnecessary dependencies
* Unnecessary comments
* Unnecessary wrappers

Do not leave temporary AI-generated code behind.

---

# 35. NO CONSOLE LOGS IN PRODUCTION CODE

Remove debugging statements such as:

```js
console.log()
console.warn()
console.error()
```

unless they are intentionally required for production error handling.

---

# 36. DO NOT OVER-COMMENT

Do not add comments explaining obvious code.

Bad:

```tsx
// Create a button
<button>Click</button>
```

Comments should explain:

* Why something unusual exists
* Important architectural decisions
* Non-obvious browser behavior
* Complex calculations

---

# 37. PRESERVE EXISTING DESIGN LANGUAGE

If the project already has:

* Colors
* Typography
* Buttons
* Cards
* Spacing
* Header
* Footer
* Animations

reuse them.

Do not introduce a completely different visual language for one new section.

---

# 38. DESIGN CONSISTENCY

A new section should feel like part of the same website.

Maintain consistency in:

* Typography
* Spacing
* Color
* Interaction
* Border treatment
* Radius
* Animation timing
* Layout behavior

---

# 39. BEFORE ADDING NEW CSS

Always ask:

```text
Does this already exist?

Can I reuse an existing class?

Can I reuse a token?

Can I reuse an existing component?

Can I solve this with existing layout rules?
```

Only create new CSS when the answer is genuinely no.

---

# 40. BEFORE ADDING NEW JAVASCRIPT

Always ask:

```text
Does this actually require JavaScript?

Can CSS handle it?

Can existing component logic handle it?

Can an existing utility handle it?

Does this require a Client Component?
```

Only then add JavaScript.

---

# 41. NO QUICK FIXES

Do not solve problems with:

* !important
* random z-index
* arbitrary margin
* arbitrary transform
* excessive absolute positioning
* duplicate CSS
* duplicate components
* unnecessary state
* unnecessary effects

Fix the underlying problem.

---

# 42. VISUAL QUALITY STANDARD

Do not stop at:

"It works."

The final result must also be evaluated for:

* Composition
* Typography
* Spacing
* Alignment
* Visual hierarchy
* Responsiveness
* Interaction
* Accessibility
* Performance
* Code quality

Functional correctness is necessary but not sufficient.

---

# 43. FINAL SELF-CHECK

Before declaring a task complete, verify:

### Design

* Is the visual hierarchy clear?
* Does the design feel intentional?
* Is the layout responsive?
* Are spacing and typography consistent?
* Are animations purposeful?
* Is there unnecessary decoration?

### CSS

* Is there any `!important`?
* Is there duplicate CSS?
* Is there unused CSS?
* Are there unnecessary breakpoints?
* Are there magic numbers?
* Are there unnecessary overrides?
* Can existing CSS be reused?

### JavaScript

* Is JavaScript actually necessary?
* Is `"use client"` necessary?
* Is `useEffect` necessary?
* Is state necessary?
* Is logic duplicated?
* Are there unnecessary dependencies?

### Next.js

* Are Server Components used where possible?
* Is client-side code limited to where it is required?
* Is image optimization handled correctly?
* Is data fetching appropriate for the architecture?

### Code

* Are there unused imports?
* Are there unused variables?
* Are there console logs?
* Is there dead code?
* Are components appropriately structured?

---

# 44. GOLDEN RULE

## DO NOT GENERATE MORE CODE.

## GENERATE THE RIGHT CODE.

Prefer:

```text
Simple
Reusable
Semantic
Responsive
Maintainable
Performant
Intentional
```

over:

```text
Large
Duplicated
Over-engineered
AI-generated
Generic
```

The goal is not to maximize code.

The goal is to maximize quality.

---

# 45. FINAL INSTRUCTION

Before making any implementation:

**Understand → Inspect → Reuse → Design → Implement → Review → Clean**

Never:

**Generate → Patch → Override → Add more CSS → Add !important**

The second workflow is prohibited.


<!-- End Desing Rule -->