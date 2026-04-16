# ENTEVATE Website Brand Reference

Developer and designer reference for the ENTEVATE main website. All values are sourced from the live codebase at `src/global.css` and verified against [entevate.com](https://www.entevate.com).

---

## 1. Brand Overview

| Field | Value |
|-------|-------|
| Company | ENTEVATE |
| Tagline | Human-centered innovation partner |
| Founded | 2016 |
| Founder | Jake Hamann |
| Managing Director, Innovation / Ventures / Ecosystem | Mike Binko |
| Location | 5 Cowboys Way, Ste 300, Frisco, Texas 75034 |
| Website | [entevate.com](https://www.entevate.com) |

**Positioning:** We partner with organizations ready to evolve, designing immersive brand experiences, aligning digital content, and building actionable roadmaps for lasting impact.

**Boilerplate:** Founded in 2016 and based in Frisco, Texas, ENTEVATE is a human-centered innovation partner for leaders ready to build what comes next. From immersive brand experiences powered by Momentify to co-created innovation roadmaps and applied AI frameworks like AIQUI, everything we build starts with people.

---

## 2. Three Pillars

Each pillar has a primary color, gradient, CSS card class, and blog tag class.

| Pillar | Primary Color | Gradient | Card Class | Blog Tag Class |
|--------|--------------|----------|------------|----------------|
| Experiential Branding and Marketing | Teal `#2bbfa8` | `linear-gradient(90deg, #2bbfa8, #6dd4a0)` | `.s1` | `.card-ebm` |
| Operational Intelligence | Orange `#e8782a` | `linear-gradient(90deg, #e8782a, #f5b731)` | `.s2` | `.card-dct` |
| Innovation / Ventures / Ecosystem | Purple `#6a6b9e` | `linear-gradient(90deg, #5b5c8c, #8e90c0)` | `.s3` | `.card-irm` |

A fourth tag class, `.card-gen`, is used for general/cross-pillar content and uses the brand blue gradient `linear-gradient(90deg, #3b8fe8, #5bc8f5)`.

---

## 3. Color Palette

### Primary

| Token | Hex | Usage |
|-------|-----|-------|
| `--blue` | `#247b96` | Primary buttons, links, nav hover, newsletter button |
| `--blue-light` | `#5ba8c4` | Secondary accent, lighter blue contexts |
| `--purple` | `#444561` | Button hover state (primary), dark brand accent |
| `--purple-light` | `#8e90c0` | Innovation gradient end stop |
| `--purple-dark` | `#6a6b9e` | Innovation pillar primary color |

### Experiential Pillar

| Token | Hex | Usage |
|-------|-----|-------|
| `--teal` | `#2bbfa8` | Experiential primary, card top-bar start, icon color |
| `--teal-light` | `#6dd4a0` | Experiential gradient end stop |
| `--green` | `#3d978a` | Newsletter button hover, experiential mobile hover |

### Operational Intelligence Pillar

| Token | Hex | Usage |
|-------|-----|-------|
| `--orange` | `#e8782a` | OI primary, card top-bar start, icon color |
| `--orange-light` | `#ea9709` | Orange button background |
| `--orange-amber` | `#f5b731` | OI gradient end stop |
| `--orange-dark` | `#cb632f` | Orange button hover background |

### Neutrals

| Token | Hex | Usage |
|-------|-----|-------|
| `--black` | `#181818` | Body text, headings, dark backgrounds (footer) |
| `--gray-mid` | `#6b6b6b` | Body secondary text, descriptions, subtitles |
| `--gray-light` | `#a8a8a8` | Client logos text, placeholder text, muted labels |
| `--border` | `#dde6f0` | Card borders, nav border-bottom, section dividers |
| `--light-blue` | `#eef5fd` | Alternate section backgrounds, dropdown hover, value pills |
| `--white` | `#ffffff` | Page background, card backgrounds, button text on dark |
| `--mob-hover` | `#247b96` | Mobile drawer link hover (same as --blue) |

### Brand Gradients

| Name | CSS | Usage |
|------|-----|-------|
| Brand Gradient | `linear-gradient(90deg, #2060d8 0%, #38c6f4 100%)` | Gradient buttons, stat numbers, section labels |
| Experiential | `linear-gradient(90deg, #2bbfa8 0%, #6dd4a0 100%)` | Card top-bars, learn-more links, blog tags |
| Operational Intelligence | `linear-gradient(90deg, #e8782a 0%, #f5b731 100%)` | Card top-bars, learn-more links, blog tags |
| Innovation | `linear-gradient(90deg, #5b5c8c 0%, #8e90c0 100%)` | Card top-bars, learn-more links, blog tags |
| General / Cross-pillar | `linear-gradient(90deg, #3b8fe8 0%, #5bc8f5 100%)` | General blog tags |
| CTA Overlay | `linear-gradient(135deg, rgba(45,43,78,0.88), rgba(68,69,97,0.84) 45%, rgba(92,71,128,0.84))` | CTA banner overlay on texture image |

---

## 4. Typography

### Font

```css
font-family: "Archivo", system-ui, sans-serif;
```

- **Source:** Google Fonts
- **Variable:** `var(--font)`
- **Weights used:** 100, 200, 300, 400, 500, 600, 700

### Type Scale

| Element | Size | Weight | Letter Spacing | Additional |
|---------|------|--------|----------------|------------|
| Homepage Hero (h1) | `clamp(51px, 6.8vw, 97px)` | 100 | `-0.03em` | Fluid scaling |
| Pillar Page Hero (h1) | `clamp(40px, 7vw, 82px)` | 100 | `-0.03em` | Fluid scaling |
| Section Title (h2) | `clamp(30px, 4vw, 48px)` | 300 | `-0.02em` | `line-height: 1.1` |
| CTA Banner Title (h2) | `clamp(26px, 4vw, 44px)` | 300 | `-0.02em` | White on overlay |
| Card Heading (h3) | `19px` | 300 | `-0.01em` | |
| Body | `16px` | 400 | normal | `line-height: 1.6` |
| Section Subtitle | `15px` | 400 | normal | `color: var(--gray-mid)`, `line-height: 1.75` |
| Body Small / Card Body | `14px` | 400 | normal | `line-height: 1.7` |
| Button | `14px` | 600 | normal | |
| Nav Link | `13.5px` | 500 | normal | |
| Footer Link | `13.5px` | 400 | normal | `color: rgba(255,255,255,0.62)` |
| Btn Outline | `13px` | 600 | normal | |
| Learn More | `12px` | 700 | `0.05em` | uppercase |
| Blog Card Body | `12px` | 400 | normal | `color: var(--gray-mid)` |
| Label / Eyebrow | `11px` | 700 | `0.12em` | uppercase |
| Blog Tag | `10px` | 700 | `0.1em` | uppercase, gradient text |
| Footer Column Header | `10px` | 700 | `0.12em` | uppercase, `rgba(255,255,255,0.3)` |

### Text Wrapping

```css
/* Headings */
h1, h2, h3, h4, h5, h6 { text-wrap: balance; }

/* Body text */
p, li, dd, blockquote, td, th, caption, figcaption {
  text-wrap: pretty;
  orphans: 2;
  widows: 2;
}
```

---

## 5. Iconography

All icons are inline SVGs. Use [Lucide Icons](https://lucide.dev) for any new icons.

### SVG Specifications

| Property | Value |
|----------|-------|
| viewBox | `0 0 24 24` |
| stroke-width (standard) | `1.6` |
| stroke-width (nav controls) | `1.8` |
| fill | `none` |
| stroke | `currentColor` |
| stroke-linecap | `round` |
| stroke-linejoin | `round` |

### Pillar Icons

| Pillar | Icon | Lucide Name | Description |
|--------|------|-------------|-------------|
| Experiential | Star | `star` | 5-point star polygon |
| Operational Intelligence | Layers | `layers` | 3 stacked isometric layers |
| Innovation | Lightbulb | `lightbulb` | Bulb with horizontal bars |

### Service Icon Container

```css
.service-icon {
  width: 46px;
  height: 46px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

Each pillar's icon container uses a `12%` opacity version of its gradient as the background, with the pillar's primary color for the icon stroke.

---

## 6. Buttons

All buttons use `font-family: var(--font)`, `border-radius: var(--radius)` (6px), and `transition: all var(--tr)` (0.22s ease).

### Variants

#### `.btn-primary`

```css
.btn-primary {
  font-size: 14px;
  font-weight: 600;
  padding: 11px 24px;
  border: none;
  background: var(--blue);       /* #247b96 */
  color: var(--white);
}
.btn-primary:hover {
  background: var(--purple);     /* #444561 */
  transform: translateY(-1px);
}
```

#### `.btn-outline`

```css
.btn-outline {
  font-size: 13px;
  font-weight: 600;
  padding: 9px 20px;
  border: 1.5px solid var(--black);
  color: var(--black);
  background: transparent;
}
.btn-outline:hover {
  background: var(--black);
  color: var(--white);
}
```

#### `.btn-ghost`

```css
.btn-ghost {
  font-size: 14px;
  font-weight: 500;
  background: none;
  border: none;
  color: var(--black);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.btn-ghost:hover {
  color: var(--blue);
}
```

#### `.btn-gradient`

```css
.btn-gradient {
  font-size: 14px;
  font-weight: 600;
  padding: 11px 24px;
  border: none;
  background: linear-gradient(90deg, #2060d8 0%, #38c6f4 100%);
  color: var(--white);
}
.btn-gradient:hover {
  opacity: 0.88;
  transform: translateY(-1px);
}
```

#### `.btn-orange`

```css
.btn-orange {
  font-size: 14px;
  font-weight: 700;
  padding: 14px 32px;
  border: none;
  background: var(--orange-light);  /* #ea9709 */
  color: var(--white);
}
.btn-orange:hover {
  background: var(--orange-dark);   /* #cb632f */
  transform: translateY(-2px);
}
```

---

## 7. Spacing and Layout

### Section Padding

| Viewport | Padding |
|----------|---------|
| Desktop (> 960px) | `96px 48px` |
| Tablet (<=960px) | `72px 24px` |
| Mobile (<=600px) | `56px 20px` |

### Layout Tokens

| Token | Value | Variable |
|-------|-------|----------|
| Container Max Width | `1160px` | n/a |
| Nav Height | `70px` | n/a |
| Nav Padding (desktop) | `0 48px` | n/a |
| Nav Padding (tablet/mobile) | `0 24px` | n/a |
| Card Padding | `36px 30px` | n/a |
| Grid Gap | `24px` | n/a |
| Border Radius | `6px` | `var(--radius)` |
| Transition | `0.22s ease` | `var(--tr)` |
| CTA Banner Padding (desktop) | `80px 48px` | n/a |
| CTA Banner Padding (tablet) | `64px 24px` | n/a |
| CTA Banner Padding (mobile) | `56px 20px` | n/a |
| Footer Padding (desktop) | `72px 48px 40px` | n/a |
| Footer Padding (mobile) | `56px 20px 32px` | n/a |

---

## 8. Grid System

### Container

```css
.container {
  max-width: 1160px;
  margin: 0 auto;
}
```

### Grid Layouts

| Layout | Columns | Gap | Breakpoint Behavior |
|--------|---------|-----|---------------------|
| Services Grid | `repeat(3, 1fr)` | `24px` | Collapses responsively |
| Blog Grid | `repeat(3, 1fr)` | `24px` | Collapses responsively |
| Stat Row | `repeat(3, 1fr)` | `24px` | 2-col at <=600px |
| Footer (desktop) | `1.4fr 1fr 1fr 1.2fr` | `48px` | 2-col at <=960px, 1-col at <=600px |
| About / Split Sections | 2 equal columns | `80px` | Stacks on mobile |

---

## 9. Card Components

### Service Cards

Each pillar gets a 3px gradient top-bar using `::before` and matching icon/link colors.

```css
.service-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 36px 30px;
  position: relative;
  overflow: hidden;
  transition: box-shadow var(--tr), transform var(--tr);
}

/* 3px gradient top bar */
.service-card::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  border-radius: var(--radius) var(--radius) 0 0;
}

.service-card.s1::before { background: linear-gradient(90deg, #2bbfa8 0%, #6dd4a0 100%); }
.service-card.s2::before { background: linear-gradient(90deg, #e8782a 0%, #f5b731 100%); }
.service-card.s3::before { background: linear-gradient(90deg, #5b5c8c 0%, #8e90c0 100%); }
```

### Blog Cards

```css
.blog-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: box-shadow var(--tr), transform var(--tr);
}
```

### Blog Card Tag Variants

| Class | Pillar | Color | Gradient Text |
|-------|--------|-------|---------------|
| `.card-ebm` | Experiential | `#2bbfa8` | `linear-gradient(90deg, #2bbfa8, #6dd4a0)` |
| `.card-dct` | Operational Intelligence | `#e8782a` | `linear-gradient(90deg, #e8782a, #f5b731)` |
| `.card-irm` | Innovation | `#5b5c8c` | `linear-gradient(90deg, #5b5c8c, #8e90c0)` |
| `.card-gen` | General | `#3b8fe8` | `linear-gradient(90deg, #3b8fe8, #5bc8f5)` |

Each tag class applies to the parent `.blog-card` and affects the `.blog-tag` text gradient, `.blog-read-more` pill border and text color, and the `.blog-thumb::after` pillar icon overlay.

### Blog Read More Pill

```css
.blog-read-more {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 100px;
  border: 1.5px solid transparent;
}
```

---

## 10. Elevation and Effects

### Shadows

| State | Box Shadow | Transform |
|-------|-----------|-----------|
| Rest (cards) | none | none |
| Dropdown | `0 8px 24px rgba(0,0,0,0.08)` | none |
| Card Hover (service) | `0 10px 40px rgba(0,0,0,0.08)` | `translateY(-3px)` |
| Blog Card Hover | `0 8px 32px rgba(0,0,0,0.07)` | `translateY(-3px)` |
| Mobile Drawer | `-6px 0 32px rgba(0,0,0,0.16)` | none |
| Mobile Overlay | `rgba(0,0,0,0.48)` full screen | none |

### Dropdown Animation

```css
.dropdown {
  opacity: 0;
  pointer-events: none;
  transform: translateY(6px);
  transition: all var(--tr);
}
.has-drop:hover .dropdown {
  opacity: 1;
  pointer-events: all;
  transform: translateY(0);
}
```

### Mobile Drawer Animation

```css
.mob-drawer {
  transform: translateX(100%);
  transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
}
.mob-drawer.open {
  transform: translateX(0);
}
```

---

## 11. Animations

### Fade Up (Scroll Reveal)

```css
.fade-up {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.55s ease, transform 0.55s ease;
}
.fade-up.visible {
  opacity: 1;
  transform: none;
}
```

- Triggered via `IntersectionObserver` with `threshold: 0.15`
- Stagger: +0.1s per sibling in grid containers

### Micro-interactions

| Interaction | Details |
|-------------|---------|
| Transition duration | `0.22s ease` via `var(--tr)` |
| Card hover lift | `translateY(-3px)` |
| Primary button hover lift | `translateY(-1px)` |
| Orange button hover lift | `translateY(-2px)` |
| Learn-more arrow gap | `6px` at rest, `10px` on hover |
| Blog read-more arrow gap | `5px` at rest, `8px` on hover |
| Client carousel | `22s linear infinite` scroll, pauses on hover |
| Mobile overlay | `opacity 0.28s ease` fade |
| Mobile chevron | `rotate(180deg)` on submenu open |

### Client Carousel

```css
@keyframes clients-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.clients-track {
  animation: clients-scroll 22s linear infinite;
}
.clients-track:hover {
  animation-play-state: paused;
}
```

---

## 12. Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| > 960px | Desktop. Full horizontal nav with dropdowns. 3-column service and blog grids. 4-column footer. Section padding `96px 48px`. |
| <= 960px | Tablet. Hamburger menu replaces nav center links and outline CTA. Footer collapses to 2-column grid with `32px` gap. Section padding `72px 24px`. Blog header stacks vertically. |
| <= 600px | Mobile. Everything stacks to 1-column. Footer is single column. Stat row goes to 2-column. Footer padding `56px 20px 32px`. Footer bottom stacks and centers. |

### Fluid Typography Examples

```css
/* Homepage hero: 51px on mobile, scales to 97px on desktop */
font-size: clamp(51px, 6.8vw, 97px);

/* Section titles: 30px on mobile, scales to 48px on desktop */
font-size: clamp(30px, 4vw, 48px);

/* CTA banner title: 26px on mobile, scales to 44px on desktop */
font-size: clamp(26px, 4vw, 44px);
```

---

## 13. Background Textures

All textures live in `/images/` and are used as `background: url() center/cover no-repeat`.

| File | CSS Class | Usage | Pattern Description |
|------|-----------|-------|---------------------|
| `bg-blue.png` | n/a | Homepage hero, main brand sections | Sparse angular lines on blue gradient |
| `bt1.png` | `.bt1` | Experiential pillar hero, experiential blog thumbs | Dense flowing S-curves on teal gradient |
| `bt2.png` | `.bt2` | OI pillar hero, OI blog thumbs | Diamond halftone grid on orange gradient |
| `bt3.png` | `.bt3` | Innovation pillar hero, CTA banners, innovation blog thumbs | Organic topographic contours on purple gradient |

### CTA Banner Texture Usage

The CTA banner composites a gradient overlay on top of `bt3.png`:

```css
.cta-banner {
  background:
    linear-gradient(135deg,
      rgba(45,43,78,0.88) 0%,
      rgba(68,69,97,0.84) 45%,
      rgba(92,71,128,0.84) 100%),
    url("/images/bt3.png") center/cover no-repeat;
}
```

---

## 14. OG Images

All Open Graph images are 1200x630px PNGs stored in `/images/og/`. Each uses the corresponding background texture.

| File | Usage |
|------|-------|
| `/images/og/main-og.png` | Default / Homepage |
| `/images/og/ebm-og.png` | Experiential Branding and Marketing pages |
| `/images/og/oi-og.png` | Operational Intelligence pages |
| `/images/og/irm-og.png` | Innovation / Ventures / Ecosystem pages |

---

## 15. Brand Voice

**Tone:** Confident, not arrogant. Warm, not casual. Forward-thinking, not jargon-heavy. Precise, not clinical.

**Writing Rules:**
- Lead with clarity, follow with depth
- Active voice always
- Short paragraphs, scannable structure
- No em dashes in copy. Use commas or periods instead.
- No emojis in any copy or UI text
- Avoid semicolons for emphasis

**Brand Values:**
1. Empathy. Lead with heart.
2. Authenticity. Keep it real.
3. Adaptability. Embrace the pivot.
4. Quality. Don't cut corners.
5. Responsibility. Do what's right.

---

## 16. Page Structure

### Homepage

```
Header (sticky, 70px, white, border-bottom)
Hero (light-blue bg, SVG curves, min-height ~82vh)
Client Carousel (border-top/bottom, 22s infinite scroll)
Services Grid (3-col, white bg)
About + Values (2-col split, light-blue bg)
CTA Banner (gradient overlay on bt3.png texture)
Blog Grid (3-col, white bg)
Footer (4-col grid, dark bg #181818)
```

### Service Pillar Page

```
Header (sticky, 70px)
Hero (pillar-colored bg with matching texture, eyebrow label)
Offerings Grid (cards with pillar gradient top-bars)
Features / Details
Case Studies
CTA Banner (gradient overlay on texture)
Footer (4-col grid, dark bg)
```

### Sticky Nav Structure

```
[Logo]    [Services v] [About] [Insights] [Contact]    [Get Started]
```

- Desktop: horizontal links with dropdown on Services
- Tablet/Mobile: hamburger opens right-side drawer with slide-in animation

### Footer Structure

```
Column 1 (1.4fr): Logo, description, address
Column 2 (1fr):   Services links
Column 3 (1fr):   Company links
Column 4 (1.2fr): Newsletter signup form
---
Bottom bar: Copyright | Social icons
```

---

## 17. Quick Reference: Full CSS Variables

Copy this block into `:root` for a complete set of ENTEVATE design tokens:

```css
:root {
  /* Neutrals */
  --light-blue: #eef5fd;
  --black: #181818;
  --white: #ffffff;
  --gray-mid: #6b6b6b;
  --gray-light: #a8a8a8;
  --border: #dde6f0;

  /* Primary Brand */
  --blue: #247b96;
  --blue-light: #5ba8c4;
  --purple: #444561;
  --purple-light: #8e90c0;
  --purple-dark: #6a6b9e;
  --green: #3d978a;

  /* Experiential Pillar */
  --teal: #2bbfa8;
  --teal-light: #6dd4a0;

  /* Operational Intelligence Pillar */
  --orange: #e8782a;
  --orange-light: #ea9709;
  --orange-amber: #f5b731;
  --orange-dark: #cb632f;

  /* Mobile */
  --mob-hover: #247b96;

  /* System */
  --font: "Archivo", system-ui, sans-serif;
  --radius: 6px;
  --tr: 0.22s ease;
}
```

---

## Logo

The ENTEVATE wordmark is the primary brand identifier. It consists of a custom geometric "E" glyph icon paired with the ENTEVATE letterforms.

- **Format:** Inline SVG (no raster logo files)
- **Variants:** White on dark, Black on light
- **Clear space:** Maintain minimum space equal to the height of the "E" character on all sides
- **Icon-only use:** The "E" glyph can be used independently at small sizes (favicons, app icons)
- **Favicon:** `/favicon.png` (PNG format)

### Logo Rules

Do:
- Use the full wordmark as the primary logo
- Use white logo on dark backgrounds, black on light
- Use icon-only for favicons and small spaces

Do not:
- Stretch, rotate, or distort
- Apply drop shadows, outlines, or effects
- Place on busy backgrounds without sufficient contrast
- Use colors other than white or black

---

## Gradient Text Pattern

Several elements use CSS gradient text via background-clip. The pattern is:

```css
.element {
  background: linear-gradient(90deg, #start, #end);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

Used on: section labels (`.blue-gradient-clip`), stat numbers, learn-more links, blog tags, and blog read-more pills. Each pillar applies its own gradient colors.
